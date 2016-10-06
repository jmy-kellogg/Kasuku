import fetch from 'isomorphic-fetch';

export function addAnswer(answer, fromId){
	return {
		type: 'ADD_ANSWER',
		answer,
		fromId,
	}
}

