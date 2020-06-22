import React from 'react'
import styles from './WaitPage.module.scss'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, ThemeProvider } from '@material-ui/core'
import { theme, ToolBar } from './AuthorisationForm';

export const WaitPage = (props: any) => {
    document.title=''
    return (
        <ThemeProvider theme={theme}>
        <div className={styles.root}>
            <ToolBar/>
            <div className={styles.letter}>Ожидайте другого игрока...</div>
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
            >Копировать</Button>
        </div>
        </ThemeProvider>
    );
}