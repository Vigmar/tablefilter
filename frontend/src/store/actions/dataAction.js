import { GET_DATA, DATA_ERROR, SET_FILTERS, SET_PAGE, SET_SORT } from '../types'
import axios from 'axios'

// откуда читам данные. бэк простейший, по запросу выдаются все данные
const server_url = 'http://localhost:3030/table'

export const getTableData = () => async dispatch => {
  try {
    const res = await axios.get(server_url)
	
    let data = []
	
	console.log(res.data);
	
	if (res.data.indexOf('<!DOCTYPE html>')<0)
	{
		data = [...res.data];
		
	// преобразуем данные - для даты убираем время, amount и distance приводим к числовому виду
    data = data.map(function (item) {
      const date0 = item.date.split('T')[0]
      const amount = +item.amount
      const distance = +item.distance
      return { date: date0, name: item.name, amount, distance }
    })
	
    dispatch({
         type: GET_DATA,
         payload: data
    })
		
	}
	else 
	{	
	  dispatch({
      type: DATA_ERROR,
      payload: {'message':'offline'},
	  
    })
	}
	
    
  } catch (error) {
    dispatch({
      type: DATA_ERROR,
      payload: error,
	  
    })
  }
}

// установить текущую страницу
export const setPage = (pageNumber) => dispatch => {
  dispatch({ type: SET_PAGE, payload: pageNumber })
}

// установить сортировку (поле, порядок)
export const setSort = (name, order) => dispatch => {
  dispatch({ type: SET_SORT, payload: { name, order } })
}

// устанавливаем фильтры и сортируем. т.к. в теории фильтрация может длится долго - делает это в  action (как обработка бизнес-логики)
export const setFilters = (field, condition, val) => {
  return (dispatch, getState) => {
    let filteredList = [...getState().table.srcData] // Не фильтрованный список

    if (condition && field) {
        filteredList = filteredList.filter(function (item) {
            if (condition == 'equal') { return (item[field] == val) } else if (condition == 'contain') {
                // чтобы коректно обрабатывалось условие "содержит" для чисел, приводим к строке
                const data = '' + item[field]
                return (data.indexOf(val + '') >= 0)
            } else if (condition == 'more') { return (item[field] > val) } else if (condition == 'less') { return (item[field] < val) }
        })
    }

    dispatch({ type: SET_FILTERS, payload: filteredList })
  }
}
