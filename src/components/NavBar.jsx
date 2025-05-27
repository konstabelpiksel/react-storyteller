import { useNavigate } from 'react-router'
import styles from './NavBar.module.css'

export default function NavBar() {

    const navigate = useNavigate();
    function goToURL(loc) {
        navigate(loc)
    }

    return (
        <div className={styles.mainbar}>
            <div className={styles.barcontainer}>
                <div className={styles.brand}>
                    <h3 className={styles.brandtext}>React-StoryTeller</h3>
                </div>
                <div className={styles.navgroup}>
                    <div className={styles.navitems}>
                        <ul>
                            <li className={styles.navitem}><a href='/'>Home</a></li>
                            <li className={styles.navitem}><a href='/local'>Local</a></li>
                            <li className={styles.navitem}><a href='/online'>Online</a></li>
                            <li className={styles.navitem}><a href='/playground'>Playground</a></li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}