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
    'system_settings'
  ]);
};

export const canManageUsers = (user: User | null): boolean => {
  return hasPermission(user, 'manage_users');
};

export const canManageProducts = (user: User | null): boolean => {
  return hasPermission(user, 'manage_products');
};

export const canManageOrders = (user: User | null): boolean => {
  return hasAnyPermission(user, ['manage_orders', 'update_order_status']);
};

export const canViewAnalytics = (user: User | null): boolean => {
  return hasAnyPermission(user, ['view_analytics', 'view_reports']);
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

  if (hasPermission(user, 'view_analytics') || hasPermission(user, 'view_reports')) {
    menuItems.push({ id: 'dashboard', label: 'Dashboard', icon: 'BarChart3' });
  }

  if (hasPermission(user, 'manage_categories')) {
    menuItems.push({ id: 'categories', label: 'Categories', icon: 'Grid3X3' });
  }

  if (hasPermission(user, 'manage_products') || hasPermission(user, 'view_products')) {
    menuItems.push({ id: 'products', label: 'Products', icon: 'Package' });
  }

  if (hasPermission(user, 'manage_orders') || hasPermission(user, 'view_orders')) {
    menuItems.push({ id: 'orders', label: 'Orders', icon: 'ShoppingCart' });
  }

  if (hasPermission(user, 'manage_users') || hasPermission(user, 'view_customers')) {
    menuItems.push({ id: 'users', label: 'Users', icon: 'Users' });
  }

  if (hasPermission(user, 'view_analytics') || hasPermission(user, 'view_reports')) {
    menuItems.push({ id: 'analytics', label: 'Analytics', icon: 'TrendingUp' });
  }

  return menuItems;
};