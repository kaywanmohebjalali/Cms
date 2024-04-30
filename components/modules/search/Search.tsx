import React from 'react'


import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;

const Search = () => {
  return (
      <div className='search'>
        <input className='search-input' type="text" placeholder='جستجو کنید...'/>
          <FontAwesomeIcon className='search-icon'  icon={faSearch} />
    </div>
  )
}

export default Search