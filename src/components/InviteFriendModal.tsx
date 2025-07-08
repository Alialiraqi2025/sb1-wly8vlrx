import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  Search, 
  Users, 
  Copy, 
  Share, 
  Download,
  UserPlus,
  CheckCircle,
  Phone,
  Mail,
  MessageSquare,
  RefreshCw,
  Link,
  Smartphone,
  Monitor,
  Send,
  Shield,
  Globe,
  Star,
  Zap
} from 'lucide-react';
import QRCodeLib from 'qrcode';
import { useLanguage } from '../contexts/LanguageContext';

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  isOnTeleIraq: boolean;
  lastSeen?: Date;
  mutualFriends?: number;
}

interface InviteFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  userName: string;
}

const InviteFriendModal: React.FC<InviteFriendModalProps> = ({
  isOpen,
  onClose,
  userEmail,
  userName
}) => {
  const { t, direction } = useLanguage();
  const [activeTab, setActiveTab] = useState<'qr' | 'search' | 'contacts'>('qr');
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [inviteSent, setInviteSent] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Demo contacts data
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Ahmed Al-Baghdadi',
      email: 'ahmed.baghdadi@email.com',
      phone: '+964 770 123 4567',
      isOnTeleIraq: true,
      lastSeen: new Date(Date.now() - 300000),
      mutualFriends: 5
    },
    {
      id: '2',
      name: 'Fatima Al-Basri',
      email: 'fatima.basri@email.com',
      phone: '+964 750 987 6543',
      isOnTeleIraq: true,
      lastSeen: new Date(Date.now() - 3600000),
      mutualFriends: 3
    },
    {
      id: '3',
      name: 'Omar Al-Kurdi',
      email: 'omar.kurdi@email.com',
      phone: '+964 780 555 1234',
      isOnTeleIraq: false,
      mutualFriends: 2
    },
    {
      id: '4',
      name: 'Zainab Al-Najafi',
      email: 'zainab.najafi@email.com',
      phone: '+964 790 444 5678',
      isOnTeleIraq: true,
      lastSeen: new Date(Date.now() - 86400000),
      mutualFriends: 7
    },
    {
      id: '5',
      name: 'Hassan Al-Mosuli',
      email: 'hassan.mosuli@email.com',
      phone: '+964 760 333 9876',
      isOnTeleIraq: false,
      mutualFriends: 1
    },
    {
      id: '6',
      name: 'Layla Al-Karkhi',
      email: 'layla.karkhi@email.com',
      phone: '+964 740 222 1357',
      isOnTeleIraq: true,
      lastSeen: new Date(Date.now() - 1800000),
      mutualFriends: 4
    }
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone?.includes(searchQuery)
  );

  useEffect(() => {
    if (isOpen) {
      generateInviteCode();
    }
  }, [isOpen]);

  const generateInviteCode = async () => {
    setIsGenerating(true);
    
    // Simulate code generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a more professional invite code
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const userHash = btoa(userEmail).substring(0, 6).toUpperCase();
    const code = `TI${timestamp}${random}${userHash}`;
    
    setInviteCode(code);
    
    // Create professional invite URL with metadata
    const inviteData = {
      code: code,
      inviter: userName,
      email: userEmail,
      app: 'TELE IRAQ',
      version: '2.0',
      platform: 'web',
      timestamp: new Date().toISOString(),
      features: ['end-to-end-encryption', 'voice-calls', 'video-calls', 'file-sharing'],
      security: 'military-grade-encryption'
    };
    
    const inviteUrl = `https://teleiraq.com/invite?data=${btoa(JSON.stringify(inviteData))}`;
    setQrCodeUrl(inviteUrl);
    
    // Generate professional QR code
    await generateProfessionalQRCode(inviteUrl);
    
    setIsGenerating(false);
  };

  const generateProfessionalQRCode = async (url: string) => {
    try {
      // Generate high-quality QR code with professional styling
      const qrDataUrl = await QRCodeLib.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1f2937', // Dark gray for better scanning
          light: '#ffffff'
        },
        errorCorrectionLevel: 'H', // High error correction for logo overlay
        type: 'image/png',
        quality: 1,
        rendererOpts: {
          quality: 1
        }
      });

      // Create a canvas to add TELE IRAQ branding
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 340;
      canvas.height = 380;

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 340, 380);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, '#f8fafc');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 340, 380);

      // Add border with shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 4;
      ctx.fillStyle = '#ffffff';
      ctx.roundRect(10, 10, 320, 360, 16);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      // Load and draw QR code
      const qrImage = new Image();
      qrImage.onload = () => {
        // Draw QR code
        ctx.drawImage(qrImage, 20, 60, 300, 300);

        // Add TELE IRAQ logo overlay in center
        const logoSize = 60;
        const logoX = (340 - logoSize) / 2;
        const logoY = 60 + (300 - logoSize) / 2;

        // White background for logo
        ctx.fillStyle = '#ffffff';
        ctx.roundRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10, 8);
        ctx.fill();

        // TELE IRAQ logo
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('TELE', logoX + logoSize/2, logoY + 20);
        ctx.fillText('IRAQ', logoX + logoSize/2, logoY + 40);

        // Add header text
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Join me on TELE IRAQ', 170, 40);

        // Add footer with invite code
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.fillText(`Invite Code: ${inviteCode}`, 170, 385);

        // Add security badge
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 10px Arial';
        ctx.fillText('🔒 End-to-End Encrypted', 170, 400);

        // Convert to data URL
        setQrCodeDataUrl(canvas.toDataURL('image/png', 1.0));
      };
      qrImage.src = qrDataUrl;

    } catch (error) {
      console.error('Error generating QR code:', error);
      // Fallback to simple QR code
      const fallbackQR = await QRCodeLib.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      });
      setQrCodeDataUrl(fallbackQR);
    }
  };

  const handleCopyInviteCode = async () => {
    try {
      const inviteMessage = `🚀 Join me on TELE IRAQ - Iraq's most secure messaging app!

🔐 Military-grade end-to-end encryption
📞 Crystal-clear voice & video calls  
📁 Secure file sharing
🇮🇶 Built for Iraq, trusted worldwide

Invite Code: ${inviteCode}

Download: ${qrCodeUrl}

#TeleIraq #SecureMessaging #MadeInIraq`;

      await navigator.clipboard.writeText(inviteMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy invite code:', error);
    }
  };

  const handleShareInvite = async () => {
    const shareData = {
      title: 'Join me on TELE IRAQ',
      text: `Join me on TELE IRAQ - Iraq's most secure messaging app!\n\n🔐 End-to-end encrypted\n📞 Voice & video calls\n🇮🇶 Made for Iraq\n\nInvite code: ${inviteCode}`,
      url: qrCodeUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
        handleCopyInviteCode();
      }
    } else {
      handleCopyInviteCode();
    }
  };

  const handleDownloadQR = () => {
    if (!qrCodeDataUrl) return;

    const link = document.createElement('a');
    link.download = `TELE-IRAQ-Invite-${inviteCode}.png`;
    link.href = qrCodeDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSendInvites = () => {
    // Simulate sending invites
    setInviteSent(prev => [...prev, ...selectedContacts]);
    setSelectedContacts([]);
    
    // Show success message
    setTimeout(() => {
      setInviteSent([]);
    }, 5000);
  };

  const handleInviteContact = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    if (contact.isOnTeleIraq) {
      // Send friend request
      console.log(`Sending friend request to ${contact.name}`);
    } else {
      // Send invite to join TELE IRAQ
      console.log(`Sending TELE IRAQ invite to ${contact.name}`);
    }
    
    setInviteSent(prev => [...prev, contactId]);
    setTimeout(() => {
      setInviteSent(prev => prev.filter(id => id !== contactId));
    }, 5000);
  };

  if (!isOpen) return null;

  const renderQRTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-28 h-28 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <QrCode className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('invite.shareQRCode')}</h3>
        <p className="text-gray-600">{t('invite.qrDescription')}</p>
      </div>

      {isGenerating ? (
        <div className="text-center py-16">
          <div className="relative">
            <div className="element-spinner mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <QrCode className="w-8 h-8 text-red-600 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 font-medium">{t('invite.generatingCode')}</p>
          <p className="text-sm text-gray-500 mt-2">Creating professional QR code...</p>
        </div>
      ) : (
        <>
          {/* Professional QR Code Display */}
          <div className="flex justify-center">
            <div className="relative group">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt="TELE IRAQ Invite QR Code"
                  className="rounded-2xl shadow-2xl border-4 border-white group-hover:scale-105 transition-transform duration-300"
                  style={{ maxWidth: '320px', height: 'auto' }}
                />
              ) : (
                <div className="w-80 h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-gray-400" />
                </div>
              )}
              
              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                🔒 SECURE
              </div>
              <div className="absolute -bottom-3 -left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                🇮🇶 IRAQ
              </div>
            </div>
          </div>

          {/* Professional Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleCopyInviteCode}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center space-x-2">
                {copied ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{t('common.copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span className="font-medium">{t('common.copy')}</span>
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={handleShareInvite}
              className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center space-x-2">
                <Share className="w-5 h-5" />
                <span className="font-medium">{t('common.share')}</span>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={handleDownloadQR}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span className="font-medium">{t('common.download')}</span>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={generateInviteCode}
              className="group relative overflow-hidden bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center space-x-2">
                <RefreshCw className="w-5 h-5" />
                <span className="font-medium">{t('invite.newCode')}</span>
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Professional Features Showcase */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6">
            <h4 className="font-bold text-red-900 mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Why TELE IRAQ?
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-800">Military-grade encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-800">Lightning fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-800">Made for Iraq</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-800">Trusted by thousands</span>
              </div>
            </div>
          </div>

          {/* Professional Instructions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-blue-900 mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              {t('invite.howToUse')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <p className="text-sm text-blue-800">{t('invite.step1')}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <p className="text-sm text-blue-800">{t('invite.step2')}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <p className="text-sm text-blue-800">{t('invite.step3')}</p>
              </div>
            </div>
          </div>

          {/* Invite Code Display */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-2">{t('invite.inviteCode')}</p>
              <div className="bg-white border border-gray-300 rounded-lg p-3 font-mono text-lg font-bold text-gray-900 tracking-wider">
                {inviteCode}
              </div>
              <p className="text-xs text-gray-500 mt-2">Share this code manually if QR scanning isn't available</p>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderSearchTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-28 h-28 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Search className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('invite.findFriends')}</h3>
        <p className="text-gray-600">{t('invite.searchDescription')}</p>
      </div>

      {/* Enhanced Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('invite.searchPlaceholder')}
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-lg"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Enhanced Search Results */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">{t('invite.noResults')}</p>
            <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="group flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {contact.avatar ? (
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {contact.isOnTeleIraq && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 truncate text-lg">{contact.name}</h4>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                    {contact.email && (
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{contact.phone}</span>
                      </div>
                    )}
                  </div>
                  {contact.isOnTeleIraq ? (
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {t('invite.onTeleIraq')}
                      </span>
                      <span className="text-xs text-gray-500">
                        {contact.mutualFriends} {t('invite.mutualFriends')}
                      </span>
                    </div>
                  ) : (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mt-2">
                      {t('invite.notOnTeleIraq')}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {inviteSent.includes(contact.id) ? (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-100 px-4 py-2 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('invite.sent')}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleInviteContact(contact.id)}
                    className={`group relative overflow-hidden px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
                      contact.isOnTeleIraq
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {contact.isOnTeleIraq ? (
                        <>
                          <UserPlus className="w-4 h-4" />
                          <span>{t('invite.addFriend')}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{t('invite.invite')}</span>
                        </>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderContactsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Users className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('invite.inviteContacts')}</h3>
        <p className="text-gray-600">{t('invite.selectMultiple')}</p>
      </div>

      {/* Enhanced Select All / Deselect All */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-gray-900">
            {selectedContacts.length} {t('invite.selected')}
          </span>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setSelectedContacts(contacts.map(c => c.id))}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
          >
            {t('common.selectAll')}
          </button>
          <button
            onClick={() => setSelectedContacts([])}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            {t('common.clear')}
          </button>
        </div>
      </div>

      {/* Enhanced Contacts List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {contacts.map((contact) => (
          <label
            key={contact.id}
            className={`group flex items-center space-x-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedContacts.includes(contact.id)
                ? 'border-purple-300 bg-purple-50'
                : 'border-gray-200 hover:border-purple-200 hover:bg-purple-25'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedContacts.includes(contact.id)}
              onChange={() => handleContactSelect(contact.id)}
              className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
            />
            
            <div className="relative">
              {contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
              )}
              {contact.isOnTeleIraq && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 truncate">{contact.name}</h4>
              <div className="flex items-center space-x-2 mt-1">
                {contact.isOnTeleIraq ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {t('invite.onTeleIraq')}
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    {t('invite.notOnTeleIraq')}
                  </span>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Enhanced Send Invites Button */}
      {selectedContacts.length > 0 && (
        <div className="space-y-3">
          <button
            onClick={handleSendInvites}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Send className="w-5 h-5" />
            <span className="font-bold text-lg">
              {t('invite.sendInvites')} ({selectedContacts.length})
            </span>
          </button>
          
          <p className="text-center text-sm text-gray-500">
            Professional invites will be sent with TELE IRAQ branding
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
      {/* Enhanced Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Enhanced Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl animate-scale-in max-h-[95vh] overflow-hidden border border-gray-200 invite-modal-container">
        {/* Enhanced Header */}
        <div className="relative p-8 pb-6 bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('invite.title')}</h2>
            <p className="text-gray-600 text-lg">{t('invite.subtitle')}</p>
          </div>
          
          {/* Enhanced Tabs */}
          <div className="flex space-x-2 mt-8 bg-white/50 rounded-xl p-2 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${
                activeTab === 'qr'
                  ? 'bg-white text-red-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <QrCode className="w-5 h-5 inline mr-2" />
              {t('invite.qrCode')}
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${
                activeTab === 'search'
                  ? 'bg-white text-green-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <Search className="w-5 h-5 inline mr-2" />
              {t('invite.search')}
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${
                activeTab === 'contacts'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <Users className="w-5 h-5 inline mr-2" />
              {t('invite.contacts')}
            </button>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="p-8 overflow-y-auto invite-modal-scrollbar universal-scrollbar max-h-[calc(95vh-200px)]">
          {activeTab === 'qr' && renderQRTab()}
          {activeTab === 'search' && renderSearchTab()}
          {activeTab === 'contacts' && renderContactsTab()}
        </div>
      </div>
    </div>
  );
};

export default InviteFriendModal;