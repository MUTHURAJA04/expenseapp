import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TransferScreen = ({navigation}) => {
  const [amount, setAmount] = useState('0');

  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <StatusBar
        barStyle="light-content" 
        backgroundColor="#3b82f6"
      />
      {/* Header */}
      <View className="px-4 py-3 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg ml-4">Transfer</Text>
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
        {/* From-To Section */}
        <View className="flex-row items-center mb-4">
          <View className="flex-1">
            <Text className="text-gray-600 mb-2">From</Text>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-gray-50 rounded-xl">
              <Text className="text-gray-600">Select wallet</Text>
              <Icon name="chevron-down" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View className="mx-4 mt-4">
            <Icon name="arrow-right" size={20} color="#8B5CF6" />
          </View>

          <View className="flex-1">
            <Text className="text-gray-600 mb-2">To</Text>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-gray-50 rounded-xl">
              <Text className="text-gray-600">Select wallet</Text>
              <Icon name="chevron-down" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Description Input */}
        <View className="mt-4">
          <TextInput
            className="p-4 bg-gray-50 rounded-xl text-gray-600"
            placeholder="Description"
            placeholderTextColor="#6B7280"
          />
        </View>

        {/* Attachment Option */}
        <TouchableOpacity className="flex-row items-center mt-4">
          <Icon name="paperclip" size={20} color="#6B7280" />
          <Text className="text-gray-500 ml-2">Add attachment</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity className="bg-[#8B5CF6] py-4 rounded-xl mt-auto mb-8"  onPress={() => navigation.navigate('Home')}>
          <Text className="text-white text-center font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TransferScreen;
