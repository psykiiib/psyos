import { useCallback } from 'react';

export const useSound = () => {
  const playBeep = useCallback((freq = 600, duration = 0.05, type = 'square') => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type; // 'square', 'sine', 'sawtooth', 'triangle'
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // Frequency in Hz

    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // Volume (Keep it low!)
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  }, []);

  const playBoop = () => playBeep(200, 0.1, 'triangle'); // Lower pitch for closing windows
  const playClick = () => playBeep(800, 0.03, 'square'); // High pitch for typing
  const playBoot = () => playBeep(440, 0.5, 'sawtooth'); // Long beep for boot

  return { playClick, playBoop, playBoot };
};