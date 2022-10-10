import React from 'react'
import '../App.css'

const TableItem = ({ item, fields, index }) => {
  return (
			<tr className="tableRowItems" key={index}>
				{ fields.map((el, fIndex) => (
					<td className="tableCell" key={'ff_' + fIndex}>{item[el.name]}</td>))}
            </tr>
  )
}

export default TableItem
