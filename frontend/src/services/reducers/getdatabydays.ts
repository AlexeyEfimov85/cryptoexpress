import { GET_DATA_BY_DAYS, GET_DATA_BY_DAYS_SUCCESS, GET_DATA_BY_DAYS_FAILED } from "../actions/getdatabydays";

type InitialState = {
    dataRequest: boolean;
    dataFailed: boolean;
    data: [];
}

const initialState: InitialState =
{
    dataRequest: false,
    dataFailed: false,
    data: [],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDataByDaysReducer = (state = initialState, action: { type: string; data: any; }) => {
    switch (action.type) {
        case GET_DATA_BY_DAYS: {
            return {
                ...state,
                dataRequest: true,
                dataFailed: false,
            }
        }
        case GET_DATA_BY_DAYS_SUCCESS: {
            return {
                ...state,
                data: action.data,
                dataRequest: false,
            }
        }
        case GET_DATA_BY_DAYS_FAILED: {
            return {
                ...state,
                dataRequest: false,
                dataFailed: true,
            }
        }
        default:
            return state
    }

}