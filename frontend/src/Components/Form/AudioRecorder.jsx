import { useState, useEffect, useRef } from "react";

// Components
import Loading from "../Loading/Loading";

// Icons
import AudioIcon from '../../asset/AudioIcon';
import StopAudioIcon from '../../asset/StopAudioIcon';
// import VoiceIcon from "../../asset/VoiceIcon";
// import ChangeIcon from "../../asset/ChangeIcon";

const UPLOAD_DELAY = 2000; // Simulated upload delay in milliseconds

function AudioRecorder({ setFile, errorConvert, setErrorConvert }) {
  const [statusPage, setStatusPage] = useState('no-file'); // 'no-file', 'recording', 'loading', 'done'
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Handle file upload simulation using useEffect
  useEffect(() => {
    if (audioBlob) {
      const timeoutId = setTimeout(() => {
        setStatusPage('done');
      }, UPLOAD_DELAY);
      // Cleanup timeout if component unmounts or file changes
      return () => clearTimeout(timeoutId);
    }
  }, [audioBlob]);

  useEffect(() => {
    if (audioBlob) {
      console.log("ghghgh" + audioBlob);
      // You might want to do something with audioBlob here, like setting the file
      setFile(audioBlob); // External file setter can stay here or in stopRecording
    }
  }, [audioBlob, setFile]); // This effect runs whenever audioBlob changes
  

  const hasGetUserMedia = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };

  const startRecording = async () => {
    if (!hasGetUserMedia()) {
      setErrorConvert({
        existing: true,
        message: 'Your browser does not support audio recording. Please use a supported browser.'
      });
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      setStatusPage("recording");
      setErrorConvert({
        existing: false
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        setAudioBlob(blob);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
    } 
    catch (err) {
      console.error('Error accessing microphone', err);
      setErrorConvert({
        existing: true,
        message: 'Error accessing microphone: ' + err.message
      });
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setStatusPage('loading');
    setFile(audioBlob); // External file setter
    setErrorConvert({
      existing: false
    });
  };

  // const downloadAudio = () => {
  //   const link = document.createElement('a');
  //   link.href = URL.createObjectURL(audioBlob);
  //   link.setAttribute('download', 'recording.mp3');
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <div className={`flex flex-col items-center justify-center w-[350px] h-[250px] rounded-[25px] ${errorConvert.existing ? "redBgColor" : "elementColor"}`}>

      {(statusPage === 'no-file' || statusPage === "done") && (
          <div
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            onClick={startRecording}
          >
            <AudioIcon fillColor={"var(--white)"} />
          </div>
      )}

      {statusPage === "recording" && (
        <div
          className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
          onClick={stopRecording}
        >
          <StopAudioIcon fillColor={"var(--white)"} />
        </div>
      )}

      {statusPage === "loading" && 
        <div className="flex items-center justify-center w-full h-full">
          <Loading width="80" height="80" />
        </div>
      }

      {/* {statusPage === 'done' && (
        <div>
          <div className="flex flex-col items-center w-full h-fit">
            <VoiceIcon fillColor={"var(--white)"} />
          </div>

          <div className="flex flex-col items-center w-full h-fit my-3">
            <div className="mx-3 cursor-pointer" onClick={downloadAudio}>D</div>
            <audio 
              className=" h-10 elementColor" 
              src={URL.createObjectURL(audioBlob)} controls 
            />
          </div>

          <div className="flex justify-center w-full">
            <div className="w-fit h-fit cursor-pointer" onClick={startRecording}>
              <ChangeIcon fillColor={"var(--white)"} width={"40"} height={"40"} />
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default AudioRecorder;
