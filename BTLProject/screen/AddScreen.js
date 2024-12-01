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
const pickVideo1 = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    quality: 1,
  });
  if (!result.canceled) {
    const videoUri = result.assets[0]?.uri; // Truy cập URI từ tài sản đầu tiên
    console.log(videoUri); // Kiểm tra URI của video
    setVideoUri(videoUri); // Cập nhật URI nếu có video
    return result.assets[0].uri; // Đường dẫn video
  }
  return null;
};
const handleUploadVideo = async () => {
  if (videoUri) {
    try {
      console.log('Video URI:', videoUri);
      const videoUrl = await uploadBase64ToCloudinary(videoUri);
      console.log('Video uploaded:', videoUrl);
      alert('Video uploaded successfully!');
    } catch (error) {
      alert('Failed to upload video.');
    }
  } else {
    alert('No video selected.');
  }
};
const uploadBase64ToCloudinary = async (base64String) => {
  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dqubbut60/video/upload';
  
  const data = {
    file: base64String, // Base64 string đầy đủ
    upload_preset: 'bojdgw6n', // Upload preset
  };

  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Chuyển dữ liệu thành JSON
    });

    const result = await response.json();
    console.log('Upload Success:', result);
    return result.secure_url; // URL của video trên Cloudinary
  } catch (error) {
    console.error('Upload Failed:', error);
    throw error;
  }
};
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick a Video" onPress={pickVideo1} />
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
       <Button title="Upload video" onPress={handleUploadVideo} />
    </View>
  );
}
