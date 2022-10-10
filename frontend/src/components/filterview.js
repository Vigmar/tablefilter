import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilters } from '../store/actions/dataAction'
import '../App.css'

// данные для комбобоксов фильтров
const fields_for_filter = [{ name: 'name', title: 'Имя' }, { name: 'amount', title: 'Количество' }, { name: 'distance', title: 'Расстояние' }]
const condition_for_filter = [{ name: 'equal', title: 'Равно' }, { name: 'contain', title: 'Содержит' }, { name: 'more', title: 'Больше' }, { name: 'less', title: 'Меньше' }]

const FilterView = () => {
  const dispatch = useDispatch()

  // локальные переменные для хранения данных фильтра
  const [filterVal, setFilterVal] = useState('')
  const [filterCondition, setFilterCondition] = useState('')
  const [filterField, setFilterField] = useState('')

  function clearFilters () {
    setFilterVal('')
    setFilterCondition('')
    setFilterField('')
    dispatch(setFilters('', '', ''))
  }

  function setFiltersData () {
    dispatch(setFilters(filterField, filterCondition, filterVal))
  }

  return (
        <div className="filter-container">
		<span>Фильтры: </span>
		<select name="field" onChange={(e) => setFilterField(e.target.value)} className="filter-select">
		<option></option>
			{ fields_for_filter.map((item, index) => <option key={index} value={item.name} selected={filterField == item.name}>{item.title}</option>)}
		</select>
		<select name="cond" onChange={(e) => setFilterCondition(e.target.value)} className="filter-select">
		<option></option>
			{ condition_for_filter.map((item, index) => <option key={index} value={item.name} selected={filterCondition == item.name}>{item.title}</option>)}
		</select>
		<input className="filter-input" value={filterVal} onChange={(e) => setFilterVal(e.target.value)}/>
		<button className="filter-button" onClick={setFiltersData}>Фильтровать</button>
		<button className="filter-button" onClick={clearFilters}>Очистить</button>
        </div>
  )
}

export default FilterView
