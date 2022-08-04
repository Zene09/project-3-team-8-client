import { Form, Button, } from 'react-bootstrap'
const BlogForm = (props) => {
    const { blog, handleChange } = props
    return (
        <Form>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
                placeholder="Blog Title"
                name="title"
                id="title"
                value={blog.title}
                onChange={handleChange}
            />
            <Form.Label htmlFor="body">Body</Form.Label>
            <Form.Control
                placeholder="Blog Body"
                name="body"
                id="body"
                value={blog.body}
                onChange={handleChange}
            />
            <Button type="submit">Submit</Button>
        </Form>
    )
}
export default BlogForm