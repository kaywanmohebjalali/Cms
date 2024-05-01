import { ReactNode, cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import useOutSideClickModal from "@/hooks/useModalHook";

import styled from '@/styles/Modal.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";





// 1
const ModalContext = createContext<null>(null)



// 2
function Modal(prop:{children:ReactNode}) {
  const [openName, setOpenName] = useState("");
  const { children } = prop;
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName } as any}>
      {children}
    </ModalContext.Provider>
  );
}





// 3
function Open(prop:{children:ReactNode, opens:String}) {
  const { children, opens } = prop;
  const { open } = useContext(ModalContext) as any
  return cloneElement(children as any , { onClick: () => open(opens) })
}

const Window = (prop:{children:ReactNode, name:String}) => {
  const { children, name } = prop;
  const { close, openName } = useContext(ModalContext) as any



  const ref=useOutSideClickModal(close) as any


  if (name !== openName) return null;
  return createPortal(
    <div className={`${styled.overlay}`}>
      <div className={`${styled.styledModal}`} ref={ref}>
        <button  className={`${styled.button}`} onClick={close}>
        <FontAwesomeIcon
        icon={faClose}
      />
        </button>

        <div className="">
          {cloneElement(children  as any, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body
  );
};






// 4
Modal.Open = Open;
Modal.Window = Window;

export default Modal;