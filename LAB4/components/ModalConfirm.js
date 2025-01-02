import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// 21521901 - Mai Quốc Cường
const ModalConfirm = ({
  visible,
  onClose,
  onConfirm,
  message = 'Are you sure?',
  confirmText = 'Yes',
  cancelText = 'No'
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btn} onPress={onConfirm}>
              <Text style={styles.btnText}>{confirmText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#999' }]}
              onPress={onClose}
            >
              <Text style={styles.btnText}>{cancelText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfirm;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btn: {
    backgroundColor: '#FF6600',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  btnText: {
    color: '#fff',
    fontWeight: '600'
  }
});
