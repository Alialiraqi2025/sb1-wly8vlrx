import React, { useState } from 'react';
import { 
  Grid3X3, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Package, 
  Tag, 
  AlertCircle, 
  CheckCircle,
  Eye,
  ArrowUpDown,
  Filter
} from 'lucide-react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Frozen Food',
      description: 'Frozen meals, vegetables, and meat products',
      productCount: 45,
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      name: 'Bakery',
      description: 'Fresh bread, pastries, and baked goods',
      productCount: 35,
      status: 'active',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-19'
    },
    {
      id: 3,
      name: 'Snacks',
      description: 'Chips, cookies, nuts, and treats',
      productCount: 80,
      status: 'active',
      createdAt: '2024-01-13',
      updatedAt: '2024-01-18'
    },
    {
      id: 4,
      name: 'Cold Drinks',
      description: 'Sodas, juices, and cold beverages',
      productCount: 40,
      status: 'active',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-17'
    },
    {
      id: 5,
      name: 'Cleaning',
      description: 'Household cleaners and supplies',
      productCount: 30,
      status: 'active',
      createdAt: '2024-01-11',
      updatedAt: '2024-01-16'
    },
    {
      id: 6,
      name: 'Personal Service',
      description: 'Personal care and hygiene products',
      productCount: 25,
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15'
    },
    {
      id: 7,
      name: 'Mobile Accessories',
      description: 'Phone cases, chargers, and accessories',
      productCount: 60,
      status: 'active',
      createdAt: '2024-01-09',
      updatedAt: '2024-01-14'
    },
    {
      id: 8,
      name: 'Electric & Tools',
      description: 'Electronic devices and tools',
      productCount: 35,
      status: 'active',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-13'
    },
    {
      id: 9,
      name: 'Toys',
      description: 'Games, toys, and entertainment',
      productCount: 50,
      status: 'active',
      createdAt: '2024-01-07',
      updatedAt: '2024-01-12'
    },
    {
      id: 10,
      name: 'Ice Cream',
      description: 'Ice cream, popsicles, and frozen desserts',
      productCount: 20,
      status: 'active',
      createdAt: '2024-01-06',
      updatedAt: '2024-01-11'
    },
    {
      id: 11,
      name: 'Hot Drinks',
      description: 'Coffee, tea, and hot beverages',
      productCount: 30,
      status: 'active',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-10'
    },
    {
      id: 12,
      name: 'Grains & Rice',
      description: 'Rice, grains, and cereals',
      productCount: 45,
      status: 'active',
      createdAt: '2024-01-04',
      updatedAt: '2024-01-09'
    },
    {
      id: 13,
      name: 'Oils & Vinegar',
      description: 'Cooking oils, vinegar, and condiments',
      productCount: 25,
      status: 'active',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-08'
    },
    {
      id: 14,
      name: 'Fresh Produce',
      description: 'Fresh fruits and vegetables',
      productCount: 60,
      status: 'active',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-07'
    },
    {
      id: 15,
      name: 'Dairy',
      description: 'Milk, cheese, yogurt, and dairy products',
      productCount: 30,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-06'
    },
    {
      id: 16,
      name: 'Beverages',
      description: 'All types of beverages and drinks',
      productCount: 40,
      status: 'active',
      createdAt: '2023-12-31',
      updatedAt: '2024-01-05'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    status: 'active'
  });

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || category.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'products':
        return b.productCount - a.productCount;
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'inactive':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const handleAddCategory = () => {
    const category = {
      id: categories.length + 1,
      ...newCategory,
      productCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setCategories([...categories, category]);
    setNewCategory({
      name: '',
      description: '',
      status: 'active'
    });
    setShowAddModal(false);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      status: category.status
    });
    setShowEditModal(true);
  };

  const handleUpdateCategory = () => {
    const updatedCategory = {
      ...editingCategory,
      ...newCategory,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setCategories(categories.map(c => c.id === editingCategory.id ? updatedCategory : c));
    setShowEditModal(false);
    setEditingCategory(null);
    setNewCategory({
      name: '',
      description: '',
      status: 'active'
    });
  };

  const handleDeleteCategory = (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category && category.productCount > 0) {
      alert(`Cannot delete category "${category.name}" because it contains ${category.productCount} products. Please move or delete the products first.`);
      return;
    }
    
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const CategoryModal = ({ isEdit = false }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? 'Edit Category' : 'Add New Category'}
            </h2>
            <button
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setEditingCategory(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newCategory.description}
              onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter category description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={newCategory.status}
              onChange={(e) => setNewCategory({...newCategory, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setEditingCategory(null);
            }}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={isEdit ? handleUpdateCategory : handleAddCategory}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{isEdit ? 'Update Category' : 'Add Category'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
          <p className="text-gray-600">Organize and manage product categories</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Grid3X3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Categories</p>
              <p className="text-2xl font-bold text-green-600">
                {categories.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-purple-600">
                {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Products/Category</p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(categories.reduce((sum, cat) => sum + cat.productCount, 0) / categories.length)}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <Tag className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories by name or description..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="products">Sort by Product Count</option>
            <option value="created">Sort by Created Date</option>
          </select>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <Grid3X3 className="h-6 w-6 text-white" />
              </div>
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(category.status)}`}>
                {getStatusIcon(category.status)}
                <span className="capitalize">{category.status}</span>
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{category.productCount}</div>
                <div className="text-xs text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">{formatDate(category.updatedAt)}</div>
                <div className="text-xs text-gray-600">Last Updated</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Created: {formatDate(category.createdAt)}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-blue-600 hover:text-blue-900 p-1"
                  title="Edit Category"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-600 hover:text-red-900 p-1"
                  title="Delete Category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedCategories.length === 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="text-gray-400 mb-4">
            <Grid3X3 className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery ? 'Try adjusting your search criteria' : 'Get started by adding your first category'}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Add Category
          </button>
        </div>
      )}

      {/* Modals */}
      {showAddModal && <CategoryModal />}
      {showEditModal && <CategoryModal isEdit={true} />}
    </div>
  );
};

export default CategoryManagement;