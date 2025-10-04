package com.voicesearch;

import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;

public class VoiceModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private SpeechRecognizer speechRecognizer;
    private Intent recognizerIntent;

    public VoiceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "VoiceModule";
    }

    @ReactMethod
    public void startListening() {
        // Always run SpeechRecognizer setup on UI thread
        if (getCurrentActivity() == null) return;

        getCurrentActivity().runOnUiThread(() -> {
            if (speechRecognizer == null) {
                speechRecognizer = SpeechRecognizer.createSpeechRecognizer(reactContext);
                speechRecognizer.setRecognitionListener(new RecognitionListener() {
                    @Override
                    public void onReadyForSpeech(Bundle params) {
                        sendEvent("onSpeechReady", null);
                    }

                    @Override
                    public void onBeginningOfSpeech() {
                        sendEvent("onSpeechStart", null);
                    }

                    @Override
                    public void onRmsChanged(float rmsdB) {
                        // optional: send mic level updates if needed
                    }

                    @Override
                    public void onBufferReceived(byte[] buffer) {}

                    @Override
                    public void onEndOfSpeech() {
                        sendEvent("onSpeechEnd", null);
                    }

                    @Override
                    public void onError(int error) {
                        sendEvent("onSpeechError", "Error code: " + error);
                    }

                    @Override
                    public void onResults(Bundle results) {
                        ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                        if (matches != null && !matches.isEmpty()) {
                            sendEvent("onSpeechResults", matches.get(0));
                        }
                    }

                    @Override
                    public void onPartialResults(Bundle partialResults) {
                        ArrayList<String> partial = partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                        if (partial != null && !partial.isEmpty()) {
                            sendEvent("onSpeechPartial", partial.get(0)); // live transcription 👈
                        }
                    }

                    @Override
                    public void onEvent(int eventType, Bundle params) {}
                });
            }

            recognizerIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            recognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            recognizerIntent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
            recognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-IN"); // or auto-detect

            speechRecognizer.startListening(recognizerIntent);
        });
    }

    @ReactMethod
    public void stopListening() {
        if (getCurrentActivity() == null) return;

        getCurrentActivity().runOnUiThread(() -> {
            if (speechRecognizer != null) {
                speechRecognizer.stopListening();
                speechRecognizer.destroy();
                speechRecognizer = null;
            }
        });
    }

    private void sendEvent(String eventName, String data) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, data);
    }
}
