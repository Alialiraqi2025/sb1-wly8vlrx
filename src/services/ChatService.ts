import { Chat, Message, User, EncryptedMessage, TypingIndicator, OnlineStatus } from '../types';
import { EncryptionService } from './EncryptionService';

export class ChatService {
  private static instance: ChatService;
  private userId: string | null = null;
  private chats: Map<string, Chat> = new Map();
  private eventListeners: Map<string, Function[]> = new Map();

  static initialize(userId: string): ChatService {
    if (!this.instance) {
      this.instance = new ChatService();
    }
    this.instance.userId = userId;
    this.instance.loadChatsFromStorage();
    return this.instance;
  }

  static getInstance(): ChatService {
    if (!this.instance) {
      throw new Error('ChatService not initialized');
    }
    return this.instance;
  }

  private loadChatsFromStorage(): void {
    try {
      const storedChats = localStorage.getItem(`chats_${this.userId}`);
      if (storedChats) {
        const chatsArray: Chat[] = JSON.parse(storedChats);
        chatsArray.forEach(chat => {
          this.chats.set(chat.id, {
            ...chat,
            createdAt: new Date(chat.createdAt),
            updatedAt: new Date(chat.updatedAt),
            messages: chat.messages?.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          });
        });
      }
    } catch (error) {
      console.error('Failed to load chats from storage:', error);
    }
  }

  private saveChatsToStorage(): void {
    try {
      const chatsArray = Array.from(this.chats.values());
      localStorage.setItem(`chats_${this.userId}`, JSON.stringify(chatsArray));
    } catch (error) {
      console.error('Failed to save chats to storage:', error);
    }
  }

