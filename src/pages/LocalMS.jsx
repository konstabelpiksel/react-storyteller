import { useNavigate } from 'react-router'
import styles from './LocalMS.module.css'

export default function LocalMS() {

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