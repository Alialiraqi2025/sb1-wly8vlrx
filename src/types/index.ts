export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  lastSeen?: Date;
  recoveryKey?: string;
  deviceId?: string;
  trustedDevices?: TrustedDevice[];
}

export interface TrustedDevice {
  id: string;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet';
  lastUsed: Date;
  isCurrentDevice: boolean;
  verified: boolean;
}

export interface RecoveryKeyData {
  key: string;
  createdAt: Date;
  lastUsed?: Date;
  deviceCount: number;
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name: string;
  participants: User[];
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  avatar?: string;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'voice' | 'video';
  encrypted: boolean;
  attachment?: {
    url: string;
    name: string;
    size: number;
    type: string;
  };
  replyTo?: string;
  reactions?: Reaction[];
}

export interface Reaction {
  emoji: string;
  userId: string;
  timestamp: Date;
}

export interface TypingIndicator {
  chatId: string;
  userId: string;
  timestamp: Date;
}

export interface CallSession {
  id: string;
  chatId: string;
  type: 'voice' | 'video';
  participants: string[];
  status: 'ringing' | 'active' | 'ended';
  startTime?: Date;
  endTime?: Date;
}