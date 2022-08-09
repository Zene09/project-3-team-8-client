import { Form, Button, Container, Row } from 'react-bootstrap'

const addBlogStyles = {
    fontFamily: 'Marcellus, serif',
    textShadow: '5px',
    backgroundColor: '#0A2733',
    color: '#F4A460'
}

const submitButton = {
    fontFamily: 'Marcellus, serif',
    backgroundColor: '#003309',
    borderColor: '#FEF4EC',
    margin: '10px'
}

const BlogForm = (props) => {
    const { blog, handleChange, handleSubmit } = props
    return (
        <Container className="justify-content-center mb-3" style={addBlogStyles}>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label 
                        htmlFor="title"
                        // style={{
                        //     fontSize: "30px",
                        //     textAlign: "center",
                        // }}
                    >
                        Please Title Your Post
                    </Form.Label>
                    <Form.Control
                        size="lg"
                        placeholder="Blog Title"
                        name="title"
                        id="title"
                        value={blog.title}
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor="body">Body</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={8}
                        style={{overflow: "auto"}}
                        // placeholder="Blog Body"
                        name="body"
                        id="body"
                        value={blog.body}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button style={submitButton} type="submit">Submit</Button>
            </Form>
        </Container>
    )
}
export default BlogForm