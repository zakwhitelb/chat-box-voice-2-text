import { useState } from "react";

// Components
import Button from "./Button";
// import FileInput from "./FileInput";
import AudioRecorder from "./AudioRecorder";
import TextArea from "./TextArea";

// Hooks
import { useFileConverter } from "../../application/useFileConverter";

export default function Form() {
    const [file, setFile] = useState(null);
    const { data, errorConvert, setErrorConvert, loadingConvert, convertFile } = useFileConverter();

    // return (
    //     <div className="flex justify-center items-center gap-[80px]">
    //         <div>
    //             <FileInput file={file} setFile={setFile} errorConvert={errorConvert} setErrorConvert={setErrorConvert} />
    //             <div className="mt-[20px]">
    //                 <Button file={file} convertFile={() => convertFile(file)} errorConvert={errorConvert} />
    //             </div>
    //             {errorConvert === "No file provided" && <p className="w-full text-[18px] text-center redText">Please upload a file before converting.</p>}
    //         </div>
    //         <TextArea data={data} loadingConvert={loadingConvert} convertFile={() => convertFile(file)} />
    //     </div>
    // );

    return (
        <div className="flex justify-center items-center gap-[80px]">
            <div>
                <AudioRecorder file={file} setFile={setFile} errorConvert={errorConvert} setErrorConvert={setErrorConvert} />
                <div className="mt-[20px]">
                    <Button file={file} convertFile={() => convertFile(file)} errorConvert={errorConvert} />
                </div>
                {errorConvert.existing && <p className="w-full text-[18px] text-center redText">{errorConvert.message}</p>}
            </div>
            <TextArea data={data} loadingConvert={loadingConvert} convertFile={() => convertFile(file)} />
        </div>
    );
}
