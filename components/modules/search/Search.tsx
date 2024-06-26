import React, { useEffect, useRef, useState } from 'react'


import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
config.autoAddCss = false;

const Search = () => {
 
  
  const {query}=useRouter() as any
  const [param, setParam]=useState("")
  const { replace, pathname} = useRouter();



 const searchParams = useSearchParams();

 const params = new URLSearchParams(searchParams);
useEffect(()=>setParam(query?.filter),[])

 function setQueryHandler() {
  if(param.trim().length>0){

    params.set('filter', param);
    replace(`${pathname}?${params.toString()}`);
  }else{
    replace(`${pathname}`);

  }
    
 }


  return (
      <div className='search'>
        <input value={param}  onChange={(e)=>setParam(e.target.value)} className='search-input' type="text" placeholder='جستجو کنید...'/>
          <FontAwesomeIcon onClick={setQueryHandler} className='search-icon'  icon={faSearch} />
    </div>
  )
}

export default Search