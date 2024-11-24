import React, { useState, useContext } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SQLiteContext } from '../contexts/SQLiteContext';
import { SettingsContext } from '../contexts/SettingsContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AddNoteScreen({ navigation }) {
  const db = useContext(SQLiteContext);
  const { darkMode, fontSize } = useContext(SettingsContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const saveNote = () => {
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Tiêu đề không được để trống');
      return;
    }
    // console.log('title:', title);/
    // db.withTransactionSync(() => {
    //   console.log('title:', title);
    //   db.runSync(
    //     'INSERT INTO notes (title, content) VALUES (?, ?);',
    //     [title, content],
    //     () => {
    //       navigation.goBack(); // Quay lại màn hình trước
    //     },
    //     (_, error) => {
    //       console.error('Error saving note:', error);
    //     }
    //   );
    // });
    db.execSync(
      'INSERT INTO notes (title, content) VALUES (?, ?);',
      [title, content],
      () => {
        navigation.goBack(); // Quay lại màn hình trước
      },
      (_, error) => {
        console.error('Error saving note:', error);
      }
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000' : '#fff',
      padding: 16,
    },
    input: {
      fontSize: fontSize,
      color: darkMode ? '#fff' : '#000',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 16,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: fontSize,
      color: darkMode ? '#fff' : '#000',
      marginLeft: 8,
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tiêu đề"
        placeholderTextColor={darkMode ? '#777' : '#999'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Nội dung"
        placeholderTextColor={darkMode ? '#777' : '#999'}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveNote}>
          <Icon name="save" size={fontSize} color="#2196F3" />
          
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Icon name="close" size={fontSize} color="red" />
          <Text style={styles.buttonText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
