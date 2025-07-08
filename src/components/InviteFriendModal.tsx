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
  Send
} from 'lucide-react';
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const code = `TI-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    setInviteCode(code);
    
    // Generate QR code URL (in a real app, this would be a proper QR code)
    const inviteUrl = `https://teleiraq.com/invite/${code}`;
    setQrCodeUrl(inviteUrl);
    
    // Generate QR code on canvas
    generateQRCode(inviteUrl);
    
    setIsGenerating(false);
  };

  const generateQRCode = (url: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 200;
    canvas.height = 200;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 200, 200);

    // Draw a simple QR code pattern (in a real app, use a QR code library)
    ctx.fillStyle = '#000000';
    
    // Draw corner squares
    const drawCornerSquare = (x: number, y: number) => {
      ctx.fillRect(x, y, 30, 30);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 5, y + 5, 20, 20);
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + 10, y + 10, 10, 10);
    };

    drawCornerSquare(10, 10);
    drawCornerSquare(160, 10);
    drawCornerSquare(10, 160);

    // Draw random pattern for demo
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (Math.random() > 0.5) {
          ctx.fillRect(50 + i * 5, 50 + j * 5, 4, 4);
        }
      }
    }

    // Add TELE IRAQ logo area (white square in center)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(85, 85, 30, 30);
    ctx.fillStyle = '#dc2626';
    ctx.font = '8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('TI', 100, 105);
  };

  const handleCopyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(`Join me on TELE IRAQ! Use invite code: ${inviteCode}\n\nDownload: https://teleiraq.com/download`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy invite code:', error);
    }
  };

  const handleShareInvite = async () => {
    const shareData = {
      title: 'Join me on TELE IRAQ',
      text: `Join me on TELE IRAQ - secure messaging for Iraq!\n\nInvite code: ${inviteCode}`,
      url: qrCodeUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying
      handleCopyInviteCode();
    }
  };

  const handleDownloadQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `TELE-IRAQ-Invite-${inviteCode}.png`;
    link.href = canvas.toDataURL();
    link.click();
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
    }, 3000);
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
    }, 3000);
  };

  if (!isOpen) return null;

  const renderQRTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <QrCode className="w-12 h-12 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('invite.shareQRCode')}</h3>
        <p className="text-gray-600">{t('invite.qrDescription')}</p>
      </div>

      {isGenerating ? (
        <div className="text-center py-12">
          <div className="element-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">{t('invite.generatingCode')}</p>
        </div>
      ) : (
        <>
          {/* QR Code Display */}
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
              <canvas
                ref={canvasRef}
                className="mx-auto"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="text-center mt-4">
                <p className="text-sm font-medium text-gray-900">{t('invite.inviteCode')}</p>
                <p className="text-xs text-gray-500 font-mono">{inviteCode}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCopyInviteCode}
              className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
              <span className="text-sm font-medium text-gray-900">
                {copied ? t('common.copied') : t('common.copy')}
              </span>
            </button>
            
            <button
              onClick={handleShareInvite}
              className="flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Share className="w-4 h-4" />
              <span className="text-sm font-medium">{t('common.share')}</span>
            </button>
            
            <button
              onClick={handleDownloadQR}
              className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">{t('common.download')}</span>
            </button>
            
            <button
              onClick={generateInviteCode}
              className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">{t('invite.newCode')}</span>
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">{t('invite.howToUse')}</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. {t('invite.step1')}</li>
              <li>2. {t('invite.step2')}</li>
              <li>3. {t('invite.step3')}</li>
            </ol>
          </div>
        </>
      )}
    </div>
  );

  const renderSearchTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('invite.findFriends')}</h3>
        <p className="text-gray-600">{t('invite.searchDescription')}</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('invite.searchPlaceholder')}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      {/* Search Results */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">{t('invite.noResults')}</p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {contact.avatar ? (
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {contact.isOnTeleIraq && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{contact.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
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
                  {contact.isOnTeleIraq && (
                    <p className="text-xs text-green-600">
                      {t('invite.onTeleIraq')} • {contact.mutualFriends} {t('invite.mutualFriends')}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {inviteSent.includes(contact.id) ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('invite.sent')}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleInviteContact(contact.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      contact.isOnTeleIraq
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {contact.isOnTeleIraq ? (
                      <>
                        <UserPlus className="w-4 h-4 inline mr-1" />
                        {t('invite.addFriend')}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 inline mr-1" />
                        {t('invite.invite')}
                      </>
                    )}
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
        <div className="w-28 h-28 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-12 h-12 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t('invite.inviteContacts')}</h3>
        <p className="text-gray-600">{t('invite.selectMultiple')}</p>
      </div>

      {/* Select All / Deselect All */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {selectedContacts.length} {t('invite.selected')}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedContacts(contacts.map(c => c.id))}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {t('common.selectAll')}
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setSelectedContacts([])}
            className="text-sm text-gray-600 hover:text-gray-700 font-medium"
          >
            {t('common.clear')}
          </button>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {contacts.map((contact) => (
          <label
            key={contact.id}
            className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedContacts.includes(contact.id)}
              onChange={() => handleContactSelect(contact.id)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            
            <div className="relative">
              {contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
              )}
              {contact.isOnTeleIraq && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{contact.name}</h4>
              <p className="text-sm text-gray-500 truncate">
                {contact.isOnTeleIraq ? t('invite.onTeleIraq') : t('invite.notOnTeleIraq')}
              </p>
            </div>
          </label>
        ))}
      </div>

      {/* Send Invites Button */}
      {selectedContacts.length > 0 && (
        <button
          onClick={handleSendInvites}
          className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>{t('invite.sendInvites')} ({selectedContacts.length})</span>
        </button>
      )}
    </div>
  );

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in ${direction === 'rtl' ? 'rtl' : 'ltr'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-scale-in max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('invite.title')}</h2>
            <p className="text-gray-600">{t('invite.subtitle')}</p>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-1 mt-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'qr'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <QrCode className="w-4 h-4 inline mr-1" />
              {t('invite.qrCode')}
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'search'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search className="w-4 h-4 inline mr-1" />
              {t('invite.search')}
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-4 h-4 inline mr-1" />
              {t('invite.contacts')}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto modal-scrollbar max-h-[calc(90vh-140px)]">
          {activeTab === 'qr' && renderQRTab()}
          {activeTab === 'search' && renderSearchTab()}
          {activeTab === 'contacts' && renderContactsTab()}
        </div>
      </div>
    </div>
  );
};

export default InviteFriendModal;