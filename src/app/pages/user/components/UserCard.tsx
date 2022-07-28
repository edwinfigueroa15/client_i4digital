import { Link } from "react-router-dom";
import styles from '../user.module.css';
import { UserCardProps } from "../../../interfaces/IUser";

const UserCard = ({ user }: UserCardProps) => {
    const { identification_number, identification_type, name, surname, age, date_of_birth, address, phone, blood_type, email, status } = user

    return (
        
        <div className="card" style={{ flex: '1 1 300px' }}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{name} {surname}</h5>
                    <span className={status ? styles.buttonStatusActive : styles.buttonStatusInactive}></span>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">{identification_type} - {identification_number}</h6>
                <p className="card-text"><b>Dirección:</b> {address}.</p>
                <p className="card-text p-0 m-0"><b>Correo:</b> {email}</p>
                <p className="card-text p-0 m-0"><b>Celular:</b> {phone}</p>
                <p className="card-text p-0 m-0"><b>Nacimiento:</b> {new Date(date_of_birth).toLocaleDateString()}</p>
                <p className="card-text p-0 m-0"><b>Edad:</b> {age} años</p>
                <p className="card-text p-0 m-0"><b>Tipo de sangre:</b> {blood_type}</p>
            </div>
            <div className="card-footer">
                <Link to={`/illness/${identification_number}`} className="card-link">Ver examenes</Link>
            </div>
        </div>
    )
}

export default UserCard;