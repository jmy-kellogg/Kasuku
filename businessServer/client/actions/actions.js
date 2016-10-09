import store from '../store'
import fetch from 'isomorphic-fetch'


export function saveNodeAction(nodeObj){
    if(!nodeObj.question){
        nodeObj.question = "default value";
    }
    store.dispatch(postingNode());
    return fetch('/api/nodes/', {
        method: 'POST',
        header: {
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

}
export function saveConnAction(connObj){
    store.dispatch(postingConn());
    return fetch('/api/connections/', {
        method: 'POST',
        header: {
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

export function addTopLayerNodeAction(newNodeId, productId, layer){
  return {
    type: 'ADD_TOP_LAYER_NODE',
    newNodeId,
    layer,
    productId,
    topLevel: true
  }
}

export function changeSelected(thisId, layer){
    console.log(thisId, layer);
    return {
        type: 'CHANGE_SELECTED',
        thisId,
        layer
    }
}

export function saveNode(question, thisNodeId){
  return {
    type: 'SAVE_NODE',
    question,
    thisNodeId
  }

}

export function addNewNode(connId, newNodeId, layer) {
    return {
        type: 'ADD_NODE',
        connId,
        newNodeId,
        layer
    }
}

export function addProductAction(name, productId) {
    return {
        type: 'ADD_PRODUCT',
        name,
        productId
    }
}

export function addAnswerAction(answer, fromId, businessId = null, connId) {
    console.log(fromId);
    return {
        type: 'ADD_ANSWER',
        connId,
        answer,
        fromId,
        businessId
    }
}

export function getNodesAction(id) {
    return {
        type: 'GET_NODE',
        id
    }
}

export function setBusinessAction(buisness) {
    return {
        type: 'SET_BUSINESS',
        businessName: buisness.businessName,
        createdAt: buisness.createdAt,
        headNodeId: buisness.headNodeId,
        id: buisness.id,
        updatedAt: buisness.updatedAt
    }
}
// export function requestNode(id) {
//   return {
//     type: 'REQUEST_NODE',
//     id
//   }
// }

// export function receiveNode(id, node) {
//   return {
//     type: "RECEIVE_NODE",
//     id,
//     node
//   }
// }

// signup user actions
// export function signup(username, email, password, password_confirmation) {
//   return {
//     type: "SIGNUP_USER",
//     username,
//     email,
//     password,
//     password_confirmation
