import { useEffect, useRef } from "react"




const useOutSideClickModal = ( close:Function, listenCapturing=true) => {
  const ref= useRef()
  useEffect(function () {
    function handleClick(e:Event) {
      
      if(ref.current && !(ref.current as any)?.contains(e.target)){
          
                setTimeout(() => {
                  close()
           
                }, 0);
                
          }
        }
         
        document.addEventListener('click',handleClick,listenCapturing)
        
        return document.removeEventListener('click',handleClick)
    }, [close,ref,listenCapturing])
    return ref
}

export default useOutSideClickModal