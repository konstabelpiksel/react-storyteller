import styles from './Splash.module.css'
import NavBar from '../components/NavBar';

export default function Splash() {

    return (
        <>
            <NavBar />
            <div className={styles.content}>
                <h1>Dev Logs</h1>
                <ol>
                    <li>OpenAI Playground - with chatgpt api</li>
                    <li>Styling navbar</li>
                    <li>OpenAI story teller - three phase</li>

                </ol>
            </div>
        </>
    )
}