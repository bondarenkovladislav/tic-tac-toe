import React, { useState, useEffect } from 'react';
import { TextField, Button, AppBar, Tabs, Tab, Link } from '@material-ui/core';
import styles from './AuthorisationForm.module.scss'
import { ApiClient } from '../classes/services/ApiClient'
import { withRouter } from 'react-router-dom';
import { WebSocketService } from '../classes/services/WebSocketService';


export const ToolBar = () => {
    return (
        <div>
            <AppBar>
                <Tabs value={null}>
                    <Tab onClick={() => window.location.assign('/results')} label="Results Page" />
                    <Tab onClick={()=>window.location.assign('/login')} label="Exit" />
                </Tabs>
            </AppBar>
        </div>
    );
}

export const AuthorisationForm_ = (props: any) => {

    const [userName, setUserName] = useState('')

    return (
        <div className={styles.root}>
            <ToolBar />
            <div className={styles.block}>
                <TextField
                    id='name'
                    size='small'
                    margin='normal'
                    variant='filled'
                    className={styles.textField}
                    placeholder={'username'}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Button className={styles.button}
                    variant="contained"
                    color="primary"
                    size='medium'
                    onClick={() => {
                        if (userName == '')
                            alert('Error! Invalid data')
                        else {
                            ApiClient.login(userName)
                            WebSocketService.init()
                            localStorage.setItem('key', 'token')
                            props.history.push('/wait')
                        }
                        //let token = ;
                        //localStorage.setItem('key', token)
                    }
                    }
                >
                    Login</Button>
            </div>
        </div>
    );
}

export const AuthorisationForm = withRouter(AuthorisationForm_)