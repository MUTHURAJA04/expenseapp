import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

const SignUpScreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4">
        {/* Header with back button */}
        <View className="flex-row items-center mt-2 ">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
            <Text className="text-2xl font-extrabold">←</Text>
          </TouchableOpacity>

          <View className="flex-1 items-center -ml-10">
            <Text className="text-xl font-semibold">Sign Up</Text>
          </View>
        </View>

        {/* Form Fields */}
        <View className="mt-10">
          <View className="mb-4">
            <TextInput
              placeholder="Name"
              placeholderTextColor="#000000"
              className="border border-gray-300 rounded-xl p-4 text-black"
            />
          </View>

          <View className="mb-4">
            <TextInput
              placeholder="Email"
              placeholderTextColor="#000000"
              keyboardType="email-address"
              className="border border-gray-300 rounded-xl p-4 text-black"
            />
          </View>

          <View className="relative mb-4">
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000000"
              secureTextEntry={!showPassword}
              className="border border-gray-300 rounded-xl p-4 text-black"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4">
              <Text className="text-gray-500">👁</Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Conditions */}
          <View className="flex-row items-start mt-4">
            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              className="mt-2">
              <View
                className={`w-6 h-6 border rounded ${
                  isChecked
                    ? 'bg-[#8B5CF6] border-[#8B5CF6]'
                    : 'border-gray-300'
                }`}>
                {isChecked && <Text className="text-white text-center">✓</Text>}
              </View>
            </TouchableOpacity>
            <Text className="ml-2 text-gray-600 flex-1">
              By signing up, you agree to the{' '}
              <Text className="text-[#8B5CF6]">Terms of Service</Text> and{' '}
              <Text className="text-[#8B5CF6]">Privacy Policy</Text>
            </Text>
          </View>
        </View>

        {/* Sign Up Button */}
        <View className="mt-8">
          <TouchableOpacity className="bg-[#8B5CF6] py-4 rounded-full">
            <Text className="text-white text-center font-semibold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>

          <Text className="text-center mt-4 text-gray-500">Or with</Text>

          {/* Google Sign Up Button */}
          <TouchableOpacity className="mt-4 border border-gray-300 py-4 rounded-full flex-row justify-center items-center space-x-2">
            <Image
              source={require('../assets/google.png')} 
              style={{width: 20, height: 20}}
                className=" mr-3"
              resizeMode="contain"
            />
            <Text className="text-black font-extrabold">
              Sign Up with Google
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-[#8B5CF6] font-semibold">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
