import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const rowStyles = {
        fontFamily: 'Marcellus, serif',
        textShadow: '5px',
        backgroundColor: '#0A2733',
        color: '#F4A460'
}
const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='row' 
                style={ rowStyles }>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h2>Are you sure you want to sign out?</h2>
                    <small>We hate to see you go...</small><br/>
                    <ButtonGroup>
                        <Button 
                        variant='outline-light' 
                        onClick={onSignOut}
                        style={{ 
                            backgroundColor: '#B22206',
                            borderColor: '#B22206',
                            margin: '10px'
                        }}>
                            Sign Out
                        </Button>
                        <Button 
                        variant='outline-dark' 
                        onClick={onCancel}
                        style={{ 
                            backgroundColor: '#FEF4EC',
                            borderColor: '#FEF4EC',
                            margin: '10px'
                        }}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
		</>
	)
}

export default SignOut
