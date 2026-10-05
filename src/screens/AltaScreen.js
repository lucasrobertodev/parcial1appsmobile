import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { validateTask } from '../utils/validation';

export default function AltaScreen({ navigation }) {
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    // Android nativo exige crear un canal para mostrar notificaciones
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  }, []);

  const handleSave = async () => {
    if (!validateTask(taskText)) return alert('La tarea no puede estar vacía');

    const saved = await AsyncStorage.getItem('tasks');
    const tasks = saved ? JSON.parse(saved) : [];
    tasks.push({ id: Date.now().toString(), text: taskText });
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

    await Notifications.scheduleNotificationAsync({
      content: { title: "Recordatorio", body: `No te olvides de: ${taskText}` },
      trigger: {
        seconds: 3,
        channelId: 'default'
      },
    });

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe la tarea..."
        placeholderTextColor="#666"
        value={taskText}
        onChangeText={setTaskText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.text}>Guardar Tarea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5, borderColor: '#ccc', color: '#000', backgroundColor: '#fff' },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5, alignItems: 'center' },
  text: { color: 'white', fontWeight: 'bold' }
});