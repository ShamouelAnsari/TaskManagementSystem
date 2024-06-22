let baseUrl = "http://localhost:3001/"

async function addTask(taskDetails) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "token": JSON.parse(localStorage.getItem('userInfo')).token
        },
        body: JSON.stringify(taskDetails)
    }

    let response = await fetch(baseUrl + 'createTask', options).catch(error => { return { error } })
    if (response.error) {
        return { error: response.error }
    }

    let data = await response.json().catch(error => { return { error } })
    if (data.error) {
        return { error: data.error }
    }
    return data.data

}

async function taskList(search) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "token": JSON.parse(localStorage.getItem('userInfo')).token
        }
    }

    let url = search ? baseUrl + 'listTask?taskName=' + search : baseUrl + 'listTask'

    let response = await fetch(url, options).catch(error => { return { error } })
    if (response.error) {
        return { error: response.error }
    }

    let data = await response.json().catch(error => { return { error } })
    if (data.error) {
        return { error: data.error }
    }
    return data
}

async function taskDetails(id) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "token": JSON.parse(localStorage.getItem('userInfo')).token
        }
    }
    let response = await fetch(baseUrl + 'detailTask/' + id, options).catch(error => { return { error } })
    if (response.error) {
        return { error: response.error }
    }

    let data = await response.json().catch((error) => { return { error } })
    if (data.error) {
        return { error: data.error }
    }
    return data.data;
}

async function editTask(id, taskDetails) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': JSON.parse(localStorage.getItem("userInfo")).token
        },
        body: JSON.stringify(taskDetails)
    }

    let response = await fetch(baseUrl + 'updateTask/' + id, options).catch(error => { return { error } })
    if (response.error) {
        return { error: response.error }
    }

    let data = await response.json().catch(error => { return { error } })
    if (data.error) {
        return { error: data.error }
    }
    return data
}

async function taskAssign(userId) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "token": JSON.parse(localStorage.getItem('userInfo')).token
        },
        body: JSON.stringify(userId)
    }

    let response = await fetch(baseUrl + "assignTask", options).catch((error) => { return { error } })
    if (response.error) {
        return { error: response.error }
    }

    let data = await response.json().catch((error) => { return { error } })
    if (data.error) {
        return { error: data.error }
    }
    
    return data
}

async function deleteTask(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': JSON.parse(localStorage.getItem("userInfo")).token
        }
    }

    let res = await fetch(baseUrl + 'deleteTask/' + id, options).catch((error) => { return { error } })
    if (res.error) {
        return { error: res.error }
    }

    let data = await res.json().catch((error) => { return { error } })
    if (data.error) {
        return { error: data.error }
    }

    return data
}

export { taskList, taskDetails, editTask, addTask, deleteTask }