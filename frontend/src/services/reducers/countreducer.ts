import { INCREASE_COUNT, DECREASE_COUNT } from "../actions/countaction";

type InitialState = {
    count: number;
}

const initialState: InitialState = {
    count: 0
}

export const countReducer = (state = initialState, action: { type: string; count: number; }) => {
    switch (action.type) {
        case INCREASE_COUNT: {
            return {
                ...state,
                count: state.count + 1
            }
        }
        case DECREASE_COUNT: {
            return {
                ...state,
                count: state.count - 1
            }
        }
        default:
            return state
    }
}