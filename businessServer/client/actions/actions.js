import store from '../store';
import fetch from 'isomorphic-fetch';
import axios from 'axios';

export function setSelected(connection, layer){
    return {
        type: 'CHANGE_SELECTED',
        connection,
        layer
    }
}

export function loadNodeConnections(nodes, connections){
    return {
        type: 'LOAD_NODE_CONNECTIONS',
        nodes,
        connections
    }

}

// export function changeSelected(thisId, layer){
//     return {
//         type: 'CHANGE_SELECTED',
//         thisId,
//         layer
//     }

// }

export function setSelectedProduct(product){
    return {
        type: 'SET_SELECTED',
        product
    }
}

export function loadConnections(connections){
    return {
        type: 'LOAD_CONNECTIONS',
        connections
    }
}

export function loadNodes(nodes){
    return {
        type: 'LOAD_NODES',
        nodes
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

export function loadProducts(products){
    return {
        type: 'LOAD_PRODUCTS',
        products
    }
}

export function addProductAction(id, answer, fromId, businessId=null, price=null, description=null, productId) {
    return {
        type: 'ADD_PRODUCT',
        id,
        answer,
        fromId,
        businessId,
        price,
        description,
        productId
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
