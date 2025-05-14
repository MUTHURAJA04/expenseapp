import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TransactionItem from '../componets/TransactionItem';
import NavItem from '../componets/NavItem';

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
  propsForBackgroundLines: {
    strokeWidth: 0,
  },
  propsForDots: {
    r: '0',
  },
  propsForLabels: {
    opacity: 0,
  },
  yLabelsOffset: -1000,
  xLabelsOffset: -1000,
};

const dataSets = {
  Today: [20, 30, 25, 40],
  Week: [50, 60, 55, 70, 80, 60, 65],
  Month: [100, 120, 110, 130, 140, 135, 150, 160, 155, 165, 170, 180],
  Year: [300, 400, 350, 450, 500, 480, 520, 530, 550, 570, 590, 600],
};

const HomeScreen = ({navigation}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [isAdding, setIsAdding] = useState(false);
  const periodLabels = {
    Today: ['9AM', '12PM', '3PM', '6PM'],
    Week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    Month: [
      'W1',
      'W2',
      'W3',
      'W4',
      'W5',
      'W6',
      'W7',
      'W8',
      'W9',
      'W10',
      'W11',
      'W12',
    ],
    Year: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView>
        <View className="px-6 pt-4">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            {/* Profile icon (left-aligned) */}

            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
                <Icon name="account" size={20} />
              </View>
            </TouchableOpacity>

            {/* Centered month selector */}
            <View className="absolute left-0 right-0 items-center justify-center">
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-base  font-semibold">October</Text>
                <Icon
                  name="chevron-down"
                  size={20}
                  color="#000"
                  style={{marginLeft: 4}}
                />
              </TouchableOpacity>
            </View>

            {/* Notification icon (right-aligned) */}
            <TouchableOpacity onPress={() => navigation.navigate('Notifi')}>
              <Icon name="bell-outline" size={24} color="#8B5CF6" />
            </TouchableOpacity>
          </View>

          {/* Account Balance */}
          {/* Account Balance */}
          <View className="mt-6 mx-1 bg-purple-50 rounded-2xl p-5 shadow-sm shadow-purple-200">
            <View className="flex justify-center items-center">
              <Text className="text-gray-600 text-sm">Account Balance</Text>
              <Text className="text-3xl font-extrabold mt-1 text-purple-600">
                ₹ 9400
              </Text>
            </View>
          </View>

          {/* Income/Expense Cards */}
          <View className="flex-row justify-between mt-6">
            {/* Income Card */}
            <View className="bg-emerald-500 px-4 py-5 rounded-3xl flex-row items-center justify-center flex-1 mr-3">
              <View className="bg-white/20 p-3 rounded-full mr-3">
                <Icon name="wallet-outline" size={24} color="#fff" />
              </View>
              <View className="items-center">
                <Text className="text-white text-sm">Income</Text>
                <Text className="text-white font-bold text-lg">₹5000</Text>
              </View>
            </View>

            {/* Expense Card */}
            <View className="bg-red-500 px-4 py-5 rounded-3xl flex-row items-center justify-center flex-1">
              <View className="bg-white/20 p-3 rounded-full mr-3">
                <Icon name="credit-card-outline" size={24} color="#fff" />
              </View>
              <View className="items-center">
                <Text className="text-white text-sm">Expenses</Text>
                <Text className="text-white font-bold text-lg">₹1200</Text>
              </View>
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-lg font-semibold">Spend Frequency</Text>

            <View className="mt-4 flex justify-center items-center">
              <LineChart
                data={{
                  labels: [], // hidden labels
                  datasets: [
                    {
                      data: dataSets[selectedPeriod],
                    },
                  ],
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
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>

            {/* Period Selector */}
            <View className="flex-row justify-between px-4 mt-2">
              {['Today', 'Week', 'Month', 'Year'].map(period => (
                <TouchableOpacity
                  key={period}
                  onPress={() => setSelectedPeriod(period)}>
                  <View
                    className={`${
                      selectedPeriod === period
                        ? 'bg-amber-100 px-4 py-1 rounded-full'
                        : ''
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
          <View className="mt-6 ">
            {/* Header Row */}
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold">Recent Transaction</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Transact')}>
                <Text className="text-[#8B5CF6]">See All</Text>
              </TouchableOpacity>
            </View>

            {/* Scrollable Transaction List */}
            <View className="mt-4 rounded-xl bg-white" style={{height: 260}}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
                contentContainerStyle={{
                  paddingVertical: 8,
                  paddingHorizontal: 4,
                }}>
                <View className="space-y-2">
                  <TransactionItem
                    iconName="shopping"
                    title="Shopping"
                    subtitle="Buy some grocery"
                    amount="- $120"
                    time="10:00 AM"
                    bgColor="bg-orange-100"
                    iconColor="#F97316"
                  />
                  <TransactionItem
                    iconName="food"
                    title="Restaurant"
                    subtitle="Dinner at La Pino's"
                    amount="- $45"
                    time="08:15 PM"
                    bgColor="bg-red-100"
                    iconColor="#EF4444"
                  />

                  <TransactionItem
                    iconName="youtube-subscription"
                    title="Subscription"
                    subtitle="YouTube Premium"
                    amount="- $11.99"
                    time="06:00 AM"
                    bgColor="bg-purple-100"
                    iconColor="#8B5CF6"
                  />

                  <TransactionItem
                    iconName="taxi"
                    title="Transport"
                    subtitle="Cab to Office"
                    amount="- $18"
                    time="09:00 AM"
                    bgColor="bg-yellow-100"
                    iconColor="#FACC15"
                  />

                  <TransactionItem
                    iconName="movie"
                    title="Entertainment"
                    subtitle="Movie Tickets"
                    amount="- $30"
                    time="07:00 PM"
                    bgColor="bg-indigo-100"
                    iconColor="#6366F1"
                  />

                  <TransactionItem
                    iconName="cellphone"
                    title="Mobile Bill"
                    subtitle="Monthly Plan"
                    amount="- $25"
                    time="11:00 AM"
                    bgColor="bg-blue-100"
                    iconColor="#3B82F6"
                  />

                  <TransactionItem
                    iconName="cash"
                    title="Salary"
                    subtitle="Monthly Salary"
                    amount="+ $5000"
                    time="01:00 AM"
                    bgColor="bg-green-100"
                    iconColor="#10B981"
                  />

                  <TransactionItem
                    iconName="shopping"
                    title="Shopping"
                    subtitle="Buy some grocery"
                    amount="- $120"
                    time="10:00 AM"
                    bgColor="bg-orange-100"
                    iconColor="#F97316"
                  />

                  <TransactionItem
                    iconName="youtube-subscription"
                    title="Subscription"
                    subtitle="YouTube Premium"
                    amount="- $11.99"
                    time="06:00 AM"
                    bgColor="bg-purple-100"
                    iconColor="#8B5CF6"
                  />

                  <TransactionItem
                    iconName="taxi"
                    title="Transport"
                    subtitle="Cab to Office"
                    amount="- $18"
                    time="09:00 AM"
                    bgColor="bg-yellow-100"
                    iconColor="#FACC15"
                  />

                  <TransactionItem
                    iconName="movie"
                    title="Entertainment"
                    subtitle="Movie Tickets"
                    amount="- $30"
                    time="07:00 PM"
                    bgColor="bg-indigo-100"
                    iconColor="#6366F1"
                  />

                  <TransactionItem
                    iconName="cellphone"
                    title="Mobile Bill"
                    subtitle="Monthly Plan"
                    amount="- $25"
                    time="11:00 AM"
                    bgColor="bg-blue-100"
                    iconColor="#3B82F6"
                  />

                  <TransactionItem
                    iconName="youtube-subscription"
                    title="Subscription"
                    subtitle="YouTube Premium"
                    amount="- $11.99"
                    time="06:00 AM"
                    bgColor="bg-purple-100"
                    iconColor="#8B5CF6"
                  />

                  <TransactionItem
                    iconName="taxi"
                    title="Transport"
                    subtitle="Cab to Office"
                    amount="- $18"
                    time="09:00 AM"
                    bgColor="bg-yellow-100"
                    iconColor="#FACC15"
                  />

                  <TransactionItem
                    iconName="movie"
                    title="Entertainment"
                    subtitle="Movie Tickets"
                    amount="- $30"
                    time="07:00 PM"
                    bgColor="bg-indigo-100"
                    iconColor="#6366F1"
                  />

                  <TransactionItem
                    iconName="cellphone"
                    title="Mobile Bill"
                    subtitle="Monthly Plan"
                    amount="- $25"
                    time="11:00 AM"
                    bgColor="bg-blue-100"
                    iconColor="#3B82F6"
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>


      {/* Bottom Navigation */}
<View className="flex-row justify-between items-center px-6 py-4 bg-white border-t border-gray-100">
  <NavItem iconName="home" label="Home" active />
  <NavItem
    iconName="credit-card"
    label="Transaction"
    onPress={() => navigation.navigate('Transact')}
  />
  {isAdding ? (
    <>
      {/* Quick Action Options */}
      <View className="absolute -top-20 left-0 right-0">
        <View className="flex-row justify-center">
          <TouchableOpacity className="absolute left-28 p-4 top-2"  onPress={() => navigation.navigate('Income')} >
            <View className="bg-green-500 w-14 h-14 rounded-full items-center justify-center">
              <Icon name="cash-plus" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="absolute ml-2  -top-4" onPress={() => navigation.navigate('Transfer')}>
            <View className=" bg-blue-500 w-14 h-14 rounded-full items-center justify-center">
              <Icon name="swap-horizontal" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="absolute right-28 p-4 top-2" onPress={() => navigation.navigate('Expense')}>
            <View className="bg-red-500 w-14 h-14 rounded-full items-center justify-center">
              <Icon name="cash-minus" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className="bg-[#8B5CF6] p-4 rounded-full -mt-8"
        onPress={() => setIsAdding(false)}
      >
        <Icon name="close" size={24} color="#fff" />
      </TouchableOpacity>
    </>
  ) : (
    <TouchableOpacity
      className="bg-[#8B5CF6] p-4 rounded-full -mt-8"
      onPress={() => setIsAdding(true)}
    >
      <Icon name="plus" size={24} color="#fff" />
    </TouchableOpacity>
  )}
  <NavItem
    iconName="chart-bar"
    label="Budget"
    onPress={() => navigation.navigate('Budget')}
  />
  <NavItem
    iconName="account"
    label="Profile"
    onPress={() => navigation.navigate('Profile')}
  />
</View>
    </SafeAreaView>
  );
};

export default HomeScreen;
