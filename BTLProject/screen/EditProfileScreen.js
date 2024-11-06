import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function EditProfileScreen({ navigation }) {
  const [username, setUsername] = useState('martini_rod');
  const [bio, setBio] = useState('Traveler, photographer, coffee lover');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Edit Profile Picture */}
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <TouchableOpacity style={styles.changePhotoButton}>
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Username */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Edit Bio */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={setBio}
          multiline
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
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
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
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
