import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PieChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import BottomNavigation from '../componets/BottomNavigation';
import AccountSection from '../componets/AccountSection';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = ({navigation}) => {
  const totalIncome = useSelector(state => state.income.total);
  const totalExpense = useSelector(state => state.expense.total);
  const expenseTransactions = useSelector(state => state.expense.transactions);
  const incomeTransactions = useSelector(state => state.income.transactions);
  const transferTransactions = useSelector(state => state.transaction.transactions);
  const accounts = useSelector(state => state.categories.accounts);

  // Calculate balances for all accounts including transfers
  const accountsWithBalances = accounts.map(account => {
    const idKey = account.type === 'Bank' ? 'accountNumber' : 'cashNameNo';
    const idValue = account[idKey];
    
    const displayName = account.type === 'Bank'
      ? `${account.bankName} (${account.accountNumber})`
      : `${account.cashName} (${account.cashNameNo})`;

    // Calculate income
    const incomeTotal = incomeTransactions
      .filter(txn => txn.accountName === displayName && txn.accountType === account.type)
      .reduce((sum, txn) => sum + txn.amount, 0);

    // Calculate expenses
    const expenseTotal = expenseTransactions
      .filter(txn => txn.accountName === displayName && txn.accountType === account.type)
      .reduce((sum, txn) => sum + txn.amount, 0);

    // Calculate transfers out (subtract)
    const transfersOut = transferTransactions
      .filter(txn => 
        txn.fromAccount[idKey] === idValue && 
        txn.fromAccount.type === account.type
      )
      .reduce((sum, txn) => sum + txn.amount, 0);

    // Calculate transfers in (add)
    const transfersIn = transferTransactions
      .filter(txn => 
        txn.toAccount[idKey] === idValue && 
        txn.toAccount.type === account.type
      )
      .reduce((sum, txn) => sum + txn.amount, 0);

    const balance = incomeTotal - expenseTotal - transfersOut + transfersIn;

    return {
      ...account,
      balance,
      displayName,
    };
  });

  // Separate accounts into bank and cash arrays with balances
  const bankAccounts = accountsWithBalances.filter(acc => acc.type === 'Bank');
  const cashAccounts = accountsWithBalances.filter(acc => acc.type === 'Cash');

  // Calculate total bank and cash balances including transfers
  const calculateTotals = () => {
    let bankTotal = 0;
    let cashTotal = 0;

    // Process income
    incomeTransactions.forEach(transaction => {
      if (transaction.accountType === 'Bank') {
        bankTotal += transaction.amount;
      } else {
        cashTotal += transaction.amount;
      }
    });

    // Process expenses
    expenseTransactions.forEach(transaction => {
      if (transaction.accountType === 'Bank') {
        bankTotal -= transaction.amount;
      } else {
        cashTotal -= transaction.amount;
      }
    });

    // Process transfers
    transferTransactions.forEach(transaction => {
      // Subtract from "fromAccount"
      if (transaction.fromAccount.type === 'Bank') {
        bankTotal -= transaction.amount;
      } else {
        cashTotal -= transaction.amount;
      }
      
      // Add to "toAccount"
      if (transaction.toAccount.type === 'Bank') {
        bankTotal += transaction.amount;
      } else {
        cashTotal += transaction.amount;
      }
    });

    return {bankTotal, cashTotal};
  };

  const {bankTotal, cashTotal} = calculateTotals();

  // Stats for total income, expense, balance
  const stats = [
    {
      title: 'Total Income',
      amount: `₹${totalIncome}`,
      icon: 'cash-multiple',
      color: '#10B981',
    },
    {
      title: 'Total Expense',
      amount: `₹${totalExpense}`,
      icon: 'cash-minus',
      color: '#EF4444',
    },
    {
      title: 'Total Balance',
      amount: `₹${totalIncome - totalExpense}`,
      icon: 'wallet',
      color: '#8B5CF6',
    },
  ];

  // Category totals for pie chart (only expenses)
  const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
    const category = transaction.partyName;
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryTotals).map(
    ([name, amount], index) => ({
      name,
      population: amount,
      color: ['#F59E0B', '#EC4899', '#3B82F6', '#8B5CF6', '#10B981'][index % 5],
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    }),
  );

  // Recent transactions (include transfers)
  const allTransactions = [
    ...incomeTransactions.map(t => ({...t, transactionType: 'income'})),
    ...expenseTransactions.map(t => ({...t, transactionType: 'expense'})),
    ...transferTransactions.map(t => ({...t, transactionType: 'transfer'}))
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4)
    .map(transaction => {
      if (transaction.transactionType === 'income') {
        return {
          category: transaction.partyName,
          amount: `₹${transaction.amount}`,
          date: new Date(transaction.date).toLocaleDateString(),
          icon: 'cash-plus',
          color: '#10B981',
        };
      } else if (transaction.transactionType === 'expense') {
        return {
          category: transaction.partyName,
          amount: `₹${transaction.amount}`,
          date: new Date(transaction.date).toLocaleDateString(),
          icon: 'cash-minus',
          color: '#EF4444',
        };
      } else { // transfer
        return {
          category: `Transfer to ${transaction.toAccountName}`,
          amount: `₹${transaction.amount}`,
          date: new Date(transaction.date).toLocaleDateString(),
          icon: 'bank-transfer',
          color: '#3B82F6',
        };
      }
    });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView className="flex-1">
        <View className="px-6 pt-4">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-bold">Dashboard</Text>
            <TouchableOpacity
              className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center"
              onPress={() => navigation.navigate('Profile')}>
              <Icon name="account" size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6">
            {stats.map((stat, index) => (
              <View
                key={index}
                className="bg-white p-4 rounded-xl mr-4 shadow-sm"
                style={{minWidth: screenWidth * 0.4}}>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-gray-600">{stat.title}</Text>
                  <Icon name={stat.icon} size={24} color={stat.color} />
                </View>
                <Text className="text-xl font-bold">{stat.amount}</Text>
              </View>
            ))}
          </ScrollView>

          <View className="flex-row justify-between mb-6">
            <View className="flex-1 bg-[#FEF3C7] rounded-2xl px-4 py-5 mr-2 shadow-md">
              <View className="flex-row items-center mb-3">
                <View className="bg-[#FBBF24] w-10 h-10 rounded-full items-center justify-center mr-3">
                  <Icon name="cash" size={22} color="white" />
                </View>
                <Text className="text-gray-800 text-base font-semibold">
                  Cash
                </Text>
              </View>
              <Text className="text-2xl font-bold text-gray-900">
                ₹{cashTotal}
              </Text>
            </View>
            <View className="flex-1 bg-[#DBEAFE] rounded-2xl px-4 py-5 ml-2 shadow-md">
              <View className="flex-row items-center mb-3">
                <View className="bg-[#3B82F6] w-10 h-10 rounded-full items-center justify-center mr-3">
                  <Icon name="bank" size={22} color="white" />
                </View>
                <Text className="text-gray-800 text-base font-semibold">
                  Bank
                </Text>
              </View>
              <Text className="text-2xl font-bold text-gray-900">
                ₹{bankTotal}
              </Text>
            </View>
          </View>

          <AccountSection
            cashAccounts={cashAccounts}
            bankAccounts={bankAccounts}
          />

          <View className="bg-white p-4 rounded-xl mb-6 shadow-sm">
            <Text className="text-lg font-semibold mb-4">
              Expense Distribution
            </Text>
            {pieChartData.length > 0 ? (
              <PieChart
                data={pieChartData}
                width={screenWidth - 48}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                hasLegend={true}
              />
            ) : (
              <Text className="text-center text-gray-500">
                No expense data available
              </Text>
            )}
          </View>

          <View>
            <Text className="text-lg font-semibold mb-4">
              Recent Transactions
            </Text>
            {allTransactions.map((transaction, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3 shadow-sm">
                <View className="flex-row items-center">
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{backgroundColor: `${transaction.color}20`}}>
                    <Icon
                      name={transaction.icon}
                      size={20}
                      color={transaction.color}
                    />
                  </View>
                  <View>
                    <Text className="font-medium">{transaction.category}</Text>
                    <Text className="text-gray-500 text-sm">
                      {transaction.date}
                    </Text>
                  </View>
                </View>
                <Text
                  className={`font-semibold ${
                    transaction.icon === 'cash-plus'
                      ? 'text-green-500'
                      : transaction.icon === 'cash-minus'
                      ? 'text-red-500'
                      : 'text-blue-500'
                  }`}>
                  {transaction.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default DashboardScreen;