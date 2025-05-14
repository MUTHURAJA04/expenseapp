import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center pt-4">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="w-8"
          >
            <Text className="text-2xl">←</Text>
          </TouchableOpacity>
          <View className="flex-1 items-center -ml-8">
            <Text className="text-xl font-medium">Login</Text>
          </View>
        </View>

        {/* Form Fields */}
        <View className="mt-16">
          <View className="mb-6">
            <TextInput
              placeholder="Email"
              placeholderTextColor="#000"
              keyboardType="email-address"
              className="border border-gray-200 rounded-lg p-4 text-base text-black"
            />
          </View>

          <View className="relative">
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              secureTextEntry={!showPassword}
              className="border border-gray-200 rounded-lg p-4 text-base text-black"
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <Text className="text-lg">👁</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button and Forgot Password */}
        <View className="mt-8">
          <TouchableOpacity className="bg-[#8B5CF6] py-4 rounded-2xl"
           onPress={() => navigation.navigate('Home')}>
            <Text className="text-white text-center font-medium text-base">
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-4">
            <Text className="text-[#b6a2e3] text-center font-extrabold">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View className="flex-1 justify-end mb-8">
          <View className="flex-row justify-center items-center space-x-1">
            <Text className="text-gray-500 text-sm">Don't have an account yet? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text className="text-[#8B5CF6] text-sm">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;