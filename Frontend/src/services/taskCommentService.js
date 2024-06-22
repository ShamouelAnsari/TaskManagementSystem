let baseUrl = "http://localhost:3001/task/comment/"

async function fetchCommentList(taskId) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': JSON.parse(localStorage.getItem('userInfo')).token
        }
    }

    let response = await fetch(baseUrl + taskId, options).catch((error) => { return { error } })
    if (response.error) {
        return { error: response.error }
    }

    let data = await response.json().catch(error => { return { error } })
    if (data.error) {
        return { error: data.error }
    }
    return data.data;
}

async function addComment(taskId, comment) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': JSON.parse(localStorage.getItem('userInfo')).token
        },
        body: JSON.stringify(comment)
    }

    let response = await fetch(baseUrl + taskId, options).catch(error => { return { error } })
    console.log("ADD Coment: ",response);
    if (response.error) {
        return { error: response.error }
    }

    let data = await response.json().catch(error => { return { error } })
    if (data.error) {
        return { error: data.error }
    }
    return data.data

}
export { fetchCommentList, addComment }