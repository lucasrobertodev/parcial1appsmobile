import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import TaskItem from '../components/TaskItem';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const listenerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadTasks);

    // Atrapa la notificación en la web para demostrar la funcionalidad (de ejecutarse en navegador)
    listenerRef.current = Notifications.addNotificationReceivedListener(notification => {
      const { title, body } = notification.request.content;
      alert(`🔔 ${title}\n${body}`);
    });

    return () => {
      unsubscribe();
      listenerRef.current?.remove();
    };
  }, [navigation]);

  const loadTasks = async () => {
    const saved = await AsyncStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  };

  const handleDeleteTask = async (id) => {
    const filtered = tasks.filter(t => t.id !== id);
    setTasks(filtered);
    await AsyncStorage.setItem('tasks', JSON.stringify(filtered));
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userSession');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnAdd} onPress={() => navigation.navigate('Alta')}>
        <Text style={styles.txt}>+ Crear Nueva Tarea</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={i => i.id}
        renderItem={({ item }) => <TaskItem task={item.text} onDelete={() => handleDeleteTask(item.id)} />}
      />

      <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
        <Text style={styles.txtLogout}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  btnAdd: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  txt: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  btnLogout: { marginTop: 20, padding: 15, alignItems: 'center' },
  txtLogout: { color: 'red', fontWeight: 'bold' }
});