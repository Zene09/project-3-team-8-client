import { useState, useEffect } from "react";
import messages from '../shared/AutoDismissAlert/messages'
import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
import { getAllBlogs } from "../../api/blogs";

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    fontFamily: 'Marcellus, serif'
}

// BlogIndex should show all blogs and display them

const BlogIndex = (props) => {
    console.log("watermelon sugar", props)
    const [blogs, setBlogs] = useState(null)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const { msgAlert } = props
    useEffect(() => {
        getAllBlogs()
            .then(res => setBlogs(res.data.blogs))
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.getBlogsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])
    if (error) {
        return <p>Error!</p>
    }

    // If pets haven't been loaded yet, show a loading message
    if (!blogs) {
        return <LoadingScreen />
    } else if (blogs.length === 0) {
        return <p>No blogs yet. Better add some.</p>
    }

    console.log("blogs in index page", blogs)
    const blogCards = blogs.map(blog => (
        <Card style={{ width: '30%', margin: 5 }} key={blog.id}>
            <Card.Header>{blog.title}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <p>{blog.body}</p>
                    {/* <p>{blog.owner}</p> */}
                </Card.Text>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
                {/* this allows display of post author OR anon depending */}
                {blog.owner
                ?
                <h5>{blog.owner.username}</h5>
                :
                <h5>Anonymous</h5>}
                <Button
                    variant="outline-primary"
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                >
                    View this post
                </Button>

            </Card.Footer>
        </Card>
    ))

    return (
        <div style={cardContainerStyle}>
            {blogCards}
        </div>
    )
}
export default BlogIndex