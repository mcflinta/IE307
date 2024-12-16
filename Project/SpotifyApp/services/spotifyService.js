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
    // console.log('Access_token: ', response.data.access_token)
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
  
export const fetchAlbumsByArtistName = async (token, artistName, limit = 1) => {
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
          // offset: 2,
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
          include_groups: 'album,single,playlist', // Bao gồm cả album và single
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
export const fetchPlaylistTracks = async (token, playlistId) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.items.map((item) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists.map((artist) => artist.name).join(', '),
      album: item.track.album.name,
      duration_ms: item.track.duration_ms,
      image: item.track.album.images[0]?.url || 'https://via.placeholder.com/150',
    }));
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
    throw error;
  }
};

export const fetchAlbumDetails = async (token, albumId) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const album = response.data;
    return {
      id: album.id,
      title: album.name,
      image: album.images[0]?.url || 'https://via.placeholder.com/150',
      artists: album.artists.map((artist) => artist.name).join(', '),
      tracks: album.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        duration_ms: track.duration_ms,
      })),
    };
  } catch (error) {
    console.error('Error fetching album details:', error);
    throw error;
  }
};

// export const fetchAlbumTracks = async (token, albumId) => {
//   try {
//     const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Trích xuất các bài hát và thông tin bổ sung từ API
//     const { items: tracks } = response.data.tracks;
//     const { images } = response.data; // Lấy hình ảnh album
//     // console.log('Album tracks:', tracks.artists.m;
//     // console.log('Album artists:', artists);
//     return {
//       tracks: tracks.map((track) => ({
//         id: track.id,
//         title: track.name,
//         preview_url: track.preview_url,
//         artists: track.artists.map(artist => artist.name),
//         artistId: track.artists.map(artist => artist.id),
//       })),
//       images, // Bao gồm hình ảnh album
//     };
//   } catch (error) {
//     console.error(`Error fetching tracks for album with id: ${albumId}`, error);
//     throw error;
//   }
// };


// export const fetchAlbumTracks = async (token, albumId) => {
//   try {
//     // Bước 1: Lấy thông tin album
//     const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const { items: tracks } = albumResponse.data.tracks;
//     const { images: albumImages, artists: albumArtists } = albumResponse.data; // Lấy hình ảnh album và nghệ sĩ album

//     // Bước 2: Trích xuất các ID nghệ sĩ từ album
//     const artistIds = albumArtists.map(artist => artist.id).join(',');

//     // Bước 3: Lấy thông tin các nghệ sĩ, bao gồm hình ảnh
//     const artistsResponse = await axios.get(`https://api.spotify.com/v1/artists`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         ids: artistIds,
//       },
//     });

//     const artistsData = artistsResponse.data.artists;

//     // Bước 4: Trả về dữ liệu bao gồm tracks, hình ảnh album và hình ảnh nghệ sĩ
//     return {
//       tracks: tracks.map((track) => ({
//         id: track.id,
//         title: track.name,
//         preview_url: track.preview_url,
//         artists: track.artists.map(artist => artist.name),
//         artistIds: track.artists.map(artist => artist.id),
//       })),
//       albumImages,
//       artists: artistsData.map(artist => ({
//         id: artist.id,
//         name: artist.name,
//         images: artist.images, // Hình ảnh của nghệ sĩ
//       })),
//     };
//   } catch (error) {
//     console.error(`Error fetching tracks for album with id: ${albumId}`, error);
//     throw error;
//   }
// };



// export const fetchAlbumTracks = async (token, albumId) => {
//   try {
//     // Bước 1: Lấy thông tin album
//     const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const { items: tracks } = albumResponse.data.tracks;
//     const { images: albumImages, artists: albumArtists } = albumResponse.data; // Lấy hình ảnh album và nghệ sĩ album

//     // Bước 2: Trích xuất các ID nghệ sĩ từ album
//     const artistIds = albumArtists.map(artist => artist.id).join(',');

//     // Bước 3: Lấy thông tin các nghệ sĩ, bao gồm hình ảnh
//     const artistsResponse = await axios.get(`https://api.spotify.com/v1/artists`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         ids: artistIds,
//       },
//     });

