import { useState, useEffect } from 'react';
import { getImage } from '../api/exhibitActions';

const useFetchImage = (filename: string) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            setLoading(true);
            setError(null);
            try {

                const url = await getImage(filename);
                console.log(url);
                setImageUrl(url);
            } catch (error) {
                console.error("Error fetching image:", error);
                setError("Failed to fetch image");
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [filename]);

    return {imageUrl, loading, error};
};

export default useFetchImage;
