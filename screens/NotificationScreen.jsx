import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationItem from '../componets/NotificationItem';
import {
  markAsRead,
  toggleHighlight,
  markAllAsRead,
  deleteAll,
} from '../redux/slices/notificationSlice'; 

const NotificationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notification.notifications);

  const [showMenu, setShowMenu] = useState(false);

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
    setShowMenu(false);
  };

  const handleDeleteAll = () => {
    dispatch(deleteAll());
    setShowMenu(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Notifications</Text>
        <TouchableOpacity onPress={() => setShowMenu(true)}>
          <Icon name="dots-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NotificationItem
            title={item.title}
            description={item.description}
            time={item.time}
            read={item.read}
            highlighted={item.highlighted}
            onSwipeRight={() => dispatch(markAsRead(item.id))}
            onSwipeLeft={() => dispatch(toggleHighlight(item.id))}
          />
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center mt-40">
            <Icon name="bell-off-outline" size={60} color="#9CA3AF" />
            <Text className="text-gray-400 mt-4">No notifications available</Text>
          </View>
        )}
      />

      {/* Action Menu Modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
          <View className="flex-1 bg-black/30 justify-start">
            <View className="absolute top-16 right-4 bg-white rounded-lg shadow-lg w-48">
              <TouchableOpacity
                className="flex-row items-center px-4 py-3"
                onPress={handleMarkAllAsRead}
              >
                <Icon name="check-all" size={20} color="#4B5563" />
                <Text className="ml-3 text-gray-700">Mark all as read</Text>
              </TouchableOpacity>
              <View className="h-px bg-gray-200" />
              <TouchableOpacity
                className="flex-row items-center px-4 py-3"
                onPress={handleDeleteAll}
              >
                <Icon name="trash-can-outline" size={20} color="#EF4444" />
                <Text className="ml-3 text-red-500">Delete all</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default NotificationScreen;
