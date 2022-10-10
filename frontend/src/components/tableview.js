import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTableData, setPage, setSort } from '../store/actions/dataAction'

// для простоты все стили берем из App.css. Аналогично в компоненте фильтров
import '../App.css'
import TableItem from './tableitem'

// считываем сколько записей на странице, нужно для селектора отображения данных текущей страницы
import { PAGE_ITEM_COUNT } from '../store/types'

const fields_head = [{ name: 'date', title: 'Дата' }, { name: 'name', title: 'Название' }, { name: 'amount', title: 'Количество' }, { name: 'distance', title: 'Расстояние' }]

const TableView = () => {
  const dispatch = useDispatch()
  

  // фильтрация происходит  в redux, уже отфильтрованные данные сначала сортируем, а потом выбираем по индексу те, что относятся к нужной нам странице
  const viewdata = useSelector(state => state.table.filteredData.sort((a, b) => sortFunctiion(a, b, state.table)).filter((item, index) => index >= state.table.pageNumber * PAGE_ITEM_COUNT && index < (state.table.pageNumber + 1) * PAGE_ITEM_COUNT))
  const { pagesCount, pageNumber, loading, error, sortField, sortOrder } = useSelector(state => state.table)

  useEffect(() => {
    dispatch(getTableData())
  }, [dispatch])

  // сортируем данные в селекторе. Т.к. в задаче основной упор на фронтенд, то с бэка приходит весь массив данных, без сортировки и фильтрации
  function sortFunctiion (a, b, state) {
    if ((a[state.sortField] > b[state.sortField] && state.sortOrder == 'asc') || (a[state.sortField] < b[state.sortField] && state.sortOrder != 'asc')) { return 1 } else if (a[state.sortField] == b[state.sortField]) { return 0 } else { return -1 }
  }

  // установить новый номер страницы
  function setPageNum (delta) {
    if (delta > 0 && pageNumber + 1 < pagesCount) { dispatch(setPage(pageNumber + 1)) } else if (delta < 0 && pageNumber > 0) { dispatch(setPage(pageNumber - 1)) }
  }

  // установить порядок сортировки (по возрастанию/убыванию)
  function setSortOrder (name) {
    if (sortField != name) { dispatch(setSort(name, 'asc')) } else if (sortOrder == 'asc') { dispatch(setSort(name, 'desc')) } else { dispatch(setSort(name, 'asc')) }
  }

  // отображаем саму таблицу, при клике на заголовок меняется сортировка
  return (
        <div className="table-container">
		{pagesCount > 0 && <div className="filter-row">
			<button onClick={() => setPageNum(-1)}>Предыдущая</button>
			<div className="page-text">Страница {pageNumber + 1} из {pagesCount}</div>
			<button onClick={() => setPageNum(1)}>Следующая</button>
		</div>}
		{loading
            ? 'Loading...'
            : error
            ? error.message
            : <table className="table">
        <thead className="tableRowHeader">
          <tr>
           { fields_head.map((el, index) => (
			<th className="tableHeader" key={index} onClick={() => setSortOrder(el.name)}>{el.title}
				{sortField == el.name && sortOrder == 'asc' && <i className="arrow down"></i>}
				{sortField == el.name && sortOrder == 'desc' && <i className="arrow up"></i>}
			</th>
           ))}
          </tr>
        </thead>
        <tbody>
          {viewdata.map((el, index) => (
            <TableItem key={index} item = {el} fields = {fields_head} index ={index}/>
          ))}
        </tbody>
		</table>}

        </div>
  )
}

export default TableView
