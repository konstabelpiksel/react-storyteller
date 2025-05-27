import styles from './Splash.module.css'
import NavBar from '../components/NavBar';

export default function Splash() {

    return (
        <>
            <NavBar />
            <h1>Dev Logs</h1>
            <ol>
                <li>OpenAI Playground - with chatgpt api</li>
                <li>Styling navbar</li>
                
            </ol>
        </>
    )
}