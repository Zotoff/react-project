import React from 'react';

// function Car() {
//     return (
//         <h2>This is car component</h2>
//     )
// }
 
// const car = () => {
//     return (
//         <div>This is car component
//             <strong>Test</strong>
//         </div>

//     )
// }

/* <button onClick={props.onChangeTitle}>Click</button> */

export default props => ( //экспортируем компонент
    <div style={{border: '1px solid #ccc', marginBottom: '10px', padding: '15px', display: 'block'}}>
        <h3 style={{color: '#000'}}>Car name: {props.name}</h3>
        <p>Year: <strong>{props.year}</strong></p>
        <input type='text' onChange={props.onChangeName} value={props.name}/>
        <button onClick={props.onDelete}>Delete</button>
    </div>
)
