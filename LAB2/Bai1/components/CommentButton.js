import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CommentButton = ({ comments, onComment }) => (
  <TouchableOpacity onPress={onComment} style={styles.iconButton}>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="transparent" stroke="rgb(204, 204, 204)" strokeWidth="1.25">
      <Path d="M15.376 13.2177L16.2861 16.7955L12.7106 15.8848C12.6781 15.8848 12.6131 15.8848 12.5806 15.8848C11.3779 16.5678 9.94767 16.8931 8.41995 16.7955C4.94194 16.5353 2.08152 13.7381 1.72397 10.2578C1.2689 5.63919 5.13697 1.76863 9.75264 2.22399C13.2307 2.58177 16.0261 5.41151 16.2861 8.92429C16.4161 10.453 16.0586 11.8841 15.376 13.0876C15.376 13.1526 15.376 13.1852 15.376 13.2177Z" />
    </Svg>
    <Text style={styles.buttonText}>{comments}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  iconButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
  },
  buttonText: {
    color: 'rgb(204, 204, 204)',
    fontSize: 12,
  },
});

export default CommentButton;
