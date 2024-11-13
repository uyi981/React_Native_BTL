import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

export default function AddScreen() {
  const [videoUri, setVideoUri] = useState(null);
  const [permissionResponse, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  // Request permission to access media library
  React.useEffect(() => {
    if (permissionResponse?.status !== 'granted') {
      requestPermission();
    }
  }, [permissionResponse]);

const pickVideo = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    videoStabilization: true,
    allowsEditing: true,
    quality: 1,
  });

  if (result.cancelled) {
    console.log('User cancelled video picker');
    return;
  }

  // Kiểm tra assets để lấy URI của video
  console.log(result.assets); // Log toàn bộ thông tin assets
  const videoUri = result.assets[0]?.uri; // Truy cập URI từ tài sản đầu tiên
  console.log(videoUri); // Kiểm tra URI của video
  setVideoUri(videoUri); // Cập nhật URI nếu có video
};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick a Video" onPress={pickVideo} />
      {videoUri && (
        <>
          <Video
            source={{ uri: videoUri }}
            useNativeControls
            resizeMode="contain"
            style={{ width: 300, height: 300, marginTop: 20 }}
          />
        </>
      )}
    </View>
  );
}
