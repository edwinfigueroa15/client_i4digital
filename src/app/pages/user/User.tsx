import { useEffect, useState } from 'react';
import Paginator from '../../components/Paginator';
import { IDataPaginator } from '../../interfaces/IPaginator';
import { IUser } from '../../interfaces/IUser';
import { getUsers } from '../../services/UserService';
import UserCard from './components/UserCard';
import UserCreate from './components/UserCreate';

const User = () => {
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
    const [users, setUsers] = useState({
        count: 0,
        rows: []
    })

    const handleUsers = async () => {
        const response = await getUsers(dataPaginator.currentPage, dataPaginator.perPage)
        paginator(response.data.count)
        setUsers(response.data)
        setLoading(false)
    }

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
        const response = await getUsers(dataPaginator.currentPage+1, dataPaginator.perPage)
        setUsers(response.data)
        setLoading(false)
        setDataPaginator({
            ...dataPaginator,
            currentPage: dataPaginator.currentPage+1,
        })
    }

    const changePageBack = async () => {
        setLoading(true)
        const response = await getUsers(dataPaginator.currentPage-1, dataPaginator.perPage)
        setUsers(response.data)
        setLoading(false)
        setDataPaginator({
            ...dataPaginator,
            currentPage: dataPaginator.currentPage-1,
        })
    }

    useEffect(() => {
        if(!ready) return setReady(true)
        handleUsers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready])

    if(loading) return null
    return (
        <>
            <div className="container d-flex justify-content-between align-items-center mb-2">
                <p className='fs-4 fw-bold m-0'>Lista de usuarios</p>
                <button className="buttonIcon" onClick={() => setShowModalCreate(true)}>
                    <i className="bi bi-person-plus-fill"></i> Nuevo usuario
                </button>
            </div>
            <div className='container' style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                { users.rows.map((user: IUser) => <UserCard key={user.identification_number} user={user} /> ) }
            </div>
            <div className='container'>
                <Paginator dataPaginator={dataPaginator} changePageBack={changePageBack} changePageNext={changePageNext} />
            </div>
            {showModalCreate && <UserCreate setShowModalCreate={setShowModalCreate} handleUsers={handleUsers} />}
        </>
    )
}

export default User;