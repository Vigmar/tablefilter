import React from 'react'
import TableView from './components/tableview'
import FilterView from './components/filterview'
// разбиваем логику на 2 компонента, в первом фильтры, во втором - отображение таблицы

function App () {
  return (
    <div className="App">
        <FilterView/ >
        <TableView />
    </div>
  )
}

export default App
