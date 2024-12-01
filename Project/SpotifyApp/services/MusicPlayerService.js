// // // services/MusicPlayerService.js
// // import { Audio } from 'expo-av';

// // class MusicPlayerService {
// //   sound = null;
// //   currentSong = null;
// //   isPlaying = false;
// //   status = {
// //     isLoaded: false,
// //     positionMillis: 0,
// //     durationMillis: 1, // Tránh chia cho 0
// //   };

// //   async loadAndPlaySong(song) {
// //     try {
// //       if (this.sound) {
// //         await this.sound.unloadAsync();
// //       }
// //       const { sound, status } = await Audio.Sound.createAsync(
// //         { uri: song.url },
// //         { shouldPlay: true },
// //         this.onPlaybackStatusUpdate
// //       );
// //       this.sound = sound;
// //       this.currentSong = song;
// //       this.isPlaying = true;
// //       this.status = status;
// //     } catch (error) {
// //       console.error('Error loading audio', error);
// //     }
// //   }

// //   async togglePlayPause() {
// //     if (this.sound) {
// //       if (this.isPlaying) {
// //         await this.sound.pauseAsync();
// //       } else {
// //         await this.sound.playAsync();
// //       }
// //       this.isPlaying = !this.isPlaying;
// //     }
// //   }

// //   async seekToPosition(positionMillis) {
// //     if (this.sound && this.status.isLoaded) {
// //       await this.sound.setPositionAsync(positionMillis);
// //     }
// //   }

// //   onPlaybackStatusUpdate = (status) => {
// //     this.status = status;
// //     if (status.didJustFinish) {
// //       this.isPlaying = false;
// //     }
// //   };

// //   getProgress() {
// //     if (this.status.isLoaded) {
// //       return this.status.positionMillis / this.status.durationMillis;
// //     }
// //     return 0;
// //   }
// // }

// // export default new MusicPlayerService();


// // services/MusicPlayerService.js
// import { Audio } from 'expo-av';
// import { EventEmitter } from 'fbemitter';

// class MusicPlayerService {
//   sound = null;
//   currentSong = null;
//   isPlaying = false;
//   status = {
//     isLoaded: false,
//     positionMillis: 0,
//     durationMillis: 1,
//   };

//   // Thêm emitter để phát sự kiện
//   emitter = new EventEmitter();

//   async loadAndPlaySong(song) {
//     try {
//       if (this.sound) {
//         await this.sound.unloadAsync();
//       }
//       const { sound } = await Audio.Sound.createAsync(
//         { uri: song.url },
//         { shouldPlay: true },
//         this.onPlaybackStatusUpdate
//       );
//       this.sound = sound;
//       this.currentSong = song;
//       this.isPlaying = true;

//       // Phát sự kiện khi bài hát thay đổi
//       this.emitter.emit('songChanged', {
//         currentSong: this.currentSong,
//         isPlaying: this.isPlaying,
//         status: this.status,
//       });
//     } catch (error) {
//       console.error('Error loading audio', error);
//     }
//   }

//   async togglePlayPause() {
//     if (this.sound) {
//       if (this.isPlaying) {
//         await this.sound.pauseAsync();
//       } else {
//         await this.sound.playAsync();
//       }
//       this.isPlaying = !this.isPlaying;

//       // Phát sự kiện khi trạng thái phát nhạc thay đổi
//       this.emitter.emit('playbackStatusChanged', {
//         isPlaying: this.isPlaying,
//         status: this.status,
//       });
//     }
//   }

//   async seekToPosition(positionMillis) {
//     if (this.sound && this.status.isLoaded) {
//       await this.sound.setPositionAsync(positionMillis);
//     }
//   }

//   onPlaybackStatusUpdate = (status) => {
//     this.status = status;
//     if (status.didJustFinish) {
//       this.isPlaying = false;
//     }

//     // Phát sự kiện khi trạng thái phát lại cập nhật
//     this.emitter.emit('playbackStatusUpdated', {
//       isPlaying: this.isPlaying,
//       status: this.status,
//     });
//   };

//   getProgress() {
//     if (this.status.isLoaded) {
//       return this.status.positionMillis / this.status.durationMillis;
//     }
//     return 0;
//   }
// }

// export default new MusicPlayerService();


// services/MusicPlayerService.js
import { Audio } from 'expo-av';
import { EventEmitter } from 'fbemitter';

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
        await this.sound.unloadAsync();
      }
      this.playlist = playlist;
      this.currentIndex = index;
      this.currentSong = this.playlist[this.currentIndex];
      console.log(this.currentSong)
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'http://192.168.105.35:3000/music/Lady%20Gaga,%20Bruno%20Mars%20-%20Die%20With%20A%20Smile.mp3' },
        { shouldPlay: true },
        this.onPlaybackStatusUpdate
      );
      this.sound = sound;
      this.isPlaying = true;

      this.emitter.emit('songChanged', {
        currentSong: this.currentSong,
        isPlaying: this.isPlaying,
        status: this.status,
      });
    } catch (error) {
      console.error('Error loading audio', error);
    }
  }

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
