import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Modal 
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBudget, deleteBudget } from '../redux/slices/budgetSlice';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigation from '../componets/BottomNavigation';

const BudgetScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const parties = useSelector(state => state.categories.partyCategories);
  const budgetItems = useSelector(state => state.budget.budgets);

  const [amount, setAmount] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showPartyModal, setShowPartyModal] = useState(false);

  const handleSubmit = () => {
    if (!amount || !selectedParty) {
      Toast.show({ type: 'error', text1: 'Please fill all fields' });
      return;
    }

    const alreadyExists = budgetItems.some(item => item.party === selectedParty);
    if (alreadyExists) {
      Toast.show({
        type: 'error',
        text1: 'Budget for this category already exists',
      });
      return;
    }

    const budgetData = {
      id: Date.now(),
      amount: parseFloat(amount),
      party: selectedParty,
    };

    dispatch(addBudget(budgetData));
    Toast.show({ type: 'success', text1: 'Budget added successfully!' });
    setAmount('');
    setSelectedParty('');
    Keyboard.dismiss();
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const DeleteConfirmationModal = () => (
    <Modal
      visible={showDeleteModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowDeleteModal(false)}
      onShow={() => {
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.5)');
      }}
      onDismiss={() => {
        StatusBar.setBackgroundColor('#8B5CF6');
      }}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 mx-6 w-full max-w-sm">
          <View className="items-center mb-4">
            <View className="w-16 h-16 rounded-full bg-red-100 items-center justify-center mb-3">
              <Icon name="trash-can-outline" size={32} color="#EF4444" />
            </View>
            <Text className="text-xl font-semibold text-gray-900">Delete Budget</Text>
            <Text className="text-gray-500 text-center mt-2">
              Are you sure you want to delete this budget? This action cannot be undone.
            </Text>
          </View>
          
          <View className="flex-row justify-center space-x-6 mt-6">
            <TouchableOpacity
              onPress={() => setShowDeleteModal(false)}
              className="flex-1 bg-gray-100 py-4 px-6 rounded-xl mr-3"
            >
              <Text className="text-gray-700 font-medium text-center">Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                dispatch(deleteBudget(selectedDeleteId));
                setShowDeleteModal(false);
                Toast.show({
                  type: 'success',
                  text1: 'Budget deleted successfully',
                  visibilityTime: 2000,
                });
              }}
              className="flex-1 bg-red-500 py-4 px-6 rounded-xl"
            >
              <Text className="text-white font-medium text-center">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const confirmDelete = (id) => {
    setSelectedDeleteId(id);
    setShowDeleteModal(true);
  };

  const renderBudgetItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => confirmDelete(item.id)}
      className="flex-row justify-between items-center p-4 bg-white rounded-xl mb-3 shadow-sm"
      style={{
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
      }}
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mr-3">
          <Icon name="wallet-outline" size={20} color="#8B5CF6" />
        </View>
        <View>
          <Text className="text-base text-gray-800 font-medium">{item.party}</Text>
          <Text className="text-sm text-gray-500">Long press to delete</Text>
        </View>
      </View>
      <Text className="text-lg text-[#8B5CF6] font-bold">₹{item.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const ListEmptyComponent = () => (
    <View className="flex-1 justify-center items-center py-8">
      <View className="bg-purple-100 p-5 rounded-full mb-4">
        <Icon name="wallet-outline" size={32} color="#8B5CF6" />
      </View>
      <Text className="text-gray-600 text-lg font-medium">No budget items added yet</Text>
      <Text className="text-gray-400 text-sm mt-1">Start by adding a new budget</Text>
    </View>
  );

  const PartyModal = () => (
    <Modal
      visible={showPartyModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowPartyModal(false)}
    >
      <View className="flex-1 bg-black/30 justify-end">
        <View className="bg-white rounded-t-3xl p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-semibold">Select Party</Text>
            <TouchableOpacity onPress={() => setShowPartyModal(false)}>
              <Icon name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView className="max-h-96">
            {parties.map(party => (
              <TouchableOpacity
                key={party.id}
                onPress={() => {
                  setSelectedParty(party.name);
                  setShowPartyModal(false);
                }}
                className={`flex-row items-center p-4 mb-2 rounded-xl ${
                  selectedParty === party.name ? 'bg-purple-50' : 'bg-gray-50'
                }`}
              >
                <View className={`w-10 h-10 rounded-full ${
                  selectedParty === party.name ? 'bg-purple-200' : 'bg-gray-200'
                } items-center justify-center mr-3`}>
                  <Icon 
                    name={party.icon || 'account'} 
                    size={20} 
                    color={selectedParty === party.name ? '#8B5CF6' : '#6B7280'} 
                  />
                </View>
                <View>
                  <Text className={`font-medium ${
                    selectedParty === party.name ? 'text-purple-600' : 'text-gray-800'
                  }`}>{party.name}</Text>
                  {party.location && (
                    <Text className="text-gray-500 text-sm">{party.location}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#8B5CF6]">
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#8B5CF6"
      />
      
      {/* Header */}
      <View className="px-6 pt-12">
        <Text className="text-white text-2xl font-bold text-center mb-6">Budget</Text>
      </View>

      <View className="flex-1 bg-white rounded-t-3xl px-6 pt-8">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Add Budget Card */}
            <View className="bg-gray-50 p-6 rounded-2xl shadow-sm mb-6">
              <Text className="text-xl font-bold text-gray-800 mb-5">Add New Budget</Text>

              <TextInput
                placeholder="Enter amount"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                className="bg-white border border-gray-200 p-4 mb-4 rounded-xl text-gray-800 text-base"
              />

              {/* Party Selector Button */}
              <TouchableOpacity
                onPress={() => setShowPartyModal(true)}
                className="flex-row items-center justify-between bg-white border border-gray-200 p-4 rounded-xl mb-6"
              >
                <View className="flex-row items-center">
                  <Icon name="account" size={20} color="#6B7280" />
                  <Text className="ml-3 text-gray-600">
                    {selectedParty || 'Select Party'}
                  </Text>
                </View>
                <Icon name="chevron-down" size={20} color="#6B7280" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-[#8B5CF6] rounded-xl p-4 items-center justify-center"
              >
                <Text className="text-white font-bold text-lg">Add Budget</Text>
              </TouchableOpacity>
            </View>

            {/* Budget List */}
            <View className="mb-6">
              <Text className="text-xl font-bold text-gray-800 mb-5">Your Budgets</Text>
              <FlatList
                data={budgetItems}
                renderItem={renderBudgetItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={ListEmptyComponent}
                scrollEnabled={false}
                contentContainerStyle={budgetItems.length === 0 ? { flex: 1 } : {}}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <PartyModal />
      <DeleteConfirmationModal />
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default BudgetScreen;