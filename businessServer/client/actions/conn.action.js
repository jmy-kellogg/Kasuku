import store from '../store'
import fetch from 'isomorphic-fetch'

export default function saveConnAction(connObj){
    store.dispatch(postingConn());
    return fetch('/api/connections/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            answer: nodeObj.question,
            fromId: nodeObj.fromId,
            productId: connObj.productId,
            businessId: connObj.businessId
        })
    })
    .then(res => res.json())
    .then(item => {
        console.log(item);
        if(!item){
            dispatch(errorPostingConn())
        }
        else{
            dispatch(successPostingConn(item))
        }
    })

}

export function postingConn(){
    return {
        type: "POSTING_CONN",
        posting: true
    }
}

export function errorPostingConn(){
    return {
        type: "POSTING_CONN_ERROR",
        posting: false,
        item: null
    }
}

export function successPostingConn(item){
    return {
        type: "POSTING_CONN_SUCCESS",
        posting: false,
        item: item
    }
}
