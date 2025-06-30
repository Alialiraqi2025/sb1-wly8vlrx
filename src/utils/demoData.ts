import { Chat, User } from '../types';

export const generateDemoData = (): Chat[] => {
  const demoUsers: User[] = [
    {
      id: 'user1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      status: 'online'
    },
    {
      id: 'user2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      status: 'away'
    },
    {
      id: 'user3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      status: 'online'
    },
    {
      id: 'user4',
      name: 'David Wilson',
      email: 'david@example.com',
      status: 'offline'
    }
  ];

  const currentUserId = 'current-user';
  const currentUser: User = {
    id: currentUserId,
    name: 'You',
    email: 'you@example.com',
    status: 'online'
  };

  const demoChats: Chat[] = [
    {
      id: 'chat1',
      type: 'direct',
      name: 'Alice Johnson',
      participants: [currentUser, demoUsers[0]],
      lastMessage: 'Hey! How are you doing today?',
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 'chat2',
      type: 'direct',
      name: 'Bob Smith',
      participants: [currentUser, demoUsers[1]],
      lastMessage: 'Thanks for the help earlier!',
      lastMessageTime: new Date(Date.now() - 7200000),
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 'chat3',
      type: 'group',
      name: 'Team Chat',
      participants: [currentUser, demoUsers[0], demoUsers[2], demoUsers[3]],
      lastMessage: 'Meeting at 3 PM today',
      lastMessageTime: new Date(Date.now() - 1800000),
      unreadCount: 5,
      isOnline: true
    },
    {
      id: 'chat4',
      type: 'direct',
      name: 'Carol Davis',
      participants: [currentUser, demoUsers[2]],
      lastMessage: 'See you tomorrow! 👋',
      lastMessageTime: new Date(Date.now() - 86400000),
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 'chat5',
      type: 'direct',
      name: 'David Wilson',
      participants: [currentUser, demoUsers[3]],
      lastMessage: 'Let me know when you\'re free',
      lastMessageTime: new Date(Date.now() - 172800000),
      unreadCount: 1,
      isOnline: false
    }
  ];

  return demoChats;
};