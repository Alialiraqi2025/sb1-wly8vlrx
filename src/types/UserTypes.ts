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
  | 'chat_with_customers'
  | 'manage_customer_support'
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
  restrictions?: string[];
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
      'update_order_status',
      'chat_with_customers',
      'manage_customer_support'
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
    description: 'Order management and customer support specialist',
    color: 'from-purple-500 to-purple-600',
    permissions: [
      'view_orders',
      'view_customers',
      'view_products',
      'view_reports',
      'update_order_status',
      'manage_orders',
      'chat_with_customers',
      'manage_customer_support'
    ],
    defaultStatus: 'active',
    restrictions: [
      'Cannot add, edit, or delete products',
      'Cannot add, edit, or delete categories', 
      'Cannot add, edit, or delete user accounts',
      'Cannot access financial reports',
      'Cannot modify system settings'
    ]
  }
};