import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SQLiteContext } from '../contexts/SQLiteContext';
import { SettingsContext } from '../contexts/SettingsContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const db = useContext(SQLiteContext);
  const isFocused = useIsFocused();
  const { darkMode, fontSize } = useContext(SettingsContext);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // db.withTransactionSync(() => {
    //   // Tạo bảng nếu chưa tồn tại
    //   db.execSync(
    //     `CREATE TABLE IF NOT EXISTS notes (
    //       id INTEGER PRIMARY KEY AUTOINCREMENT,
    //       title TEXT,
    //       content TEXT
    //     );`
    //   );
    // });
    db.execAsync(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT
      );`
    );
    if (isFocused) {
      fetchNotes(); // Lấy dữ liệu khi màn hình được focus
    }
  }, [isFocused]);

  const fetchNotes = () => {
    // db.withTransactionAsync(() => {
    //   db.execAsync(
    //     'SELECT * FROM notes;',
    //     [],
    //     (_, { rows }) => {
    //       setNotes(rows._array); // Cập nhật danh sách ghi chú
    //     },
    //     (_, error) => {
    //       console.error('Error fetching notes:', error);
    //     }
    //   );
    // });
    db.execAsync(
      'SELECT * FROM notes;',
      [],
      (_, { rows }) => {
        setNotes(rows._array); // Cập nhật danh sách ghi chú
      },
      (_, error) => {
        console.error('Error fetching notes:', error);
      }
    );
  };

  const deleteNote = (id) => {
    db.withTransactionAsync((tx) => {
      tx.execAsync(
        'DELETE FROM notes WHERE id = ?;',
        [id],
        () => {
          fetchNotes(); // Cập nhật danh sách sau khi xóa
        },
        (_, error) => {
          console.error('Error deleting note:', error);
        }
      );
    });
  };

  const confirmDelete = (id) => {
    Alert.alert('Xóa ghi chú', 'Bạn có chắc chắn muốn xóa ghi chú này?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Xóa', onPress: () => deleteNote(id) },
    ]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#000' : '#fff',
      padding: 16,
    },
    header: {
      fontSize: fontSize + 4,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
      color: darkMode ? '#fff' : '#000',
    },
    noteItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12,
      backgroundColor: darkMode ? '#333' : '#f9f9f9',
      marginBottom: 8,
      borderRadius: 8,
    },
    noteText: {
      fontSize: fontSize,
      color: darkMode ? '#fff' : '#000',
      maxWidth: '80%',
    },
    addButton: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      backgroundColor: '#2196F3',
      padding: 16,
      borderRadius: 50,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ứng dụng Ghi chú</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteItem}
            onPress={() => navigation.navigate('EditNote', { note: item })}
          >
            <View>
              <Text style={styles.noteText}>{item.title}</Text>
              {item.content ? <Text style={styles.noteText}>{item.content}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => confirmDelete(item.id)}>
              <Icon name="trash" size={fontSize + 4} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNote')}
      >
        <Icon name="add" size={fontSize + 8} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
