import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Switch,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ExpenseScreen = ({navigation}) => {
  const [amount, setAmount] = useState('0');
  const [repeat, setRepeat] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-red-500">
      <StatusBar
        barStyle="light-content" // This makes the icons white
        backgroundColor="#ef4444" // This matches your purple header
      />
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg ml-4">Expense</Text>
      </View>

      {/* Amount Input */}
      <View className="px-6 mt-16">
        <Text className="text-white text-base mb-2">How much?</Text>
        <View className="flex-row items-center">
          <Text className="text-white text-5xl">₹</Text>
          <TextInput
            className="text-white text-5xl flex-1"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholderTextColor="#fff"
          />
        </View>
      </View>

      {/* Form Section */}
      <View className="flex-1 bg-white rounded-t-3xl mt-8 px-6 pt-6">
        {/* Category Selector */}
        <TouchableOpacity className="flex-row justify-between items-center p-4 bg-gray-50 rounded-xl">
          <Text className="text-gray-600">Category</Text>
          <Icon name="chevron-down" size={24} color="#6B7280" />
        </TouchableOpacity>

        {/* Description Input */}
        <View className="mt-4">
          <TextInput
            className="p-4 bg-gray-50 rounded-xl text-gray-600"
            placeholder="Description"
            placeholderTextColor="#6B7280"
          />
        </View>

        {/* Wallet Selector */}
        <TouchableOpacity className="flex-row justify-between items-center p-4 bg-gray-50 rounded-xl mt-4">
          <Text className="text-gray-600">Wallet</Text>
          <Icon name="chevron-down" size={24} color="#6B7280" />
        </TouchableOpacity>

        {/* Attachment Option */}
        <TouchableOpacity className="flex-row items-center mt-4">
          <Icon name="paperclip" size={20} color="#6B7280" />
          <Text className="text-gray-500 ml-2">Add attachment</Text>
        </TouchableOpacity>

        {/* Repeat Option */}
        <View className="flex-row justify-between items-center mt-6">
          <View>
            <Text className="text-gray-800">Repeat</Text>
            <Text className="text-gray-500 text-sm">Repeat transaction</Text>
          </View>
          <Switch
            value={repeat}
            onValueChange={setRepeat}
            trackColor={{false: '#D1D5DB', true: '#C4B5FD'}}
            thumbColor={repeat ? '#8B5CF6' : '#fff'}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          className="bg-[#8B5CF6] py-4 rounded-xl mt-auto mb-8"
          onPress={() => navigation.navigate('Home')}>
          <Text className="text-white text-center font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ExpenseScreen;
