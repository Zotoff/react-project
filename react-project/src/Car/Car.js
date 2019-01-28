import React from 'react'
import './Car.css'
import Radium from 'radium'


const Car = props => { 
    const inputClasses = ['input']

    if(props.name !== '') {
        inputClasses.push('.green')
    } else {
        inputClasses.push('red')
    }
    
    if(props.name.length > 4) {
        inputClasses.push('bold')
    }

    const style = {
        border: '1px solid grey',
        boxShadow: '1px 2px 10px #000',
        transition: 'all .5s',
        ':hover': {
            border: '1px solid #aaa',
            boxShadow: '0 4px 15px 0 rgba(0, 0, 0, .25)',
            cursor: 'pointer'
        }
    }

    return ( //экспортируем компонент
    <div className="Car" style={style}>
        <h3 style={{color: '#000'}}>Car name: {props.name}</h3>
        <p>Year: <strong>{props.year}</strong></p>
        <input
            type='text' 
            onChange={props.onChangeName} 
            value={props.name}
            className={inputClasses.join(' ')} //соединяем элементы из массива в строку
            />
        <button onClick={props.onDelete}>Delete</button>
    </div>
    )
}

export default Radium(Car)