import axios from 'axios';

export async function fetchImg(searchValue, page) {
    const searchParams = new URLSearchParams({
        key: '10836129-2832e3ff848e050d6947a018c',
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 12,
        page,
    });
        const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    return images.data;
    
}


