import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import './App.scss'
import Menu from './components/Menu'
import Question from './components/Question'

function App() {
    const [currentTopic, setCurrentTopic] = useState(window.localStorage.getItem('currentTopic'))

    useEffect(() => {
        if (currentTopic) window.localStorage.setItem('currentTopic', currentTopic)
        else window.localStorage.removeItem('currentTopic')
    }, [currentTopic])

    return (
        <div
            className="App"
            style={{
                padding:
                    (isMobile && currentTopic) || (!isMobile && !currentTopic)
                        ? '0 30px'
                        : isMobile
                        ? '0 30px'
                        : '0 200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw'
            }}
        >
            {currentTopic && <h2 style={{ textAlign: 'center' }}>{currentTopic}</h2>}
            <div>
                {currentTopic ? (
                    <Question currentTopic={currentTopic} setCurrentTopic={setCurrentTopic} />
                ) : (
                    <Menu setCurrentTopic={setCurrentTopic} />
                )}
            </div>
        </div>
    )
}

export default App
