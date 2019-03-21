import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Car from './Car/Car.js';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary.js';
import Counter from './Counter/Counter.js';


class App extends Component {
  //вызываем конструктор для компонента и для корректной работы передаем ему props в аргумент
  constructor(props){
    super(props)
    
    this.state = {
      cars: [
        {name: 'Ford', year: 2018},
        {name: 'Audi', year: 2016},
        {name: 'Mazda', year: 2010}
      ],
      pageTitle: 'React components',
      showCars: false
    }
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


  //первый этап компонента
  componentWillMount(){
    console.log('App mount');
  }

  //второй этап компонента. Этап пред-рендеринга
  componentDidMount() {
    console.log('App componentDidMount');
  }

  //третий этап жизни компонента, render
  render() {
    console.log('App render');
    const divStyle = {
      textAlign: 'center',
      'color': 'red'
    }
  
    return (
      <div className='App' style={divStyle}>
        <h1>{this.props.title}</h1>

        <Counter />
        <hr />

        <button className="toggleBtn" onClick={this.toggleCarsHandler}>Toggle Cars</button>

       <div style={{
         width: 400,
         margin: 'auto',
         paddingTop: '20px'
       }}>
        { this.state.showCars ?
          this.state.cars.map((car, index) => { //index - какой текущий index выводится в массиве
            return (
              <ErrorBoundary key={index}>
              <Car
                name = {car.name}
                index={index}
                year = {car.year}
                onChangeName = {event => this.onChangeName(event.target.value, index)} //передаем значение, лежащее в input и индекс, по которому ищем нужный элемент
                onDelete = {this.deleteHandler.bind(this, index)} //bind контекст и передаем индекс машины, которую надо удалить
              />
              </ErrorBoundary>
            )
          }) : null
        }
      </div>
      </div>
    )
  }
}

export default App;
