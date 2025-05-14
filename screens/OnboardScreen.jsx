import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const {width, height} = Dimensions.get('window');

const carouselData = [
  {
    image: require('../assets/1.png'),
    title: 'Track Your Expenses',
    subtitle: 'Monitor your spending habits and identify areas to save'
  },
  {
    image: require('../assets/2.png'),
    title: 'Set Financial Goals',
    subtitle: 'Plan for your future with personalized savings targets'
  },
  {
    image: require('../assets/3.png'),
    title: 'Smart Budgeting',
    subtitle: 'Allocate your income wisely across different categories'
  },
];

const OnboardingScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
         <StatusBar 
            barStyle="dark-content" 
            backgroundColor="white"
          />
      <View className="flex-1 px-4">
        {/* Carousel with Text */}
        <View className="flex-1 justify-center">
          <Carousel
            width={width * 0.9}
            height={height * 0.5}
            autoPlay={true}
            data={carouselData}
            scrollAnimationDuration={1000}
            renderItem={({item, index}) => (
              <View className="items-center justify-center">
                <Image
                  source={item.image}
                  className="w-full h-64 rounded-lg"
                  resizeMode="contain"
                />
                <View className="mt-8 px-4">
                  <Text className="text-2xl font-bold text-center mb-2">
                    {item.title}
                  </Text>
                  <Text className="text-gray-500 text-center text-base">
                    {item.subtitle}
                  </Text>
                </View>
              </View>
            )}
            loop
          />
        </View>

        {/* Buttons */}
        <View className="mb-8 space-y-4">
          <TouchableOpacity
            className="bg-[#8B5CF6] py-4 rounded-full mb-4"
            onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-white text-center font-semibold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#EDE9FE] py-4 rounded-full"
            onPress={() => navigation.navigate('Login')}>
            <Text className="text-[#8B5CF6] text-center font-semibold text-lg">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;