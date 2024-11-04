import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';
import RecapButton from './RecapButton';
const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [shares, setShares] = useState(post.shares);
  const [liked, setLiked] = useState(false);
  const [recaps, setRecaps] = useState(post.recap);
  const handleLike = () => {
    setLiked(!liked);
    setLikes(prevLikes => (liked ? prevLikes - 1 : prevLikes + 1));
  };

  const handleComment = () => setComments(prev => prev + 1);
  const handleShare = () => setShares(prev => prev + 1);
  const handleRecap = () => setRecaps(prev => prev + 1);
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
            {post.images && post.images.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
                {post.images.map((image, index) => (
                    <Image key={index} source={image} style={styles.postImage} />
                ))}
                </ScrollView>
            )}
            <View style={styles.interactions}>
                <LikeButton liked={liked} likes={likes} onLike={handleLike} />
                <CommentButton comments={comments} onComment={handleComment} />
                <RecapButton recaps={recaps} onRecap={handleRecap} />
                <ShareButton shares={shares} onShare={handleShare} />
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
    backgroundColor: 'rgb(12, 12, 12)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(243, 245, 247, 0.15)',
  },
  headerPostContainer: { flexDirection: 'row' },
  header: { flexDirection: 'row' },
  infoContainer: { flexDirection: 'column', flex: 1 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: { fontWeight: 'bold', fontSize: 15, color: 'rgb(243, 245, 247)', marginRight: 5 },
  timePost: { fontSize: 15, color: 'rgb(119, 119, 119)' },
  content: { marginBottom: 10, color: 'rgb(243, 245, 247)', fontSize: 15 },
  imageContainer: { flexDirection: 'row', marginBottom: 10 },
  postImage: { width: 245, height: 245, borderRadius: 8, marginRight: 10 },
  interactions: { flexDirection: 'row' },
});

export default Post;
