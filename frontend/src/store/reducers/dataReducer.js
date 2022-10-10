import { GET_DATA, DATA_ERROR, SET_FILTERS, SET_PAGE, SET_SORT, PAGE_ITEM_COUNT } from '../types'

const initialState = {
  srcData: [],
  loading: true,
  error: '',
  filteredData: [],
  sortField: 'name',
  sortOrder: 'asc',
  pagesCount: 0,
  pageNumber: 0

}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
	
		console.log(action.payload);
	
      return {
        ...state,
        srcData: action.payload,
        filteredData: action.payload,
        pagesCount: Math.ceil(action.payload.length / PAGE_ITEM_COUNT),
        pageNumber: 0,
        loading: false

      }
    case DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
		srcData: [],
		filteredData: [],
		
      }
    case SET_FILTERS:

      return {
        ...state,
        filteredData: action.payload,
        pagesCount: Math.ceil(action.payload.length / PAGE_ITEM_COUNT),
        pageNumber: 0,
        loading: false
       }
    case SET_PAGE:

      return {
        ...state,
        pageNumber: action.payload
      }
    case SET_SORT:

      return {
        ...state,
        sortOrder: action.payload.order,
        sortField: action.payload.name
      }

    default: return state
  }
}
