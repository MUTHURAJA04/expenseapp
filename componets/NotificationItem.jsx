import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const NotificationItem = ({ title, description, time, read, onSwipeRight }) => {
  const swipeableRef = useRef(null);

  const handleSwipe = () => {
    onSwipeRight();
    swipeableRef.current?.close();
  };

  const renderRightActions = () => (
    <View className="bg-blue-800-800 justify-center items-center px-4">
      <Text className="text-white font-semibold">Mark as read</Text>
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableRightOpen={handleSwipe}
      friction={2}
      rightThreshold={40}
    >
      <View className={`border-b border-gray-100 py-4 px-4 ${!read ? 'bg-purple-100' : 'bg-white'}`}>
        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-4">
            <Text className={`font-medium ${read ? 'text-gray-600' : 'text-gray-900'}`}>
              {title}
            </Text>
            <Text className={`text-sm mt-1 ${read ? 'text-gray-400' : 'text-gray-600'}`}>
              {description}
            </Text>
          </View>
          <Text className="text-gray-400 text-xs">{time}</Text>
        </View>
        {!read && (
          <View className="absolute top-4 left-0 w-1 h-1/2 bg-purple-600 rounded-full" />
        )}
      </View>
    </Swipeable>
  );
};

export default NotificationItem;
