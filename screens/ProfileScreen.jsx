import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavItem from '../componets/NavItem';

const ProfileScreen = ({navigation}) => {
  const [isAdding, setIsAdding] = useState(false);
  const menuItems = [
    {
      icon: 'account-circle',
      title: 'Account',
      color: '#8B5CF6',
    },
    {
      icon: 'cog',
      title: 'Settings',
      color: '#8B5CF6',
    },
    {
      icon: 'export',
      title: 'Export Data',
      color: '#8B5CF6',
    },
    {
      icon: 'logout',
      title: 'Logout',
      color: '#EF4444',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Main Content with ScrollView */}
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-900">Profile</Text>
        </View>

        {/* Profile Info */}
        <View className="items-center mt-6 mb-8">
          <View className="relative">
            <View className="w-28 h-28 rounded-full bg-purple-100 items-center justify-center">
              <Icon name="account" size={48} color="#8B5CF6" />
            </View>
            <TouchableOpacity className="absolute -right-2 -bottom-1 bg-white p-2 rounded-full border border-gray-200">
              <Icon name="pencil" size={18} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          <View className="mt-6 items-center">
            <Text className="text-gray-500 text-sm">Username</Text>
            <Text className="text-xl font-bold mt-1 text-gray-900">
              KKDI RAJA
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 mt-4 mb-24"> {/* Added mb-24 to prevent bottom nav overlap */}
          {menuItems.map((item, index) => (
            <View key={index} className="mb-4">
              <TouchableOpacity
                className="flex-row items-center bg-gray-50 p-5 rounded-xl"
                activeOpacity={0.8}>
                <View
                  className={`w-12 h-12 rounded-full items-center justify-center ${
                    item.title === 'Logout' ? 'bg-red-100' : 'bg-purple-100'
                  }`}>
                  <Icon
                    name={item.icon}
                    size={24}
                    color={item.title === 'Logout' ? '#EF4444' : '#8B5CF6'}
                  />
                </View>
                <Text
                  className={`ml-4 text-base ${
                    item.title === 'Logout'
                      ? 'text-red-500 font-medium'
                      : 'text-gray-800 font-medium'
                  }`}>
                  {item.title}
                </Text>
                <View className="ml-auto">
                  <Icon name="chevron-right" size={20} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation - Fixed Position */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <View className="flex-row justify-between items-center px-6 py-4">
          <NavItem 
            iconName="home" 
            label="Home"  
            onPress={() => navigation.navigate('Home')} 
          />
          <NavItem
            iconName="credit-card"
            label="Transaction"
            onPress={() => navigation.navigate('Transact')}
          />
          {isAdding ? (
            <>
              {/* Quick Action Options */}
              <View className="absolute -top-20 left-0 right-0">
                <View className="flex-row justify-center">
                  <TouchableOpacity className="absolute left-28 p-4 top-2" onPress={() => navigation.navigate('Income')}>
                    <View className="bg-green-500 w-14 h-14 rounded-full items-center justify-center">
                      <Icon name="cash-plus" size={24} color="#fff" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity className="absolute ml-2 -top-4" onPress={() => navigation.navigate('Transfer')}>
                    <View className="bg-blue-500 w-14 h-14 rounded-full items-center justify-center">
                      <Icon name="swap-horizontal" size={24} color="#fff" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity className="absolute right-28 p-4 top-2" onPress={() => navigation.navigate('Expense')}>
                    <View className="bg-red-500 w-14 h-14 rounded-full items-center justify-center">
                      <Icon name="cash-minus" size={24} color="#fff" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                className="bg-[#8B5CF6] p-4 rounded-full -mt-8"
                onPress={() => setIsAdding(false)}>
                <Icon name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              className="bg-[#8B5CF6] p-4 rounded-full -mt-8"
              onPress={() => setIsAdding(true)}>
              <Icon name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          )}
          <NavItem
            iconName="chart-bar"
            label="Budget"
            onPress={() => navigation.navigate('Budget')}
          />
          <NavItem
            iconName="account"
            label="Profile"
            active
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;