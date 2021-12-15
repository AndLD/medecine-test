import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'

import data from '../assets/data.json'

function shuffle(array: any[]) {
    return array.sort(() => Math.random() - 0.5)
}

export default function Question({ currentTopic, setCurrentTopic }: any) {
    const [currentQuestion, setCurrentQuestion] = useState<number>(
        parseInt(window.localStorage.getItem('currentQuestion') || '0')
    )
    const [currentQuestionBody, setCurrentQuestionBody] = useState(getQuestionByIndex(0))
    const [lineColor, setLineColor] = useState('white')
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const formRef = useRef(null)

    useEffect(() => {
        if (currentQuestion) window.localStorage.setItem('currentQuestion', currentQuestion.toString())
        setCurrentQuestionBody(getQuestionByIndex(currentQuestion))
    }, [currentQuestion])

    function getQuestionByIndex(i: number) {
        return data.find((peace) => peace.topic === currentTopic)?.questions[i]
    }

    function getQuestionsLength() {
        return data.find((peace) => peace.topic === currentTopic)?.questions.length
    }

    function backBtnHandler() {
        setCurrentTopic(null)
        setCurrentQuestion(0)
        window.localStorage.removeItem('currentQuestion')
    }

    return (
        <>
            <h2>
                Вопрос {currentQuestion + 1} / {getQuestionsLength()}
            </h2>
            <div style={{ background: 'white', padding: '15px' }}>
                <h3>{currentQuestionBody?.question}</h3>
                <div style={{ height: 5, background: lineColor, transition: 'all ease 0.3s' }}></div>
                <div style={{ fontSize: 15 }}>
                    <form ref={formRef}>
                        {currentQuestionBody?.answers.map((answer, i) => (
                            <div key={`answer-${i}`}>
                                <input
                                    style={{ margin: 5 }}
                                    name="answer"
                                    type="radio"
                                    onClick={() => {
                                        setNextBtnDisabled(!answer.isCorrect)
                                        setLineColor(answer.isCorrect ? 'lime' : 'red')
                                        // notification[answer.isCorrect ? 'success' : 'error']({
                                        //     duration: 1,
                                        //     type: answer.isCorrect ? 'success' : 'error',
                                        //     message: answer.isCorrect ? 'Правильно!' : 'Неправильно!'
                                        // })
                                    }}
                                />
                                {answer.text}
                            </div>
                        ))}
                    </form>
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button
                    disabled={nextBtnDisabled}
                    size="large"
                    className="menu-btn"
                    type="primary"
                    onClick={() => {
                        ;(formRef.current as any).reset()
                        setLineColor('white')
                        setNextBtnDisabled(true)
                        const questionsLength = getQuestionsLength()
                        if (!questionsLength) return
                        if (currentQuestion + 1 < questionsLength) setCurrentQuestion(currentQuestion + 1)
                        else backBtnHandler()
                    }}
                >
                    Следующий
                </Button>
            </div>
            <Button
                style={{ position: 'absolute', bottom: 0, left: 0, margin: 20 }}
                size="large"
                className="menu-btn"
                onClick={backBtnHandler}
            >
                Назад
            </Button>
        </>
    )
}
