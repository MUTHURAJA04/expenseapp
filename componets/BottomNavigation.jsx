import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavItem from './NavItem';

const BottomNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isAdding, setIsAdding] = useState(false);

  const getActiveTab = () => {
    const routeName = route.name;
    switch (routeName) {
      case 'Home':
      case 'Transact':
      case 'Budget':
      case 'Profile':
        return routeName;
      default:
        return null;
    }
  };

  const activeTab = getActiveTab();

  return (
    <View className="flex-row justify-between items-center px-6 py-4 bg-white border-t border-gray-100">
      <NavItem
        iconName="home"
        label="Home"
        active={activeTab === 'Home'}
        onPress={() => navigation.navigate('Home')}
      />
      <NavItem
        iconName="credit-card"
        label="Transaction"
        active={activeTab === 'Transact'}
        onPress={() => navigation.navigate('Transact')}
      />

      {/* Floating Action and Quick Options */}
      {isAdding ? (
        <>
          <View>
            {/* Quick Actions - Positioned higher */}
            <View
              className="absolute left-0 right-0 w-full flex items-center "
              style={{bottom: 100}}>
              <View className="flex-row items-center space-x-6  ">
                <TouchableOpacity
                  className="items-center pr-3"
                  onPress={() => {
                    setIsAdding(false);
                    navigation.navigate('Income');
                  }}>
                  <View className="bg-green-500 w-12 h-12 rounded-full items-center justify-center shadow-md">
                    <Icon name="cash-plus" size={24} color="#fff" />
                  </View>
                  {/* <Text className="text-xs text-gray-700 mt-1">Income</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                  className="items-center p-3"
                  onPress={() => {
                    setIsAdding(false);
                    navigation.navigate('Transfer');
                  }}>
                  <View className="bg-blue-500 w-12 h-12 rounded-full items-center justify-center shadow-md">
                    <Icon name="swap-horizontal" size={24} color="#fff" />
                  </View>
                  {/* <Text className="text-xs text-gray-700 mt-1">Transfer</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                  className="items-center pr-3"
                  onPress={() => {
                    setIsAdding(false);
                    navigation.navigate('Expense');
                  }}>
                  <View className="bg-red-500 w-12 h-12 rounded-full items-center justify-center shadow-md">
                    <Icon name="cash-minus" size={24} color="#fff" />
                  </View>
                  {/* <Text className="text-xs text-gray-700 mt-1">Expense</Text> */}
                </TouchableOpacity>
              </View>
            </View>

            {/* Close FAB - Exactly as you had it */}
            <TouchableOpacity
              className="bg-[#8B5CF6] p-4 rounded-full -mt-8 shadow-md"
              onPress={() => setIsAdding(false)}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TouchableOpacity
          className="bg-[#8B5CF6] p-4 rounded-full -mt-8 shadow-md"
          onPress={() => setIsAdding(true)}>
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      <NavItem
        iconName="chart-bar"
        label="Budget"
        active={activeTab === 'Budget'}
        onPress={() => navigation.navigate('Budget')}
      />
      <NavItem
        iconName="account"
        label="Profile"
        active={activeTab === 'Profile'}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

export default BottomNavigation;
