import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'

import { Container, Card } from "react-bootstrap"

import LoadingScreen from "../shared/LoadingScreen"
// import this down here vv updateBlog, removeBlog
import { getOneBlog } from "../../api/blogs"
import messages from '../shared/AutoDismissAlert/messages'

// const cardContainerLayout = {
//     display: 'flex',
//     justifyContent: 'center',
//     flexFlow: 'row wrap'
// }

const ShowBlog = (props) => {
    const [blog, setBlog] = useState(null)
    const [updated, setUpdate] = useState(false)
    // ^^deconstructuring to get the id value from our route parameters

    const { id } = useParams()
    const navigate = useNavigate()


    const { user, msgAlert } = props


    useEffect(() => {
        getOneBlog(id)
            .then(res => setBlog(res.data.blog))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Blogs',
                    message: messages.getBlogsFailure,
                    variant: 'danger',
                })
                navigate('/')
                //navigate back to the homepage if there's an error
            })
    }, [updated])

    // const removeTheBlog = () => {
    //     removeBlog(user, blog.id)
    //         // on success send a success message
    //         .then(() => {
    //             msgAlert({
    //                 heading: 'Success',
    //                 message: messages.removeBlogSuccess,
    //                 variant: 'success'
    //             })
    //         })
    //         // then navigate to index
    //         .then(() => {navigate('/')})
    //         // on failure send a failure message
    //         .catch(err => {                   
    //             msgAlert({
    //                 heading: 'Error removing blog',
    //                 message: messages.removeBlogFailure,
    //                 variant: 'danger'
    //             })
    //         })
    // }

    if (!blog) {
        return <LoadingScreen />
    }
    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{blog.title}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Body:{blog.body}</small></div>
                        </Card.Text>
                    </Card.Body>

                    <Card.Footer style={{ textAlign: "right" }}>
                        <button>
                            <Link to={`/blogupdate/${blog.id}`}>Update Blog</Link>
                        </button>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}
export default ShowBlog