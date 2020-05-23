import React from 'react'
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
import { withAuth } from '@okta/okta-react';
import APIClient from "../apiClient";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: null };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.login = this.login.bind(this);
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    async componentDidMount() {
        this.checkAuthentication()
    }

    async login(e) {
        this.props.auth.login('/home');
    }

    render() {
        if (this.state.authenticated) {
            return <Redirect to='/home' />
        } else {
            return (
                <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Button onClick={() => {
                        this.apiClient = new APIClient();
                        this.apiClient.getKudos().then((data) => {
                                console.log(data)
                                this.setState({...this.state, kudos: data})
                            }
                        );
                    }}>Send request</Button>
                    <Button variant="contained" color="primary" onClick={this.login}>Login with Okta</Button>
                </div>
            )
        }
    }
}

export default withAuth(Login);
