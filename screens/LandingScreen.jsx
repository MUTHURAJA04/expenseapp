import { View, Text, SafeAreaView, Pressable, Image,StatusBar } from 'react-native';
import React from 'react';

const LandingScreen = ({ navigation }) => {
  return (
    <Pressable onPress={() => navigation.navigate('Onboard')} className="flex-1">
        <StatusBar 
      barStyle="light-content" // This makes the icons white
      backgroundColor="#8B5CF6" // This matches your purple header
    />
      <SafeAreaView className="flex-1 bg-[#8B5CF6] items-center justify-center">
        <Image
          source={require('../assets/1.png')}
          className="w-24 h-24 mb-4"
        />
        <Text className="text-white text-4xl font-bold">SpendWise</Text>
      </SafeAreaView>
    </Pressable>
  );
};

export default LandingScreen;
