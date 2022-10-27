import { ActionType } from '../../types'
import { createData, createLine, increment } from '../utils';

const defaultState = {
    matrix: createData(10, 10),
}; 

const INCREMENT = 'INCREMENT';
const ADD_LINE = 'ADD_LINE';
const REMOVE_LINE ='REMOVE_LINE';

export const reducer = (state = defaultState, action: ActionType) => {
    switch (action.type) {
        case INCREMENT:
            const result = increment(state, action.payload.id);

            return {...result};
        case ADD_LINE:
            const line = createLine(action.payload);
            return { ...state, matrix: [...state.matrix, line] };
        case REMOVE_LINE:
            const firstPart = state.matrix.splice(0, action.payload);
            const secondPart = state.matrix.splice(1);
            const arr = [...firstPart, ...secondPart];

            return { ...state, matrix: [...arr] };
        default:
            return state;
    }
}