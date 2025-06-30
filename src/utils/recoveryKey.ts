import CryptoJS from 'crypto-js';

export interface RecoveryKeyInfo {
  key: string;
  formattedKey: string;
  qrCode: string;
  createdAt: Date;
}

export const generateRecoveryKey = (): RecoveryKeyInfo => {
  // Generate a secure 256-bit recovery key
  const randomBytes = CryptoJS.lib.WordArray.random(32);
  const key = randomBytes.toString(CryptoJS.enc.Hex).toUpperCase();
  
  // Format key in groups of 4 characters for readability
  const formattedKey = key.match(/.{1,4}/g)?.join('-') || key;
  
  // Generate QR code data (in real app, this would be a proper QR code)
  const qrCode = `TELE-IRAQ-RECOVERY:${key}`;
  
  return {
    key,
    formattedKey,
    qrCode,
    createdAt: new Date()
  };
};

export const validateRecoveryKey = (inputKey: string, storedKey: string): boolean => {
  // Remove formatting and normalize
  const normalizedInput = inputKey.replace(/[-\s]/g, '').toUpperCase();
  const normalizedStored = storedKey.replace(/[-\s]/g, '').toUpperCase();
  
  return normalizedInput === normalizedStored;
};

export const encryptRecoveryKey = (key: string, password: string): string => {
  return CryptoJS.AES.encrypt(key, password).toString();
};

export const decryptRecoveryKey = (encryptedKey: string, password: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedKey, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw new Error('Invalid password or corrupted recovery key');
  }
};

export const generateDeviceId = (): string => {
  const userAgent = navigator.userAgent;
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  
  const deviceString = `${userAgent}-${timestamp}-${random}`;
  return CryptoJS.SHA256(deviceString).toString(CryptoJS.enc.Hex).substring(0, 16).toUpperCase();
};

export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop';
  let deviceName = 'Unknown Device';
  
  if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    if (/iPad|Tablet/i.test(userAgent)) {
      deviceType = 'tablet';
      deviceName = 'Tablet';
    } else {
      deviceType = 'mobile';
      deviceName = 'Mobile Device';
    }
  } else {
    deviceType = 'desktop';
    deviceName = 'Desktop Computer';
  }
  
  // Try to get more specific device info
  if (userAgent.includes('Windows')) {
    deviceName = deviceType === 'desktop' ? 'Windows PC' : 'Windows Mobile';
  } else if (userAgent.includes('Mac')) {
    deviceName = deviceType === 'desktop' ? 'Mac' : 'iPhone/iPad';
  } else if (userAgent.includes('Linux')) {
    deviceName = 'Linux Computer';
  } else if (userAgent.includes('Android')) {
    deviceName = deviceType === 'tablet' ? 'Android Tablet' : 'Android Phone';
  }
  
  return {
    type: deviceType,
    name: deviceName,
    id: generateDeviceId()
  };
};

export const formatRecoveryKey = (key: string): string => {
  return key.replace(/(.{4})/g, '$1-').slice(0, -1);
};

export const isRecoveryKeyValid = (key: string): boolean => {
  // Remove formatting
  const cleanKey = key.replace(/[-\s]/g, '');
  
  // Check if it's a valid hex string of correct length (64 characters for 256-bit key)
  return /^[A-Fa-f0-9]{64}$/.test(cleanKey);
};