import { useEffect, useState } from 'react';
import styles from './user.module.css';
import { IUser } from '../../interfaces/IUser';
import { getUsers } from '../../services/UserService';
import UserCard from './components/UserCard';
import UserCreate from './components/UserCreate';

const User = () => {
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [users, setUsers] = useState({
        count: 0,
        rows: []
    })

    const handleUsers = async () => {
        const response = await getUsers()
        setUsers(response.data)
        setLoading(false)
    }

    useEffect(() => {
        if(!ready) return setReady(true)
        handleUsers()
    }, [ready])

    if(loading) return null
    return (
        <>
            <div className="container d-flex justify-content-between align-items-center mb-2">
                <p className='fs-4 fw-bold m-0'>Lista de usuarios</p>
                <button className={styles.buttonIcon} onClick={() => setShowModalCreate(true)}>
                    <i className="bi bi-person-plus-fill"></i> Nuevo usuario
                </button>
            </div>
            <div className='container' style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                { users.rows.map((user: IUser) => <UserCard key={user.identification_number} user={user} /> ) }
            </div>
            {showModalCreate && <UserCreate setShowModalCreate={setShowModalCreate} handleUsers={handleUsers} />}
        </>
    )
}

export default User;