import React, { useState } from 'react';
// ... existing code ...

const AccountSection = ({ cashAccounts, bankAccounts }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Debug logs for received props
  console.log('=== AccountSection Debug Logs ===');
  console.log('Received Props:', {
    cashAccounts,
    bankAccounts
  });

  const openModal = (account) => {
    console.log('Opening Modal for Account:', account);
    setSelectedAccount(account);
    setModalVisible(true);
  };

  const closeModal = () => {
    console.log('Closing Modal, Last Selected Account:', selectedAccount);
    setModalVisible(false);
  };

  const renderAccountItem = (account, isCash) => {
    console.log('Rendering Account Item:', {
      account,
      isCash,
      balance: account.balance,
      identifier: isCash ? account.cashNameNo : account.accountNumber
    });

    // ... existing render code ...
  };

  // Debug when component re-renders
  console.log('AccountSection Render State:', {
    modalVisible,
    selectedAccount,
    totalBankAccounts: bankAccounts.length,
    totalCashAccounts: cashAccounts.length
  });

  // ... existing return statement ...
};

export default AccountSection;