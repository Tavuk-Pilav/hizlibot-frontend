import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  StyleSheet,
} from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [messageIdCounter, setMessageIdCounter] = useState(1);

  const handleSend = (text) => {
    if (text.trim() !== '') {
      let newMessages = [...messages];
      const newMessage = { id: messageIdCounter, text, sender: 'user' };
      setMessageIdCounter(prevId => prevId + 1);
      newMessages.push(newMessage);

      if (text === 'Fatura İşlemleri') {
        newMessages.push({
          id: messageIdCounter + 1,
          text: 'Ödemek istediğiniz faturayı seçiniz:',
          sender: 'system',
          showOptions: true,
          actionType: text,
        });
        setMessageIdCounter(prevId => prevId + 2);
      } else if (text === 'Para Transferleri') {
        newMessages.push({
          id: messageIdCounter + 1,
          text: 'Para Transferi Seçenekleri:',
          sender: 'system',
          showOptions: true,
          actionType: text,
        });
        setMessageIdCounter(prevId => prevId + 2);
      } else if (text === 'Oğlumun Fibabanka Hesabı') {
        newMessages.push({
          id: messageIdCounter + 1,
          text: 'Hesap Seçiniz:',
          sender: 'system',
          showOptions: true,
          actionType: text,
        });
        setMessageIdCounter(prevId => prevId + 2);
      } else if (text === 'Eşimin Fibabanka Hesabı') {
        newMessages.push({
          id: messageIdCounter + 1,
          text: 'Hesap Seçiniz:',
          sender: 'system',
          showOptions: true,
          actionType: text,
        });
        setMessageIdCounter(prevId => prevId + 2);
      } else if (text === 'Beşiktaş Hesabı' || text === 'Dijital Hesap') {
        newMessages.push({
          id: messageIdCounter + 1,
          text: 'Tutar giriniz',
          sender: 'system',
          actionType: text,
        });
        setMessageIdCounter(prevId => prevId + 2);
      } else {
        newMessages.push({ id: messageIdCounter + 1, text: 'Automatic reply', sender: 'system' });
        setMessageIdCounter(prevId => prevId + 2);
      }

      setMessages(newMessages);
      setInputText('');
    }
  };

  const handleQuickAction = (action) => {
    setModalVisible(false);
    handleSend(action);
  };

  const handleOptionSelect = (option) => {
    const updatedMessages = messages.map((msg) => {
      if (msg.showOptions) {
        return { ...msg, showOptions: false };
      }
      return msg;
    });
    setMessages(updatedMessages);
    handleSend(option);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessageContainer : styles.systemMessageContainer]}>
      {item.sender === 'system' && <Image source={require('./image.png')} style={styles.profileImage} />}
      <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.systemBubble]}>
        <Text style={styles.messageText}>{item.text}</Text>
        {item.showOptions && (
          <View style={styles.quickActionsContainer}>
            {renderQuickActions(item.actionType, item.id)}
          </View>
        )}
      </View>
    </View>
  );

  const renderQuickActions = (actionType, messageId) => {
    const isDisabled = messages.some(msg => msg.id === messageId && !msg.showOptions);

    if (actionType === 'Fatura İşlemleri') {
      return (
        <>
          <TouchableOpacity
            style={[styles.quickAction, isDisabled && styles.disabledQuickAction]}
            onPress={() => handleOptionSelect('Elektrik Faturam')}
            disabled={isDisabled}
          >
            <Text style={styles.quickActionText}>Elektrik Faturam</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAction, isDisabled && styles.disabledQuickAction]}
            onPress={() => handleOptionSelect('Doğalgaz Faturam')}
            disabled={isDisabled}
          >
            <Text style={styles.quickActionText}>Doğalgaz Faturam</Text>
          </TouchableOpacity>
        </>
      );
    } else if (actionType === 'Para Transferleri') {
      return (
        <>
          <TouchableOpacity
            style={[styles.quickAction, isDisabled && styles.disabledQuickAction]}
            onPress={() => handleOptionSelect('Oğlumun Fibabanka Hesabı')}
            disabled={isDisabled}
          >
            <Text style={styles.quickActionText}>Oğlumun Fibabanka Hesabı</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAction, isDisabled && styles.disabledQuickAction]}
            onPress={() => handleOptionSelect('Eşimin Fibabanka Hesabı')}
            disabled={isDisabled}
          >
            <Text style={styles.quickActionText}>Eşimin Fibabanka Hesabı</Text>
          </TouchableOpacity>
        </>
      );
    } else if (actionType === 'Oğlumun Fibabanka Hesabı') {
      return (
        <>
          <TouchableOpacity
            style={[styles.quickAction, isDisabled && styles.disabledQuickAction]}
            onPress={() => handleOptionSelect('Beşiktaş Hesabı')}
            disabled={isDisabled}
          >
            <Text style={styles.quickActionText}>Beşiktaş Hesabı</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAction, isDisabled && styles.disabledQuickAction]}
            onPress={() => handleOptionSelect('Dijital Hesap')}
            disabled={isDisabled}
          >
            <Text style={styles.quickActionText}>Dijital Hesap</Text>
          </TouchableOpacity>
        </>
      );
    }
    else if (actionType === 'Eşimin Fibabanka Hesabı') {
      return (
        <>
          <TouchableOpacity
            style={[styles.quickAction, isDisabled && styles.disabledQuickAction]}
            onPress={() => handleOptionSelect('Beşiktaş Hesabı')}
            disabled={isDisabled}
          >
            <Text style={styles.quickActionText}>Beşiktaş Hesabı</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAction, isDisabled && styles.disabledQuickAction]}
            onPress={() => handleOptionSelect('Dijital Hesap')}
            disabled={isDisabled}
          >
            <Text style={styles.quickActionText}>Dijital Hesap</Text>
          </TouchableOpacity>
        </>
      );
    }
    return null;
  };

  const quickActions = [
    'Fatura İşlemleri',
    'Para Transferleri',
    'Kart Borcu Ödeme'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Hızlı Bot</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.chatArea}
      />
      <View style={styles.inputArea}>
        <TouchableOpacity style={styles.circleButton} onPress={() => setModalVisible(true)} />
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ne yapmak istersiniz?"
        />
        <TouchableOpacity style={styles.circleButton} onPress={() => handleSend(inputText)}>
          <Text style={styles.sendButtonText}>→</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Hızlı İşlemler</Text>
            <View style={styles.divider} />
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.modalItem} onPress={() => handleQuickAction(action)}>
                <Text style={styles.modalItemText}>{action}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#166aa8',
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  sendButtonText: {
    fontSize: 24,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  systemMessageContainer: {
    justifyContent: 'flex-start',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 18,
  },
  userBubble: {
    backgroundColor: 'rgba(0, 128, 0, 0.2)',
    alignSelf: 'flex-end',
  },
  systemBubble: {
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
    alignSelf: 'flex-start',
  },
  modalBackground: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 70,
    left: 10,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 200,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 10,
    color: 'blue',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    fontSize: 18,
  },
  quickActionsContainer: {
    marginTop: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 8,
    alignSelf: 'flex-start',
  },
  quickActionText: {
    fontSize: 16,
    color: '#4682B4',
  },
  disabledQuickAction: {
    opacity: 0.5, // Opacity to indicate disabled state
  },
});

export default ChatScreen;
