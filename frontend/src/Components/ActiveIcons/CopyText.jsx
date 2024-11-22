import { useCallback } from "react";

// Icons
import CopyTextIcon from "../../asset/CopyTextIcon";

export default function CopyText({ text, fillColor }) {

    // Memoize the handleCopy function to avoid re-creating it on every render
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <div>
            <div className="cursor-pointer" onClick={handleCopy}>
                <CopyTextIcon fillColor={fillColor} />
            </div>
        </div>
    );
}
