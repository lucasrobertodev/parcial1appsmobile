import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ task, onDelete }) => {
  return (
    <View style={styles.container}>
      {/* Agregamos testID="task-text" para que Jest lo encuentre */}
      <Text style={styles.taskText} testID="task-text">{task}</Text>

      {/* Agregamos testID="delete-button" */}
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton} testID="delete-button">
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 5,
    borderRadius: 5,
  },
  taskText: { fontSize: 16 },
  deleteButton: { backgroundColor: '#ff5252', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
  deleteText: { color: 'white', fontWeight: 'bold' }
});

export default TaskItem;
