// HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TransactionItem from '../componets/TransactionItem';
import BottomNavigation from '../componets/BottomNavigation';
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
  strokeWidth: 2.5,
  fillShadowGradientFrom: '#8B5CF6',
  fillShadowGradientFromOpacity: 0.3,
  fillShadowGradientTo: '#8B5CF6',
  fillShadowGradientToOpacity: 0.05,
  propsForBackgroundLines: {
    strokeWidth: 1,
    strokeDasharray: null,
    stroke: "rgba(139, 92, 246, 0.1)",
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#8B5CF6'
  },
  propsForLabels: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  decimalPlaces: 0,
  formatYLabel: (value) => {
    if (value >= 1000) return `₹${(value/1000).toFixed(0)}k`;
    return `₹${value}`;
  },
  labelRotation: 315,
  xLabelsOffset: 15,
  yLabelsOffset: 5,
};

const HomeScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const totalIncome = useSelector(state => state.income.total);
  const transactions = useSelector(state => state.income.transactions);
  const totalExpense = useSelector(state => state.expense.total);
  const expenseTransactions = useSelector(state => state.expense.transactions);
  const balance = totalIncome - totalExpense;
  const transferTransaction = useSelector(state => state.transaction.transactions);


const allTransactions = [...transactions, ...expenseTransactions, ...transferTransaction].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);


  // Function to get date ranges based on selected period
  const getDateRange = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (selectedPeriod) {
      case 'Today':
        return { start: today, points: 24, interval: 'hour' };
      case 'Week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 6);
        return { start: weekStart, points: 7, interval: 'day' };
      case 'Month':
        const monthStart = new Date(today);
        monthStart.setDate(1);
        return { start: monthStart, points: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(), interval: 'day' };
      case 'Year':
        const yearStart = new Date(today.getFullYear(), 0, 1);
        return { start: yearStart, points: 12, interval: 'month' };
      default:
        return { start: today, points: 24, interval: 'hour' };
    }
  };

  // Function to calculate spend data based on date range
  const calculateSpendData = () => {
    const { start, points, interval } = getDateRange();
    const data = new Array(points).fill(0);

    expenseTransactions.forEach(transaction => {
      const txDate = new Date(transaction.date);
      let index = 0;

      switch (interval) {
        case 'hour':
          index = txDate.getHours();
          break;
        case 'day':
          index = Math.floor((txDate - start) / (1000 * 60 * 60 * 24));
          break;
        case 'month':
          index = txDate.getMonth();
          break;
      }

      if (index >= 0 && index < points) {
        data[index] += transaction.amount;
      }
    });

    return data;
  };

  // Get live spend data
  const spendData = calculateSpendData();

  // Function to generate labels based on selected period
  // Modify getLabels function to reduce label density
  const getLabels = () => {
    const now = new Date();
    
    switch (selectedPeriod) {
      case 'Today':
        return Array.from({ length: 12 }, (_, i) => 
          i % 3 === 0 ? `${i.toString().padStart(2, '0')}:00` : ''
        );
      case 'Week':
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = now.getDay();
        return Array.from({ length: 7 }, (_, i) => {
          const dayIndex = (today - 6 + i + 7) % 7;
          return days[dayIndex];
        });
      case 'Month':
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => 
          (i + 1) % 5 === 0 ? `${i + 1}` : ''
        );
      case 'Year':
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      default:
        return [];
    }
  };

  // Get labels for current period
  const periodLabels = getLabels();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView>
        <View className="px-6 pt-4">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
                <Icon name="account" size={20} />
              </View>
            </TouchableOpacity>

            <View className="absolute left-0 right-0 items-center justify-center">
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-base font-semibold">October</Text>
                <Icon name="chevron-down" size={20} color="#000" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Notifi')}>
              <Icon name="bell-outline" size={24} color="#8B5CF6" />
            </TouchableOpacity>
          </View>

          {/* Balance Card */}
          <View className="mt-6 mx-1 bg-purple-50 rounded-2xl p-5 shadow-sm shadow-purple-200">
          <TouchableOpacity onPress={() => navigation.navigate('DashBoard')}>
            <View className="flex justify-center items-center">
              <Text className="text-gray-600 text-sm">Account Balance</Text>
              <Text className="text-3xl font-extrabold mt-1 text-purple-600">₹{balance}</Text>
            </View>
            </TouchableOpacity>
          </View>

          {/* Income and Expense Cards */}
          <View className="flex-row justify-between mt-6">
            <TouchableOpacity 
              className="bg-emerald-500 px-4 py-5 rounded-3xl flex-row items-center justify-center flex-1 mr-3"
              onPress={() => navigation.navigate('Transact', { filter: 'Income' })}
            >
              <View className="bg-white/20 p-3 rounded-full mr-3">
                <Icon name="wallet-outline" size={24} color="#fff" />
              </View>
              <View className="items-center">
                <Text className="text-white text-sm">Income</Text>
                <Text className="text-white font-bold text-lg">₹{totalIncome}</Text>
              </View>
            </TouchableOpacity>
          
            <TouchableOpacity 
              className="bg-red-500 px-4 py-5 rounded-3xl flex-row items-center justify-center flex-1"
              onPress={() => navigation.navigate('Transact', { filter: 'Expense' })}
            >
              <View className="bg-white/20 p-3 rounded-full mr-3">
                <Icon name="credit-card-outline" size={24} color="#fff" />
              </View>
              <View className="items-center">
                <Text className="text-white text-sm">Expenses</Text>
                <Text className="text-white font-bold text-lg">₹{totalExpense}</Text>
              </View>
            </TouchableOpacity>
          </View>

