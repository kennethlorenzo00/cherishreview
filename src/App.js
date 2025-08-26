import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, Heart, Star, Coffee, Music, Zap, Volume2, VolumeX } from 'lucide-react';
import './App.css';

const App = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('pomodoro'); // pomodoro, shortBreak, longBreak
  const [showSettings, setShowSettings] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [easterEggs, setEasterEggs] = useState({
    clickCount: 0,
    showHearts: false,
    showStars: false,
    showCoffee: false,
    rainbowMode: false,
    konamiCode: false
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [konamiSequence, setKonamiSequence] = useState([]);
  const [showSparkles, setShowSparkles] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');
  
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const startSoundRef = useRef(null);
  const finishSoundRef = useRef(null);

  // Easter egg: Konami code detection
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    const handleKeyDown = (e) => {
      setKonamiSequence(prev => {
        const newSequence = [...prev, e.code];
        if (newSequence.length > konamiCode.length) {
          newSequence.shift();
        }
        
        if (newSequence.join(',') === konamiCode.join(',')) {
          setEasterEggs(prev => ({ ...prev, konamiCode: true }));
          setSecretMessage('🎉 You found the Konami code! 🌟');
          setTimeout(() => setSecretMessage(''), 3000);
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            playNotificationSound();
            // Show completion message
            setSecretMessage(mode === 'pomodoro' ? '🍅 Focus session complete! Great job! 💪' : '☕ Break time is over! Ready to focus? ✨');
            setTimeout(() => setSecretMessage(''), 3000);
            if (mode === 'pomodoro') {
              setCompletedPomodoros(prev => prev + 1);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, mode]);

  const playNotificationSound = () => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create a cute chime sound
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // First note (higher pitch)
      oscillator1.frequency.setValueAtTime(1000, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      
      // Second note (lower pitch)
      oscillator2.frequency.setValueAtTime(800, audioContext.currentTime + 0.1);
      oscillator2.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      
      oscillator1.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 0.3);
      
      oscillator2.start(audioContext.currentTime + 0.1);
      oscillator2.stop(audioContext.currentTime + 0.4);
    } catch (error) {
      console.log('Audio not supported, using fallback');
      if (finishSoundRef.current && soundEnabled) {
        finishSoundRef.current.play();
      }
    }
  };

  const playStartSound = () => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Audio not supported, using fallback');
      if (startSoundRef.current && soundEnabled) {
        startSoundRef.current.play();
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    playStartSound(); // Play start sound
    setEasterEggs(prev => ({ ...prev, clickCount: prev.clickCount + 1 }));
    
    // Easter egg: Click 10 times to trigger hearts
    if (easterEggs.clickCount === 9) {
      setEasterEggs(prev => ({ ...prev, showHearts: true }));
      setTimeout(() => setEasterEggs(prev => ({ ...prev, showHearts: false })), 2000);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(pomodoroTime * 60);
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    
    switch (newMode) {
      case 'pomodoro':
        setTimeLeft(pomodoroTime * 60);
        break;
      case 'shortBreak':
        setTimeLeft(shortBreakTime * 60);
        break;
      case 'longBreak':
        setTimeLeft(longBreakTime * 60);
        break;
      default:
        break;
    }
  };

  const handleEasterEggClick = () => {
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 1000);
    
    // Easter egg: Random cute messages
    const cuteMessages = [
      "go baby! 🌟",
      "focus ka muna! 💪",
      "You've got this! ✨",
      "go go go! 🚀",
      "galing! 🎉",
      "i love you 💫"
    ];
    
    if (Math.random() < 0.15) { // 15% chance
      const randomMessage = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
      setSecretMessage(randomMessage);
      setTimeout(() => setSecretMessage(''), 2500);
    }
  };

  const getProgressPercentage = () => {
    let totalTime;
    switch (mode) {
      case 'pomodoro':
        totalTime = pomodoroTime * 60;
        break;
      case 'shortBreak':
        totalTime = shortBreakTime * 60;
        break;
      case 'longBreak':
        totalTime = longBreakTime * 60;
        break;
      default:
        totalTime = pomodoroTime * 60;
    }
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return (
    <div className={`app ${easterEggs.rainbowMode ? 'rainbow-mode' : ''}`}>
      {/* Start sound - cute bell chime */}
      <audio ref={startSoundRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
      </audio>
      
      {/* Finish sound - gentle notification */}
      <audio ref={finishSoundRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
      </audio>
      
      {/* Easter Egg Sparkles */}
      <AnimatePresence>
        {showSparkles && (
          <motion.div
            className="sparkles"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="sparkle"
                style={{
                  '--angle': `${i * 30}deg`,
                  '--delay': `${i * 0.08}s`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                  rotate: [0, 180, 360],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50]
                }}
                transition={{ duration: 1.5, delay: i * 0.08 }}
              >
                {i % 4 === 0 ? '⭐' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '💫' : '🌟'}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Message */}
      <AnimatePresence>
        {secretMessage && (
          <motion.div
            className="secret-message"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {secretMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        <motion.div
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="title">
            <span className="title-icon">🍅</span>
            Pomodoro
            <span className="title-icon">⏰</span>
          </h1>
          <p className="subtitle">made for cherish! ✨💖</p>
        </motion.div>

        <motion.div
          className="timer-container"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="progress-ring">
            <svg className="progress-svg" width="300" height="300">
              <circle
                className="progress-bg"
                cx="150"
                cy="150"
                r="120"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                className="progress-fill"
                cx="150"
                cy="150"
                r="120"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - getProgressPercentage() / 100)}
                initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - getProgressPercentage() / 100) }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="timer-display">
              <motion.div
                className="time"
                key={timeLeft}
                initial={{ scale: 1.2, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatTime(timeLeft)}
              </motion.div>
              <div className="mode-label">
                {mode === 'pomodoro' && '🍅 Focus Time 💪'}
                {mode === 'shortBreak' && '☕ Short Break 🌸'}
                {mode === 'longBreak' && '🌟 Long Break ✨'}
              </div>
            </div>
          </div>

          <div className="controls">
            <motion.button
              className={`control-btn ${isRunning ? 'pause' : 'play'}`}
              onClick={isRunning ? pauseTimer : startTimer}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={handleEasterEggClick}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
            
            <motion.button
              className="control-btn reset"
              onClick={resetTimer}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={24} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="mode-selector"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            className={`mode-btn ${mode === 'pomodoro' ? 'active' : ''}`}
            onClick={() => switchMode('pomodoro')}
          >
            <span className="mode-icon">🍅</span>
            Pomodoro
          </button>
          <button
            className={`mode-btn ${mode === 'shortBreak' ? 'active' : ''}`}
            onClick={() => switchMode('shortBreak')}
          >
            <span className="mode-icon">☕</span>
            Short Break
          </button>
          <button
            className={`mode-btn ${mode === 'longBreak' ? 'active' : ''}`}
            onClick={() => switchMode('longBreak')}
          >
            <span className="mode-icon">🌟</span>
            Long Break
          </button>
        </motion.div>

        <motion.div
          className="stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <span className="stat-label">Completed:</span>
            <span className="stat-value">{completedPomodoros}</span>
          </div>
        </motion.div>

        <motion.button
          className="settings-btn"
          onClick={() => setShowSettings(!showSettings)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Settings size={20} />
        </motion.button>

        <motion.button
          className="sound-btn"
          onClick={() => setSoundEnabled(!soundEnabled)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.button>

        {/* Settings Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              className="settings-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                className="settings-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3>⚙️ Settings</h3>
                <div className="setting-item">
                  <label>Pomodoro (minutes):</label>
                  <input
                    type="number"
                    value={pomodoroTime}
                    onChange={(e) => setPomodoroTime(parseInt(e.target.value) || 25)}
                    min="1"
                    max="60"
                  />
                </div>
                <div className="setting-item">
                  <label>Short Break (minutes):</label>
                  <input
                    type="number"
                    value={shortBreakTime}
                    onChange={(e) => setShortBreakTime(parseInt(e.target.value) || 5)}
                    min="1"
                    max="30"
                  />
                </div>
                <div className="setting-item">
                  <label>Long Break (minutes):</label>
                  <input
                    type="number"
                    value={longBreakTime}
                    onChange={(e) => setLongBreakTime(parseInt(e.target.value) || 15)}
                    min="1"
                    max="60"
                  />
                </div>
                <button
                  className="close-btn"
                  onClick={() => setShowSettings(false)}
                >
                  ✨ Done
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Easter Egg Elements */}
        <div className="easter-eggs">
          <AnimatePresence>
            {easterEggs.showHearts && (
              <motion.div
                className="floating-hearts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="heart"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                    animate={{
                      y: [-20, -120],
                      opacity: [1, 0],
                      scale: [1, 1.8],
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 2.5, delay: i * 0.08 }}
                  >
                    {i % 3 === 0 ? '💙' : i % 3 === 1 ? '💖' : '💕'}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hidden Easter Egg: Click the title multiple times */}
          <div
            className="hidden-easter-egg"
            onClick={() => {
              setEasterEggs(prev => ({ ...prev, clickCount: prev.clickCount + 1 }));
              if (easterEggs.clickCount >= 20) {
                setEasterEggs(prev => ({ ...prev, rainbowMode: !prev.rainbowMode }));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
