// src/spotify.js
import axios from 'axios';
import { Buffer } from 'buffer';

const CLIENT_ID = '14831e1b0384405d92ef71456e997218';
const CLIENT_SECRET = '819383dcb62c4ae09009e2e5186fc7db';

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
    console.error('Error getting access token', error);
    throw error;
  }
};

export const searchArtist = async (query) => {
  const token = await getAccessToken();
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=10`;

  try {
    const response = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.artists.items;
  } catch (error) {
    console.error('Error searching artist', error);
    throw error;
  }
};
