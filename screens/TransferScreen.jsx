import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../redux/slices/transactionSlice';
import Toast from 'react-native-toast-message';

const TransferScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.categories.accounts);

  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [description, setDescription] = useState('');

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Amount',
        text2: 'Please enter a valid amount greater than zero.',
      });
      return;
    }

    if (!from) {
      Toast.show({
        type: 'error',
        text1: 'Missing From Account',
        text2: 'Please select a "From" account.',
      });
      return;
    }

    if (!to) {
      Toast.show({
        type: 'error',
        text1: 'Missing To Account',
        text2: 'Please select a "To" account.',
      });
      return;
    }

    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      from,
      to,
      description: description?.trim() || 'No description',
      date: new Date().toISOString(),
    };

    dispatch(addTransaction(newTransaction));
    navigation.navigate('Home');
  };

  // Helper function to get the display name for an account
  const getAccountLabel = (item) => {
    if (item.type === 'Bank') return item.bankName;
    if (item.type === 'Cash') return item.cashName;
    return '';
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <StatusBar barStyle="light-content" backgroundColor="#3b82f6" />

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
            placeholder="0"
            placeholderTextColor="#fff"
          />
        </View>
      </View>

      {/* Form Section */}
      <View className="flex-1 bg-white rounded-t-3xl mt-8 px-6 pt-6">
        <View className="flex-row items-center mb-4">
          {/* From Dropdown */}
          <View className="flex-1">
            <Text className="text-gray-600 mb-2">From</Text>
            <TouchableOpacity
              className="p-4 bg-gray-50 rounded-xl"
              onPress={() => setShowFromDropdown(true)}
            >
              <Text className="text-gray-600">{from || 'Select account'}</Text>
            </TouchableOpacity>
          </View>

          <View className="mx-4 mt-4">
            <Icon name="arrow-right" size={20} color="#8B5CF6" />
          </View>

          {/* To Dropdown */}
          <View className="flex-1">
            <Text className="text-gray-600 mb-2">To</Text>
            <TouchableOpacity
              className="p-4 bg-gray-50 rounded-xl"
              onPress={() => setShowToDropdown(true)}
            >
              <Text className="text-gray-600">{to || 'Select account'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Description Input */}
        <View className="mt-4">
          <TextInput
            className="p-4 bg-gray-50 rounded-xl text-gray-600"
            placeholder="Description"
            placeholderTextColor="#6B7280"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Attachment Option */}
        <TouchableOpacity className="flex-row items-center mt-4">
          <Icon name="paperclip" size={20} color="#6B7280" />
          <Text className="text-gray-500 ml-2">Add attachment</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          className="bg-[#8B5CF6] py-4 rounded-xl mt-auto mb-8"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold">Continue</Text>
        </TouchableOpacity>
      </View>

      {/* From Modal */}
      <Modal visible={showFromDropdown} transparent animationType="fade">
        <Pressable
          className="flex-1 justify-center items-center bg-black/40"
          onPress={() => setShowFromDropdown(false)}
        >
          <View className="bg-white w-64 rounded-xl p-4">
            {accounts && accounts.length > 0 ? (
              accounts.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setFrom(getAccountLabel(item));
                    setShowFromDropdown(false);
                  }}
                >
                  <Text className="p-2 text-gray-800">{getAccountLabel(item)}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-center text-gray-500">No accounts found</Text>
            )}
          </View>
        </Pressable>
      </Modal>

      {/* To Modal */}
      <Modal visible={showToDropdown} transparent animationType="fade">
        <Pressable
          className="flex-1 justify-center items-center bg-black/40"
          onPress={() => setShowToDropdown(false)}
        >
          <View className="bg-white w-64 rounded-xl p-4">
            {accounts && accounts.length > 0 ? (
              accounts.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setTo(getAccountLabel(item));
                    setShowToDropdown(false);
                  }}
                >
                  <Text className="p-2 text-gray-800">{getAccountLabel(item)}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-center text-gray-500">No accounts found</Text>
            )}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default TransferScreen;
