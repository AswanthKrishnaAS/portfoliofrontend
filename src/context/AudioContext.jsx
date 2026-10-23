import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllMusic } from '../api/musicapi';
import fallbackMusic from '../assets/image/audio.mp3';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const location = useLocation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackPath, setTrackPath] = useState(null);
    const audioRef = useRef(new Audio());

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Fetch active music track
    useEffect(() => {
        const fetchInitialTrack = async () => {
            try {
                const musicList = await getAllMusic();
                if (musicList && musicList.length > 0) {
                    const activeTrack = musicList[0];
                    setTrackPath(`${API_URL}/${activeTrack.path}`);
                } else {
                    console.log("No tracks found on server, using local fallback music");
                    setTrackPath(fallbackMusic);
                }
            } catch (error) {
                console.error("Failed to load background music, using local fallback music:", error);
                setTrackPath(fallbackMusic);
            }
        };
        fetchInitialTrack();
    }, []);

    // SILENCE IN ADMIN AREA
    useEffect(() => {
        const audio = audioRef.current;
        if (location.pathname.startsWith('/admin')) {
            audio.pause();
            setIsPlaying(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (!trackPath || location.pathname.startsWith('/admin')) return;

        const audio = audioRef.current;
        audio.src = trackPath;
        audio.loop = true;
        audio.volume = 0.7; // Set a default audible volume

        // Safely restore playback position after metadata is loaded
        const handleLoadedMetadata = () => {
            const savedTime = localStorage.getItem('audioTime');
            if (savedTime) {
                try {
                    audio.currentTime = parseFloat(savedTime);
                } catch (e) {
                    console.warn("Could not restore audio currentTime:", e);
                }
            }
        };
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        const playAudio = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.log("Autoplay prevented, waiting for user interaction:", err);
            }
        };

        playAudio();

        const handleInteraction = () => {
            if (audio.paused) {
                audio.play()
                    .then(() => {
                        setIsPlaying(true);
                        console.log("Audio started successfully after interaction");
                    })
                    .catch(e => console.log("Play failed on interaction:", e));
            } else {
                setIsPlaying(true);
            }
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };

        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);

        const timeInterval = setInterval(() => {
            if (!audio.paused) {
                localStorage.setItem('audioTime', audio.currentTime.toString());
            }
        }, 1000);

        return () => {
            clearInterval(timeInterval);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };
    }, [trackPath]);

    const toggleAudio = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch(e => console.log(e));
            setIsPlaying(true);
        }
    };

    const setAudioState = (shouldPlay) => {
        const audio = audioRef.current;
        if (shouldPlay) {
            audio.play().catch(e => console.log(e));
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, toggleAudio, setAudioState }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
