import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

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
      <View style={styles.headerPostContainer}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.timePost}>{post.timePost}</Text>
          </View>
          <Text style={styles.content}>{post.content}</Text>
          {post.image && <Image source={post.image} style={styles.postImage} />}
          <View style={styles.interactions}>
          <TouchableOpacity onPress={handleLike} style={styles.iconButton}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? "red" : "transparent"} stroke={liked ? "rgb(255, 46, 64)": "rgb(204, 204, 204)"} strokeWidth="1.25">
              <Path d="M1.34375 7.53125L1.34375 7.54043C1.34374 8.04211 1.34372 8.76295 1.6611 9.65585C1.9795 10.5516 2.60026 11.5779 3.77681 12.7544C5.59273 14.5704 7.58105 16.0215 8.33387 16.5497C8.73525 16.8313 9.26573 16.8313 9.66705 16.5496C10.4197 16.0213 12.4074 14.5703 14.2232 12.7544C15.3997 11.5779 16.0205 10.5516 16.3389 9.65585C16.6563 8.76296 16.6563 8.04211 16.6562 7.54043V7.53125C16.6562 5.23466 15.0849 3.25 12.6562 3.25C11.5214 3.25 10.6433 3.78244 9.99228 4.45476C9.59009 4.87012 9.26356 5.3491 9 5.81533C8.73645 5.3491 8.40991 4.87012 8.00772 4.45476C7.35672 3.78244 6.47861 3.25 5.34375 3.25C2.9151 3.25 1.34375 5.23466 1.34375 7.53125Z" />
            </Svg>
            <Text style={liked ? styles.liked : styles.buttonText}>({likes})</Text>
      </TouchableOpacity>
            <TouchableOpacity onPress={handleComment} style={styles.button}>
              <Text style={styles.buttonText}>Comments ({comments})</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare} style={styles.button}>
              <Text style={styles.buttonText}>Shares ({shares})</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
      

    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingBottom: 12,
    backgroundColor: 'rgb(24, 24, 24)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(243, 245, 247, 0.15)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerPostContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'column',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'rgb(243, 245, 247)',
    paddingRight:4
  },
  timePost: {
    fontSize: 15,
    color: 'rgb(119, 119, 119)',
  },
  content: {
    marginBottom: 10,
    color: 'rgb(243, 245, 247)',
    fontSize: 15,
  },
  postImage: {
    width:  245,
    height: 245,
    borderRadius: 8,
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