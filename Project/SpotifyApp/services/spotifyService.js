// src/services/spotifyService.js
import axios from 'axios';
import { Buffer } from 'buffer';
import { albumIds } from '../data/albumIds'; // Import danh sách ID
const CLIENT_ID = '14831e1b0384405d92ef71456e997218'; // Thay bằng Client ID của bạn
const CLIENT_SECRET = '819383dcb62c4ae09009e2e5186fc7db'; // Thay bằng Client Secret của bạn

export const getAccessToken = async () => {
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

export const fetchNewReleases = async (token, limit = 8) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { limit },
    });

    return response.data.albums.items.map((album) => ({
      id: album.id,
      title: album.name,
      image: album.images[0]?.url || 'https://via.placeholder.com/150',
    }));
  } catch (error) {
    console.error('Error fetching new releases', error);
    throw error;
  }
};


export const fetchAlbumsByIds = async (token) => {
    try {
      // Nếu không có ID nào được chỉ định, trả về rỗng.
      if (!albumIds || albumIds.length === 0) {
        console.warn('No album IDs provided.');
        return [];
      }
  
      // Gọi API với danh sách ID từ file albumIds.js
      const response = await axios.get('https://api.spotify.com/v1/albums', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { ids: albumIds.join(',') }, // Nối các ID thành một chuỗi
      });
  
      // Trích xuất và định dạng dữ liệu
      return response.data.albums.map((album) => ({
        id: album.id,
        title: album.name,
        image: album.images[0]?.url || 'https://via.placeholder.com/150',
      }));
    } catch (error) {
      console.error('Error fetching albums by IDs', error);
      throw error;
    }
};
  
export const fetchAlbumsByArtistName = async (token, artistName, limit = 4) => {
    try {
      // Bước 1: Tìm ID của nghệ sĩ từ tên nghệ sĩ
      const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: artistName,
          type: 'artist',
          limit: 1, // Chỉ lấy nghệ sĩ đầu tiên
        },
      });
  
      const artist = searchResponse.data.artists.items[0];
      if (!artist) {
        console.warn(`Không tìm thấy nghệ sĩ với tên: ${artistName}`);
        return [];
      }
  
      const artistId = artist.id;
  
      // Bước 2: Tìm các album của nghệ sĩ dựa trên ID
      const albumsResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          include_groups: 'album,single', // Bao gồm cả album và single
          limit,
        },
      });
  
      // Bước 3: Trích xuất thông tin album
      return albumsResponse.data.items.map((album) => ({
        id: album.id,
        title: album.name,
        image: album.images[0]?.url || 'https://via.placeholder.com/150',
      }));
    } catch (error) {
      console.error('Error fetching albums by artist name:', error);
      throw error;
    }
};
  
export const fetchAlbumTracks = async (token, albumId) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Trích xuất các bài hát và thông tin bổ sung từ API
    const { items: tracks } = response.data.tracks;
    const { images } = response.data; // Lấy hình ảnh album

    return {
      tracks: tracks.map((track) => ({
        id: track.id,
        title: track.name,
        preview_url: track.preview_url,
        artists: track.artists.map(artist => artist.name),
      })),
      images, // Bao gồm hình ảnh album
    };
  } catch (error) {
    console.error(`Error fetching tracks for album with id: ${albumId}`, error);
    throw error;
  }
};
