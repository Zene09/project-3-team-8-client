import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import BlogForm from '../shared/BlogForm'
import { updateBlogSuccess, updateBlogFailure } from '../shared/AutoDismissAlert/messages'

const modalStyle = {
    fontFamily: 'Cinzel, serif', 
    color: '#F4A460',
    maxWidth: '99%', 
    margin: '10px'
}
const EditBlogModal = (props) => {
    const {
        user, show, handleClose,
        updateBlog, msgAlert, triggerRefresh
    } = props

    const [blog, setBlog] = useState(props.blog)

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
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success: Blog updated',
                    message: updateBlogSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() =>
                msgAlert({
                    heading: 'Failure: Blog failed to update!',
                    message: updateBlogFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose} style={modalStyle}>
            <Modal.Header closeButton style={{backgroundColor: '#3D0C02', color: '#FEF4EC', margin: '2px'}}>
                <Modal.Title>
                    Edit this Blog
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: '#0A2733', fontFamily: 'Marcellus, serif', margin: '2px'}}>
                <BlogForm
                    blog={blog}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update this Post"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditBlogModal