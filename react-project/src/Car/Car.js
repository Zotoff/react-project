import React from 'react'
import './Car.css'
import Radium from 'radium'
import PropTypes from 'prop-types'
import withClass from '../hoc/withClass'

class Car extends React.Component {
    componentDidMount() {
        if(this.props.index === 1) {
            this.inputRef.focus()
        }
        
    }

    render() {
   
        const inputClasses = ['input']

        if(this.props.name !== '') {
            inputClasses.push('.green')
        } else {
            inputClasses.push('red')
        }
        
        if(this.props.name.length > 4) {
            inputClasses.push('bold')
        }
    
        return ( //экспортируем компонент
        <React.Fragment>
            <h3 style={{color: '#000'}}>Car name: {this.props.name}</h3>
            <p>Year: <strong>{this.props.year}</strong></p>
            <input
                ref={(inputRef)=>this.inputRef = inputRef}
                type='text' 
                onChange={this.props.onChangeName} 
                value={this.props.name}
                className={inputClasses.join(' ')} //соединяем элементы из массива в строку
                />
            <button onClick={this.props.onDelete}>Delete</button>
        </React.Fragment>
        )
    }
}

Car.propTypes = {
    name: PropTypes.string,
    year: PropTypes.number,
    onChangeName: PropTypes.func,
    onDelete: PropTypes.func,
    index: PropTypes.number
}

export default withClass(Car, 'Car');