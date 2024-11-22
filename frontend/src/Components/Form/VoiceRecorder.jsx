import React, { useState, useRef } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Check if getUserMedia is available
  const hasGetUserMedia = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };

  // Start recording audio
  const startRecording = async () => {
    if (!hasGetUserMedia()) {
      setErrorMessage('Your browser does not support audio recording. Please use a supported browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunksRef.current = []; // Reset the chunks
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setErrorMessage(''); // Clear any previous errors
    } catch (err) {
      console.error('Error accessing microphone', err);
      setErrorMessage('Error accessing microphone: ' + err.message);
    }
  };

  // Stop recording audio
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  // Download audio file
  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = audioURL;
    link.setAttribute('download', 'recording.mp3');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>Audio Recorder</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {audioURL && (
        <div>
          <audio src={audioURL} controls />
          <button onClick={downloadAudio}>Download Audio</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
