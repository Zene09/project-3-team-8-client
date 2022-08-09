import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const commentModalStyle = {
    fontFamily: 'Cinzel, serif', 
    color: '#FEF4EC',
    maxWidth: '99%', 
    margin: '10px',
    backgroundColor: '#3D0C02'
}

const submitButton = {
    fontFamily: 'Marcellus, serif',
    backgroundColor: '#003309',
    borderColor: '#FEF4EC',
    margin: '10px'
}

const CommentForm = (props) => {
    const { comment, handleChange, handleSubmit} = props
    return (
        <Container className="justify-content-center" style={commentModalStyle}>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="text">Comment</Form.Label>
                <Form.Control
                    style={{ fontFamily: 'Marcellus, serif' }}
                    placeholder="Comment Here"
                    name="text"
                    id="text"
                    value={comment.text}
                    onChange={handleChange}
                />
                <Button style={submitButton} type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CommentForm