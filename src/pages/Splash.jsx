import { useNavigate } from 'react-router'
import styles from './Splash.module.css'

export default function Splash() {

    const navigate = useNavigate();

    function goToURL(loc){
        navigate(loc)
    }
    
    return (
        <>
        <h1>Splash Page</h1>
        <button onClick={()=>goToURL('/playground')}>Playground</button>
        <button onClick={()=>goToURL('/localms')}>LocalMS</button>
        </>
    )
}