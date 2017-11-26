import {LOAD_RECIPIENTS,LOAD_CONVERSATIONS} from '../actions/type.js';

const initial = {recipients:[], conversations:[]}


export default function(state = initial, action){
	switch (action.type){
		case LOAD_RECIPIENTS:
			return {...state, recipients : action.recipients};
			break;
		case LOAD_CONVERSATIONS:
			return {...state, conversations : action.conversations};
			break;
		default:
			return state;
	}
}

 