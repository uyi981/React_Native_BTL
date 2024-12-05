import React, { useState, useRef,useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList,Share, Dimensions, Modal, TextInput, TouchableOpacity,Alert,Image } from 'react-native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
const { height } = Dimensions.get('window');
import { useVideoContext } from './VideoProvider';
// Dữ liệu video và bình luận
function CommentsModal({ visible, onClose, comments, onAddComment,videos,currentVideoIndex }) {
  const [newComment, setNewComment] = useState('');
  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      onAddComment(newComment.trim(),videos[currentVideoIndex].id);
      setNewComment('');
    }
  };
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.commentCount}>{comments.length} {currentVideoIndex}</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="times" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={comments.filter((comment) => comment.videoId === videos[currentVideoIndex]?.id)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <View style={{flexDirection:'row'}}>
              <Text style={styles.commentText}>{item.author}</Text> 
              <Text  style={styles.commentText}>: </Text>
              <Text style={styles.commentText}>{item.content}</Text>
                </View>
         
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add a comment..."
            placeholderTextColor="#888"
            style={styles.input}
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={handleAddComment}>
            <Icon name="send" size={24} color="black" style={styles.inputIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const shareVideo = async (url) => {
    try {
      const result = await Share.share({
        message: `Check out this video: ${url}`,
        url: url, // URL để chia sẻ (nếu thiết bị hỗ trợ)
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: ", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to share video: " + error.message);
    }
  };

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const {videos,setVideos,commentUrl,name,videoUrl} = useVideoContext();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]); // Danh sách bình luận

    
    // Hàm gửi comment tới server
    const addComment = async (comment,id) => {
      if (!comment.trim() || !id) return;
      const nameReal = name||"ẩn danh";
      const newComment = {
        videoId: id,
        content: comment.trim(),
        author:nameReal
      };
  
      try {
        const response = await axios.post(commentUrl, newComment);
        setComments((prev) => [...prev, response.data]); // Thêm bình luận mới vào danh sách
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    };
  
// Lấy danh sách bình luận từ MockAPI
useEffect(() => {
  const fetchVideos = async () => {
    try {
      const response = await axios.get(commentUrl); // Thay bằng IP máy tính
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  fetchVideos();
}, []);
useEffect(() => {
  const fetchVideos = async () => {
    try {
      const response = await axios.get(videoUrl); // Thay bằng IP máy tính
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
    finally
    {
      setLoading(false); // Đặt loading thành false khi xong
    }
  };

  fetchVideos();
}, []);

  const openCommentsModal = (index) => {
    setCurrentVideoIndex(index);
    setModalVisible(true);
  };

  const getIndexById = (array, id) => {
    return array.findIndex(item => item.id === id);
  };
  const renderItem = ({ item}) => (
    <View style={{ height, justifyContent: 'center', alignItems: 'center' }}>
      <Video
       source={{ uri:item.url }} // Lấy URL từ Cloudinary
        style={styles.video}
        resizeMode="contain"
        isLooping
        onError={(error) => console.error("Error loading video:", error)}
        shouldPlay={false}
        useNativeControls={true} // Hiển thị các điều khiển video (play, pause, v.v.)
    
      />
      {/* Icon trên video */}
      <View style={styles.rightIconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="heart" size={30} color="white" />
          <Text style={styles.iconText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => openCommentsModal(getIndexById(videos,item.id))}>
          <Icon name="comment" size={30} color="white" />
          <Text style={styles.iconText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={()=>shareVideo(item.url)}>
          <Icon name="share" size={30} color="white" />
        </TouchableOpacity>
      </View>
      {/* Thông tin mô tả */}
      <View style={styles.bottomDescription}>
        <Text style={styles.descriptionText}>{item.tilte}</Text>
        <Text style={styles.hashtag}>#tag1 #tag2</Text>
      </View>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
      />
      {/* Modal bình luận */}
      <CommentsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        comments={comments}
        onAddComment={addComment}
        currentVideoIndex={currentVideoIndex}
        videos={videos}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '80%',
  },
  rightIconsContainer: {
    position: 'absolute',
    right: 20,
    top: '45%',
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  bottomDescription: {
    position: 'absolute',
    bottom: 50,
    left: 10,
  },
  descriptionText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  hashtag: {
    color: 'white',
    fontSize: 12,
  },
  photoURL: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#222',
  },
  commentCount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  commentText: {
    color: 'white',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 10,
  },
  inputIcon: {
    marginLeft: 10,
  },
});