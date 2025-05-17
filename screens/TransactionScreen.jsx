import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavItem from '../componets/NavItem';
import BottomNavigation from '../componets/BottomNavigation';

const TransactionScreen = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState('Month');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Expense');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [isAdding, setIsAdding] = useState(false);

  const transactions = [
    {
      id: 1,
      category: 'Shopping',
      title: 'Buy some grocery',
      amount: '-$120',
      time: '10:00 AM',
      icon: 'shopping',
      bgColor: 'bg-orange-100',
      iconColor: '#F97316',
    },
    {
      id: 2,
      category: 'Subscription',
      title: 'Disney+ Annual...',
      amount: '-$80',
      time: '03:30 PM',
      icon: 'youtube-subscription',
      bgColor: 'bg-purple-100',
      iconColor: '#8B5CF6',
    },
    {
      id: 3,
      category: 'Food',
      title: 'Buy a ramen',
      amount: '-$32',
      time: '07:30 PM',
      icon: 'food',
      bgColor: 'bg-red-100',
      iconColor: '#EF4444',
    },
    {
      id: 4,
      category: 'Salary',
      title: 'Salary for July',
      amount: '+5000',
      time: '04:30 PM',
      icon: 'cash',
      bgColor: 'bg-green-100',
      iconColor: '#10B981',
    },
    {
      id: 5,
      category: 'Transportation',
      title: 'Charging Tesla',
      amount: '-$18',
      time: '08:30 PM',
      icon: 'car',
      bgColor: 'bg-blue-100',
      iconColor: '#3B82F6',
    },
  ];

  const TransactionItem = ({ item }) => (
    <View className="flex-row items-center justify-between py-4 px-4">
      <View className="flex-row items-center">
        <View className={`${item.bgColor} p-3 rounded-full`}>
          <Icon name={item.icon} size={24} color={item.iconColor} />
        </View>
        <View className="ml-3">
          <Text className="text-gray-800 font-medium">{item.category}</Text>
          <Text className="text-gray-500 text-sm">{item.title}</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className={`font-semibold ${item.amount.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
          {item.amount}
        </Text>
        <Text className="text-gray-400 text-xs">{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-lg font-semibold mr-2">{selectedMonth}</Text>
            <Icon name="chevron-down" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <Icon name="filter-variant" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Financial Report Card */}
        <TouchableOpacity className="mt-4 bg-purple-50 rounded-xl p-4 flex-row items-center justify-between">
          <Text className="text-purple-700 font-medium">See your financial report</Text>
          <Icon name="chevron-right" size={24} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <ScrollView className="flex-1 mt-4">
        <Text className="px-4 text-gray-800 font-semibold mb-2">Today</Text>
        {transactions.map(item => (
          <TransactionItem key={item.id} item={item} />
        ))}
        
        <Text className="px-4 text-gray-800 font-semibold mt-4 mb-2">Yesterday</Text>
        {transactions.slice(3).map(item => (
          <TransactionItem key={`yesterday-${item.id}`} item={item} />
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View className="flex-1 bg-black/30 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-semibold">Filter Transaction</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Text className="text-purple-600">Reset</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-gray-600 mb-3">Filter By</Text>
            <View className="flex-row space-x-3 mb-6">
              {['Income', 'Expense', 'Transfer'].map(filter => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-full ${
                    selectedFilter === filter ? 'bg-purple-100' : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={selectedFilter === filter ? 'text-purple-600' : 'text-gray-600'}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-gray-600 mb-3">Sort By</Text>
            <View className="flex-row space-x-3 mb-6">
              {['Highest', 'Lowest', 'Newest', 'Oldest'].map(sort => (
                <TouchableOpacity
                  key={sort}
                  onPress={() => setSelectedSort(sort)}
                  className={`px-4 py-2 rounded-full ${
                    selectedSort === sort ? 'bg-purple-100' : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={selectedSort === sort ? 'text-purple-600' : 'text-gray-600'}
                  >
                    {sort}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-gray-600 mb-3">Category</Text>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-gray-50 rounded-xl">
              <Text className="text-gray-600">Choose Category</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-400 mr-2">0 Selected</Text>
                <Icon name="chevron-right" size={20} color="#9CA3AF" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              className="bg-purple-600 py-4 rounded-xl mt-6"
              onPress={() => setShowFilterModal(false)}
            >
              <Text className="text-white text-center font-semibold">Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
   <BottomNavigation/>
    </SafeAreaView>
  );
};

export default TransactionScreen;