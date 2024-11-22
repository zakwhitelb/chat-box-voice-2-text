import axios from 'axios';
import { useState, useCallback, useEffect } from "react";

export function useFileConverter() {
    const [data, setData] = useState(null);  // Store the converted file data
    const [errorConvert, setErrorConvert] = useState({existing: false}); // Handle any errors
    const [loadingConvert, setLoadingConvert] = useState(false); // Track conversion state

    useEffect(() => {
        console.log(errorConvert.existing)
        if(errorConvert.existing) setLoadingConvert(false);
    }, [errorConvert])

    // File conversion logic, memoized for performance
    const convertFile = useCallback(async (file) => {
        if(!errorConvert.existing && file){
           
            setLoadingConvert(true); // Set loading state
            
            // Convert File to text format
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:8000/convert', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setData(response.data.message);
                setLoadingConvert(false);
            } catch (error) {
                console.error('Error uploading file:', error);
                setData('Failed to convert the file.');
                setLoadingConvert(false);
            }

        } else {
            setErrorConvert({
                existing: true,
                message: 'No file to convert'
            }); // Handle conversion in progress
        }
    }, [errorConvert]);
    console.log(data)
    // Return state and functions for use in components
    return {
        data,
        errorConvert,
        setErrorConvert,
        loadingConvert,
        convertFile, // Expose the convertFile function to trigger conversion
    };
}
