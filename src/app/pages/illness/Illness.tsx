import { useEffect, useState } from 'react';
import { useParams, useNavigate  } from "react-router-dom";
import Swal from 'sweetalert2'
import Paginator from '../../components/Paginator';
import { IIllness } from '../../interfaces/IIllness';
import { IDataPaginator } from '../../interfaces/IPaginator';
import { getIllness } from '../../services/IllnessService';
import IllnessCreate from './components/IllnessCreate';

const Illness = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [dataPaginator, setDataPaginator] = useState<IDataPaginator>({
        currentPage: 0,
        perPage: 10,
        pages: 0,
        total: 0,
        numbers: []
    });
    const [illness, setIllness] = useState({
        count: 0,
        rows: []
    });

    const paginator = (count: number) => {
        const pages = Math.ceil(count/dataPaginator.perPage);
        const array = new Array(pages).fill(1,0,pages);
        setDataPaginator({
            ...dataPaginator,
            pages: pages,
            total: count,
            numbers: array
        })
    }

    const changePageNext = async () => {
        setLoading(true)
        const response = await getIllness(id!, dataPaginator.currentPage+1, dataPaginator.perPage)
        setIllness(response.data)
        setLoading(false)
        setDataPaginator({
            ...dataPaginator,
            currentPage: dataPaginator.currentPage+1,
        })
    }

    const changePageBack = async () => {
        setLoading(true)
        const response = await getIllness(id!, dataPaginator.currentPage-1, dataPaginator.perPage)
        setIllness(response.data)
        setLoading(false)
        setDataPaginator({
            ...dataPaginator,
            currentPage: dataPaginator.currentPage-1,
        })
    }

    const handleIllness = async () => {
        const response = await getIllness(id!, dataPaginator.currentPage, dataPaginator.perPage)
        if(response.type === "success") {
            paginator(response.data.count)
            setIllness(response.data)
            setLoading(false)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario que esta buscando no existe!',
            })
            navigate("/");
        }
    }

    useEffect(() => {
        if(!ready) return setReady(true)
        handleIllness()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready])

    if(loading) return null;
    return (
        <>
            <div className="container d-flex justify-content-between align-items-center mb-4">
                <p className='fs-4 fw-bold m-0'>Lista de examenes de ususario {id}</p>
                <button className="buttonIcon" onClick={() => setShowModalCreate(true)}>
                    <i className="bi bi-person-plus-fill"></i> Nuevo examen
                </button>
            </div>
            <div className='container'>
                {illness.rows.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Enfermedad</th>
                                    <th>Azúcar</th>
                                    <th>Grasa</th>
                                    <th>Oxígeno</th>
                                    <th>Riesgo</th>
                                    <th>Realizado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {illness.rows.map((item: IIllness) => (
                                    <tr key={item.id}>
                                        <td>{item.disease_name}</td>
                                        <td>{item.sugar}%</td>
                                        <td>{item.fat}%</td>
                                        <td>{item.oxygen}%</td>
                                        <td>{item.risk}</td>
                                        <td>{new Date(item.createdAt!).toISOString().substring(0, 10)}</td>
                                    </tr>
                                ))}     
                            </tbody>
                        </table>
                        
                        <Paginator dataPaginator={dataPaginator} changePageBack={changePageBack} changePageNext={changePageNext} />
                    </div>
                ) : (
                    <p>No tiene examenes actualmente</p>
                )}
            </div>
            {showModalCreate && <IllnessCreate setShowModalCreate={setShowModalCreate} handleIllness={handleIllness} id_user={id} />}
        </>
    )
}

export default Illness;