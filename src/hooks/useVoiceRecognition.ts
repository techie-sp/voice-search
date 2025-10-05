import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { requestMicrophonePermission } from '../utils/Permission';
import { useProductContext } from '../context/ProductContext';
import { ToastService } from '../utils/ToastService';
import { logTranscriptionFailed, logTranscriptionSuccess } from '../utils/analytics/FirebaseAnalytics';

const VoiceModule = NativeModules.VoiceModule;
const VoiceEmitter = new NativeEventEmitter(VoiceModule);

export type VoiceRecognition = { text: string; listening: boolean; error: string | null; start: () => void; stop: () => void, reset: () => void; };

export const useVoiceRecognition = ({ onSpeechResults }: { onSpeechResults?: (query: string) => void }) => {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { searchRef } = useProductContext();

  useEffect(() => {
    const subs = [
      VoiceEmitter.addListener('onSpeechStart', () => setListening(true)),
      VoiceEmitter.addListener('onSpeechPartial', (e) => {
        setText(e)
      }),
      VoiceEmitter.addListener('onSpeechResults', (e) => {
        console.log("Final results: ", e);
        setListening(false);
        setText(e);
        onSpeechResults?.(e);
        // 📊 Analytics logging
        logTranscriptionSuccess(e)
      }),
      VoiceEmitter.addListener('onSpeechError', (e) => {
        ToastService.show(`Voice input timed out. Please try again.`);
        reset()
        setListening(false);
        setError(e.text);
        // 📊 Analytics logging
        logTranscriptionFailed(e)
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
    setListening(true)
    VoiceModule.startListening()
  };

  const stop = () => VoiceModule.stopListening();

  const reset = () => {
    searchRef.current?.reset()
    stop();
    setText('');
    setError(null);
  }

  return { text, listening, error, start, stop, reset } as VoiceRecognition;
};
