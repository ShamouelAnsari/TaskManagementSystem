const baseUrl = "http://localhost:3001/"

async function register(userData) {

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }

    let res = await fetch(baseUrl + 'register', options).catch((error) => { return { error } })
    if (res.error) {
        return { error: res.error }
    }

    let data = await res.json().catch((error) => { return { error } })
    if (data.error) {
        return { error: data.error }
    }

    return { success: true, data: data }

}

async function login(userData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    }

    let res = await fetch(`${baseUrl}login`, options).catch((error) => { return { error } });
    if (res.error) {
        return { error: res.error }
    }

    let data = await res.json().catch((error) => { return { error } })
    if (data.error) {
        return { error: "Invalid username or password." }
    }

    data["token"] = res.headers.get("token")

    return data

}

async function forgetPassword(userData) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }

    let res = await fetch(`${baseUrl}forgetPassword`, options).catch((error) => { return { error } });
    console.log("REs forget : ", res);
    if (res.error) {
        return { error: res.error }
    }

    let data = await res.json().catch((error) => { return { error } })
    console.log("forget data: ", data);
    if (data.error) {
        return { error: data.error }
    }

    return data

}

async function resetPassword(userData) {
    let options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }

    let res = await fetch(`${baseUrl}resetPassword`, options).catch((error) => { return { error } })
    if (res.error) {
        return { error: res.error }
    }

    let data = await res.json().catch((error) => { return { error } })
    if (data.error) {
        return { error: data.error }
    }

    return data;

}

async function changePassword(userData) {
    let options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'token': JSON.parse(localStorage.getItem('userInfo')).token
        },
        body: JSON.stringify(userData)
    }

    let res = await fetch(`${baseUrl}changePassword`, options).catch((error) => { return { error } })
    if (res.error) {
        return { error: res.error }
    }

    let data = await res.json().catch((error) => { return { error } })
    if (data.error) {
        return { error: data.error }
    }

    return data;

}

async function logoutUser(token) {
    let options = {
        method: "PUT",
        headers: {
            "token": token
        }
    }

    let res = await fetch(`${baseUrl}logout`, options).catch((error) => { return { error } });
    if (res.error) {
        return { error: res.error }
    }
    return { success: true }
}

export { login, logoutUser, register, forgetPassword, resetPassword, changePassword }