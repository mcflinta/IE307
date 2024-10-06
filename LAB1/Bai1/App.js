import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Post from './components/Post';

const posts = [
  {
    id: 1,
    username: 'User1',
    avatar: require('./assets/images/monkey.jpg'),
    content: 'This is the first post',
    image: require('./assets/images/monkey.jpg'),
    likes: 10,
    comments: 5,
    shares: 2,
  },
  {
    id: 2,
    username: 'User2',
    avatar: require('./assets/images/monkey.jpg'),
    content: 'This is the second post',
    image: require('./assets/images/monkey.jpg'),
    likes: 20,
    comments: 10,
    shares: 5,
  },
  {
    id: 3,
    username: 'User3',
    avatar: require('./assets/images/monkey.jpg'),
    content: 'This is the third post',
    image: require('./assets/images/monkey.jpg'),
    likes: 30,
    comments: 15,
    shares: 10,
  },
];

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
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default App;