  async getChats(): Promise<Chat[]> {
    // In a real app, this would fetch from a server
    return Array.from(this.chats.values()).sort((a, b) => 
      b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  async getChat(chatId: string): Promise<Chat | null> {
    return this.chats.get(chatId) || null;
  }

  async createDirectChat(otherUser: User): Promise<Chat> {
    const chatId = this.generateDirectChatId(this.userId!, otherUser.id);
    
    // Check if chat already exists
    const existingChat = this.chats.get(chatId);
    if (existingChat) {
      return existingChat;
    }

    const chat: Chat = {
      id: chatId,
      type: 'direct',
      participants: [
        {
          id: this.userId!,
          name: 'You',
          email: '',
          publicKey: '',
          privateKey: '',
          status: 'online',
          lastSeen: new Date(),
          settings: {
            notifications: true,
            soundEnabled: true,
            theme: 'light',
            language: 'en',
            autoDownloadMedia: true,
            readReceipts: true,
            lastSeenPrivacy: 'everyone',
            profilePhotoPrivacy: 'everyone'
          }
        },
        otherUser
      ],
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isArchived: false,
      isPinned: false
    };

    this.chats.set(chatId, chat);
    this.saveChatsToStorage();
    this.emit('chatCreated', chat);

    return chat;
  }

  async createGroupChat(name: string, description: string, participants: User[]): Promise<Chat> {
    const chatId = this.generateGroupChatId();
    
    const chat: Chat = {
      id: chatId,
      type: 'group',
      name,
      description,
      participants: [
        {
          id: this.userId!,
          name: 'You',
          email: '',
          publicKey: '',
          privateKey: '',
          status: 'online',
          lastSeen: new Date(),
          settings: {
            notifications: true,
            soundEnabled: true,
            theme: 'light',
            language: 'en',
            autoDownloadMedia: true,
            readReceipts: true,
            lastSeenPrivacy: 'everyone',
            profilePhotoPrivacy: 'everyone'
          }
        },
        ...participants
      ],
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isArchived: false,
      isPinned: false,
      groupSettings: {
        adminIds: [this.userId!],
        canMembersAddOthers: true,
        canMembersEditInfo: false,
        disappearingMessages: 0
      }
    };

    this.chats.set(chatId, chat);
    this.saveChatsToStorage();
    this.emit('chatCreated', chat);

    return chat;
  }

  async sendMessage(encryptedMessage: EncryptedMessage): Promise<void> {
    const chat = this.chats.get(encryptedMessage.chatId);
    if (!chat) {
      throw new Error('Chat not found');
    }

    // Decrypt message for local storage
    const encryptionService = EncryptionService.getInstance();
    const decryptedMessage = await encryptionService.decryptMessage(encryptedMessage, this.userId!);

    // Add to chat messages
    if (!chat.messages) {
      chat.messages = [];
    }
    chat.messages.push(decryptedMessage);
    chat.lastMessage = decryptedMessage;
    chat.updatedAt = new Date();

    this.chats.set(chat.id, chat);
    this.saveChatsToStorage();
    this.emit('messageReceived', { chat, message: decryptedMessage });

    // In a real app, send to server here
    this.simulateMessageDelivery(encryptedMessage);
  }

  private simulateMessageDelivery(encryptedMessage: EncryptedMessage): void {
    // Simulate network delay and delivery confirmation
    setTimeout(() => {
      this.emit('messageDelivered', encryptedMessage.id);
    }, 1000);

    setTimeout(() => {
      this.emit('messageRead', encryptedMessage.id);
    }, 3000);
  }

  async deleteMessage(messageId: string, chatId: string, deleteFor: 'sender' | 'everyone'): Promise<void> {
    const chat = this.chats.get(chatId);
    if (!chat || !chat.messages) return;

    const messageIndex = chat.messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;

    if (deleteFor === 'everyone') {
      chat.messages[messageIndex].isDeleted = true;
      chat.messages[messageIndex].deletedFor = 'everyone';
      chat.messages[messageIndex].content = 'This message was deleted';
    } else {
      chat.messages.splice(messageIndex, 1);
    }

    this.chats.set(chatId, chat);
    this.saveChatsToStorage();
    this.emit('messageDeleted', { messageId, chatId, deleteFor });
  }

  async editMessage(messageId: string, chatId: string, newContent: string): Promise<void> {
    const chat = this.chats.get(chatId);
    if (!chat || !chat.messages) return;

    const message = chat.messages.find(m => m.id === messageId);
    if (!message || message.senderId !== this.userId) return;

    message.content = newContent;
    message.editedAt = new Date();

    this.chats.set(chatId, chat);
    this.saveChatsToStorage();
    this.emit('messageEdited', { messageId, chatId, newContent });
  }

  async addReaction(messageId: string, chatId: string, emoji: string): Promise<void> {
    const chat = this.chats.get(chatId);
    if (!chat || !chat.messages) return;

    const message = chat.messages.find(m => m.id === messageId);
    if (!message) return;

    if (!message.reactions) {
      message.reactions = [];
    }

    // Remove existing reaction from this user
    message.reactions = message.reactions.filter(r => r.userId !== this.userId);

    // Add new reaction
    message.reactions.push({
      userId: this.userId!,
      emoji,
      timestamp: new Date()
    });

    this.chats.set(chatId, chat);
    this.saveChatsToStorage();
    this.emit('reactionAdded', { messageId, chatId, emoji });
  }

  async markAsRead(chatId: string): Promise<void> {
    const chat = this.chats.get(chatId);
    if (!chat || !chat.messages) return;

    chat.messages.forEach(message => {
      if (!message.readBy.includes(this.userId!)) {
        message.readBy.push(this.userId!);
      }
    });

    this.chats.set(chatId, chat);
    this.saveChatsToStorage();
    this.emit('messagesRead', chatId);
  }

  async setTyping(chatId: string, isTyping: boolean): Promise<void> {
    const indicator: TypingIndicator = {
      chatId,
      userId: this.userId!,
      isTyping,
      timestamp: new Date()
    };

    this.emit('typingIndicator', indicator);
  }

  async updateOnlineStatus(status: 'online' | 'offline' | 'away' | 'busy'): Promise<void> {
    const onlineStatus: OnlineStatus = {
      userId: this.userId!,
      status,
      lastSeen: new Date()
    };

    this.emit('onlineStatusChanged', onlineStatus);
  }

  private generateDirectChatId(userId1: string, userId2: string): string {
    // Create consistent ID regardless of order
    const sortedIds = [userId1, userId2].sort();
    return `direct_${sortedIds[0]}_${sortedIds[1]}`;
  }

  private generateGroupChatId(): string {
    return `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Event system for real-time updates
  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  // Demo data initialization
  async initializeDemoData(): Promise<void> {
    if (this.chats.size > 0) return; // Already initialized

    const demoUsers: User[] = [
      {
        id: 'user_2',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        publicKey: 'alice_public_key',
        privateKey: 'alice_private_key',
        status: 'online',
        lastSeen: new Date(),
        settings: {
          notifications: true,
          soundEnabled: true,
          theme: 'light',
          language: 'en',
          autoDownloadMedia: true,
          readReceipts: true,
          lastSeenPrivacy: 'everyone',
          profilePhotoPrivacy: 'everyone'
        }
      },
      {
        id: 'user_3',
        name: 'Bob Smith',
        email: 'bob@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        publicKey: 'bob_public_key',
        privateKey: 'bob_private_key',
        status: 'away',
        lastSeen: new Date(Date.now() - 300000), // 5 minutes ago
        settings: {
          notifications: true,
          soundEnabled: true,
          theme: 'dark',
          language: 'en',
          autoDownloadMedia: false,
          readReceipts: true,
          lastSeenPrivacy: 'contacts',
          profilePhotoPrivacy: 'contacts'
        }
      }
    ];

    // Create demo chats
    for (const user of demoUsers) {
      await this.createDirectChat(user);
    }

    // Create a demo group chat
    await this.createGroupChat(
      'Team Chat',
      'Our awesome team discussion',
      demoUsers
    );

    // Add some demo messages
    const aliceChat = this.chats.get(this.generateDirectChatId(this.userId!, 'user_2'));
    if (aliceChat) {
      const demoMessages: Message[] = [
        {
          id: 'msg_1',
          chatId: aliceChat.id,
          senderId: 'user_2',
          content: 'Hey! How are you doing?',
          type: 'text',
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          encrypted: true,
          deliveredTo: [this.userId!],
          readBy: [this.userId!],
          isDeleted: false,
          deletedFor: 'sender'
        },
        {
          id: 'msg_2',
          chatId: aliceChat.id,
          senderId: this.userId!,
          content: 'Hi Alice! I\'m doing great, thanks for asking! 😊',
          type: 'text',
          timestamp: new Date(Date.now() - 3500000), // 58 minutes ago
          encrypted: true,
          deliveredTo: ['user_2'],
          readBy: ['user_2'],
          isDeleted: false,
          deletedFor: 'sender'
        },
        {
          id: 'msg_3',
          chatId: aliceChat.id,
          senderId: 'user_2',
          content: 'That\'s wonderful! Are you free for a video call later?',
          type: 'text',
          timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
          encrypted: true,
          deliveredTo: [this.userId!],
          readBy: [],
          isDeleted: false,
          deletedFor: 'sender'
        }
      ];

      aliceChat.messages = demoMessages;
      aliceChat.lastMessage = demoMessages[demoMessages.length - 1];
      this.chats.set(aliceChat.id, aliceChat);
    }

    this.saveChatsToStorage();
  }
}