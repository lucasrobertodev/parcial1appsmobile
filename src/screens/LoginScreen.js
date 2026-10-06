import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const check = async () => {
      const user = await AsyncStorage.getItem('userSession');
      if (user) navigation.replace('Home');
    };
    check();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) return alert('Ingresa usuario y contraseña');

    // 1. Buscamos si existe una cuenta registrada
    const savedData = await AsyncStorage.getItem('registeredUser');

    if (!savedData) {
      return alert('No hay cuentas registradas. Por favor, registrate primero.');
    }

    // 2. Convertimos el texto guardado de vuelta a un objeto JavaScript
    const registeredUser = JSON.parse(savedData);

    // 3. Validamos que coincidan EXACTAMENTE los datos ingresados con los guardados
    if (username === registeredUser.username && password === registeredUser.password) {
      // Login exitoso: creamos la sesión
      await AsyncStorage.setItem('userSession', username);
      navigation.replace('Home');
    } else {
      // Fallo de validación
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      <TextInput
        style={styles.input}
        placeholder="Tu nombre..."
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Tu contraseña..."
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.txt}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnReg} onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.txtReg}>No tengo cuenta - Registrarme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15, color: '#000', backgroundColor: '#fff' },
  btn: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5, alignItems: 'center' },
  txt: { color: '#fff', fontWeight: 'bold' },
  btnReg: { marginTop: 20, alignItems: 'center' },
  txtReg: { color: '#007BFF', fontWeight: 'bold' }
});
