import fetch from 'node-fetch';

export async function getCityImages(city) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(city)}`, {
            headers: {
                Authorization: process.env.PEXELS_API_KEY
            }
        });
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
            return data.photos.slice(0, 2).map(photo => photo.src.medium);
        } else {
            console.error(`Error fetching images: ${response.status} ${response.statusText}`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching images for city:", city, error);
        return [];
    }
}
