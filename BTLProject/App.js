//VoPhuocHau-21089291
import { View, Text, Image, StyleSheet, TouchableOpacity,Modal,FlatList,TextInput} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import ProfileScreen from './screen/ProfileScreen'
import EditProfileScreen from './screen/EditProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { Video } from 'expo-av';
const commentsData = [
  { id: '1', user: 'martini_rod', comment: 'How neatly I write the date in my book', time: '22h', likes: 8098 },
  { id: '2', user: 'maxjacobson', comment: 'Now that’s a skill very talented', time: '23h', likes: 5028 },
  { id: '3', user: 'zackjohn', comment: 'Doing this would make me so anxious', time: '22h', likes: 5098 },
  // Add more comments as needed
];

function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentContent}>
        <Text style={styles.username}>{item.user}</Text>
        <Text style={styles.commentText}>{item.comment}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.likeContainer}>
        <Icon name="heart" size={20} color="gray" />
        <Text style={styles.likes}>{item.likes}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Video Placeholder */}
      <Video
        source={require('./video/video1.mp4')}
        style={styles.backgroundVideo}
        shouldPlay={true} // Tự động phát
        isLooping={true} // Lặp lại video
        resizeMode="contain" // Điều chỉnh kích thước video
        useNativeControls={true} // Hiển thị các điều khiển video (play, pause, v.v.)
      />
       <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.commentCount}>579 comments</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="times" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={commentsData}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            style={styles.commentList}
          />

          {/* Input bar for new comment */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add comment..."
              placeholderTextColor="#888"
              style={styles.input}
            />
            <TouchableOpacity>
              <Icon name="smile-o" size={24} color="#333" style={styles.inputIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="send" size={24} color="#333" style={styles.inputIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Icon buttons on the right */}
      <View style={styles.rightIconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="heart" size={30} color="white" />
          <Text style={styles.iconText}>1445</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          <Icon name="comment" size={30} color="white" />
          <Text style={styles.iconText}>04</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="share" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom description bar */}
      <View style={styles.bottomDescription}>
        <Text style={styles.descriptionText}>@Name • 1:28</Text>
        <Text style={styles.hashtag}>#travel #nature</Text>
      </View>
    </View>
  );
}

function DiscoverScreen() {
  return (
    <View style={styles.centeredContainer}>
      <Text>Discover</Text>
    </View>
  );
}

function AddScreen() {
  return (
    <View style={styles.centeredContainer}>
      <Text>Add New</Text>
    </View>
  );
}

function InboxScreen() {
  return (
    <View style={styles.centeredContainer}>
      <Text>Inbox</Text>
    </View>
  );
}

function MeScreen() {
  const Stack = createStackNavigator();

  return (
    // <View style={styles.centeredContainer}>
    //   <Text>Me</Text>
    // </View>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Discover" 
          component={DiscoverScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Add" 
          component={AddScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <View style={styles.addButton}>
                <Icon name="plus" color="white" size={20} />
              </View>
            ),
          }}
        />
        <Tab.Screen 
          name="Inbox" 
          component={InboxScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="envelope" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen 
          name="Me" 
          component={MeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',  // Kích thước của video
    height: '100%',  // Kích thước của video
    position: 'absolute',  // Đảm bảo video không bị chồng lên các thành phần khác
    top: 0,  // Đặt vị trí video nếu cần
    left: 0,  // Đặt vị trí video nếu cần
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '75%',
    resizeMode: 'cover',
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
  tabBar: {
    backgroundColor: '#000',
    height: 60,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'red',
  },
  commentCount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentList: {
    backgroundColor: 'white',
    padding: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  commentText: {
    color: '#333',
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likes: {
    color: '#888',
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightgreen',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  inputIcon: {
    marginLeft: 10,
  },
});
