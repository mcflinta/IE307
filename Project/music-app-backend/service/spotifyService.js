const axios = require('axios');
const { Buffer } = require('buffer');

const path = require('path');
const fs = require('fs');

// Hàm tìm bài hát qua Spotify API
// const fetchSongFromSpotify = async (id) => {
//     try {
//         const token = await getAccessToken(); // Lấy Access Token
//         const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return {
//             id: response.data.id,
//             name: response.data.name,
//             artist: response.data.artists.map(artist => artist.name).join(', '),
//             album: response.data.album.name,
//             // preview_url: response.data.preview_url, // URL xem trước bài hát
//             image: response.data.album.images[0]?.url,
//             external_urls: response.data.external_urls.spotify,
//         };
//     } catch (error) {
//         console.error('Error fetching song from Spotify:', error.response?.data || error.message);
//         return null; // Trả về null nếu không tìm thấy bài hát
//     }
// };

const getLocalData = () => {
    const data = fs.readFileSync('/home/flinta/My_work/IE307/Project/music-app-backend/data/tracks.json', 'utf8'); // Đọc file JSON
    return JSON.parse(data); // Chuyển từ chuỗi JSON sang object
};

// Hàm lấy thông tin bài hát từ file JSON
const fetchSongFromSpotify = async (id) => {
    try {
        // Lấy dữ liệu từ file JSON
        const localData = getLocalData();

        // Tìm bài hát theo track_id
        const track = localData.find(song => song.track_id === id);

        if (!track) {
            console.error(`Bài hát với id ${id} không tồn tại.`);
            return null;
        }

        // Trả về thông tin bài hát theo định dạng yêu cầu
        return {
            id: track.track_id, // ID bài hát
            name: track.track_name, // Tên bài hát từ file JSON
            artist: track.artistName, // Tên nghệ sĩ từ file JSON
            album: track.albumName || 'Unknown Album', // Thêm thông tin album nếu có, mặc định là "Unknown Album"
            image: track.image || null, // Nếu JSON không chứa hình ảnh, đặt giá trị mặc định null
            external_urls: `https://open.spotify.com/track/${track.track_id}`, // Đường dẫn tới bài hát trên Spotify
            colorDark: track.colorDark, // Màu tối từ JSON
            colorLight: track.colorLight, // Màu sáng từ JSON
        };
    } catch (error) {
        console.error('Error fetching song from local data:', error.message);
        return null; // Trả về null nếu xảy ra lỗi
    }
};

module.exports = { fetchSongFromSpotify };
