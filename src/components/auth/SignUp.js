// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const rowStyles = {
        fontFamily: 'Marcellus, serif',
        textShadow: '5px',
        backgroundColor: '#0A2733',
        color: '#F4A460'
}

const formGroupStyles = {
    marginBottom: '5px'
}
const SignUp = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 		passwordConfirmation: '',
	// 	}
	// }    
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {email, username, password, passwordConfirmation}

		signUp(credentials)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setUsername('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}


    return (
        <div className='row' style={rowStyles}>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Sign Up</h3>
                <Form onSubmit={onSignUp}>

                    <Form.Group controlId='username' style={formGroupStyles}>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            required
                            type='username'
                            name='username'
                            value={username}
                            placeholder='Choose username'
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='email' style={formGroupStyles}>
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Choose email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password' style={formGroupStyles}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Choose Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation' style={formGroupStyles}>
                        <Form.Label>Password Confirmation:</Form.Label>
                        <Form.Control
                            required
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            type='password'
                            placeholder='Choose Password'
                            onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                    </Form.Group>
                    <Button                         
                        variant='outline-light' 
                        type='submit'
                        style={{ 
                            fontFamily: 'Marcellus, serif',
                            backgroundColor: '#003309',
                            borderColor: '#FEF4EC',
                            margin: '10px'
                        }}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )

}

export default SignUp