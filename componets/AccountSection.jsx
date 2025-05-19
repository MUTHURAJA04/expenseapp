import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AccountSection = ({ cashAccounts, bankAccounts }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (account) => {
    setSelectedAccount(account);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedAccount(null);
    setModalVisible(false);
  };

  return (
    <View className="mb-6 rounded-2xl bg-white shadow-lg border border-gray-200">
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="w-11/12 bg-white rounded-2xl p-5 shadow-xl">
            {selectedAccount && (
              <>
                <Text className="text-xl font-bold text-gray-800 mb-3">
                  {selectedAccount.type === 'Bank' ? '🏦 Bank Account' : '💵 Cash Account'}
                </Text>
                <Text className="text-base text-gray-700 font-medium mb-1">
                  Name: {selectedAccount.bankName || selectedAccount.cashName}
                </Text>
                {selectedAccount.accountNumber && (
                  <Text className="text-base text-gray-600 mb-1">
                    A/C Number: {selectedAccount.accountNumber}
                  </Text>
                )}
                {selectedAccount.cashNameNo && (
                  <Text className="text-base text-gray-600 mb-1">
                    Cash ID: {selectedAccount.cashNameNo}
                  </Text>
                )}
                <Text className="text-base font-bold mt-3">
                  Balance: ₹{selectedAccount.balance.toLocaleString()}
                </Text>

                <Pressable
                  onPress={closeModal}
                  className="mt-6 bg-purple-600 rounded-xl py-3"
                >
                  <Text className="text-white text-center font-semibold">Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Cash Accounts */}
      {cashAccounts.length > 0 && (
        <View className="px-4 pt-5">
          <Text className="text-xl font-bold text-gray-900 mb-3">💵 Cash Accounts</Text>
          <ScrollView className="max-h-64" nestedScrollEnabled>
            {cashAccounts.map((acc, index) => (
              <TouchableOpacity
                key={`cash-${index}`}
                onPress={() => openModal({ ...acc, type: 'Cash' })}
                className="flex-row justify-between items-center py-4 border-b border-gray-100 last:border-0"
              >
                <View>
                  <Text className="text-base font-medium text-gray-800">{acc.cashName}</Text>
                  {acc.cashNameNo && (
                    <Text className="text-xs text-gray-500 mt-1">{acc.cashNameNo}</Text>
                  )}
                </View>
                <Text className="text-base font-bold text-green-600">
                  ₹{acc.balance.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Divider */}
      {cashAccounts.length > 0 && bankAccounts.length > 0 && (
        <View className="h-[1px] bg-gray-100 mx-4 my-2" />
      )}

      {/* Bank Accounts */}
      {bankAccounts.length > 0 && (
        <View className="px-4 pb-5">
          <Text className="text-xl font-bold text-gray-900 mb-3">🏦 Bank Accounts</Text>
          <ScrollView className="max-h-64" nestedScrollEnabled>
            {bankAccounts.map((acc, index) => (
              <TouchableOpacity
                key={`bank-${index}`}
                onPress={() => openModal({ ...acc, type: 'Bank' })}
                className="flex-row justify-between items-center py-4 border-b border-gray-100 last:border-0"
              >
                <View>
                  <Text className="text-base font-medium text-gray-800">{acc.bankName}</Text>
                  {acc.accountNumber && (
                    <Text className="text-xs text-gray-500 mt-1">
                      A/C: •••• {acc.accountNumber.slice(-4)}
                    </Text>
                  )}
                </View>
                <Text className="text-base font-bold text-blue-600">
                  ₹{acc.balance.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default AccountSection;
