import { useEffect, useState } from 'react';
import { IIllness } from '../../../interfaces/IIllness';
import { postIllness } from '../../../services/IllnessService';

const IllnessCreate = ({ setShowModalCreate, handleIllness, id_user }: any) => {
    const [required, setRequired] = useState({
        requiredInput: false,
        onlyNumber: false,
        impreciseCalculation: false
    })
    const [newIllness, setNewIllness] = useState<IIllness>({
        disease_name: "",
        sugar: 0.0,
        fat: 0.0,
        oxygen: 0.0,
        risk: "",
        id_user: id_user
    })

    const handlerNewIllness = (e: any) => {
        setRequired({ onlyNumber: false, requiredInput: false, impreciseCalculation: false });
        setNewIllness({
            ...newIllness,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        if(!newIllness.disease_name || !newIllness.sugar || !newIllness.fat || !newIllness.oxygen || !newIllness.id_user) {
            setRequired({...required, requiredInput: true});
            return false;

        } else if(isNaN(newIllness.sugar) || isNaN(newIllness.fat) || isNaN(newIllness.oxygen)) {
            setRequired({...required, onlyNumber: true});
            return false;
            
        } else if(newIllness.sugar < 0 || newIllness.sugar > 100 || newIllness.fat < 0 || newIllness.fat > 100 || newIllness.oxygen < 0 || newIllness.oxygen > 100) {
            setRequired({...required, onlyNumber: true});
            return false;
            
        } else {
            if(newIllness.sugar > 70 && newIllness.fat > 88.5 && newIllness.oxygen < 60) {
                setNewIllness({ ...newIllness, risk: 'ALTO' });
                setRequired({ onlyNumber: false, requiredInput: false, impreciseCalculation: false });
                return true;

            } else if((newIllness.sugar >= 50 && newIllness.sugar <= 70) && (newIllness.fat >= 62.2 && newIllness.fat <= 88.5) && (newIllness.oxygen >= 60 && newIllness.oxygen <= 70)) {
                setNewIllness({ ...newIllness, risk: 'MEDIO' });
                setRequired({ onlyNumber: false, requiredInput: false, impreciseCalculation: false });
                return true;

            } else if(newIllness.sugar < 50 && newIllness.fat < 62.2 && newIllness.oxygen > 70) {
                setNewIllness({ ...newIllness, risk: 'BAJO' });
                setRequired({ onlyNumber: false, requiredInput: false, impreciseCalculation: false });
                return true;

            } else {
                setRequired({...required, impreciseCalculation: true});
                return false;
            }
        }
    }

    const handleSubmit = async () => {
        await postIllness(newIllness);
        handleIllness()
        setShowModalCreate(false);
    }

    useEffect(() => {
        if(!newIllness.disease_name || !newIllness.sugar || !newIllness.fat || !newIllness.oxygen || !newIllness.risk || !newIllness.id_user) return;
        else handleSubmit();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newIllness])

    return (
        <div className="modalBackground">
            <div className="modal" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nuevo examen</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModalCreate(false)}></button>
                    </div>
                    <div className="modal-body">
                        { required.requiredInput && <p className="msgError">Todos los campos son obligatorios</p> }
                        { required.onlyNumber && <p className="msgError">Los porcentajes deben ser números y solo entre 0 a 100</p> }
                        { required.impreciseCalculation && <p className="msgError">Con los porcentajes actuales no se puede obtener un calculo preciso intente nuevamente con otros</p>}

                        <p className="msgInfo m-0 p-0"><b>ALTO:</b> Azúcar mayor a 70%, Grasa mayor a 88.5% y Oxígeno menor al 60%.</p>
                        <p className="msgInfo m-0 p-0"><b>MEDIO:</b> Azúcar entre 50% y 70% , Grasa entre 62.2% y 88.5%, y Oxígeno entre 60% y 70%.</p>
                        <p className="msgInfo m-0 p-0 mb-3"><b>BAJO:</b> Azúcar menor a 50%, Grasa menor a 62.2% y Oxígeno mayor a 70%.</p>

                        <form className="row g-3" autoComplete="false">
                            <div className="col-12">
                                <label htmlFor="disease_name" className="form-label">Nombre de la enfermedad</label>
                                <input type="text" className="form-control" id="disease_name" name="disease_name" value={newIllness.disease_name} onChange={handlerNewIllness}/>
                            </div>

                            <div className="col-12">
                                <label className="form-label fst-italic m-0 p-0"><b>Digitar los porcentajes entre 0 a 100%</b></label>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="sugar" className="form-label">Azúcar %</label>
                                <input type="number" className="form-control" id="sugar" name="sugar" value={newIllness.sugar} onChange={handlerNewIllness}/>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="fat" className="form-label">Grasa %</label>
                                <input type="number" className="form-control" id="fat" name="fat" value={newIllness.fat} onChange={handlerNewIllness}/>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="oxygen" className="form-label">Oxígeno %</label>
                                <input type="number" className="form-control" id="oxygen" name="oxygen" value={newIllness.oxygen} onChange={handlerNewIllness}/>
                            </div>

                            <div className="col-12">
                                <label htmlFor="risk" className="form-label">Riego <small style={{ fontSize: '12px' }}>(Este dato se calcula con los porcentajes y es obligatorio tenerlo)</small></label>
                                <input type="text" className="form-control" id="risk" name="risk" value={newIllness.risk} disabled/>
                            </div>

                            <div className="col-12">
                                <label htmlFor="id_user" className="form-label">Usuario</label>
                                <input type="text" className="form-control" id="id_user" name="id_user" value={newIllness.id_user} disabled/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModalCreate(false)}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={validate}>Guardar</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IllnessCreate;