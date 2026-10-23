
import React from 'react';

const SoundControl = ({ isPlaying, toggleAudio }) => {
    return (
        <button
            onClick={toggleAudio}
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                zIndex: 1000,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50px',
                padding: '10px 20px',
                color: 'white',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
        >
            {isPlaying ? (
                <>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#00ff88', borderRadius: '50%' }}></span>
                    SOUND ON
                </>
            ) : (
                <>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#ff4444', borderRadius: '50%' }}></span>
                    SOUND OFF
                </>
            )}
        </button>
    );
};

export default SoundControl;
