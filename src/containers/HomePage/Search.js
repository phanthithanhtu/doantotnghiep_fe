import React from 'react';
import TextField from '@mui/material/TextField'; // Import MUI TextField component
import './Search.css'; // Import your CSS file for styling

const Search = ({ placeholder, onSearch }) => {
  return (
    <div className="search">
      <i className="fas fa-search"></i>
      <TextField
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)} // Call onSearch callback with input value
      />
    </div>
  );
}

export default Search;