{/* Spend Frequency Graph */}
 {/* Chart Section */}
 <View className="mt-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold">Spending</Text>
              <View className="flex-row">
                {['Today', 'Week', 'Month', 'Year'].map((period) => (
                  <TouchableOpacity
                    key={period}
                    onPress={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-full mr-2 ${
                      selectedPeriod === period
                        ? 'bg-purple-100'
                        : 'bg-gray-50'
                    }`}>
                    <Text
                      className={`${
                        selectedPeriod === period
                          ? 'text-purple-600'
                          : 'text-gray-500'
                      }`}>
                      {period}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <LineChart
              data={{
                labels: periodLabels,
                datasets: [
                  {
                    data: spendData.length > 0 ? spendData : [0],
                  },
                ],
              }}
              width={screenWidth - 32}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 5,
              }}
              withHorizontalLines={true}
              withVerticalLines={false}
              withDots={false}
              withShadow={true}
              withScrollableDot={false}
              segments={5}
            />
          </View>

          {/* Recent Transactions */}
          <View className="mt-6">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold">Recent Transaction</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Transact')}>
                <Text className="text-[#8B5CF6]">See All</Text>
              </TouchableOpacity>
            </View>

         <View className="mt-4 rounded-xl bg-white" style={{ height: 260 }}>
  <ScrollView
    showsVerticalScrollIndicator
    nestedScrollEnabled
    contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 4 }}>
    <View className="space-y-2">
  {allTransactions.slice(0, 6).map((item, index) => {
  const isIncome = transactions.includes(item);
  const isExpense = expenseTransactions.includes(item);
  const isTransfer = transferTransaction.includes(item);

  let iconName = 'cash';
  let title = 'Income';
  let bgColor = 'bg-green-100';
  let iconColor = '#10B981';
  let amountColor = 'text-green-600';
  let amountPrefix = '+';

  if (isExpense) {
    iconName = 'credit-card';
    title = 'Expense';
    bgColor = 'bg-red-100';
    iconColor = '#EF4444';
    amountColor = 'text-red-600';
    amountPrefix = '-';
  } else if (isTransfer) {
    iconName = 'swap-horizontal-bold';
    title = 'Transfer';
    bgColor = 'bg-yellow-100';
    iconColor = '#F59E0B';
    amountColor = 'text-yellow-600';
    amountPrefix = ''; // neutral
  }

  return (
    <TransactionItem
      key={index}
      iconName={iconName}
      title={title}
      subtitle={item.description}
      amount={`${amountPrefix} ₹${item.amount}`}
      time={new Date(item.date).toLocaleTimeString()}
      bgColor={bgColor}
      iconColor={iconColor}
      amountColor={amountColor}
    />
  );
})}

    </View>
  </ScrollView>
</View>

          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default HomeScreen;
