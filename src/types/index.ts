export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  publicKey: string;
  privateKey: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen: Date;
  settings: UserSettings;
}

export interface UserSettings {
  notifications: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  autoDownloadMedia: boolean;
  readReceipts: boolean;
  lastSeenPrivacy: 'everyone' | 'contacts' | 'nobody';
  profilePhotoPrivacy: 'everyone' | 'contacts' | 'nobody';
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name?: string;
  description?: string;
  avatar?: string;
  participants: User[];
  messages?: Message[];
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
  isPinned: boolean;
  mutedUntil?: Date;
  groupSettings?: GroupSettings;
}

export interface GroupSettings {
  adminIds: string[];
  canMembersAddOthers: boolean;
  canMembersEditInfo: boolean;
  disappearingMessages: number; // in seconds, 0 = disabled
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'voice' | 'video' | 'location' | 'contact' | 'sticker';
  timestamp: Date;
  editedAt?: Date;
  replyTo?: string;
  reactions?: Reaction[];
  attachment?: Attachment;
  encrypted: boolean;
  deliveredTo: string[];
  readBy: string[];
  isDeleted: boolean;
  deletedFor: 'sender' | 'everyone';
}

export interface Reaction {
  userId: string;
  emoji: string;
  timestamp: Date;
}

export interface Attachment {
  name: string;
  size: number;
  type: string;
  url: string;
  thumbnail?: string;
  duration?: number; // for audio/video
  width?: number; // for images/videos
  height?: number; // for images/videos
}

export interface CallState {
  type: 'voice' | 'video';
  chatId: string;
  participants: User[];
  isIncoming: boolean;
  isActive: boolean;
  startTime: Date;
  endTime?: Date;
  isMuted?: boolean;
  isVideoEnabled?: boolean;
}

export interface EncryptedMessage {
  id: string;
  chatId: string;
  senderId: string;
  encryptedContent: string;
  type: string;
  timestamp: Date;
  recipients: EncryptedRecipient[];
}

export interface EncryptedRecipient {
  userId: string;
  encryptedKey: string;
}

export interface ContactInfo {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  avatar?: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
}

export interface VoiceNote {
  duration: number;
  waveform: number[];
  url: string;
}

export interface TypingIndicator {
  chatId: string;
  userId: string;
  isTyping: boolean;
  timestamp: Date;
}

export interface OnlineStatus {
  userId: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen: Date;
}

export interface ChatInvite {
  id: string;
  chatId: string;
  inviterId: string;
  inviteeId: string;
  message?: string;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
}

export interface BackupData {
  version: string;
  timestamp: Date;
  chats: Chat[];
  messages: Message[];
  contacts: ContactInfo[];
  settings: UserSettings;
}

export interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'key_change' | 'device_added' | 'device_removed';
  timestamp: Date;
  deviceInfo: string;
  location?: string;
  ipAddress?: string;
}

export interface DeviceInfo {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet' | 'web';
  os: string;
  browser?: string;
  lastActive: Date;
  isCurrentDevice: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  showPreview: boolean;
  quietHours: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string; // HH:mm format
  };
}

export interface ScreenSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}