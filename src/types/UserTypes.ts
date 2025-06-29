export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: UserRole;
  status: UserStatus;
  permissions: Permission[];
  joinDate: string;
  lastLogin?: string;
  avatar?: string;
  verified: boolean;
  hasPassword: boolean;
  // Customer specific
  totalOrders?: number;
  totalSpent?: number;
  // Admin/Monitor specific
  department?: string;
  accessLevel?: number;
}

export type UserRole = 'admin' | 'customer' | 'monitor';

export type UserStatus = 'active' | 'suspended' | 'pending' | 'inactive';

export type Permission = 
  // Admin permissions
  | 'manage_users'
  | 'manage_products'
  | 'manage_categories'
  | 'manage_orders'
  | 'view_analytics'
  | 'system_settings'
  | 'financial_reports'
  | 'user_permissions'
  // Monitor permissions
  | 'view_orders'
  | 'view_customers'
  | 'view_products'
  | 'view_reports'
  | 'update_order_status'
  // Customer permissions
  | 'place_orders'
  | 'view_own_orders'
  | 'manage_profile'
  | 'contact_support';

export interface RoleConfig {
  name: string;
  description: string;
  color: string;
  permissions: Permission[];
  defaultStatus: UserStatus;
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  admin: {
    name: 'Administrator',
    description: 'Full system access and management capabilities',
    color: 'from-red-500 to-red-600',
    permissions: [
      'manage_users',
      'manage_products',
      'manage_categories',
      'manage_orders',
      'view_analytics',
      'system_settings',
      'financial_reports',
      'user_permissions',
      'view_orders',
      'view_customers',
      'view_products',
      'view_reports',
      'update_order_status'
    ],
    defaultStatus: 'active'
  },
  customer: {
    name: 'Customer',
    description: 'Standard customer with shopping capabilities',
    color: 'from-blue-500 to-blue-600',
    permissions: [
      'place_orders',
      'view_own_orders',
      'manage_profile',
      'contact_support'
    ],
    defaultStatus: 'active'
  },
  monitor: {
    name: 'Monitor',
    description: 'View-only access with limited order management',
    color: 'from-purple-500 to-purple-600',
    permissions: [
      'view_orders',
      'view_customers',
      'view_products',
      'view_reports',
      'update_order_status'
    ],
    defaultStatus: 'active'
  }
};