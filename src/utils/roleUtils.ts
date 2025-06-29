import { User, UserRole, Permission, ROLE_CONFIGS } from '../types/UserTypes';

export const hasPermission = (user: User | null, permission: Permission): boolean => {
  if (!user) return false;
  return user.permissions.includes(permission);
};

export const hasAnyPermission = (user: User | null, permissions: Permission[]): boolean => {
  if (!user) return false;
  return permissions.some(permission => user.permissions.includes(permission));
};

export const hasAllPermissions = (user: User | null, permissions: Permission[]): boolean => {
  if (!user) return false;
  return permissions.every(permission => user.permissions.includes(permission));
};

export const getRoleConfig = (role: UserRole) => {
  return ROLE_CONFIGS[role];
};

export const getRoleColor = (role: UserRole): string => {
  return ROLE_CONFIGS[role].color;
};

export const getRoleName = (role: UserRole): string => {
  return ROLE_CONFIGS[role].name;
};

export const getRoleDescription = (role: UserRole): string => {
  return ROLE_CONFIGS[role].description;
};

export const getRoleRestrictions = (role: UserRole): string[] => {
  return ROLE_CONFIGS[role].restrictions || [];
};

export const getDefaultPermissions = (role: UserRole): Permission[] => {
  return ROLE_CONFIGS[role].permissions;
};

export const canAccessAdminPanel = (user: User | null): boolean => {
  return hasAnyPermission(user, [
    'manage_users',
    'manage_products',
    'manage_categories',
    'manage_orders',
    'view_analytics',
    'system_settings',
    'view_orders',
    'update_order_status'
  ]);
};

export const canManageUsers = (user: User | null): boolean => {
  return hasPermission(user, 'manage_users');
};

export const canManageProducts = (user: User | null): boolean => {
  return hasPermission(user, 'manage_products');
};

export const canManageCategories = (user: User | null): boolean => {
  return hasPermission(user, 'manage_categories');
};

export const canManageOrders = (user: User | null): boolean => {
  return hasAnyPermission(user, ['manage_orders', 'update_order_status']);
};

export const canViewAnalytics = (user: User | null): boolean => {
  return hasAnyPermission(user, ['view_analytics', 'view_reports']);
};

export const canChatWithCustomers = (user: User | null): boolean => {
  return hasPermission(user, 'chat_with_customers');
};

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};

export const isCustomer = (user: User | null): boolean => {
  return user?.role === 'customer';
};

export const isMonitor = (user: User | null): boolean => {
  return user?.role === 'monitor';
};

export const getAccessibleMenuItems = (user: User | null) => {
  if (!user) return [];

  const menuItems = [];

  // Dashboard - available to all admin panel users
  if (canAccessAdminPanel(user)) {
    menuItems.push({ id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' });
  }

  // Categories - only for admins
  if (hasPermission(user, 'manage_categories')) {
    menuItems.push({ id: 'categories', label: 'Categories', icon: 'Grid3X3' });
  }

  // Products - admins can manage, monitors can only view
  if (hasPermission(user, 'manage_products') || hasPermission(user, 'view_products')) {
    menuItems.push({ id: 'products', label: 'Products', icon: 'Package' });
  }

  // Orders - both admins and monitors can manage
  if (hasPermission(user, 'manage_orders') || hasPermission(user, 'view_orders')) {
    menuItems.push({ id: 'orders', label: 'Orders', icon: 'ShoppingCart' });
  }

  // Users - only for admins
  if (hasPermission(user, 'manage_users')) {
    menuItems.push({ id: 'users', label: 'Users', icon: 'Users' });
  }

  // Analytics - available to both admins and monitors
  if (hasPermission(user, 'view_analytics') || hasPermission(user, 'view_reports')) {
    menuItems.push({ id: 'analytics', label: 'Analytics', icon: 'TrendingUp' });
  }

  // Customer Support - for monitors and admins
  if (hasPermission(user, 'chat_with_customers') || hasPermission(user, 'manage_customer_support')) {
    menuItems.push({ id: 'support', label: 'Customer Support', icon: 'MessageCircle' });
  }

  return menuItems;
};

// Helper function to check if user can perform specific actions
export const canPerformAction = (user: User | null, action: string): boolean => {
  if (!user) return false;

  switch (action) {
    case 'add_product':
    case 'edit_product':
    case 'delete_product':
      return hasPermission(user, 'manage_products');
    
    case 'add_category':
    case 'edit_category':
    case 'delete_category':
      return hasPermission(user, 'manage_categories');
    
    case 'add_user':
    case 'edit_user':
    case 'delete_user':
      return hasPermission(user, 'manage_users');
    
    case 'view_product':
      return hasAnyPermission(user, ['manage_products', 'view_products']);
    
    case 'view_order':
    case 'update_order_status':
      return hasAnyPermission(user, ['manage_orders', 'view_orders', 'update_order_status']);
    
    case 'chat_support':
      return hasPermission(user, 'chat_with_customers');
    
    default:
      return false;
  }
};