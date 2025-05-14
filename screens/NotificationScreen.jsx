import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NotificationItem from '../componets/NotificationItem';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Shopping budget has exceeded the limit',
      description: 'Your shopping budget has exceeded by $25.60',
      time: '10:30 AM',
      read: false,
    },
    {
      id: 2,
      title: 'Utilities budget warning',
      description: 'Your utilities budget is close to the limit',
      time: 'Yesterday',
      read: false,
    },
    {
      id: 3,
      title: 'Salary Received',
      description: 'Your monthly salary has been credited',
      time: 'Today',
      read: true,
    },
  ]);

  const [showMenu, setShowMenu] = useState(false);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setShowMenu(false);
  };

  const deleteAll = () => {
    setNotifications([]);
    setShowMenu(false);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
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
      <ScrollView className="flex-1">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              title={notification.title}
              description={notification.description}
              time={notification.time}
              read={notification.read}
              onSwipeRight={() => markAsRead(notification.id)}
            />
          ))
        ) : (
          <View className="flex-1 justify-center items-center mt-40">
            <Icon name="bell-off-outline" size={60} color="#9CA3AF" />
            <Text className="text-gray-400 mt-4">No notifications available</Text>
          </View>
        )}
      </ScrollView>

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
                onPress={markAllAsRead}
              >
                <Icon name="check-all" size={20} color="#4B5563" />
                <Text className="ml-3 text-gray-700">Mark all as read</Text>
              </TouchableOpacity>
              <View className="h-px bg-gray-200" />
              <TouchableOpacity
                className="flex-row items-center px-4 py-3"
                onPress={deleteAll}
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
