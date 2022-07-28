import { useState } from 'react';
import styles from '../user.module.css';
import { IUser } from '../../../interfaces/IUser';
import { postUsers } from '../../../services/UserService';


const UserCreate = ({ setShowModalCreate, handleUsers }: any) => {
    const [required, setRequired] = useState(false)
    const [newUser, setNewUser] = useState<IUser>({
        identification_number: "",
        identification_type: "",
        name: "",
        surname: "",
        age: 0,
        date_of_birth: new Date(),
        address: "",
        phone: "",
        blood_type: "",
        email: ""
    })

    const handlerNewUser = (e: any) => {
        setRequired(false);
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const getAge = async (e: any) => {
        let today = new Date();
        let dateOfBirth = new Date(e.target.value);
        let age = today.getFullYear() - dateOfBirth.getFullYear();
        let differenceMonths = today.getMonth() - dateOfBirth.getMonth();
        if (differenceMonths < 0 || (differenceMonths === 0 && today.getDate() < dateOfBirth.getDate())) age--;
        
        setNewUser({
            ...newUser, 
            age: age,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        if(!newUser.name || !newUser.surname || !newUser.identification_number || !newUser.identification_type || !newUser.date_of_birth || !newUser.address || !newUser.phone || !newUser.blood_type || !newUser.email) {
            setRequired(true)
        } else {
            setRequired(false);
            await postUsers(newUser);
            handleUsers()
            setShowModalCreate(false);
        }
    }

    return (
        <div className={styles.modalCreateUser}>
            <div className="modal" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Registrar un nuevo usuario</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModalCreate(false)}></button>
                    </div>
                    <div className="modal-body">
                        { required && <p className={styles.msgError}>Todos los campos son obligatorios</p> }
                        <form className="row g-3" autoComplete="false">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="name" name="name" value={newUser.name} onChange={handlerNewUser}/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="surname" className="form-label">Apellido</label>
                                <input type="text" className="form-control" id="surname" name="surname" value={newUser.surname} onChange={handlerNewUser}/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="identification_type" className="form-label">Tipo de documento</label>
                                <select id="identification_type" name="identification_type" className="form-select" value={newUser.identification_type} onChange={handlerNewUser}>
                                    <option value="">Seleccione</option>
                                    <option value={'CC'}>Cedula de ciudadania</option>
                                    <option value={'TI'}>Tarjeta de identidad</option>
                                    <option value={'RC'}>Registro Civil</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="identification_number" className="form-label">Número de documento</label>
                                <input type="number" className="form-control" id="identification_number" name="identification_number" value={newUser.identification_number} onChange={handlerNewUser}/>
                            </div>

                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Dirección</label>
                                <input type="text" className="form-control" id="address" name="address" placeholder="Cr 02 #6-20" value={newUser.address} onChange={handlerNewUser}/>
                            </div>

                            <div className="col-12">
                                <label htmlFor="date_of_birth" className="form-label">Fecha de nacimiento</label>
                                <input type="date" className="form-control" id="date_of_birth" name="date_of_birth" value={typeof newUser.date_of_birth === 'string' ? newUser.date_of_birth : ''} onChange={getAge}/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="blood_type" className="form-label">Tipo de sangre</label>
                                <select id="blood_type" name="blood_type" className="form-select" value={newUser.blood_type} onChange={handlerNewUser}>
                                    <option value="">Seleccione</option>
                                    <option value={'A+'}>A+</option>
                                    <option value={'A-'}>A-</option>
                                    <option value={'B+'}>B+</option>
                                    <option value={'B-'}>B-</option>
                                    <option value={'AB+'}>AB+</option>
                                    <option value={'AB-'}>AB-</option>
                                    <option value={'O+'}>O+</option>
                                    <option value={'O-'}>O-</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="phone" className="form-label">Telefono</label>
                                <input type="number" className="form-control" id="phone" name="phone" value={newUser.phone} onChange={handlerNewUser}/>
                            </div>

                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Correo</label>
                                <input type="email" className="form-control" id="email" name="email" value={newUser.email} onChange={handlerNewUser}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModalCreate(false)}>Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guarar</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCreate;