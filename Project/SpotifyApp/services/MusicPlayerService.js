

// services/MusicPlayerService.js
import { Audio } from 'expo-av';
import { EventEmitter } from 'fbemitter';
import { API_BASE_URL } from '../config/config';
class MusicPlayerService {
  sound = null;
  currentSong = null;
  isPlaying = false;
  status = {
    isLoaded: false,
    positionMillis: 0,
    durationMillis: 1,
  };

  emitter = new EventEmitter();

  playlist = []; // Danh sách bài hát
  currentIndex = 0; // Chỉ mục của bài hát hiện tại trong danh sách
  repeatMode = 'off'; // 'off', 'repeat_all', 'repeat_one'
  shuffleMode = false; // true hoặc false
  constructor() {
    this.configureAudioMode();
  }

  async configureAudioMode() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true, // Cho phép phát nhạc trong nền
        playsInSilentModeIOS: true, // Cho phép phát nhạc khi iPhone ở chế độ im lặng
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Lỗi khi cấu hình chế độ âm thanh:', error);
    }
  }


  async loadAndPlaySong(playlist, index = 0) {
    try {
      if (this.sound) {
        await this.sound.unloadAsync(); // Dừng và giải phóng bài hát trước đó
      }

      this.playlist = playlist;
      this.currentIndex = index;
      this.currentSong = this.playlist[this.currentIndex];
      const id = this.currentSong.track_id;

      // Hiển thị trạng thái "Đang tải"
      // console.log('Loading song from server...');
      // console.log("Music Player Service",this.currentSong)
      // Kiểm tra phản hồi từ server trước khi phát nhạc
      const response = await fetch(`${API_BASE_URL}/music/by-id/${id}`);
      if (!response.ok) {
        console.error(`Failed to load song: ${response.status}`);
        throw new Error('Server error or song not found');
      }

      // Nếu server trả về JSON (bài hát chưa được tải), xử lý lỗi
      const contentType = response.headers.get('Content-Type');
      if (contentType.includes('application/json')) {
        const errorData = await response.json();
        console.error('Error from server:', errorData);
        throw new Error(errorData.error || 'Song is not ready');
      }

      // Phát nhạc nếu phản hồi thành công và là file nhạc
      const { sound } = await Audio.Sound.createAsync(
        { uri: `http://192.168.105.35:3000/music/by-id/${id}` },
        { shouldPlay: true },
        this.onPlaybackStatusUpdate
      );
      this.sound = sound;
      this.isPlaying = true;
      // console.log('This current song:', this.currentSong);
      // Phát sự kiện thay đổi bài hát
      this.emitter.emit('songChanged', {
        currentSong: this.currentSong,
        isPlaying: this.isPlaying,
        status: this.status,
      });

      console.log('Song is playing!');
    } catch (error) {
      console.error('Error loading audio', error);
    }
}
// loading = false;
// async loadAndPlaySong(playlist, index = 0) {
//   try {
//       const newSong = playlist[index];
      
//       // Kiểm tra nếu bài hát mới trùng với bài hát hiện tại
//       if (this.currentSong && this.currentSong.id === newSong.id) {
//           console.log('Song is already playing. Restarting...');
//           await this.seekToPosition(0); // Đưa về vị trí bắt đầu
//           await this.sound.playAsync(); // Phát lại bài hát
//           this.isPlaying = true;

//           // Cập nhật trạng thái và phát sự kiện
//           this.emitter.emit('playbackStatusChanged', {
//               isPlaying: this.isPlaying,
//               status: this.status,
//           });

//           return; // Dừng xử lý tiếp
//       }

//       // Nếu bài hát không trùng, phát bài hát mới
//       if (this.sound) {
//           await this.sound.unloadAsync(); // Dừng và giải phóng bài hát trước đó
//       }

//       this.playlist = playlist;
//       this.currentIndex = index;
//       this.currentSong = newSong;
//       const id = this.currentSong.id;

//       console.log('Loading new song from server...');

//       const response = await fetch(`http://149.28.146.58:3000/music/by-id/${id}`);
//       if (!response.ok) {
//           console.error(`Failed to load song: ${response.status}`);
//           throw new Error('Server error or song not found');
//       }

//       const contentType = response.headers.get('Content-Type');
//       if (contentType.includes('application/json')) {
//           const errorData = await response.json();
//           console.error('Error from server:', errorData);
//           throw new Error(errorData.error || 'Song is not ready');
//       }

//       const { sound } = await Audio.Sound.createAsync(
//           { uri: `http://149.28.146.58:3000/music/by-id/${id}` },
//           { shouldPlay: true },
//           this.onPlaybackStatusUpdate
//       );
//       this.sound = sound;
//       this.isPlaying = true;
//       // console.log('This current song:', this.currentSong);
//       this.emitter.emit('songChanged', {
//           currentSong: this.currentSong,
//           isPlaying: this.isPlaying,
//           status: this.status,
//       });

//       console.log('New song is playing!');
//   } catch (error) {
//       console.error('Error loading audio', error);
//   }
// }

// async loadAndPlaySong(playlist, index = 0) {
//     if (this.loading) return; // Ngăn lệnh song song
//     this.loading = true;

//     try {
//         if (this.sound) {
//             await this.sound.unloadAsync();
//         }

//         this.isPlaying = false;

//         this.playlist = playlist;
//         this.currentIndex = index;
//         this.currentSong = this.playlist[this.currentIndex];
//         const id = this.currentSong.id;

//         console.log('Loading song from server...');

//         const response = await fetch(`http://192.168.105.35:3000/music/by-id/${id}`);
//         if (!response.ok) {
//             throw new Error('Server error or song not found');
//         }

//         const contentType = response.headers.get('Content-Type');
//         if (contentType.includes('application/json')) {
//             const errorData = await response.json();
//             throw new Error(errorData.error || 'Song is not ready');
//         }

//         const { sound } = await Audio.Sound.createAsync(
//             { uri: `http://192.168.105.35:3000/music/by-id/${id}` },
//             { shouldPlay: true },
//             this.onPlaybackStatusUpdate
//         );
//         this.sound = sound;
//         this.isPlaying = true;
//         console.log('This current song:', this.currentSong);
//         this.emitter.emit('songChanged', {
//             currentSong: this.currentSong,
//             isPlaying: this.isPlaying,
//             status: this.status,
//         });

//         console.log('Song is playing!');
//     } catch (error) {
//         console.error('Error loading audio', error);
//     } finally {
//         this.loading = false; // Giải phóng cờ
//     }
  // }
  
  async togglePlayPause() {
    if (this.sound) {
      if (this.isPlaying) {
        await this.sound.pauseAsync();
      } else {
        await this.sound.playAsync();
      }
      this.isPlaying = !this.isPlaying;

      this.emitter.emit('playbackStatusChanged', {
        isPlaying: this.isPlaying,
        status: this.status,
      });
    }
  }

  async playNextSong() {
    if (this.playlist.length === 0) return;
    if (this.shuffleMode) {
      this.currentIndex = Math.floor(Math.random() * this.playlist.length);
    } else {
      this.currentIndex += 1;
      if (this.currentIndex >= this.playlist.length) {
        if (this.repeatMode === 'repeat_all') {
          this.currentIndex = 0;
        } else {
          this.currentIndex = this.playlist.length - 1;
          if (this.repeatMode === 'off') {
            await this.stopPlayback();
            return;
          }
        }
      }
    }
    await this.loadAndPlaySong(this.playlist, this.currentIndex);
  }

  async playPreviousSong() {
    if (this.playlist.length === 0) return;
    if (this.shuffleMode) {
      this.currentIndex = Math.floor(Math.random() * this.playlist.length);
    } else {
      this.currentIndex -= 1;
      if (this.currentIndex < 0) {
        if (this.repeatMode === 'repeat_all') {
          this.currentIndex = this.playlist.length - 1;
        } else {
          this.currentIndex = 0;
        }
      }
    }
    await this.loadAndPlaySong(this.playlist, this.currentIndex);
  }

  async stopPlayback() {
    if (this.sound) {
      await this.sound.stopAsync();
      this.isPlaying = false;
      this.emitter.emit('playbackStatusChanged', {
        isPlaying: this.isPlaying,
        status: this.status,
      });
    }
  }

  async stopPlaybackWhenLogout() {
    if (this.sound) {
      await this.sound.stopAsync();
      await this.sound.unloadAsync(); // Giải phóng âm thanh khỏi bộ nhớ
      this.sound = null; // Xóa tham chiếu tới âm thanh
    }
  
    // Reset trạng thái
    this.isPlaying = false;
    this.currentSong = null;
    this.playlist = [];
    this.currentIndex = 0;
  
    // Phát sự kiện cập nhật trạng thái
    this.emitter.emit('playbackStatusChanged', {
      isPlaying: this.isPlaying,
      status: this.status,
    });
  }
  
  async seekToPosition(positionMillis) {
    if (this.sound && this.status.isLoaded) {
      await this.sound.setPositionAsync(positionMillis);
    }
  }

  toggleShuffleMode() {
    this.shuffleMode = !this.shuffleMode;
    this.emitter.emit('shuffleModeChanged', { shuffleMode: this.shuffleMode });
  }

  toggleRepeatMode() {
    if (this.repeatMode === 'off') {
      this.repeatMode = 'repeat_all';
    } else if (this.repeatMode === 'repeat_all') {
      this.repeatMode = 'repeat_one';
    } else if (this.repeatMode === 'repeat_one') {
      this.repeatMode = 'off';
    }
    this.emitter.emit('repeatModeChanged', { repeatMode: this.repeatMode });
  }

  onPlaybackStatusUpdate = async (status) => {
    this.status = status;
    if (status.didJustFinish) {
      if (this.repeatMode === 'repeat_one') {
        // Phát lại bài hát hiện tại
        await this.seekToPosition(0);
        await this.sound.playAsync();
      } else {
        // Chuyển sang bài hát tiếp theo
        await this.playNextSong();
      }
    }

    // Phát sự kiện cập nhật trạng thái phát lại
    this.emitter.emit('playbackStatusUpdated', {
      isPlaying: this.isPlaying,
      status: this.status,
    });
  };

  getProgress() {
    if (this.status.isLoaded) {
      return this.status.positionMillis / this.status.durationMillis;
    }
    return 0;
  }
}

export default new MusicPlayerService();
