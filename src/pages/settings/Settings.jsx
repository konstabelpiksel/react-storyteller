import { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './Settings.module.css'

import NavBar from '../../components/NavBar'

export default function Settings() {
    return (
        <>
            <NavBar />
            <div className={styles.content}>
                <h1>Settings</h1>
            </div>

        </>
    )
}