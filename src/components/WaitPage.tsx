import React from 'react'
import styles from './WaitPage.module.scss'

export const WaitPage = (props: any) => {
    return (
        <div className={styles.root}>
            <div className={styles.letter}>Wait another player...</div>
        </div>
    );
}