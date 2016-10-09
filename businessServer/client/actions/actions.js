import store from '../store'
import fetch from 'isomorphic-fetch'

export function getNodesData(){
    store.dispatch(dispatch => {
        dispatch(gettingNodes())
        return fetch('/api/nodes', {
            method: 'GET'
        })
    })
    .then(res => res.json())
    .then(nodes => {
        console.log(nodes);
        if(!nodes){
            dispatch(errorGetNodes())
        }
        else{
            dispatch(successGetNodes(nodes))
        }
    })
}

export function gettingNodes(){
    return {
        type: 'GETTING_NODES',
        loading: true
    }
}
export function errorGetNodes(){
    return {
        type: 'GETTING_NODES_ERROR',
        loading: false,
        nodes: null
    }
}
export function successGetNodes(nodes){
    return {
        type: 'GETTING_NODES_SUCCESS',
        loading: true,
        nodes
    }
}

export function getConnectionsData(){
    store.dispatch(dispatch => {
        dispatch(gettingConnections())
        return fetch('/api/connections/', {
            method: 'GET'
        })
    })
    .then(res => res.json())
    .then(connections => {
        console.log(connections);
        if(!connections){
            dispatch(errorGetConnections())
        }
        else{
            dispatch(successGetConnections(connections))
        }
    })
}

export function gettingConnections(){
    return {
        type: 'GETTING_CONNECTIONS',
        loading: true
    }
}
export function errorGetConnections(){
    return {
        type: 'GETTING_CONNECTIONS_ERROR',
        loading: false,
        connections: null
    }
}
export function successGetConnections(connections){
    return {
        type: 'GETTING_CONNECTIONS_SUCCESS',
        loading: true,
        connections
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
