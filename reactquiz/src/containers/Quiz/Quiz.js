import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.js'

class Quiz extends Component {
	state = {
		// Результаты вычисления
		results: {}, //{[id]: success или error}
		// Проверка, закончен ли опрос
		isFinished: false,
		activeQuestion: 0,
		// Храним информацию о клике пользователя
		answerState: null,
		// Храним вопросы, ответы к голосованию
		quiz: [
			{
				question: 'Какого цвета ваши глаза?',
				rightAnswerId: 2,
				id: 1,
				answers: [
					{text: 'Голубой', id: 1},
					{text: 'Зеленый', id: 2},
					{text: 'Синий', id: 3},
					{text: 'Красный', id: 4}
				]
			},
			{
				question: 'Какого цвета небо?',
				rightAnswerId: 3,
				id: 2,
				answers: [
					{text: 'Голубой', id: 1},
					{text: 'Красный', id: 2},
					{text: 'Оранжевый', id: 3},
					{text: 'Белый', id: 4}
				]
			}
		]
	}

	onAnswerClickHandler = (answerId) => {

		// Запрет на обработку клика до переадресации на другой вопрос
		if(this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0]
			if(this.state.answerState[key] === 'success') {
				return
			}
		}
		const question = this.state.quiz[this.state.activeQuestion]

		// Переменная для обработки результатов
		const results = this.state.results

		// Обработка правильного ответа
		if(question.rightAnswerId === answerId) {

			if(!results[question.id]) {
				results[question.id] = 'success'
			}


			// Для подсветки правильного ответа
			this.setState({
				answerState: {
					[answerId]: 'success',
					results
				}
			})
			const timeOut = window.setTimeout(()=>{
				if(this.isQuizFinished()){
					// Обращаемся к state для законченного опроса
					this.setState({
						isFinished: true
					})
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					})
				}
				window.clearTimeout(timeOut)
			}, 1000)
			
		} else {
			// При неправильном ответе в results пишем error
			results[question.id] = 'error'

			// Обработка неправильного ответа, объект AnswerState
			this.setState({
				answerState: {
					[answerId]: 'error',
					results
				}
			})
		}
		
	}

	// Для проверки, закончены ли вопросы

	isQuizFinished(){
		return this.state.activeQuestion + 1 === this.state.quiz.length
	}

	// Для обработки retry

	retryHandler = () => {
		this.setState({
			activeQuestion: 0,
			answerState: null,
			isFinished: false,
			results: {}
		})
	}

	render(){
		return (
			<div className={classes.Quiz}>
				<div className = {classes.QuizWrapper}>
					<h1>Ответьте на вопросы</h1>

					{
						this.state.isFinished
						? <FinishedQuiz 
							// Передаем результаты
							results={this.state.results}
							quiz={this.state.quiz}
							onRetry={this.retryHandler}
						
							/>
						: <ActiveQuiz
							answers={this.state.quiz[this.state.activeQuestion].answers}
							question={this.state.quiz[this.state.activeQuestion].question}
							onAnswerClick={this.onAnswerClickHandler}
							quizLength={this.state.quiz.length}
							answerNumber={this.state.activeQuestion + 1}
							state={this.state.answerState}
						/>
					}

					
				</div>
			</div>
		)
	}
}
export default Quiz