//     const artistsData = artistsResponse.data.artists;

//     // **Lấy nghệ sĩ duy nhất và url của hình ảnh đầu tiên**
//     const uniqueArtists = Array.from(
//       new Map(
//         artistsData.map((artist) => [artist.id, artist]) // Map với key là id để loại bỏ trùng lặp
//       ).values()
//     );

//     const artistsWithImageUrl = uniqueArtists.map(artist => ({
//       id: artist.id,
//       name: artist.name,
//       imageUrl: artist.images.length > 0 ? artist.images[0].url : null, // Lấy url của hình ảnh đầu tiên nếu tồn tại
//     }));

//     // Bước 4: Trả về dữ liệu bao gồm tracks, hình ảnh album và url của hình ảnh nghệ sĩ
//     return {
//       tracks: tracks.map((track) => ({
//         id: track.id,
//         title: track.name,
//         preview_url: track.preview_url,
//         artists: track.artists.map(artist => artist.name),
//         artistIds: track.artists.map(artist => artist.id),
//       })),
//       albumImages,
//       artists: artistsWithImageUrl,
//     };
//   } catch (error) {
//     console.error(`Error fetching tracks for album with id: ${albumId}`, error);
//     throw error;
//   }
// };

export const fetchAlbumTracks = async (token, albumId) => {
  try {
    // Bước 1: Lấy thông tin album
    const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { items: tracks } = albumResponse.data.tracks;
    const { images: albumImages, artists: albumArtists, release_date } = albumResponse.data;

    // Trích xuất năm phát hành
    const releaseYear = new Date(release_date).getFullYear();

    // Định dạng ngày phát hành đầy đủ
    const fullReleaseDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',  // Định dạng tháng theo chữ
      day: 'numeric', // Ngày
      year: 'numeric' // Năm
    }).format(new Date(release_date));

    // Bước 2: Trích xuất các ID nghệ sĩ từ album
    const artistIds = albumArtists.map(artist => artist.id).join(',');

    // Bước 3: Lấy thông tin các nghệ sĩ, bao gồm hình ảnh
    const artistsResponse = await axios.get(`https://api.spotify.com/v1/artists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ids: artistIds,
      },
    });

    const artistsData = artistsResponse.data.artists;

    // **Lấy nghệ sĩ duy nhất và url của hình ảnh đầu tiên**
    const uniqueArtists = Array.from(
      new Map(
        artistsData.map((artist) => [artist.id, artist]) // Map với key là id để loại bỏ trùng lặp
      ).values()
    );

    const artistsWithImageUrl = uniqueArtists.map(artist => ({
      id: artist.id,
      name: artist.name,
      imageUrl: artist.images.length > 0 ? artist.images[0].url : null, // Lấy url của hình ảnh đầu tiên nếu tồn tại
    }));

    // Tính tổng số lượng track
    const totalTracks = tracks.length;

    // Tính tổng thời gian các track
    const totalDurationMs = tracks.reduce((sum, track) => sum + track.duration_ms, 0);

    // Chuyển đổi thời gian dựa trên điều kiện
    let totalDuration;
    if (totalDurationMs >= 3600000) { // >= 1 giờ
      const hours = Math.floor(totalDurationMs / 3600000);
      const minutes = Math.floor((totalDurationMs % 3600000) / 60000);
      totalDuration = `${hours}h ${minutes}min`;
    } else if (totalDurationMs >= 60000) { // >= 1 phút
      const minutes = Math.floor(totalDurationMs / 60000);
      const seconds = Math.floor((totalDurationMs % 60000) / 1000);
      totalDuration = `${minutes}m ${seconds}sec`;
    } else { // < 1 phút
      const seconds = Math.floor(totalDurationMs / 1000);
      totalDuration = `${seconds}sec`;
    }
    // Bước 4: Trả về dữ liệu bao gồm tracks, hình ảnh album, url của hình ảnh nghệ sĩ, năm phát hành và ngày tháng năm phát hành
    return {
      tracks: tracks.map((track) => ({
        id: track.id,
        title: track.name,
        preview_url: track.preview_url,
        artists: track.artists.map(artist => artist.name),
        artistIds: track.artists.map(artist => artist.id),
        duration_ms: track.duration_ms, // Thêm thời lượng từng track
        albumImages: albumImages?.[0]?.url, // Thêm hình ảnh album
        artistImages: artistsWithImageUrl?.[0].imageUrl,
      })),
      albumImages,
      artists: artistsWithImageUrl,
      releaseYear,       // Thông tin năm phát hành
      fullReleaseDate,   // Ngày tháng năm phát hành định dạng đẹp
      totalTracks,       // Tổng số lượng track
      totalDuration,     // Tổng thời gian định dạng phù hợp
    };
  } catch (error) {
    console.error(`Error fetching tracks for album with id: ${albumId}`, error);
    throw error;
  }
};





// Hàm lấy thông tin nghệ sĩ
export const fetchArtistOverview = async () => {
  try {
    // Lấy Client-Token tự động

    // URL API để lấy thông tin nghệ sĩ
    const url = 'https://api-partner.spotify.com/pathfinder/v1/query';

    // Các tham số truy vấn
    const params = {
      operationName: 'queryArtistOverview',
      variables: JSON.stringify({
        uri: 'spotify:artist:0TnOYISbd1XYRBk9myaseg',
        locale: '',
      }),
      extensions: JSON.stringify({
        persistedQuery: {
          version: 1,
          sha256Hash: '4bc52527bb77a5f8bbb9afe491e9aa725698d29ab73bff58d49169ee29800167',
        },
      }),
    };

    // Header với Client-Token được lấy động
    const headers = {
      'sec-ch-ua-platform': '"Windows"',
      'authorization': `Bearer BQD-NVQuMiRG2Gb4XOng3qhGNHYZ3wZ9Z-mlzKeNhSdkcfLdLUE8CzZOUFFywIJ6fyl0Tcle5JCrX9XbDDvbtHt8D4rJXVh1XgqvDAN9QqJn69PkSJSSaFU6V0OMwq6Nsxi24xVLP8rDdeMDXMHm4OrjSKmX_r2olFQ9T0zH_mKyjOlvcwwuyrrDPQbNlU7J3B91y5mm2PY6DlYLFtLQ-jyBvQF1bqTG9alMAmB6FCNSfp2hNV0igVy_U7iPBv8XEJ5xn2OghBrrh3-uY6L79Wf-Cx5C99YArIFvMdIlgHZoPuUR8Kacy_Bicy6xPjt00ZigpOFe63qTkpJ0-VlI6jz1lH23zzuyhnZD`, // Token của bạn
      'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A_Brand";v="24"',
      'client-token': 'AAB4HQhirfyGT0dPBDohNakVuACbvr9BYOYHWbQNRAtTLz7vmbnnDH0YFtOQLTP6EGqIkTAbTn1NXZeyl74yCDD1oqc9myrDhJiHI+5/uw1+QxLWSEZiRik63kYon1rfdoqDMGBN2ZcJvIjeZWCRkD9680biFdVFDdf/ZyPZytha7Z6sfjWvLBLjrOMiRDpGbBZMiYWzJbQF0d1Aog9JacC8lUJm2Cy+DfmGddTS5gWdLFfRGVuPmWk5Gs4uIVCeUsxNT+wxuM5BqQiLdztL+R4d885Izng3U+LCTdz7qA==', // Token được lấy tự động
      'spotify-app-version': '89600000',
      'sec-ch-ua-mobile': '?0',
      'app-platform': 'WebPlayer',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131 Safari/537.36',
      'accept': 'application/json',
      'content-type': 'application/json;charset=UTF-8',
    };

    // Gửi yêu cầu GET với axios
    const response = await axios.get(url, {
      headers,
      params,
    });

    // Xử lý dữ liệu trả về
    console.log('Dữ liệu trả về:', response.data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error.message);
    throw error;
  }
};
