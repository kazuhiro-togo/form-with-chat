import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';

const VoiceInput = ({ onVoiceInput }) => {
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null); // 音声認識インスタンスを保持

    // 音声認識の初期化
    const initializeRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('このブラウザでは音声認識がサポートされていません');
            return null;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'ja-JP'; // 日本語に設定
        recognition.interimResults = false; // 確定結果のみを取得
        recognition.maxAlternatives = 1; // 1つの結果のみ
        return recognition;
    };

    const startRecording = () => {
        const recognition = initializeRecognition();
        if (!recognition) return;

        recognitionRef.current = recognition;
        setIsRecording(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript; // 音声認識結果
            onVoiceInput(transcript); // 音声認識結果を親コンポーネントに渡す
        };

        recognition.onerror = (event) => {
            console.error('音声認識エラー:', event.error);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognition.start(); // 音声認識を開始
    };

    const stopRecording = () => {
        const recognition = recognitionRef.current;
        if (recognition) {
            recognition.stop(); // 音声認識を停止
            recognitionRef.current = null;
        }
        setIsRecording(false);
    };

    return (
        <Button
            variant="contained"
            color={isRecording ? 'secondary' : 'default'}
            onMouseDown={startRecording} // ボタンを押したとき録音開始
            onMouseUp={stopRecording} // ボタンを離したとき録音停止
        >
            {isRecording ? '録音中...' : '音声入力'}
        </Button>
    );
};

export default VoiceInput;
