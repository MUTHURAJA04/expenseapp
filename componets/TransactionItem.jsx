// components/TransactionItem.js
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TransactionItem = ({
  iconName,
  title,
  subtitle,
  amount,
  time,
  bgColor = 'bg-blue-100',
  iconColor = '#3b82f6',
  amountColor = 'text-red-500',
}) => {
  return (
    <View className="flex-row items-center justify-between py-3 px-2 bg-white">
      {/* Left side with icon and text */}
      <View className="flex-row items-center flex-1">
        {/* Icon with smaller size and better spacing */}
        <View 
          className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${bgColor}`}
          style={{ backgroundColor: typeof bgColor === 'string' && bgColor.startsWith('#') ? bgColor : undefined }}
        >
          <Icon name={iconName} size={20} color={iconColor} />
        </View>
        
        {/* Text content with tighter spacing */}
        <View className="flex-1">
          <Text className="font-medium text-gray-800 text-sm" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-gray-500 text-xs mt-0.5" numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
      </View>

      {/* Right side with amount and time */}
      <View className="ml-2 items-end">
        <Text className={`font-medium text-sm ${amountColor}`}>
          {amount}
        </Text>
        <Text className="text-gray-400 text-xs mt-0.5">
          {time}
        </Text>
      </View>
  
    </View>
  );
};

export default TransactionItem;