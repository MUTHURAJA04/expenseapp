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
  strokeWidth: 2,
  fillShadowGradientFrom: '#8B5CF6',
  fillShadowGradientFromOpacity: 0.2,
  fillShadowGradientTo: '#8B5CF6',
  fillShadowGradientToOpacity: 0.0,
  propsForBackgroundLines: { strokeWidth: 0 },
  propsForDots: { r: '0' },
  propsForLabels: { opacity: 0 },
  yLabelsOffset: -1000,
  xLabelsOffset: -1000,
};

const dataSets = {
  Today: [20, 30, 25, 40],
  Week: [50, 60, 55, 70, 80, 60, 65],
  Month: [100, 120, 110, 130, 140, 135, 150, 160, 155, 165, 170, 180],
  Year: [300, 400, 350, 450, 500, 480, 520, 530, 550, 570, 590, 600],
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
            <View className="bg-emerald-500 px-4 py-5 rounded-3xl flex-row items-center justify-center flex-1 mr-3">
              <View className="bg-white/20 p-3 rounded-full mr-3">
                <Icon name="wallet-outline" size={24} color="#fff" />
              </View>
              <View className="items-center">
                <Text className="text-white text-sm">Income</Text>
                <Text className="text-white font-bold text-lg">₹{totalIncome}</Text>
              </View>
            </View>

            <View className="bg-red-500 px-4 py-5 rounded-3xl flex-row items-center justify-center flex-1">
              <View className="bg-white/20 p-3 rounded-full mr-3">
                <Icon name="credit-card-outline" size={24} color="#fff" />
              </View>
              <View className="items-center">
                <Text className="text-white text-sm">Expenses</Text>
                <Text className="text-white font-bold text-lg">₹{totalExpense}</Text>
              </View>
            </View>
          </View>

          {/* Spend Frequency Graph */}
          <View className="mt-6">
            <Text className="text-lg font-semibold">Spend Frequency</Text>
            <View className="mt-4 flex justify-center items-center">
              <LineChart
                data={{
                  labels: [],
                  datasets: [{ data: dataSets[selectedPeriod] }],
                }}
                width={screenWidth - 10}
                height={180}
                chartConfig={chartConfig}
                bezier
                withDots={false}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines={false}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                style={{ marginVertical: 8, borderRadius: 16 }}
              />
            </View>

            {/* Period Selector */}
            <View className="flex-row justify-between px-4 mt-2">
              {['Today', 'Week', 'Month', 'Year'].map(period => (
                <TouchableOpacity key={period} onPress={() => setSelectedPeriod(period)}>
                  <View
                    className={`${
                      selectedPeriod === period ? 'bg-amber-100 px-4 py-1 rounded-full' : ''
                    }`}>
                    <Text
                      className={`${
                        selectedPeriod === period
                          ? 'text-[#8B5CF6] font-medium'
                          : 'text-gray-400'
                      }`}>
                      {period}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
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
