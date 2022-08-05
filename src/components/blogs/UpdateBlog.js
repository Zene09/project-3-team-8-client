import { useState } from "react"
import { updateBlog } from "../../api/blogs"
import { useNavigate } from "react-router-dom"
import { updateBlogSuccess, updateBlogFailure } from "../shared/AutoDismissAlert/messages"
import BlogForm from "../shared/BlogForm"

const UpdateBlog = (props) => {
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [blog, setBlog] = useState({
        title: '',
        body: ''
    })

    console.log('this is blog in createBlog', blog)

    const handleChange = (e) => {
        setBlog(prevBlog => {
            let updatedValue = e.target.value
            const updatedName = e.target.name
            const updatedBlog = {
                [updatedName]: updatedValue
            }
            return {
                ...prevBlog,
                ...updatedBlog
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()
        updateBlog(user, blog)
            .then(res => { navigate(`/blogs/${res.data.blog.id}`) })
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateBlogSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: updateBlogFailure,
                    variant: 'danger'
                })
            )
    }


    return <BlogForm
        blog={blog}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
    />
}
export default UpdateBlog