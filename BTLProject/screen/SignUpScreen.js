import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, CheckBox, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../firebaseConfig";
import {setDoc, doc} from "firebase/firestore";




const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigation = useNavigation(); // Sử dụng hook để lấy đối tượng navigation

  const handleSignUp = async (e) => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
    if (!agreeToTerms) {
      Alert.alert("Bạn cần đồng ý với điều khoản.");
      return;
    }

    e.preventDefault();
    try {
      
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user){
        await setDoc (doc(db, "users", user.uid) , {
          name: name,
          email: email,
          password: password,
        });
      }
      console.log("Đăng ký thành công");
    } catch (error) {
      console.error(error.message);
      
    }


    // Logic đăng ký sẽ được thêm vào đây
    Alert.alert('Đăng ký thành công');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nhập tên"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập email"
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

      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <View style={styles.optionsContainer}>
        <View style={styles.termsContainer}>
          <CheckBox
            value={agreeToTerms}
            onValueChange={setAgreeToTerms}
          />
          <Text style={styles.termsText}>Tôi đồng ý với điều khoản và chính sách bảo mật</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginRedirect} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginRedirectText}>Đã có tài khoản? Đăng nhập ngay</Text>
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
    justifyContent: 'center',
    marginBottom: 20,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#333',
  },
  signUpButton: {
    backgroundColor: '#fe2c55',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginRedirect: {
    marginTop: 10,
  },
  loginRedirectText: {
    color: '#1E90FF',
    fontSize: 14,
  },
});

export default SignUpScreen;
