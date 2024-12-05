import React, { useState } from 'react';
import { Button, View, Text,TouchableOpacity,TextInput,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import axios from 'axios';
import { useVideoContext } from '../VideoProvider';

function optimizeCloudinaryVideoUrl(originalUrl) {
  const cloudinaryBaseUrl = "https://res.cloudinary.com/";
  const transformations = "q_auto,f_mp4,vc_h264,h_720";

  // Kiểm tra URL gốc có phải Cloudinary URL hợp lệ
  if (!originalUrl.startsWith(cloudinaryBaseUrl)) {
    throw new Error("URL không phải từ Cloudinary");
  }

  // Tách URL gốc thành các phần
  const parts = originalUrl.split("/upload/");
  if (parts.length !== 2) {
    throw new Error("URL không hợp lệ. Không tìm thấy phần 'upload/' trong URL.");
  }

  // Thêm các tham số tối ưu hóa
  const optimizedUrl = `${parts[0]}/upload/${transformations}/${parts[1]}`;
  return optimizedUrl;
}
const uploadUriToCloudinary = async (uri) => {
  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dqubbut60/video/upload';

  // Tạo form data
  const formData = new FormData();
  formData.append('file', {
    uri, // URI của video trên thiết bị
    type: 'video/mp4', // MIME type
    name: 'video.mp4', // Tên tệp (có thể tùy chỉnh)
  });
  formData.append('upload_preset', 'bojdgw6n'); // Upload preset của bạn

  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData, // Gửi form data
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || 'Upload failed');
    }
    const url = optimizeCloudinaryVideoUrl(result.secure_url);
    console.log('Upload Success:', result);
    return {"id":result.asset_id,"url":url}; // URL an toàn của video
  } catch (error) {
    console.error('Upload Failed:', error);
    throw error;
  }
};
export default function AddScreen(flexVideo) {
  const { addVideo,videoUrl } = useVideoContext();
  const [videoUri, setVideoUri] = useState("");
  const [permissionResponse, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [tilte,setTilte] = useState("");
  const [id,setId] = useState("");
  // Request permission to access media library
  React.useEffect(() => {
    if (permissionResponse?.status !== 'granted') {
      requestPermission();
    }
  }, [permissionResponse]);
const pickVideo1 = async () => {
  setId("lô");
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
const handleAddData = async (id_asset,video_url) => {
  try {
    const response = await axios.post(videoUrl, {
      tilte: tilte,
      id_asset: id_asset,
      author:"uyi981",
      url:video_url
    });

    // Kiểm tra phản hồi
    if (response.status === 201) {
      Alert.alert('Thành công', 'Dữ liệu đã được thêm!');
     
    } else {
      Alert.alert('Thất bại', 'Không thể thêm dữ liệu!');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Lỗi', 'Đã xảy ra lỗi khi thêm dữ liệu.');
  }
  finally
  {
    addVideo({"id":id_asset,"url":video_url,"tilte": tilte});
  }
};
const handleUploadVideo = async () => {
  if (videoUri) {
    try {
      console.log('Video URI:', videoUri);
      const videoUrl = await uploadUriToCloudinary(videoUri);
      console.log('Video uploaded:', videoUrl);
     // addVideo({id:videoUrl,url:videoUri});
      alert('Video uploaded successfully!');
      handleAddData(videoUrl.id,videoUrl.url);
     
    } catch (error) {
      alert('Failed to upload video.');
      
    }
    finally
    {   
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
    return result.asset_id; // URL của video trên Cloudinary
  } catch (error) {
    console.error('Upload Failed:', error);
    throw error;
  }
};
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
       <View style={{ flex: 1, justifyContent: 'flex-start',gap:5 }}>
      <TouchableOpacity style={{width:"100%",marginTop:100,backgroundColor:"#4444ff",padding:10}} onPress={pickVideo1}>
      <Text style={{color:"white",fontSize:18,textAlign:'center'}}>Pick a Video</Text>
       </TouchableOpacity>
       <Text style={{width:"100%",backgroundColor:"#ffffff",padding:10,textAlign:'center',fontSize:18}}>Video Titles</Text>
      <TextInput value={tilte} onChangeText={setTilte} style={{width:"100%",textAlign:'center',backgroundColor:"#ffffff",borderWidth:2,borderColor:"#4444ff",padding:5,fontSize:18}}/>
        <TouchableOpacity style={{width:"100%",backgroundColor:"#4444ff",padding:10}}onPress={handleUploadVideo}> 
      <Text style={{color:"white",fontSize:18,textAlign:'center'}}>Upload Video</Text>
       </TouchableOpacity>
    </View>


    </View>
  


  );
}
