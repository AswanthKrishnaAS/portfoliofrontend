import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { useAudio } from '../context/AudioContext';

function LandingPage() {
    const navigate = useNavigate();
    const { setAudioState } = useAudio();

    const handleEnter = () => {
        // Any specific transition logic here
        navigate('/home');
        // Ensure sound is active if desired
        setAudioState(true);
    };

    return (
        <div className="App landing-splash">
            <LoadingScreen onEnter={handleEnter} />
        </div >
    );
}

export default LandingPage;

