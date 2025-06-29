import CryptoJS from 'crypto-js';
import { Message, User, EncryptedMessage, EncryptedRecipient } from '../types';

export class EncryptionService {
  private static instance: EncryptionService;
  private userKeys: { publicKey: string; privateKey: string } | null = null;

  static initialize(userId: string): EncryptionService {
    if (!this.instance) {
      this.instance = new EncryptionService();
    }
    this.instance.generateUserKeys(userId);
    return this.instance;
  }

  static getInstance(): EncryptionService {
    if (!this.instance) {
      throw new Error('EncryptionService not initialized');
    }
    return this.instance;
  }

  private generateUserKeys(userId: string): void {
    // In a real implementation, you would use proper RSA key generation
    // For demo purposes, we'll use a simplified approach
    const keyPair = this.generateKeyPair(userId);
    this.userKeys = keyPair;
    
    // Store keys securely (in real app, use secure storage)
    localStorage.setItem(`keys_${userId}`, JSON.stringify(keyPair));
  }

  private generateKeyPair(userId: string): { publicKey: string; privateKey: string } {
    // Simplified key generation for demo
    const seed = CryptoJS.SHA256(userId + Date.now().toString()).toString();
    const publicKey = CryptoJS.SHA256(seed + 'public').toString();
    const privateKey = CryptoJS.SHA256(seed + 'private').toString();
    
    return { publicKey, privateKey };
  }

  async encryptMessage(message: Message, recipients: User[]): Promise<EncryptedMessage> {
    if (!this.userKeys) {
      throw new Error('User keys not initialized');
    }

    // Generate a random symmetric key for this message
    const symmetricKey = CryptoJS.lib.WordArray.random(256/8).toString();
    
    // Encrypt the message content with the symmetric key
    const encryptedContent = CryptoJS.AES.encrypt(
      JSON.stringify({
        content: message.content,
        type: message.type,
        attachment: message.attachment
      }),
      symmetricKey
    ).toString();

    // Encrypt the symmetric key for each recipient
    const encryptedRecipients: EncryptedRecipient[] = recipients.map(recipient => ({
      userId: recipient.id,
      encryptedKey: this.encryptForRecipient(symmetricKey, recipient.publicKey)
    }));

    return {
      id: message.id,
      chatId: message.chatId,
      senderId: message.senderId,
      encryptedContent,
      type: message.type,
      timestamp: message.timestamp,
      recipients: encryptedRecipients
    };
  }

  async decryptMessage(encryptedMessage: EncryptedMessage, senderId: string): Promise<Message> {
    if (!this.userKeys) {
      throw new Error('User keys not initialized');
    }

    // Find our encrypted key
    const ourRecipient = encryptedMessage.recipients.find(r => r.userId === senderId);
    if (!ourRecipient) {
      throw new Error('Message not encrypted for this user');
    }

    // Decrypt the symmetric key
    const symmetricKey = this.decryptWithPrivateKey(ourRecipient.encryptedKey, this.userKeys.privateKey);
    
    // Decrypt the message content
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage.encryptedContent, symmetricKey);
    const decryptedContent = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

    return {
      id: encryptedMessage.id,
      chatId: encryptedMessage.chatId,
      senderId: encryptedMessage.senderId,
      content: decryptedContent.content,
      type: decryptedContent.type,
      timestamp: encryptedMessage.timestamp,
      attachment: decryptedContent.attachment,
      encrypted: true,
      deliveredTo: [],
      readBy: [],
      isDeleted: false,
      deletedFor: 'sender'
    };
  }

  private encryptForRecipient(data: string, recipientPublicKey: string): string {
    // Simplified encryption for demo - in real app, use proper RSA encryption
    return CryptoJS.AES.encrypt(data, recipientPublicKey).toString();
  }

  private decryptWithPrivateKey(encryptedData: string, privateKey: string): string {
    // Simplified decryption for demo - in real app, use proper RSA decryption
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, privateKey);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }

  generateChatKey(chatId: string): string {
    // Generate a unique key for group chats
    return CryptoJS.SHA256(chatId + this.userKeys?.privateKey).toString();
  }

  encryptFile(file: File, key: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
          const encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();
          const blob = new Blob([encrypted], { type: 'application/octet-stream' });
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  decryptFile(encryptedBlob: Blob, key: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const encryptedText = e.target?.result as string;
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, key);
          const arrayBuffer = this.wordArrayToArrayBuffer(decryptedBytes);
          const blob = new Blob([arrayBuffer]);
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(encryptedBlob);
    });
  }

  private wordArrayToArrayBuffer(wordArray: CryptoJS.lib.WordArray): ArrayBuffer {
    const arrayBuffer = new ArrayBuffer(wordArray.sigBytes);
    const uint8Array = new Uint8Array(arrayBuffer);
    
    for (let i = 0; i < wordArray.sigBytes; i++) {
      uint8Array[i] = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    
    return arrayBuffer;
  }

  getUserPublicKey(): string | null {
    return this.userKeys?.publicKey || null;
  }

  verifyMessageIntegrity(message: Message, signature: string): boolean {
    // Verify message hasn't been tampered with
    const messageHash = CryptoJS.SHA256(JSON.stringify(message)).toString();
    return messageHash === signature;
  }

  generateMessageSignature(message: Message): string {
    // Generate integrity signature for message
    return CryptoJS.SHA256(JSON.stringify(message)).toString();
  }
}