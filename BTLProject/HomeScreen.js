import React, { useState, useRef,useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
const { height } = Dimensions.get('window');

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
              <Text style={styles.commentText}>{item.content}</Text>
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

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]); // Danh sách bình luận
  const commentsApiUrl = 'https://66fc9adbc3a184a84d17768f.mockapi.io/ToDo';

  const postComment = async (comment,id) => {
    if (!comment.trim() || !id) return;

    const newComment = {
      videoId: id,
      content: comment.trim(),
    };

    try {
      const response = await axios.post(commentsApiUrl, newComment);
      setComments((prev) => [...prev, response.data]); // Thêm bình luận mới vào danh sách
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };






  useEffect(() => {
    // Gọi API lấy danh sách video từ server của bạn
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/videos');
        if (response.data.success) {
          setVideos(response.data.videos); // Lưu vào state videos
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false); // Đặt loading thành false khi xong
      }
    };

    fetchVideos();
  }, []);
// Lấy danh sách bình luận từ MockAPI
useEffect(() => {
  const fetchComments = async () => {
    try {
      const response = await axios.get(commentsApiUrl);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  fetchComments();
}, []);


  const openCommentsModal = (index) => {
    setCurrentVideoIndex(index);
    setModalVisible(true);
  };

  const addComment = (newComment) => {
    videoData[currentVideoIndex].comments.push(newComment);
  };
  const getIndexById = (array, id) => {
    return array.findIndex(item => item.id === id);
  };
  const renderItem = ({ item}) => (
    <View style={{ height, justifyContent: 'center', alignItems: 'center' }}>
      <Video
       source={{ uri: item.url }} // Lấy URL từ Cloudinary
        style={styles.video}
        shouldPlay={true}
        resizeMode="cover"
        isLooping
        useNativeControls={true} // Hiển thị các điều khiển video (play, pause, v.v.)
      />
      {/* Icon trên video */}
      <View style={styles.rightIconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="heart" size={30} color="white" />
          <Text style={styles.iconText}>{item.id}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => openCommentsModal(getIndexById(videos,item.id))}>
          <Icon name="comment" size={30} color="white" />
          <Text style={styles.iconText}>item.comments.length</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="share" size={30} color="white" />
        </TouchableOpacity>
      </View>
      {/* Thông tin mô tả */}
      <View style={styles.bottomDescription}>
        <Text style={styles.descriptionText}>@User {item.id}</Text>
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
        pagingEnabled
        horizontal={false}
        showsVerticalScrollIndicator={false}
      />
      {/* Modal bình luận */}
      <CommentsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        comments={comments}
        onAddComment={postComment}
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
    height: '100%',
  },
  rightIconsContainer: {
    position: 'absolute',
    right: 20,
    top: '30%',
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
