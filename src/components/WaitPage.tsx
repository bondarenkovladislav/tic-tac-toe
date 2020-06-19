import React from 'react'
import styles from './WaitPage.module.scss'
import CircularProgress from '@material-ui/core/CircularProgress';

export const WaitPage = (props: any) => {
    return (
        <div className={styles.root}>
            <div className={styles.letter}>Wait another player...</div>
            <br/>
            <div>
            <CircularProgress/>
            </div>
        </div>
        
    );
}