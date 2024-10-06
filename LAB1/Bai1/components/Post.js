import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [shares, setShares] = useState(post.shares);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    setComments(comments + 1);
  };

  const handleShare = () => {
    setShares(shares + 1);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={post.avatar} style={styles.avatar} />
        <Text style={styles.username}>{post.username}</Text>
      </View>
      <Text style={styles.content}>{post.content}</Text>
      {post.image && <Image source={post.image} style={styles.postImage} />}
      <View style={styles.interactions}>
        <TouchableOpacity onPress={handleLike} style={styles.button}>
          <Text style={liked ? styles.liked : styles.buttonText}>Likes ({likes})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleComment} style={styles.button}>
          <Text style={styles.buttonText}>Comments ({comments})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.button}>
          <Text style={styles.buttonText}>Shares ({shares})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  content: {
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  liked: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
});

export default Post;