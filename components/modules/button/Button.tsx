import React, { ReactNode } from 'react'


interface typeProps {
    children?: ReactNode;
    width?: String;
    height?: String;
    color?: String;
    backGroundColor?: String;
    boxShadow?: String;

}
const Button = ({ children, width, height, color, backGroundColor, boxShadow }: typeProps) => {
    return (
        <>
            <button>{children} </button>
            <style jsx>{`
      button {
        border:none;
        font-size:1.5rem;
        font-weight: bold;
        padding:1rem 1.3rem;
        width: ${width};
        height: ${height};
        color: ${color};

        background-color: ${backGroundColor};
        box-shadow:${boxShadow};
        @media screen and (max-width:500px) {
          font-size: 1.2rem;
            }

            @media screen and (min-width:1000px) {
          font-size: 1.9rem;
            }
      }
    `}</style>
        </>
    )
}

export default Button