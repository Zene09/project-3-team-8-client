import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
// import { Link } from 'react-router-dom'

import { Container, Card, Button } from "react-bootstrap"

import LoadingScreen from "../shared/LoadingScreen"
// import this down here vv updateBlog,
import { getOneBlog, removeBlog, updateBlog } from "../../api/blogs"
import messages from '../shared/AutoDismissAlert/messages'
import EditBlogModal from "./EditBlogModal"

const containerStyle = {
    display: 'flex',
    // flexFlow: 'row wrap'
}

const ShowBlog = (props) => {
    const [blog, setBlog] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()


    const { user, msgAlert } = props
    // console.log('user in props', user)

    useEffect(() => {
        getOneBlog(id)
            .then(res => setBlog(res.data.blog))
            .catch(err => {
                msgAlert({
                    heading: 'Error: request failed.',
                    message: messages.getBlogsFailure,
                    variant: 'danger',
                })
                navigate('/')
            })
    }, [updated])

    const removeTheBlog = () => {
        removeBlog(user, blog.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeBlogSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing blog',
                    message: messages.removeBlogFailure,
                    variant: 'danger'
                })
            })
    }

    if (!blog) {
        return <LoadingScreen />
    }
    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header><h2
                        style={{textAlign: 'center'}}>{blog.title}</h2></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>{blog.body}</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            blog.owner && user && blog.owner._id === user._id
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)}
                                    className="m-2"
                                    variant="outline-secondary"
                                >
                                    Edit this post
                                </Button>
                                <Button onClick={() => removeTheBlog()}
                                    className="m-2"
                                    variant="outline-danger"
                                >
                                    Delete this post
                                </Button>
                            </>
                            :
                            null
                        }          
                        {/* <small>add likes and timestamps here maybe</small> */}
                        {/* tested styling here */}
                        {/* <div style={containerStyle}> */}
                        <p style={{textAlign: 'right'}}>{blog.commentsAvail}</p>
                        <Button 
                            onClick={() => navigate('/')}
                                className="m-2 col-1"
                                variant="outline-secondary"
                                style={{
                                    float: 'left',
                                }}
                            >
                                 Go back
                        </Button>
                        {/* </div> */}
                    </Card.Footer>
                </Card>
            </Container>
            <EditBlogModal 
                user={user}
                blog={blog} 
                show={editModalShow} 
                updateBlog={updateBlog}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
                style={{
                    overlay: {
                        width: '100%',
                        height: '100%',
                    }
                }}
            />
        </>
    )
}
export default ShowBlog