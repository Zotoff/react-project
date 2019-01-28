import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Car from './Car/Car.js';


class App extends Component {
  
  state = {
    cars: [
      {name: 'Ford', year: 2018},
      {name: 'Audi', year: 2016},
      {name: 'Mazda', year: 2010}
    ],
    pageTitle: 'React components',
    showCars: false
  }

  onChangeName(name, index){
    const car = this.state.cars[index] //забираем название из массива cars с нужным индексом
    car.name = name //меняем поле name на новое name. При этом напрямую нельзя менять state, надо создавать дубликат массива
    const cars = [...this.state.cars] //разворачиваем массив cars в массиве с помощью spread оператора ES6
    cars[index] = car //элемент будет равняться новой машине
    this.setState({
      cars: cars //ставим костыль для изменения setState не напрямую, а через клонированный массив
    })
  }

  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars
    })
  }

  deleteHandler(index){
    const cars = [...this.state.cars] //опять создаем клон массива
    cars.splice(index, 1) //удаляем 1 'элемент массива с позиции index
    this.setState({cars}) //переопределяем удаленный массив в state
  }

  render() {
    const divStyle = {
      textAlign: 'center',
      'color': 'red'
    }
  
    return (
      <div className='App' style={divStyle}>
        <h1>{this.state.pageTitle}</h1>

        <button onClick={this.toggleCarsHandler}>Toggle Cars</button>

       <div style={{
         width: 400,
         margin: 'auto',
         paddingTop: '20px'
       }}>
        { this.state.showCars ?
          this.state.cars.map((car, index) => { //index - какой текущий index выводится в массиве
            return (
              <Car
                key = {index}
                name = {car.name}
                year = {car.year}
                onChangeName = {event => this.onChangeName(event.target.value, index)} //передаем значение, лежащее в input и индекс, по которому ищем нужный элемент
                onDelete = {this.deleteHandler.bind(this, index)} //bind контекст и передаем индекс машины, которую надо удалить
              />
            )
          }) : null
        }
      </div>
      </div>
    )
  }
}

export default App;
