import store from '../store';
import fetch from 'isomorphic-fetch';
import axios from 'axios';

export function setSelectedProduct(product){
    return {
        type: 'SET_SELECTED',
        product
    }
}

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
    console.log("asdfasfasdfads",newNodeId, productId, layer);
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

    // console.log(updatedNode);
    return {
        type: 'SAVE_NODE',
        question,
        thisNodeId
    }
}

export function addNewNode(connId, newNodeId, layer, topLevel=false, productId) {
    return {
        type: 'ADD_NODE',
        connId,
        newNodeId,
        layer,
        topLevel,
        productId
    }
}

export function addProductAction(id) {
    return {
        type: 'ADD_PRODUCT',
        id
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



//-----------------------code below is for saving all data

// export function saveAllData(nodesArr, connectionsArr){
//     store.dispatch(dispatch =>{
//         dispatch(postingNode());

//         return fetch('/api/nodes/all', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(
//             {
//                 nodes: nodesArr
//             }
//             )
//         })
//         .then(res => res.json())
//         .then(item => {
//             console.log(item);
//             if(!item){
//                 dispatch(errorPostingNode())
//             }
//             else{
//                 dispatch(successPostingNode(item))
//             }
//         })
//         .then(item => {
//             dispatch(postingConnection());
//             return fetch('/api/connections/all', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     connections: connectionsArr
//                 })
//             })
//             .then(res => res.json())
//             .then(item => {
//                 if(!item){
//                     dispatch(errorPostingConnection());
//                 }
//                 else{
//                     dispatch(successPostingConnection(item));
//                 }
//             })
//         })
//     })
// }

// export function postingNode(){
//     return {
//         type: "POSTING_NODE",
//         posting: true
//     }

// }
// export function errorPostingNode(){
//     return {
//         type: "POSTING_NODE_ERROR",
//         posting: false,
//         item: null
//     }

// }
// export function successPostingNode(item){
//     return {
//         type: "POSTING_NODE_SUCCESS",
//         posting: false,
//         item: item
//     }

// }
// export function postingConnection(){
//     return {
//         type: "POSTING_CONNECTION",
//         posting: true
//     }

// }
// export function errorPostingConnection(){
//     return {
//         type: "POSTING_CONNECTION_ERROR",
//         posting: false,
//         item: null
//     }

// }
// export function successPostingConnection(item){
//     return {
//         type: "POSTING_CONNECTION_SUCCESS",
//         posting: false,
//         item: item
//     }

// }

//-----------------------code above is for saving all data
