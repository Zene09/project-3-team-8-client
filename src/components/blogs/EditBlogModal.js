import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import BlogForm from '../shared/BlogForm'
import { updateBlogSuccess, updateBlogFailure } from '../shared/AutoDismissAlert/messages'

const EditBlogModal = (props) => {
    const {
        user, show, handleClose,
        updateBlog, msgAlert, triggerRefresh
    } = props

    const [blog, setBlog] = useState(props.blog)

    console.log('blog in edit modal', blog)

    const handleChange = (e) => {
        setBlog(prevBlog => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "adoptable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "adoptable" && !e.target.checked) {
                updatedValue = false
            }

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
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateBlogSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: updateBlogFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <BlogForm
                    blog={blog}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Blog"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditBlogModal