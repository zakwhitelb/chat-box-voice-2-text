import { useState, useMemo, useCallback, useEffect } from "react";

// Components
import Loading from "../Loading/Loading";

// Icons
import AddIcon from "../../asset/AddIcon";
import VoiceIcon from "../../asset/VoiceIcon";
import ChangeIcon from "../../asset/ChangeIcon";

const UPLOAD_DELAY = 2000; // Simulated upload delay in milliseconds
const MAX_FILE_NAME_LENGTH = 20; // Maximum length for truncated file name

export default function FileInput({ file, setFile, errorConvert, setErrorConvert }) {
    const [loading, setLoading] = useState('idle'); // 'idle', 'loading', 'done'
    const [fileName, setFileName] = useState("");  // Original file name

    // Handle file upload simulation using useEffect
    useEffect(() => {
        if (file) {
            const timeoutId = setTimeout(() => {
                setLoading('done');
                setFileName(file.name);
            }, UPLOAD_DELAY);
            // Cleanup timeout if component unmounts or file changes
            return () => clearTimeout(timeoutId);
        } 
        else if(!file) {
            setErrorConvert({
                existing: true,
                message: "NO file provided"
            }); // Capture any file upload error
        }
    }, [file, setErrorConvert]);

    const UploadFile = useCallback(() => {
        document.querySelector("#fileTest").click();
    }, []);

    const handleChange = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading('loading');
            setFile(file);  // External file setter
            setErrorConvert({
                existing: false,
            });  // Clear error
        } 
    }, [setFile, setErrorConvert]);

    const truncateFileName = useMemo(() => {
        if (!fileName) return "";
        const fileExtension = fileName.split('.').pop();
        const baseFileName = fileName.replace(`.${fileExtension}`, '');

        return baseFileName.length > MAX_FILE_NAME_LENGTH
            ? `${baseFileName.substring(0, MAX_FILE_NAME_LENGTH)}...${fileExtension}`
            : fileName;
    }, [fileName]);

    return (
        <div className={`w-[350px] h-[250px] rounded-[25px] ${errorConvert.existing ? "redBgColor" : "elementColor"}`}>
            {loading === 'idle' && (
                <div
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                onClick={UploadFile}
                >
                <AddIcon fillColor={"var(--white)"} />
                </div>
            )}

            {loading === 'loading' ? (
                <div className="flex items-center justify-center w-full h-full">
                    <Loading width="80" height="80" />
                </div>
                
            ) : (truncateFileName && (
                    <div className="flex items-center justify-center w-full h-full">
                        <div className="">
                        <div className="flex flex-col items-center w-full h-fit">
                            <VoiceIcon fillColor={"var(--white)"} />
                        </div>

                        <p className="m-[20px] text-[24px] cursor-default whiteText">
                            {truncateFileName}
                        </p>

                        <div className="flex justify-center w-full">
                            <div className="w-fit h-fit cursor-pointer" onClick={UploadFile}>
                                <ChangeIcon fillColor={"var(--white)"} width={"40"} height={"40"} />
                            </div>
                        </div>
                        </div>
                    </div>
                )
            )}

            <input
                className="hidden file:hidden"
                type="file"
                accept=".mp3, .wav, .aac, .flac, .ogg"
                id="fileTest"
                onChange={handleChange}
            />
        </div>
    );
}
