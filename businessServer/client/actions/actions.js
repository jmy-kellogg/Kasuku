import store from '../store';
import fetch from 'isomorphic-fetch';
import axios from 'axios';

export function setHeadNode(nodeId){
    return {
        type: 'SET_HEADNODE',
        nodeId
    }
}

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

export function addProductAction(id, name, fromId, businessId=null, price=null, description=null) {
    return {
        type: 'ADD_PRODUCT',
        id,
        name,
        fromId,
        businessId,
        price,
        description
    }
}

export function addAnswerAction(connId, answer, fromId, businessId = null, price=null, description=null) {
    console.log(fromId);
    return {
        type: 'ADD_ANSWER',
        connId,
        answer,
        fromId,
        businessId,
        price,
        description
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
export function removeNodesAction(nodesForRemoval){
    return {
        type: 'REMOVE_NODES',
        nodes: nodesForRemoval
    }
}
export function removeConnectionsAction(connsForRemoval){
    return {
        type: 'REMOVE_CONNECTIONS',
        connections: connsForRemoval
    }
}
