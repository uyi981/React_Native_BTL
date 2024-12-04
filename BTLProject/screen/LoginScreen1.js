import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, CheckBox, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebaseConfig";


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation(); // Sử dụng hook để lấy đối tượng navigation

  const handleLogin = async(e) => {
    if (!email || !password) {
      Alert.alert("Vui lòng nhập email và mật khẩu.");
    } else {
      // Logic đăng nhập sẽ được thêm vào đây
      Alert.alert('Đăng nhập thành công');
    }

    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Đăng nhập thành công");
      
    } catch (error) {
      console.error(error.message);
      
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập email hoặc số điện thoại"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.optionsContainer}>
        <View style={styles.rememberMeContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
          />
          <Text style={styles.rememberMeText}>Ghi nhớ mật khẩu</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginRedirect} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.loginRedirectText}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 5,
    color: '#333',
  },
  forgotPassword: {
    color: '#1E90FF',
  },
  loginButton: {
    backgroundColor: '#fe2c55',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginRedirectText: {
    color: '#1E90FF',
    fontSize: 14,
  },
});

export default LoginScreen;
