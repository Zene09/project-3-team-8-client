import { useState } from "react";
import BlogForm from "../shared/BlogForm";

const CreateBlog = (props) => {
    const [blogData, setBlogData] = useState({
        title: '',
        body: '',
    })
    const handleChange = (e) => {
        setBlogData(prevBlog => {
            const updatedValue = e.target.value
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
    return <BlogForm blog={blogData} handleChange={handleChange} />
}
export default CreateBlog