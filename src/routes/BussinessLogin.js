import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import BussinessUserPool from "../utils/BussinessUserPool";
import {Button, Form, Input} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = event => {
        event.preventDefault();

        const user = new CognitoUser({
            Username: email,
            Pool: BussinessUserPool
        });
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        user.authenticateUser(authDetails, {
            onSuccess: data => {
                console.log("onSuccess:", data);
            },

            onFailure: err => {
                console.error("onFailure:", err);
            },

            newPasswordRequired: data => {
                console.log("newPasswordRequired:", data);
            }
        });


    };

    return (
        <div>
            <h2 style={{display: 'flex', justifyContent : 'center', marginTop : '5vh'}}>Business Login</h2>
            <Form onSubmit={onSubmit} style={{marginTop: '15vh', marginBottom: '30vh'}}>
                <Form.Group style={{marginLeft: '73vh'}}>
                    <Form.Field
                        id='form-input-control-email'
                        control={Input}
                        label='Email'
                        placeholder='Email'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        width={4}
                    />

                </Form.Group>
                <Form.Group style={{marginLeft: '73vh'}}>
                    <Form.Field
                        id='form-input-control-password'
                        control={Input}
                        label='Password'
                        placeholder='password'
                        type='password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        width={4}
                    />
                </Form.Group>

                <Form.Field
                    id='form-button-control-public'
                    control={Button}
                    basic color='green'
                    type='submit'
                    content='Submit'
                />
                <p>
                    Dont have an account?
                    <Link to="/BussinessSignUp"> Sign up</Link>

                </p>

            </Form>

        </div>
    );
};