import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistroScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = async () => {
    // 1. Validamos que no envíe campos vacíos
    if (!username || !password) return alert('Ingresa un usuario y una contraseña');

    // 2. Creamos un objeto con ambos datos y lo guardamos convertido a texto (JSON)
    const userData = { username: username, password: password };
    await AsyncStorage.setItem('registeredUser', JSON.stringify(userData));

    alert('Cuenta creada exitosamente. Ahora podés iniciar sesión.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nuevo usuario..."
        value={username}
        onChangeText={setUsername}
      />
      {/* secureTextEntry oculta el texto como contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña..."
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.text}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15, color: '#000', backgroundColor: '#fff' },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, alignItems: 'center' },
  text: { color: 'white', fontWeight: 'bold' }
});