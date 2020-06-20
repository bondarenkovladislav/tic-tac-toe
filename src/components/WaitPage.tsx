import React from 'react'
import styles from './WaitPage.module.scss'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core'

export const WaitPage = (props: any) => {
    return (
        <div className={styles.root}>
            <div className={styles.letter}>Wait another player...</div>
            <br />
            <div>
                <CircularProgress />
            </div>
            <br />
            <Button
                className={styles.button}
                size='large'
                variant="contained"
                color="primary"
                onClick={() => {
                    var url = window.location.href;
                    navigator.clipboard.writeText(url);
                }}
            >Copy link</Button>
        </div>

    );
}