import { useState, useEffect } from "react";

// Components
import CopyText from "../ActiveIcons/CopyText";
import Loading from "../Loading/Loading";

// Hooks
import { useTheme } from '../Hook/ThemeContext'; // Adjust path as needed

// Icons
import ChangeIcon from "../../asset/ChangeIcon";
import Heart from "../../asset/Heart";
import FullHeart from "../../asset/FullHeart";

export default function TextArea({ data, loadingConvert, convertFile }) {
    const { theme } = useTheme();
    const [heartClick, setHeartClick] = useState(false);
    const [text, setText] = useState(null);

    useEffect(() => {
        if (data) {
            setText(data);
        }
    }, [data]);
    
    // Memoize handleChange to prevent it from being recreated on each render
    // const handleChange = useCallback((event) => {
    //     setText(event.target.value);
    // }, []);

    return (
        <div className="w-[600px] h-[calc(100vh-140px)] rounded-[25px] px-[30px] pt-[20px] textBoxColor">
            {loadingConvert
             ? <div className="flex items-center justify-center w-full h-[calc(100vh-220px)] rounded-t-[25px]">
                    <Loading width={"120"} height={"120"} />
                </div>
            :
                <div
                    className="w-full h-[calc(100vh-220px)] font-sans text-[16px] overflow-scroll scrollbar-none placeHolderText textBoxColor"
                    style={{ color: theme === 'light' ? 'var(--black)' : 'var(--white)' }} // Set text color to red
                >
                    {text ? 
                            <span className="w-full h-full">{text}</span>
                        :
                        <span className="placeHolderText">Output text</span>
                    }
                </div>
            }
            <div
                className={`w-full h-[3px] textBoxColor`}
            ></div>
            <div className="relative bottom-0 w-full">
                <div
                    className={` top-0 w-full h-[2px] ${theme === 'light' ? 'bg-[var(--black)]' : 'bg-[var(--white)]'}`}
                >
                </div>
                <div className="flex items-center justify-end w-full pb-[20px] pt-[15px] gap-[20px]">
                    <div className="cursor-pointer" onClick={convertFile}>
                        <ChangeIcon fillColor={theme === 'light' ? 'var(--black)' : 'var(--white)'} width={"24"} height={"24"} />
                    </div>
                    <CopyText text={text} fillColor={theme === 'light' ? 'var(--black)' : 'var(--white)'} />
                    <div onClick={() => {setHeartClick((prev) => !prev)}}>
                        {heartClick ?
                            <FullHeart fillColor={theme === 'light' ? 'var(--black)' : 'var(--white)'} />
                        :
                            <Heart fillColor={theme === 'light' ? 'var(--black)' : 'var(--white)'} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
