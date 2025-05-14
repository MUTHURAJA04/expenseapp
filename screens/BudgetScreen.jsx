import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavItem from '../componets/NavItem';

const BudgetScreen = ({navigation}) => {
  const [currentMonth, setCurrentMonth] = useState('May 2025');
  const [showCreateBudget, setShowCreateBudget] = useState(false);
  const [amount, setAmount] = useState('0');
  const [receiveAlert, setReceiveAlert] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Month navigation functions
  const goToPreviousMonth = () => {
    // Implement month decrement logic
    console.log('Previous month');
  };

  const goToNextMonth = () => {
    // Implement month increment logic
    console.log('Next month');
  };

  const EmptyState = () => (
    <View className="flex-1">
      <StatusBar
        barStyle="light-content" // This makes the icons white
        backgroundColor="#8B5CF6" // This matches your purple header
      />
      {/* Big Purple Header */}
      <View className="bg-[#8B5CF6] px-6 pt-16 pb-12 rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-8">
          <TouchableOpacity onPress={goToPreviousMonth} className="p-3">
            <Icon name="chevron-left" size={32} color="#fff" />
          </TouchableOpacity>

          <Text className="text-white text-3xl font-bold">{currentMonth}</Text>

          <TouchableOpacity onPress={goToNextMonth} className="p-3">
            <Icon name="chevron-right" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 bg-white rounded-t-3xl -mt-8">
        <ScrollView
          className="flex-1 px-6 pt-8"
          contentContainerStyle={{flexGrow: 1}}>
          <View className="flex-1 justify-center items-center">
            <View className="bg-purple-100 p-6 rounded-full mb-6">
              <Icon name="wallet-outline" size={48} color="#8B5CF6" />
            </View>
            <Text className="text-gray-800 text-xl text-center font-medium">
              You don't have a budget yet
            </Text>
            <Text className="text-gray-500 text-base text-center mt-2 px-8">
              Let's create one so you can stay in control of your spending
            </Text>
          </View>
        </ScrollView>

        {/* Create Budget Button */}
        <View className="px-6 mb-24">
          <TouchableOpacity
            className="bg-[#8B5CF6] py-4 rounded-full"
            onPress={() => setShowCreateBudget(true)}>
            <Text className="text-white text-center">Create a budget</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const CreateBudgetScreen = () => (
    <View className="flex-1 bg-[#8B5CF6]">
      <StatusBar
        barStyle="light-content" // This makes the icons white
        backgroundColor="#8B5CF6" // This matches your purple header
      />
      {/* Big Header */}
      <View className="px-6 pt-16 pb-8">
        <View className="flex-row items-center mb-8">
          <TouchableOpacity onPress={() => setShowCreateBudget(false)}>
            <Icon name="arrow-left" size={32} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-3xl font-bold ml-4">
            Create Budget
          </Text>
        </View>

        {/* Amount Input */}
        <View className="px-2">
          <Text className="text-white text-lg mb-4">
            How much do you want to spend this month?
          </Text>
          <View className="flex-row items-center border-b-2 border-white/30 pb-4">
            <Text className="text-white text-5xl mr-2">₹</Text>
            <TextInput
              className="text-white text-5xl flex-1 font-bold"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#ffffff80"
              style={{height: 60}}
            />
          </View>
        </View>
      </View>

      {/* Bottom Sheet */}
      <View className="flex-1 bg-white rounded-t-3xl px-6 pt-8">
        <ScrollView>
          <TouchableOpacity className="flex-row justify-between items-center p-5 bg-gray-50 rounded-xl">
            <View>
              <Text className="text-gray-600 text-sm">Category</Text>
              <Text className="text-gray-800 text-lg mt-1">
                Select category
              </Text>
            </View>
            <Icon name="chevron-down" size={28} color="#6B7280" />
          </TouchableOpacity>

          <View className="flex-row justify-between items-center p-5 mt-6 border-b border-gray-100">
            <View>
              <Text className="text-gray-800 text-lg">Receive Alert</Text>
              <Text className="text-gray-500 text-sm mt-1">
                Get notified when you reach budget limits
              </Text>
            </View>
            <Switch
              value={receiveAlert}
              onValueChange={setReceiveAlert}
              trackColor={{false: '#D1D5DB', true: '#C4B5FD'}}
              thumbColor={receiveAlert ? '#8B5CF6' : '#fff'}
              ios_backgroundColor="#D1D5DB"
            />
          </View>
        </ScrollView>
        <View className=" mb-24">
          <TouchableOpacity className="bg-[#8B5CF6] py-4 rounded-full mb-8 mt-4 flex-row justify-center items-center">
            <Text className="text-white text-lg font-medium">Continue</Text>
            <Icon
              name="chevron-right"
              size={24}
              color="#fff"
              className="ml-2"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {showCreateBudget ? <CreateBudgetScreen /> : <EmptyState />}

      {/* Bottom Navigation */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-white border-t border-gray-100">
        <NavItem iconName="home" label="Home"  onPress={() => navigation.navigate('Home')} />
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
                <TouchableOpacity className="absolute ml-2  -top-4" onPress={() => navigation.navigate('Transfer')}>
                  <View className=" bg-blue-500 w-14 h-14 rounded-full items-center justify-center">
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
     
          active
        />
        <NavItem
          iconName="account"
          label="Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </SafeAreaView>
  );
};

export default BudgetScreen;
