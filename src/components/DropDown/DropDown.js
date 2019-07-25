import React from 'reactn'
import { isNil } from 'ramda'

const genNumberList = number => {
  let output = []
  for (let i = 1; i <= number; i++) {
    output.push({ value: i, name: i })
  }
  return output
}

// data [{value, name}, ...]
const DropDown = ({ data, numbers, onChange, value }) => {
  const items = isNil(data) ? genNumberList(numbers) : data
  return (
    <div>
      <select value={value} onChange={e=>onChange({value:e.target.value, name:e.target.name})}>
        {!isNil(items) &&
          items.map(item => (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  )
}

export default DropDown
