import store from '../store'
import fetch from 'isomorphic-fetch'


export default function saveNodeAction(nodeObj){
    if(!nodeObj.question){
        nodeObj.question = "default value";
    }
    store.dispatch(dispatch =>{
        dispatch(postingNode());

        return fetch('/api/nodes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: nodeObj.question,
                productId: nodeObj.productId
            })
        })
        .then(res => res.json())
        .then(item => {
            console.log(item);
            if(!item){
                dispatch(errorPostingNode())
            }
            else{
                dispatch(successPostingNode(item))
            }
        })
    })

}

export function postingNode(){
    return {
        type: "POSTING_NODE",
        posting: true
    }
}

export function errorPostingNode(){
    return {
        type: "POSTING_NODE_ERROR",
        posting: false,
        item: null
    }
}

export function successPostingNode(item){
    return {
        type: "POSTING_NODE_SUCCESS",
        posting: false,
        item: item
    }
}

