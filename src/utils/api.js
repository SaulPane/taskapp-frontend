import axios from "axios";
import getRandomInt from "../utils/getRandomInt";

const api = axios.create({
    baseURL: "http://localhost:8000",
})

let token = "";

const API_URL = 'http://localhost:8000';

function getToken() {
    if (localStorage.getItem('token')) {
        token = JSON.parse(localStorage.getItem('token'));
        token = token.token;
    }
}

const postTask = async(task) => {
    await getToken()
    return fetch(`${API_URL}/task`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    }).then(res => res = res.json());
}

const getAllTask = async() => {
    await getToken()
    return fetch(`${API_URL}/task`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => res = res.json());
}

const getAllBoard = async() => {
    await getToken()
    return fetch(`${API_URL}/board`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => res = res.json());
}

const deleteTask = async(taskId) => {
    await getToken()
    return fetch(`${API_URL}/task/${taskId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => res = res.json());
}

const patchTask = async(taskId, data) => {
    await getToken()
    return fetch(`${API_URL}/task/${taskId}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }).then(res => res = res.json())
        .catch(error => console.log('Error:', error));
}

const clearCompleted = async() => {
    await getToken()
    return fetch(`${API_URL}/task/clear`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => res = res.json())
        .catch(error => console.log('Error:', error));
}

const login = (email, password) => {
    return fetch(`${API_URL}/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        }).then(res => res = res.json())
        .catch(error => console.log('Error:', error));
}

const register = (email, password) => {
    return fetch(`${API_URL}/register`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email, password),
        }).then(res => res = res.json())
        .catch(error => console.log('Error:', error));
}

export default {
    postTask,
    getAllTask,
    deleteTask,
    patchTask,
    clearCompleted,
    getAllBoard,
    login,
    register,
}