// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, CheckBox, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { signInWithEmailAndPassword } from 'firebase/auth';

// import { doc, getDoc } from 'firebase/firestore';
// import {auth} from "../firebaseConfig";
// import { db } from "../firebaseConfig";
// import ProfileScreen from './ProfileScreen';


// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigation = useNavigation(); // Sử dụng hook để lấy đối tượng navigation
 
//   const handleLogin = async(e) => {
//     if (!email || !password) {
//       Alert.alert("Vui lòng nhập email và mật khẩu.");
//       return;
//     }

//     e.preventDefault();

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Lấy thông tin người dùng từ Firestore
//       const userDocRef = doc(db, "users", user.uid);
//       const userDoc = await getDoc(userDocRef);

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         console.log("Đăng nhập thành công");
//         console.log("Tên người dùng:", userData.name);
//         console.log("URL ảnh đại diện:", userData.photoURL);
//         console.log("Email:", userData.email);
//         console.log("Bio:", userData.bio); 

//         // Điều hướng đến ProfileScreen và truyền thông tin người dùng
//         navigation.navigate('Profile', {
//           userId: user.uid,
//           name: userData.name,
//           bio: userData.bio,
//           photoURL: userData.photoURL,
//         });
//       } else {
//         console.error("Không tìm thấy dữ liệu người dùng!");
//       }

//     } catch (error) {
//       console.error(error.message);
//       Alert.alert('Đăng nhập thất bại', error.message);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Đăng Nhập</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Nhập email hoặc số điện thoại"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
      
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập mật khẩu"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <View style={styles.optionsContainer}>
//         <View style={styles.rememberMeContainer}>
//           <CheckBox
//             value={rememberMe}
//             onValueChange={setRememberMe}
//           />
//           <Text style={styles.rememberMeText}>Ghi nhớ mật khẩu</Text>
//         </View>
//         <TouchableOpacity>
//           <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//         <Text style={styles.loginButtonText}>Đăng nhập</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.loginRedirect} onPress={() => navigation.navigate('SignUp')}>
//         <Text style={styles.loginRedirectText}>Chưa có tài khoản? Đăng ký ngay</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fafafa',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingLeft: 15,
//     borderColor: '#ccc',
//     borderWidth: 1,
//   },
//   optionsContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   rememberMeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rememberMeText: {
//     marginLeft: 5,
//     color: '#333',
//   },
//   forgotPassword: {
//     color: '#1E90FF',
//   },
//   loginButton: {
//     backgroundColor: '#fe2c55',
//     width: '100%',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   loginRedirectText: {
//     color: '#1E90FF',
//     fontSize: 14,
//   },
// });

// export default LoginScreen;

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  CheckBox, 
  StyleSheet, 
  Alert, 
  Modal 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái modal
  const [resetEmail, setResetEmail] = useState(''); // Email để reset mật khẩu
  const navigation = useNavigation();

  const handleLogin = async (e) => {
    if (!email || !password) {
      Alert.alert('Vui lòng nhập email và mật khẩu.');
      return;
    }

    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('Đăng nhập thành công');
        navigation.navigate('Profile', {
          userId: user.uid,
          name: userData.name,
          bio: userData.bio,
          photoURL: userData.photoURL,
        });
      } else {
        console.error('Không tìm thấy dữ liệu người dùng!');
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert('Đăng nhập thất bại', error.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      Alert.alert('Vui lòng nhập email.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert('Thành công', 'Email đặt lại mật khẩu đã được gửi.');
      setModalVisible(false);
    } catch (error) {
      console.error(error.message);
      Alert.alert('Thất bại', 'Không thể gửi email đặt lại mật khẩu.');
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
        
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginRedirect} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.loginRedirectText}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>

      {/* Modal Quên Mật Khẩu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Quên Mật Khẩu</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập email của bạn"
              value={resetEmail}
              onChangeText={setResetEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
              <Text style={styles.resetButtonText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // Các style hiện có
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: '#fe2c55',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalClose: {
    marginTop: 10,
    color: '#1E90FF',
    fontSize: 16,
  },

});

export default LoginScreen;
