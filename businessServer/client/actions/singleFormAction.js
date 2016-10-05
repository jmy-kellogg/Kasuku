// /**
//   Action Creators
//   These fire events which the reducer will handle
//   We will later call these functions from inside our component
//   Later these functions get bound to 'dispatch' fires the actual event
//   Right now they just return an object
//   It's a code convention to use all capitals and snake case for the event names
//   We use const to store the name of the event so it is immutable
// */
// //every time you dispatch and action every reducer will run. 

export function addAnswer(answer, fromId){
	return {
		type: 'ADD_ANSWER',
		answer,
		fromId,
	}
}

