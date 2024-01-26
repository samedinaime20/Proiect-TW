import React from "react";
import "./SearchResultList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultList =({results}) => {
    return( 
        <div className="result-list">
            {results.map((result,id) =>{
                return <SearchResult result={result} key={id}/>
            })}
           
        </div>
    )
}