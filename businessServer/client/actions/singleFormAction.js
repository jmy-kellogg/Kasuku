//addAnswer
export function addAnswer(answer, fromId){
	return {
		type: 'ADD_ANSWER',
		answer,
		fromId,
	}
}

