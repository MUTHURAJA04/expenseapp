import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const NotificationItem = React.memo(({ 
  title, 
  description, 
  time, 
  read, 
  highlighted, 
  onSwipeRight, 
  onSwipeLeft 
}) => {
  const swipeableRef = useRef(null);

  const handleRightSwipe = () => {
    onSwipeRight?.();
    swipeableRef.current?.close();
  };

  const handleLeftSwipe = () => {
    onSwipeLeft?.();
    swipeableRef.current?.close();
  };

  const renderRightActions = () => (
    <View
      style={{
        backgroundColor: '#1e40af', // Tailwind blue-800
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        width: 112, // ~ w-28
        height: '100%',
      }}
    >
      <Text style={{ color: '#fff', fontWeight: '600' }}>Mark as read</Text>
    </View>
  );

  const renderLeftActions = () => (
    <View
      style={{
        backgroundColor: '#ef4444', // Tailwind red-500
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        width: 112,
        height: '100%',
      }}
    >
      <Text style={{ color: '#fff', fontWeight: '600' }}>Mark as Highlighted</Text>
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableRightOpen={handleRightSwipe}
      onSwipeableLeftOpen={handleLeftSwipe}
      friction={2}
      rightThreshold={40}
      leftThreshold={40}
    >
      <View
        className={`border-b border-gray-100 py-4 px-4
          ${!read ? 'bg-purple-100' : 'bg-white'}
          ${highlighted ? 'border-l-4 border-yellow-400' : ''}
        `}
        style={highlighted ? { backgroundColor: '#FEF3C7' } : null}
      >
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
});

export default NotificationItem;
