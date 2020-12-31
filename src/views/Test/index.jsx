// import React, { useState } from 'react'
// import './index.scss'

// import { useEffect } from 'react';
// import Sneakers from '../../components/Sneakers';
// import Buy from '../../components/Buy';

// function getRandomColor() {
//   const colorlist = ['deeppink', 'green', 'yellow', 'black', 'blue']
//   const randomIndex = Math.trunc(Math.random() * 5) // 5.8 --> 5
//   return colorlist[randomIndex]
// }

// const Test = () => {
//   const initColor = localStorage.getItem('box_color') || 'deeppink';

//   const [color, setColor] = useState(initColor)

//   function handleClick() {
//     //get random color -> setColor
//     const newColor = getRandomColor();
//     setColor(newColor);

//     localStorage.setItem('box_color', newColor)
//   }

//   return (
//     <div className='test'>
//       <div className='example' style={{ backgroundColor: color }} onClick={handleClick}>COLOR KKKK</div>
//       const nameRef = React.useRef();
//   const emailRef = React.useRef();
//   const passwordRef = React.useRef();

//   const handleSubmit = (e) => {
//         e.preventDefault();

//     const name = nameRef.current.value;
//     const email = emailRef.current.value;
//     const password = passwordRef.current.value;

//     console.log(name, email, password);
  
//   };
//   )
// }

// export default Test;