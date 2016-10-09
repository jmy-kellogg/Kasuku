import store from '../store'
import fetch from 'isomorphic-fetch'

export default function signup(username, email, password, password_confirmation) {
    // console.log("HELLOW", username, email, password, password_confirmation)
    store.dispatch((dispatch) => {

        dispatch(postingUser())

        return fetch('/api/business/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    password_confirmation
                })
            })
            .then(res => res.json())
            .then(function(user) {
                // console.log("this is user", user);
                if (!user) {
                    dispatch(errorSigningUp())
                } else {
                    dispatch(signedup(user))
                }
            })

    })

    // console.log("function inside is getting called");
}


// signup action returns function with dispatch as argument

export function postingUser() {
    // console.log("calling postingUser");
    return {
        type: "POSTING_USER",
        posting: true
    }
}


export function signedup(user) {
    // console.log("calling signed up user")
    return {
        type: "SIGNEDUP_USER",
        posting: false,
        user
    }
}

export function errorSigningUp() {
    // console.log("calling error signing up");
    return {
        type: "SIGNUP_ERROR",
        posting: false,
        user: null
    }
}
