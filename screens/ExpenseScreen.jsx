import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {addExpense} from '../redux/slices/expenseSlice';
import Toast from 'react-native-toast-message';

const ExpenseScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const parties = useSelector(state => state.categories.partyCategories);
  const accounts = useSelector(state => state.categories.accounts);

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedParty, setSelectedParty] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showPartyList, setShowPartyList] = useState(false);
  const [showAccountList, setShowAccountList] = useState(false);

  const handleAddExpense = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Amount',
        text2: 'Please enter a valid amount greater than zero.',
      });
      return;
    }

    if (!selectedParty) {
      Toast.show({
        type: 'error',
        text1: 'Party Required',
        text2: 'Please select a party.',
      });
      return;
    }

    if (!selectedAccount) {
      Toast.show({
        type: 'error',
        text1: 'Account Required',
        text2: 'Please select an account.',
      });
      return;
    }

    dispatch(
      addExpense({
        amount: Number(amount),
        description: description || 'No description',
        partyName: selectedParty.name,
        account: selectedAccount,
        type: selectedAccount.type.toLowerCase(), // 'bank' or 'cash'
        date: new Date().toISOString(),
      }),
    );

    Toast.show({
      type: 'success',
      text1: 'Expense added successfully',
    });

    navigation.navigate('Home');
  };

  const dismissDropdowns = () => {
    setShowPartyList(false);
    setShowAccountList(false);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView className="flex-1 bg-red-500">
      <StatusBar barStyle="light-content" backgroundColor="#ef4444" />
      <TouchableWithoutFeedback onPress={dismissDropdowns}>
        <View className="flex-1">
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
                placeholder="0.00"
              />
            </View>
          </View>

          {/* Form Section */}
          <View className="flex-1 bg-white rounded-t-3xl mt-8 px-6 pt-6">
            {/* Party Selector */}
            <TouchableOpacity
              className="flex-row justify-between items-center p-4 bg-gray-100 rounded-xl"
              onPress={() => {
                setShowPartyList(prev => !prev);
                setShowAccountList(false);
              }}>
              <Text className="text-gray-600 font-medium">Party</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-800 font-semibold mr-2">
                  {selectedParty ? selectedParty.name : ''}
                </Text>
                <Icon
                  name={showPartyList ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#6B7280"
                />
              </View>
            </TouchableOpacity>

            {/* Party Dropdown */}
            {showPartyList && (
              <View
                className="bg-gray-100 rounded-xl mt-2"
                style={{maxHeight: 240}}>
                <FlatList
                  data={parties}
                  keyExtractor={(item, index) => index.toString()}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator
                  renderItem={({item}) => {
                    const isSelected = selectedParty?.name === item.name;
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedParty(item);
                          setShowPartyList(false);
                        }}
                        className={`px-4 py-3 border-b border-gray-200 ${
                          isSelected ? 'bg-purple-200' : ''
                        }`}>
                        <Text className="text-gray-800">{item.name}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  ListEmptyComponent={
                    <View className="px-4 py-3">
                      <Text className="text-gray-500 text-center">
                        No parties found
                      </Text>
                    </View>
                  }
                />
              </View>
            )}
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
            {/* Account Selector */}
            <TouchableOpacity
              className="flex-row justify-between items-center p-4 bg-gray-100 rounded-xl mt-4"
              onPress={() => {
                setShowAccountList(prev => !prev);
                setShowPartyList(false);
              }}>
              <Text className="text-gray-600 font-medium">Account</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-800 font-semibold mr-2">
                  {selectedAccount
                    ? selectedAccount.type === 'Bank'
                      ? `${selectedAccount.bankName} (${selectedAccount.accountNumber})`
                      : `${selectedAccount.cashName} (${selectedAccount.cashNameNo})`
                    : ''}
                </Text>
                <Icon
                  name={showAccountList ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#6B7280"
                />
              </View>
            </TouchableOpacity>

            {/* Account Dropdown */}
            {showAccountList && (
              <View
                className="bg-gray-100 rounded-xl mt-2"
                style={{maxHeight: 240}}>
                <FlatList
                  data={accounts}
                  keyExtractor={(item, index) => index.toString()}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator
                  renderItem={({item}) => {
                    const label =
                      item.type === 'Bank'
                        ? `${item.bankName} (${item.accountNumber})`
                        : `${item.cashName} (${item.cashNameNo})`;

                    const isSelected =
                      selectedAccount &&
                      ((item.type === 'Bank' &&
                        selectedAccount.bankName === item.bankName &&
                        selectedAccount.accountNumber === item.accountNumber) ||
                        (item.type !== 'Bank' &&
                          selectedAccount.cashName === item.cashName &&
                          selectedAccount.cashNameNo === item.cashNameNo));

                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedAccount(item);
                          setShowAccountList(false);
                        }}
                        className={`px-4 py-3 border-b border-gray-200 ${
                          isSelected ? 'bg-purple-200' : 'bg-white'
                        }`}>
                        <Text
                          className={`${
                            isSelected
                              ? 'text-purple-900 font-semibold'
                              : 'text-gray-800'
                          }`}>
                          {label}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  ListEmptyComponent={
                    <View className="px-4 py-3">
                      <Text className="text-gray-500 text-center">
                        No accounts found
                      </Text>
                    </View>
                  }
                />
              </View>
            )}

            {/* Attachment Option */}
            <TouchableOpacity className="flex-row items-center mt-4">
              <Icon name="paperclip" size={20} color="#6B7280" />
              <Text className="text-gray-500 ml-2">Add attachment</Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              className="bg-[#8B5CF6] py-4 rounded-xl mt-auto mb-8"
              onPress={handleAddExpense}>
              <Text className="text-white text-center font-semibold">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ExpenseScreen;
