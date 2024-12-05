

import React , { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {db} from '../firebaseConfig';
import {signOut, getAuth} from 'firebase/auth';
import { useVideoContext } from '../VideoProvider';


function ProfileScreen({ navigation, route }) {
  const { name, bio, photoURL , userId} = route.params; // Lấy thông tin từ route.params
  const {setName} = useVideoContext();
  setName(name);
  console.log("Received userID:", userId);
  // const userProfile = {

  //   name: name , // Dùng dữ liệu từ Firebase hoặc giá trị mặc định
  //   photoURL: photoURL,
  //   userId: userId,

  //   bio: bio,
  //   followers: 5000,
  //   following: 300,
  //   posts: 45,
  //   favoriteVideos: [
  //     { id: '1', thumbnail: 'https://via.placeholder.com/100' },
  //     { id: '2', thumbnail: 'https://via.placeholder.com/100' },
  //     { id: '3', thumbnail: 'https://via.placeholder.com/100' },
  //     { id: '4', thumbnail: 'https://via.placeholder.com/100' },
  //     { id: '5', thumbnail: 'https://via.placeholder.com/100' },
  //     { id: '6', thumbnail: 'https://via.placeholder.com/100' },
  //     { id: '7', thumbnail: 'https://via.placeholder.com/100' },
  //     { id: '8', thumbnail: 'https://via.placeholder.com/100' },
  //     { id: '9', thumbnail: 'https://via.placeholder.com/100' },
  //     { id: '10', thumbnail: 'https://via.placeholder.com/100' },
  //     { id: '11', thumbnail: 'https://via.placeholder.com/100' },
  //   ],
    
  // };

  const [userProfile, setUserProfile] = useState({
    name: name,
    bio: bio,
    photoURL: photoURL,
    userId: userId,
    followers: 5000,
    following: 300,
    posts: 45,
    favoriteVideos: [
      { id: '1', thumbnail: 'https://via.placeholder.com/100' },
      { id: '2', thumbnail: 'https://via.placeholder.com/100' },
      { id: '3', thumbnail: 'https://via.placeholder.com/100' },
      { id: '4', thumbnail: 'https://via.placeholder.com/100' },
      { id: '5', thumbnail: 'https://via.placeholder.com/100' },
      { id: '6', thumbnail: 'https://via.placeholder.com/100' },
      { id: '7', thumbnail: 'https://via.placeholder.com/100' },
      { id: '8', thumbnail: 'https://via.placeholder.com/100' },
      { id: '9', thumbnail: 'https://via.placeholder.com/100' },
      { id: '10', thumbnail: 'https://via.placeholder.com/100' },
      { id: '11', thumbnail: 'https://via.placeholder.com/100' },
    ],
  });

  // Đảm bảo cập nhật khi quay lại từ EditProfileScreen
  useEffect(() => {
    if (route.params?.name) {
      setUserProfile((prevState) => ({
        ...prevState,
        name: route.params.name,
        bio: route.params.bio,
        photoURL: route.params.photoURL,
      }));
    }
  }, [route.params]);



  const handleLogOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Đăng xuất khỏi Firebase
      navigation.navigate('Login'); // Điều hướng về trang Login
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };




  return (
    <View style={styles.container}>
      {/* Profile Image and Stats */}
      <View style={styles.header}>
        <Image source={{ uri: userProfile.photoURL }} style={styles.photoURL} />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userProfile.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userProfile.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userProfile.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.bio}>{userProfile.bio}</Text>
      </View>

      {/* Edit Profile Button */}
      <View style={styles.buttonContainer}>


        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            // Điều hướng đến EditProfileScreen và truyền tham số đúng cách
            navigation.navigate('EditProfile', {
              name: userProfile.name,
              bio: userProfile.bio,
              photoURL: userProfile.photoURL,
              userId: userProfile.userId,
            });
          }}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>


{/* LogOut Button */}
        <TouchableOpacity
          style={styles.logOutButton}
          onPress={handleLogOut} // Gọi hàm đăng xuất
        >
          <Text style={styles.editButtonText}>LogOut</Text>
        </TouchableOpacity>


      </View>

      {/* Favorite Videos */}
      <Text style={styles.sectionTitle}>Favorite Videos</Text>
      <FlatList
        data={userProfile.favoriteVideos}
        renderItem={({ item }) => (
          <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Nền sáng
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  photoURL: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  userInfo: {
    marginBottom: 20,
  },
  name: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bio: {
    color: '#555',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row', // Đặt các nút theo chiều ngang
    justifyContent: 'space-between', // Đảm bảo các nút cách đều
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#ff6347', // Màu nút sáng
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '48%',
  },
  logOutButton:{
    backgroundColor: 'red', // Màu nút sáng
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '48%',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  videoThumbnail: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 8,
  },
});

export default ProfileScreen;