import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { requestMicrophonePermission } from '../utils/Permission';

const VoiceModule = NativeModules.VoiceModule;
const VoiceEmitter = new NativeEventEmitter(VoiceModule);

export const useVoiceRecognition = () => {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subs = [
      VoiceEmitter.addListener('onSpeechStart', () => setListening(true)),
      VoiceEmitter.addListener('onSpeechPartial', (e) => {
        setText(e)
      }),
      VoiceEmitter.addListener('onSpeechResult', (e) => {
        setListening(false);
        setText(e);
      }),
      VoiceEmitter.addListener('onSpeechError', (e) => {
        setListening(false);
        setError(e.text);
      }),
    ];

    return () => subs.forEach((s) => s.remove());
  }, []);

  const start = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      console.warn("Microphone permission denied");
      return;
    }
    setListening(true);
    VoiceModule.startListening();
  };

  const stop = () => VoiceModule.stopListening();

  return { text, listening, error, start, stop };
};
