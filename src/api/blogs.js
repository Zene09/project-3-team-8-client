import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllBlogs = () => {
    return axios(`${apiUrl}/blogs`)
}
export const getOneBlog = (id) => {
    return axios(`${apiUrl}/blogs/${id}`)
}