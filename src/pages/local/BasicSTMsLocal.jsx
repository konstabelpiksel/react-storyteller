import { useNavigate } from 'react-router'
import styles from './BasicSTMsLocal.module.css'

export default function BasicSTMsLocal() {

    const navigate = useNavigate();

    function gotosplash(){
        navigate('/')
    }

    return (
        <>
        <h1>LocalMS Page</h1>
        <button onClick={gotosplash}>Home</button>


        </>
    )
}

/*

*/