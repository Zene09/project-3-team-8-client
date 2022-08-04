import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllBlogs = () => {
    return axios(`${apiUrl}/blogs`)
}
export const getOneBlog = (id) => {
    return axios(`${apiUrl}/blogs/${id}`)
}

// CREATE
// need an api call that accepts a token
export const createBlog = (user, newBlog) => {
    console.log('createBlog in api was hit')
    // in our createBlog form, we're building an object
    // when we pass that object into the api createBlog function, 
    // it's going to look like the blogs in our database
    // we're going to refer to this as newBlog
    console.log('this is user', user)
    console.log('this is the blog', newBlog)
    return axios({
        url: apiUrl + '/blogs',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { blog: newBlog },
    })
}
