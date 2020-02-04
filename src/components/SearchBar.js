import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" 
        value="Alphabetically" 
        checked={props.sortBy === 'Alphabetically' ? true : false} 
        onChange={props.updateSort}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" 
        value="Price" 
        checked={props.sortBy === 'Price' ? true : false} 
        onChange={props.updateSort}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select value={props.filterBy} onChange={props.updateFilter}>
        <option>All</option>
          <option>Tech</option>
          <option>Sportswear</option>
          <option>Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
