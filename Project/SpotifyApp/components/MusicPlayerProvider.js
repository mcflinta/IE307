// import React, { createContext, useState, useEffect } from 'react';
// import { Audio } from 'expo-av';

// export const MusicPlayerContext = createContext();

// export const MusicPlayerProvider = ({ children }) => {

//   const [songList, setSongList] = useState([
//     {
//       id: '1',
//       title: 'Die With A Smile',
//       artist: 'Lady Gaga, Bruno Mars',
//       url: 'http://192.168.105.35:3000/music/Lady%20Gaga,%20Bruno%20Mars%20-%20Die%20With%20A%20Smile.mp3',
//       image: 'https://i.scdn.co/image/ab67706f000000024bbada5194e822e26b22947d',
//     },
//     {
//       id: '2',
//       title: 'Another Song',
//       artist: 'Artist Name',
//       url: 'http://192.168.105.35:3000/music/another-song.mp3',
//       image: 'https://example.com/another-song.jpg',
//     },
//   ]);
//   const [currentSong, setCurrentSong] = useState(null);
//   const [sound, setSound] = useState(null);
//   const [status, setStatus] = useState({});
//   const [isPlaying, setIsPlaying] = useState(false);
// //   console.log()
//   // Load và phát bài hát
//   useEffect(() => {
//     const configureAudio = async () => {
//       try {
//         await Audio.setAudioModeAsync({
//           staysActiveInBackground: true, // Đảm bảo phát nhạc trong nền
//           // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//           shouldDuckAndroid: true,
//           // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//           playThroughEarpieceAndroid: false,
//         });
//       } catch (error) {
//         console.error('Error setting audio mode:', error);
//       }
//     };
  
//     configureAudio();
//   }, []);
  
//   const loadAndPlaySong = async (song) => {
//     try {
//       // Dừng và xóa bài hát cũ nếu có
//       if (sound) {
//         await sound.unloadAsync();
//         setSound(null);
//       }

//       // Tạo đối tượng âm thanh mới
//       const { sound: newSound } = await Audio.Sound.createAsync(
//         { uri: song.url },
//         { shouldPlay: true },
//         onPlaybackStatusUpdate
//       );
//       setSound(newSound);
//       setCurrentSong(song);
//       setIsPlaying(true);
//     } catch (error) {
//       console.error('Error loading and playing song:', error);
//     }
//   };

//   // Dừng bài hát
//   const stopSong = async () => {
//     if (sound) {
//       await sound.stopAsync();
//       setSound(null);
//     }
//   };

//   // Tạm dừng hoặc phát nhạc
//   const togglePlayPause = async () => {
//     if (sound) {
//       if (isPlaying) {
//         await sound.pauseAsync();
//         setIsPlaying(false);
//       } else {
//         await sound.playAsync();
//         setIsPlaying(true);
//       }
//     }
//   };

//   // Xử lý cập nhật trạng thái khi phát nhạc
//   const onPlaybackStatusUpdate = (playbackStatus) => {
//     setStatus(playbackStatus);
//     if (playbackStatus.didJustFinish) {
//       // Nếu bài hát kết thúc, có thể tự động chuyển bài (nếu muốn)
//       setIsPlaying(false);
//     }
//   };

//   // Seek bài hát
//   const seekToPosition = async (value) => {
//     if (sound && status.isLoaded) {
//       const position = value * status.durationMillis;
//       await sound.setPositionAsync(position);
//     }
//   };

//   return (
//     <MusicPlayerContext.Provider
//       value={{
//         songList,
//         currentSong,
//         status,
//         isPlaying,
//         loadAndPlaySong,
//         stopSong,
//         togglePlayPause,
//         seekToPosition,
//       }}
//     >
//       {children}
//     </MusicPlayerContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Audio } from 'expo-av';

export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [songList, setSongList] = useState([
    {
      id: '1',
      title: 'Die With A Smile',
      artist: 'Lady Gaga, Bruno Mars',
      url: 'http://192.168.105.35:3000/music/Lady%20Gaga,%20Bruno%20Mars%20-%20Die%20With%20A%20Smile.mp3',
      image: 'https://i.scdn.co/image/ab67706f000000024bbada5194e822e26b22947d',
    },
    {
      id: '2',
      title: 'Another Song',
      artist: 'Artist Name',
      url: 'http://192.168.105.35:3000/music/another-song.mp3',
      image: 'https://example.com/another-song.jpg',
    },
  ]);
  const [currentSong, setCurrentSong] = useState(null);
  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.error('Error setting audio mode:', error);
      }
    };
    configureAudio();
  }, []);

  const loadAndPlaySong = useCallback(async (song) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.url },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      setCurrentSong(song);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error loading and playing song:', error);
    }
  }, [sound]);

  const stopSong = useCallback(async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
  }, [sound]);

  const togglePlayPause = useCallback(async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  }, [sound, isPlaying]);

  const seekToPosition = useCallback(async (value) => {
    if (sound && status.isLoaded) {
      const position = value * status.durationMillis;
      await sound.setPositionAsync(position);
    }
  }, [sound, status]);

  const onPlaybackStatusUpdate = useCallback((playbackStatus) => {
    setStatus(playbackStatus);
    if (playbackStatus.didJustFinish) {
      setIsPlaying(false);
    }
  }, []);

  const contextValue = useMemo(() => ({
    songList,
    currentSong,
    status,
    isPlaying,
    loadAndPlaySong,
    stopSong,
    togglePlayPause,
    seekToPosition,
  }), [songList, currentSong, status, isPlaying]);

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
