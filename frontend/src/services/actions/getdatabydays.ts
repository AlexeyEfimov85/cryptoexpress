import { AppDispatch } from "../../main";
import { baseUrl, request } from "../../utils/api";
export const GET_DATA_BY_DAYS = 'GET_DATA_BY_DAYS';
export const GET_DATA_BY_DAYS_SUCCESS = 'GET_DATA_BY_DAYS_SUCCESS';
export const GET_DATA_BY_DAYS_FAILED = 'GET_DATA_BY_DAYS_FAILED';

export function getDataByDaysAction() {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_DATA_BY_DAYS,
    });
        // Запрашиваем данные у сервера
        request(`${baseUrl + '/days'}`)
    .then ((data)=> {
        dispatch({
            type: GET_DATA_BY_DAYS_SUCCESS,
            data: data
          })
    })
    .catch( err => {
            // На основание данных в сторе об ошибке можно строить логику открытия дополнительных попапов
            dispatch({
                type: GET_DATA_BY_DAYS_FAILED,
            })
        })
  }
} 