import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styles from './illness.module.css';

const Illness = () => {
    const { id } = useParams();
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [illness, setIllness] = useState([]);

    const handleIllness = async () => {
        setLoading(false)
    }

    useEffect(() => {
        if(!ready) return setReady(true)
        handleIllness()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready])

    if(loading) return null;
    return (
        <div className='container'>
            {id}
        </div>
    )
}

export default Illness;