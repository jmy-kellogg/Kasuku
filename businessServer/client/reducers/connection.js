function connection(state=[], action){
	switch(action.type){
		case 'ADD_ANSWER':
			var newState = [...state, {
				id: state.length,
				createdAt:"2016-10-05T15:17:30.817Z",
				updatedAt:"2016-10-05T15:17:30.817Z",
				answer: action.answer,
				fromId: action.fromId,
				toId:4,
				businessId:1
			}];
			console.log(newState);
			return newState;
		default: 
			return state
	}
}

export default connection