import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NavItem = ({
  iconName,
  label,
  active = false,
  onPress,
  // Optional enhancements (can be removed to match original exactly)
  touchableClass = "",
  textClass = "",
}) => {
  return (
    <TouchableOpacity
      className={`items-center ${touchableClass}`}
      onPress={onPress}
      activeOpacity={0.8} // Slightly better than default
    >
      <Icon 
        name={iconName} 
        size={24} 
        color={active ? '#8B5CF6' : '#9CA3AF'} 
      />
      <Text
        className={`text-xs mt-1 ${
          active ? 'text-[#8B5CF6]' : 'text-gray-400'
        } ${textClass}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default NavItem;