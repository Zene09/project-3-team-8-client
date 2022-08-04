import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Card } from "react-bootstrap"
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from "../shared/LoadingScreen"

const ShowBlog = (props) => {
    const [blog, setBlog] = useState(null)
    const { id } = useParams()
    // ^^deconstructuring to get the id value from our route parameters
    const navigate = useNavigate()
    const { msgAlert } = props

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
    }, [])

    if (!blog) {
        return <LoadingScreen />
    }
    return (
        <Container calssName="fluid">
            <Card>
                <Card.Header>{pet.fullTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div><small>Age:{pet.age}</small></div>
                        <div><small>Type:{pet.type}</small></div>
                        <div><small>Adoptable:{pet.adoptable ? 'yes' : 'no'}</small></div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}
export default ShowBlog