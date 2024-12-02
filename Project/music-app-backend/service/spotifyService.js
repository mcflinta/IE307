const axios = require('axios');
const { Buffer } = require('buffer');

// Spotify Credentials
const CLIENT_ID = '14831e1b0384405d92ef71456e997218';
const CLIENT_SECRET = '819383dcb62c4ae09009e2e5186fc7db';

// Hàm lấy Access Token từ Spotify
const getAccessToken = async () => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    try {
        const response = await axios.post(
            tokenUrl,
            'grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting Spotify access token:', error);
        throw new Error('Failed to authenticate with Spotify');
    }
};

// Hàm tìm bài hát qua Spotify API
const fetchSongFromSpotify = async (id) => {
    try {
        const token = await getAccessToken(); // Lấy Access Token
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return {
            id: response.data.id,
            name: response.data.name,
            artist: response.data.artists.map(artist => artist.name).join(', '),
            album: response.data.album.name,
            // preview_url: response.data.preview_url, // URL xem trước bài hát
            image: response.data.album.images[0]?.url,
            external_urls: response.data.external_urls.spotify,
        };
    } catch (error) {
        console.error('Error fetching song from Spotify:', error.response?.data || error.message);
        return null; // Trả về null nếu không tìm thấy bài hát
    }
};

module.exports = { fetchSongFromSpotify };
