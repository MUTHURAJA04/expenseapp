// ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigation from '../componets/BottomNavigation';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { addPartyCategory, addAccount } from '../redux/slices/CategorySlice';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);

  const [accountDetails, setAccountDetails] = useState({
    type: 'Bank',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    cashNameNo: '',
    cashName: '',
  });

  const toggleAccountType = () => {
    setAccountDetails(prev => ({
      ...prev,
      type: prev.type === 'Bank' ? 'Cash' : 'Bank',
    }));
  };

  const handleAddCategory = () => {
    if (!name || !phone || !location) {
      Toast.show({ type: 'error', text1: 'All fields are required' });
      return;
    }

    dispatch(addPartyCategory({ name, phone, location, categoryType }));

    setName('');
    setPhone('');
    setLocation('');
    setCategoryType('');
    setIsAdding(false);

    Toast.show({ type: 'success', text1: 'Party added successfully' });
  };

  const handleSaveAccount = () => {
    const { type, bankName, accountNumber, ifsc, cashName, cashNameNo } = accountDetails;

    if (
      (type === 'Bank' && (!bankName || !accountNumber || !ifsc)) ||
      (type === 'Cash' && (!cashName || !cashNameNo))
    ) {
      Toast.show({ type: 'error', text1: 'Please fill all required fields' });
      return;
    }

    dispatch(addAccount(accountDetails));
    Toast.show({ type: 'success', text1: `${type} details saved` });
    setIsAccountModalVisible(false);

    setAccountDetails({
      type: 'Bank',
      bankName: '',
      accountNumber: '',
      ifsc: '',
      cashNameNo: '',
      cashName: '',
    });
  };

  const menuItems = [
    { icon: 'account-circle', title: 'Add Account', color: '#8B5CF6' },
    { icon: 'cog', title: 'Settings', color: '#8B5CF6' },
    { icon: 'tab-plus', title: 'Add Party', color: '#8B5CF6' },
    { icon: 'logout', title: 'Logout', color: '#EF4444' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView className="flex-1">
        <View className="px-6 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-900">Profile</Text>
        </View>

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
            <Text className="text-xl font-bold mt-1 text-gray-900">KKDI RAJA</Text>
          </View>
        </View>

        <View className="px-6 mt-4 mb-24">
          {menuItems.map((item, index) => (
            <View key={index} className="mb-4">
              <TouchableOpacity
                onPress={() => {
                  if (item.title === 'Add Party') setIsAdding(true);
                  if (item.title === 'Add Account') setIsAccountModalVisible(true);
                }}
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

      {/* Add Party Modal */}
      <Modal visible={isAdding} transparent animationType="slide">
        <StatusBar barStyle="dark-content" backgroundColor="#d8b4fe" />
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setIsAdding(false); }}>
          <View className="flex-1 items-center justify-center bg-purple-300 bg-opacity-50">
            <TouchableWithoutFeedback>
              <View className="bg-white w-11/12 p-6 rounded-lg">
                <Text className="text-lg font-bold text-gray-800 mb-4">Add Party Details</Text>

                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name"
                  className="border border-gray-300 rounded-md px-3 py-4 mb-3"
                  placeholderTextColor="#6B7280"
                />

                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  className="border border-gray-300 rounded-md px-3 py-4 mb-3"
                  placeholderTextColor="#6B7280"
                />

                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Enter location"
                  className="border border-gray-300 rounded-md px-3 py-4 mb-3"
                  placeholderTextColor="#6B7280"
                />

                <TextInput
                  value={categoryType}
                  onChangeText={setCategoryType}
                  placeholder="Enter category type (e.g., Debtor, Creditor)"
                  className="border border-gray-300 rounded-md px-3 py-4 mb-4"
                  placeholderTextColor="#6B7280"
                />

                <View className="flex-row justify-between space-x-3">
                  <TouchableOpacity onPress={() => setIsAdding(false)}>
                    <Text className="text-gray-600">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleAddCategory}>
                    <Text className="text-purple-600 font-semibold">Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Bank / Cash Modal */}
      <Modal visible={isAccountModalVisible} transparent animationType="slide">
        <StatusBar barStyle="dark-content" backgroundColor="#d8b4fe" />
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
          setIsAccountModalVisible(false);
        }}>
          <View className="flex-1 items-center justify-center bg-purple-300 bg-opacity-50">
            <TouchableWithoutFeedback>
              <View className="bg-white w-11/12 p-6 rounded-lg">
                <Text className="text-lg font-bold text-gray-800 mb-4">Bank / Cash Details</Text>

                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-base text-gray-700 font-medium">Type: {accountDetails.type}</Text>
                  <Switch
                    value={accountDetails.type === 'Cash'}
                    onValueChange={toggleAccountType}
                    trackColor={{ false: '#8B5CF6', true: '#4f5af0' }}
                    thumbColor={accountDetails.type === 'Cash' ? '#4f5af0' : '#7C3AED'}
                  />
                </View>

                {accountDetails.type === 'Bank' ? (
                  <>
                    <TextInput
                      value={accountDetails.bankName}
                      onChangeText={text => setAccountDetails(prev => ({ ...prev, bankName: text }))}
                      placeholder="Enter Bank Name"
                      className="border border-gray-300 rounded-md px-3 py-4 mb-3"
                      placeholderTextColor="#6B7280"
                    />
                    <TextInput
                      value={accountDetails.accountNumber}
                      onChangeText={text => setAccountDetails(prev => ({ ...prev, accountNumber: text }))}
                      placeholder="Enter Account Number"
                      keyboardType="numeric"
                      className="border border-gray-300 rounded-md px-3 py-4 mb-3"
                      placeholderTextColor="#6B7280"
                    />
                    <TextInput
                      value={accountDetails.ifsc}
                      onChangeText={text => setAccountDetails(prev => ({ ...prev, ifsc: text }))}
                      placeholder="Enter IFSC Code"
                      className="border border-gray-300 rounded-md px-3 py-4 mb-4"
                      placeholderTextColor="#6B7280"
                    />
                  </>
                ) : (
                  <>
                    <TextInput
                      value={accountDetails.cashNameNo}
                      onChangeText={text => setAccountDetails(prev => ({ ...prev, cashNameNo: text }))}
                      placeholder="Enter Cash Name Number"
                      className="border border-gray-300 rounded-md px-3 py-4 mb-3"
                      placeholderTextColor="#6B7280"
                    />
                    <TextInput
                      value={accountDetails.cashName}
                      onChangeText={text => setAccountDetails(prev => ({ ...prev, cashName: text }))}
                      placeholder="Enter Cash Name"
                      className="border border-gray-300 rounded-md px-3 py-4 mb-4"
                      placeholderTextColor="#6B7280"
                    />
                  </>
                )}

                <View className="flex-row justify-between space-x-3">
                  <TouchableOpacity onPress={() => setIsAccountModalVisible(false)}>
                    <Text className="text-gray-600">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSaveAccount}>
                    <Text className="text-purple-600 font-semibold">Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <BottomNavigation />
    </SafeAreaView>
  );
};

export default ProfileScreen;
