import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {db} from '../firebaseConfig';
import { doc, updateDoc } from "firebase/firestore"; // Import các hàm cần thiết
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker từ expo-image-picker

function EditProfileScreen({ navigation , route}) {
  
  const { name, bio, photoURL, userId } = route.params; // Thêm userId để lưu dữ liệu đúng user

  const [editname, setname] = useState(name);
  const [editBio, setBio] = useState(bio);
  const [editphotoURL, setphotoURL] = useState(photoURL);
  console.log("Received userID:", userId);


  
  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    // Yêu cầu quyền truy cập thư viện ảnh
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Mở thư viện ảnh để người dùng chọn ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Tỉ lệ 1:1 cho ảnh vuông
      quality: 1,
    });

    if (!result.canceled) {
      setphotoURL(result.assets[0].uri); // Cập nhật ảnh đã chọn vào state
    }
  };




//   // Hàm lưu thay đổi lên Firebase Firestore
// const saveProfileChanges = async () => {
//   try {
//     // Tạo reference tới document của user
//     const userDocRef = doc(db, 'users', userId); // Sử dụng `doc` để lấy reference
    
//     // Cập nhật dữ liệu
//     await updateDoc(userDocRef, {
//       name: editname,
//       bio: editBio,
//       photoURL: editphotoURL,
//     });

//     console.log('Profile updated successfully!');
//     navigation.goBack(); // Quay lại màn hình trước khi lưu xong
//   } catch (error) {
//     console.error('Error updating profile: ', error);
//   }
// };

// Hàm lưu thay đổi lên Firebase Firestore
const saveProfileChanges = async () => {
  try {
    // Tạo reference tới document của user
    const userDocRef = doc(db, 'users', userId); // Sử dụng `doc` để lấy reference

    // Cập nhật dữ liệu
    await updateDoc(userDocRef, {
      name: editname,
      bio: editBio,
      photoURL: editphotoURL,
    });

    console.log('Profile updated successfully!');
    navigation.navigate('Profile', {
      name: editname,
      bio: editBio,
      photoURL: editphotoURL,
      userId: userId,
    }); // Chuyển dữ liệu đã cập nhật về ProfileScreen
  } catch (error) {
    console.error('Error updating profile: ', error);
  }
};

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
      </View>

       {/* Edit Profile Picture */}
       <View style={styles.photoURLContainer}>
        <Image source={{ uri: editphotoURL }} style={styles.photoURL} />
        <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Edit name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>name</Text>
        <TextInput
          style={styles.input}
          value={editname}
          onChangeText={setname}
        />
      </View>

      {/* Edit Bio */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={editBio}
          onChangeText={setBio}
          multiline
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveProfileChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Light theme background
    padding: 20,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  navTitle: {
    fontSize: 18,
    color: 'black',
    marginLeft: 15,
  },
  photoURLContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photoURL: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhotoButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  changePhotoText: {
    color: 'white',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  input: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditProfileScreen;
