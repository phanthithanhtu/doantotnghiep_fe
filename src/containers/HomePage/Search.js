import React from 'react';
import './Search.css'; // Import your CSS file for styling

const Search = ({ placeholder, onSearch }) => {
  return (
    <div className="search">
      <i className="fas fa-search"></i>
      <input type="text" placeholder={placeholder} onChange={onSearch} />
    </div>
  );
}

export default Search;
