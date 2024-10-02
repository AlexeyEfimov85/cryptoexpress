import { INCREASE_COUNT, DECREASE_COUNT } from "../actions/countaction";



const initialState = {
    count: []
}

export const countReducer = (state = initialState, action: { type: string; count: number; }) => {
    switch (action.type) {
        case INCREASE_COUNT: {
            return {
                ...state,
                count: [{}, {}, {}]
            }
        }
        case DECREASE_COUNT: {
            return {
                ...state,
                count: [{id: 2, currentRate: '63629.3312', currentDate: '2024-09-25T11:27:58+00:00'}],
            }
        }
        default:
            return state
    }
}