import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const delPerson = id => {
    const delUrl = `${baseUrl}/${id}`
    const request = axios.delete(delUrl)

    return request.then(response => response.status)
}

export default { getAll, create, delPerson }