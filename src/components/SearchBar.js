import React from 'react';


const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" 
        checked={props.currentSortBy==='Alphabetically'? true : false} name='same-name'
        onChange={(event)=>props.onChangeSortBy(event.target.value)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" 
        checked={props.currentSortBy==='Price'? true : false} name='same-name'
        onChange={(e)=>props.onChangeSortBy(e.target.value)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select value={props.currentFilterBy} onChange={(event)=>props.onChangeFilter(event.target.value)}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
