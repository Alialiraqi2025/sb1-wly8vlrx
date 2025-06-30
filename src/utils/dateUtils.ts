export const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Less than 1 minute
  if (diff < 60000) {
    return 'now';
  }
  
  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m`;
  }
  
  // Less than 24 hours
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours}h`;
  }
  
  // Less than 7 days
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days}d`;
  }
  
  // More than 7 days
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export const formatLastSeen = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  if (diff < 300000) { // 5 minutes
    return 'Last seen recently';
  }
  
  if (diff < 3600000) { // 1 hour
    const minutes = Math.floor(diff / 60000);
    return `Last seen ${minutes} minutes ago`;
  }
  
  if (diff < 86400000) { // 24 hours
    const hours = Math.floor(diff / 3600000);
    return `Last seen ${hours} hours ago`;
  }
  
  return `Last seen ${date.toLocaleDateString()}`;
};