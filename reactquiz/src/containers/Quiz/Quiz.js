import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js'

class Quiz extends Component {
	state = {
		activeQuestion: 0,
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
		console.info('AnswerId: ' + answerId)
		this.setState({
			activeQuestion: this.state.activeQuestion + 1
		})
	}

	render(){
		return (
			<div className={classes.Quiz}>
				<div className = {classes.QuizWrapper}>
					<h1>Ответьте на вопросы</h1>
					<ActiveQuiz
						answers={this.state.quiz[this.state.activeQuestion].answers}
						question={this.state.quiz[this.state.activeQuestion].question}
						onAnswerClick={this.onAnswerClickHandler}
						quizLength={this.state.quiz.length}
						answerNumber={this.state.activeQuestion + 1}
					/>
				</div>
			</div>
		)
	}
}
export default Quiz