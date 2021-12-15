import { Button } from 'antd'
import { isMobile } from 'react-device-detect'

import data from '../assets/data.json'

export default function Menu({ setCurrentTopic }: any) {
    return (
        <div style={{ width: isMobile ? 'auto' : '40%', margin: 'auto', textAlign: 'center' }}>
            {data.map((peace, i) => (
                <Button
                    key={`menu-btn-${i}`}
                    size="large"
                    className="menu-btn"
                    type="primary"
                    onClick={() => {
                        setCurrentTopic(peace.topic)
                    }}
                >
                    {peace.topic}
                </Button>
            ))}
        </div>
    )
}
