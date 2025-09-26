import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { RootStack } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenProps = NativeStackNavigationProp<RootStack, 'HomeScreen'>;

const chats = [
  {
    id: 1,
    name: 'Wishwa',
    lastMessage: 'See you tomorrow!',
    time: '10:45 AM',
    unread: 2,
    profile: require('../../assets/avatar/avatar_1.png'),
  },
  {
    id: 2,
    name: 'Chamod',
    lastMessage: 'Got the documents, thanks!',
    time: '9:30 AM',
    unread: 0,
    profile: require('../../assets/avatar/avatar_2.png'),
  },
  {
    id: 3,
    name: 'Dinithi',
    lastMessage: 'Lunch at 1?',
    time: 'Yesterday',
    unread: 1,
    profile: require('../../assets/avatar/avatar_3.png'),
  },
  {
    id: 4,
    name: 'Sachithu',
    lastMessage: 'Happy Birthday!',
    time: 'Monday',
    unread: 0,
    profile: require('../../assets/avatar/avatar_4.png'),
  },
  {
    id: 5,
    name: 'Mia Kalifa',
    lastMessage: 'Let me check and get back to you.',
    time: '2:15 PM',
    unread: 3,
    profile: require('../../assets/avatar/avatar_5.png'),
  },
  {
    id: 6,
    name: 'suny leon',
    lastMessage: 'Meeting rescheduled to Friday.',
    time: 'Today',
    unread: 0,
    profile: require('../../assets/avatar/avatar_6.png'),
  },
  {
    id: 7,
    name: 'Mahinda Rajapakasha',
    lastMessage: 'Meeting rescheduled to Friday.',
    time: 'Today',
    unread: 5,
    profile: require('../../assets/avatar/avatar_4.png'),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const [search, setSearch] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ChatApp',
      headerTitleStyle: { fontWeight: 'bold', fontSize: 24 },
      headerRight: () => (
        <View className="flex-row space-x-4">
          <TouchableOpacity className="me-5">
            <Ionicons name="camera" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const filterChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any ) => (
    <TouchableOpacity className="flex-row items-center px-4 py-3 border-b border-gray-200">
      <Image source={item.profile} className="w-12 h-12 mr-4 rounded-full" />
      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="text-lg font-bold">{item.name}</Text>
          <Text className="text-sm text-gray-500">{item.time}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-base text-gray-700" ellipsizeMode='tail' numberOfLines={1}>{item.lastMessage}</Text>
          {item.unread > 0 && (
            <View className="px-2 py-1 ml-2 bg-green-600 rounded-full">
              <Text className="text-xs text-white">{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 p-0 bg-slate-50" edges={['right', 'bottom', 'left']}>
      <View className="flex-row items-center px-3 mx-2 mt-3 bg-gray-300 rounded-full h-14">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          className="flex-1 text-lg font-bold ps-2"
          placeholder="Search"
          value={search}
          onChangeText={(text)=>setSearch(text)}
        />
      </View>

      <FlatList
        data={filterChats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        className="flex-1"
      />

      <View className="absolute w-20 h-20 bg-green-500 bottom-16 right-12 rounded-3xl">
        <TouchableOpacity className="items-center justify-center w-20 h-20 rounded-3xl">
          <Ionicons name="chatbox-ellipses" size={26} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}