import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";
import "./SearchBar.css";
export const SearchBar = ({setResults}) => {
    const[input, setInput] = useState("")
    
    const apiUrl = 'https://api.mendeley.com/oauth/token';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(userData => {
    setResults(results);
  })
  .catch(error => {
    console.error('Error:', error);
  });

    return (
<div className="input-wrapper">
<FaSearch id="search-icon"/>
<input placeholder="Type to search..." value={input} onChange={(e)=> setInput(e.target.value)}/>
 </div>
 )
}