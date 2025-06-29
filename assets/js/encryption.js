// Encryption service for end-to-end encryption
class EncryptionService {
    constructor() {
        this.userKeys = null;
        this.chatKeys = new Map();
    }

    generateUserKeys(userId) {
        // Generate key pair for user (simplified for demo)
        const seed = CryptoJS.SHA256(userId + Date.now().toString()).toString();
        const publicKey = CryptoJS.SHA256(seed + 'public').toString();
        const privateKey = CryptoJS.SHA256(seed + 'private').toString();
        
        this.userKeys = { publicKey, privateKey };
        
        // Store keys securely (in real app, use secure storage)
        localStorage.setItem(`keys_${userId}`, JSON.stringify(this.userKeys));
        
        return this.userKeys;
    }

    loadUserKeys(userId) {
        const storedKeys = localStorage.getItem(`keys_${userId}`);
        if (storedKeys) {
            this.userKeys = JSON.parse(storedKeys);
            return this.userKeys;
        }
        return null;
    }

    encryptMessage(message, recipientPublicKey) {
        if (!this.userKeys) {
            throw new Error('User keys not initialized');
        }

        // Generate symmetric key for this message
        const symmetricKey = CryptoJS.lib.WordArray.random(256/8).toString();
        
        // Encrypt message content with symmetric key
        const encryptedContent = CryptoJS.AES.encrypt(
            JSON.stringify({
                content: message.content,
                type: message.type,
                timestamp: message.timestamp
            }),
            symmetricKey
        ).toString();

        // Encrypt symmetric key with recipient's public key (simplified)
        const encryptedKey = CryptoJS.AES.encrypt(symmetricKey, recipientPublicKey).toString();

        return {
            id: message.id,
            chatId: message.chatId,
            senderId: message.senderId,
            encryptedContent: encryptedContent,
            encryptedKey: encryptedKey,
            timestamp: message.timestamp
        };
    }

    decryptMessage(encryptedMessage) {
        if (!this.userKeys) {
            throw new Error('User keys not initialized');
        }

        try {
            // Decrypt symmetric key with our private key
            const symmetricKeyBytes = CryptoJS.AES.decrypt(encryptedMessage.encryptedKey, this.userKeys.privateKey);
            const symmetricKey = symmetricKeyBytes.toString(CryptoJS.enc.Utf8);
            
            // Decrypt message content with symmetric key
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage.encryptedContent, symmetricKey);
            const decryptedContent = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

            return {
                id: encryptedMessage.id,
                chatId: encryptedMessage.chatId,
                senderId: encryptedMessage.senderId,
                content: decryptedContent.content,
                type: decryptedContent.type,
                timestamp: new Date(decryptedContent.timestamp),
                encrypted: true
            };
        } catch (error) {
            console.error('Failed to decrypt message:', error);
            return {
                id: encryptedMessage.id,
                chatId: encryptedMessage.chatId,
                senderId: encryptedMessage.senderId,
                content: '[Decryption failed]',
                type: 'text',
                timestamp: encryptedMessage.timestamp,
                encrypted: false
            };
        }
    }

    generateChatKey(chatId) {
        // Generate unique key for group chats
        const chatKey = CryptoJS.SHA256(chatId + this.userKeys?.privateKey).toString();
        this.chatKeys.set(chatId, chatKey);
        return chatKey;
    }

    encryptFile(file, key) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const arrayBuffer = e.target.result;
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

    decryptFile(encryptedBlob, key) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const encryptedText = e.target.result;
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

    wordArrayToArrayBuffer(wordArray) {
        const arrayBuffer = new ArrayBuffer(wordArray.sigBytes);
        const uint8Array = new Uint8Array(arrayBuffer);
        
        for (let i = 0; i < wordArray.sigBytes; i++) {
            uint8Array[i] = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        }
        
        return arrayBuffer;
    }

    getUserPublicKey() {
        return this.userKeys?.publicKey || null;
    }

    verifyMessageIntegrity(message, signature) {
        const messageHash = CryptoJS.SHA256(JSON.stringify(message)).toString();
        return messageHash === signature;
    }

    generateMessageSignature(message) {
        return CryptoJS.SHA256(JSON.stringify(message)).toString();
    }
}

// Initialize encryption service
document.addEventListener('DOMContentLoaded', () => {
    window.encryptionService = new EncryptionService();
});