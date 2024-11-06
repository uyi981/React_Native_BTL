import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

function ProfileScreen({ navigation }) {
  const userProfile = {
    username: 'martini_rod',
    bio: 'Traveler, photographer, coffee lover',
    profileImage: 'https://via.placeholder.com/150',
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
  };

  return (
    <View style={styles.container}>
      {/* Profile Image and Stats */}
      <View style={styles.header}>
        <Image source={{ uri: userProfile.profileImage }} style={styles.profileImage} />
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
        <Text style={styles.username}>{userProfile.username}</Text>
        <Text style={styles.bio}>{userProfile.bio}</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

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
  profileImage: {
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
  username: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bio: {
    color: '#555',
    fontSize: 14,
  },
  editButton: {
    backgroundColor: '#ff6347', // Màu nút sáng
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
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
