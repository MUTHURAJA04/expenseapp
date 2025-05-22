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
import { useSelector } from 'react-redux';
import BottomNavigation from '../componets/BottomNavigation';

const TransactionScreen = ({ navigation, route }) => {
  const initialFilter = route.params?.filter || 'All';
  const [selectedMonth, setSelectedMonth] = useState('Month');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  // Get transactions from Redux store
  const incomeTransactions = useSelector(state => state.income.transactions);
  const expenseTransactions = useSelector(state => state.expense.transactions);
  const transferTransactions = useSelector(state => state.transaction.transactions);

  // Combine and format all transactions
  const allTransactions = [...incomeTransactions, ...expenseTransactions, ...transferTransactions]
    .map(transaction => {
      let icon, bgColor, iconColor, amount;

      if (incomeTransactions.includes(transaction)) {
        icon = 'cash-plus';
        bgColor = 'bg-green-100';
        iconColor = '#10B981';
        amount = `+₹${transaction.amount}`;
      } else if (expenseTransactions.includes(transaction)) {
        icon = 'cash-minus';
        bgColor = 'bg-red-100';
        iconColor = '#EF4444';
        amount = `-₹${transaction.amount}`;
      } else {
        icon = 'bank-transfer';
        bgColor = 'bg-blue-100';
        iconColor = '#3B82F6';
        amount = `₹${transaction.amount}`;
      }

      return {
        id: transaction.date,
        category: transaction.partyName || 'Transfer',
        title: transaction.description,
        amount,
        time: new Date(transaction.date).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        date: new Date(transaction.date).toLocaleDateString(),
        icon,
        bgColor,
        iconColor,
      };
    })
    .sort((a, b) => new Date(b.id) - new Date(a.id));

  // Apply sorting to transactions
  const sortTransactions = (transactions) => {
    switch (selectedSort) {
      case 'Highest':
        return [...transactions].sort((a, b) => parseFloat(b.amount.replace(/[^0-9.-]+/g, "")) - parseFloat(a.amount.replace(/[^0-9.-]+/g, "")));
      case 'Lowest':
        return [...transactions].sort((a, b) => parseFloat(a.amount.replace(/[^0-9.-]+/g, "")) - parseFloat(b.amount.replace(/[^0-9.-]+/g, "")));
      case 'Oldest':
        return [...transactions].sort((a, b) => new Date(a.id) - new Date(b.id));
      case 'Newest':
      default:
        return [...transactions].sort((a, b) => new Date(b.id) - new Date(a.id));
    }
  };

  // Filter transactions based on selected filter and category
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesType = 
      selectedFilter === 'All' ? true :
      selectedFilter === 'Income' ? transaction.amount.includes('+') :
      selectedFilter === 'Expense' ? transaction.amount.includes('-') :
      selectedFilter === 'Transfer' ? (!transaction.amount.includes('+') && !transaction.amount.includes('-')) :
      true;

    const matchesCategory = 
      !selectedCategory || transaction.category === selectedCategory;

    return matchesType && matchesCategory;
  });

  // Sort filtered transactions
  const sortedTransactions = sortTransactions(filteredTransactions);

  // Get unique categories from transactions
  const categories = [...new Set(allTransactions.map(t => t.category))];

  // Group sorted transactions by date
  const groupedTransactions = sortedTransactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

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
        <Text className={`font-semibold ${
          item.amount.includes('+') ? 'text-green-500' : 
          item.amount.includes('-') ? 'text-red-500' : 'text-blue-500'
        }`}>
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
        <TouchableOpacity className="mt-4 bg-purple-50 rounded-xl p-4 flex-row items-center justify-between" onPress={() => navigation.navigate('DashBoard')}>
          <Text className="text-purple-700 font-medium">See your financial report</Text>
          <Icon name="chevron-right" size={24} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <ScrollView className="flex-1 mt-4">
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <View key={date}>
            <Text className="px-4 text-gray-800 font-semibold mb-2">
              {new Date().toLocaleDateString() === date ? 'Today' : 
               new Date(Date.now() - 86400000).toLocaleDateString() === date ? 'Yesterday' : 
               date}
            </Text>
            {transactions.map(item => (
              <TransactionItem key={item.id} item={item} />
            ))}
          </View>
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
              <TouchableOpacity 
                onPress={() => {
                  setSelectedFilter('All');
                  setSelectedSort('Newest');
                  setSelectedCategory('');
                  setShowFilterModal(false);
                }}
              >
                <Text className="text-purple-600">Reset</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-gray-600 mb-3">Filter By</Text>
            <View className="flex-row space-x-3 mb-6">
              {['All', 'Income', 'Expense', 'Transfer'].map(filter => (
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
            <TouchableOpacity
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex-row justify-between items-center p-4 bg-gray-50 rounded-xl mb-2"
            >
              <Text className="text-gray-600">
                {selectedCategory || 'Select Category'}
              </Text>
              <Icon 
                name={showCategoryDropdown ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#666"
              />
            </TouchableOpacity>

            {showCategoryDropdown && (
              <View className="bg-white rounded-xl border border-gray-200 mt-1">
                {categories.map(category => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => {
                      setSelectedCategory(category === selectedCategory ? '' : category);
                      setShowCategoryDropdown(false);
                    }}
                    className={`p-4 border-b border-gray-100 ${
                      category === selectedCategory ? 'bg-purple-50' : ''
                    }`}
                  >
                    <Text className={`${
                      category === selectedCategory ? 'text-purple-600' : 'text-gray-600'
                    }`}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity 
              className="bg-purple-600 py-4 rounded-xl mt-6"
              onPress={() => setShowFilterModal(false)}
            >
              <Text className="text-white text-center font-semibold">Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNavigation />
    </SafeAreaView>
  );
};

export default TransactionScreen;