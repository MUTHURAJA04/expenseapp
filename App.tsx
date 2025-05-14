import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Add this import
import LandingScreen from './screens/LandingScreen';
import OnboardScreen from './screens/OnboardScreen';
import './global.css';
import SingupScreen from './screens/SingupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import TransactionScreen from './screens/TransactionScreen';
import BudgetScreen from './screens/BudgetScreen';
import ExpenseScreen from './screens/ExpenseScreen';
import IncomeScreen from './screens/IncomeScreen';
import TransferScreen from './screens/TransferScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* Wrap your NavigationContainer */}
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="SignUp" component={SingupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Notifi" component={NotificationScreen} />
          <Stack.Screen name="Transact" component={TransactionScreen} />
          <Stack.Screen name="Budget" component={BudgetScreen} />
          <Stack.Screen name="Expense" component={ExpenseScreen} />
          <Stack.Screen name="Income" component={IncomeScreen} />
          <Stack.Screen name="Transfer" component={TransferScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;