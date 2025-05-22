import { useNavigate } from 'react-router'
import styles from './Splash.module.css'

export default function Splash() {

    const navigate = useNavigate();

    function gotolocalms(){
        navigate('/localms')
    }

    return (
        <>
        <h1>Splash Page</h1>
        <button onClick={gotolocalms}>LocalMS</button>
        </>
    )
}