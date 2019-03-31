import React from 'react'
import classes from './FinishedQuiz.css'

const FinishedQuiz = props => {

    // Для подсчета кол-ва ответов. Object.keys - превращает объект в массив ключей объекта
    const successCount = Object.keys(props.results).reduce((total, key)=>{
        // ПОдсчитываем кол-во success и возвращаем его в total
        if(props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
               {props.quiz.map((quizItem, index) => {
                   const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                   ]
                   return (
                       <li 
                        key={index}
                       >
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                       </li>
                   )
               }) }
            </ul>
            <p>Правильно: {successCount} из {props.quiz.length}</p>
            <div>
                <button onClick={props.onRetry}>Повторить</button>
            </div>
        </div>
        
    )
}

export default FinishedQuiz