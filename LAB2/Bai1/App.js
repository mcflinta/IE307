// Mai Quoc Cuong - 21521901
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Post from './components/Post';

const posts = [
  {
    id: 1,
    username: 'World',
    avatar: require('./assets/images/bg_user1.jpg'),
    content: 'Rome, Italy.\nNight in Athens, Greece.',
    images: [
      require('./assets/images/Rome.jpg'),
      require('./assets/images/Night_Athens.jpg')
    ],
    likes: 123,
    comments: 51,
    shares: 45,
    timePost: '2h',
    recap: 10,
  },
  {
    id: 2,
    username: 'T1 LoL',
    avatar: require('./assets/images/bg_user2.jpg'),
    content: "Let's go, T1.🔥",
    images: [
      require('./assets/images/T1_team.jpg'),
    ],
    likes: 1024,
    comments: 512,
    shares: 256,
    timePost: '10h',
    recap: 128,
  },
  {
    id: 3,
    username: 'LoL Esports',
    avatar: require('./assets/images/bg_user3.jpg'),
    content: 'A look into the past.',
    images: [
      require('./assets/images/post3.jpg'),
    ],
    likes: 901,
    comments: 500,
    shares: 499,
    timePost: '30m',
    recap: 300,
  },
];
  // Mai Quoc Cuong - 21521901

const App = () => {
  return (
    <ScrollView style={styles.container}>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'rgb(12, 12, 12)',
  },
});

export default App;
