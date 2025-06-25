import React, { useState } from 'react';
import { 
  Snowflake, 
  Cookie, 
  Coffee,
  Sparkles, 
  User,
  Smartphone,
  Zap,
  Gamepad2,
  IceCream,
  Grid3X3,
  Star,
  ShoppingCart,
  Heart,
  Filter,
  List,
  ArrowUpDown
} from 'lucide-react';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { 
      id: 'all',
      icon: Grid3X3, 
      name: 'All Categories', 
      color: 'from-gray-500 to-gray-600', 
      count: '500+',
      description: 'Browse all available products'
    },
    { 
      id: 'frozen',
      icon: Snowflake, 
      name: 'Frozen Food', 
      color: 'from-cyan-500 to-blue-600', 
      count: '45+',
      description: 'Frozen meals, vegetables, and meat'
    },
    { 
      id: 'bakery',
      icon: Cookie, 
      name: 'Bakery', 
      color: 'from-amber-500 to-orange-500', 
      count: '35+',
      description: 'Fresh bread, pastries, and baked goods'
    },
    { 
      id: 'snacks',
      icon: Cookie, 
      name: 'Snacks', 
      color: 'from-red-500 to-pink-500', 
      count: '80+',
      description: 'Chips, cookies, nuts, and treats'
    },
    { 
      id: 'cold-drinks',
      icon: Coffee, 
      name: 'Cold Drinks', 
      color: 'from-blue-500 to-cyan-500', 
      count: '40+',
      description: 'Sodas, juices, and cold beverages'
    },
    { 
      id: 'cleaning',
      icon: Sparkles, 
      name: 'Cleaning', 
      color: 'from-orange-500 to-red-500', 
      count: '30+',
      description: 'Household cleaners and supplies'
    },
    { 
      id: 'personal-service',
      icon: User, 
      name: 'Personal Service', 
      color: 'from-purple-500 to-indigo-500', 
      count: '25+',
      description: 'Personal care and hygiene products'
    },
    { 
      id: 'mobile-accessories',
      icon: Smartphone, 
      name: 'Mobile Accessories', 
      color: 'from-gray-600 to-gray-800', 
      count: '60+',
      description: 'Phone cases, chargers, and accessories'
    },
    { 
      id: 'electric-tools',
      icon: Zap, 
      name: 'Electric & Tools', 
      color: 'from-yellow-500 to-orange-600', 
      count: '35+',
      description: 'Electronic devices and tools'
    },
    { 
      id: 'toys',
      icon: Gamepad2, 
      name: 'Toys', 
      color: 'from-pink-500 to-purple-600', 
      count: '50+',
      description: 'Games, toys, and entertainment'
    },
    { 
      id: 'ice-cream',
      icon: IceCream, 
      name: 'Ice Cream', 
      color: 'from-teal-500 to-cyan-600', 
      count: '20+',
      description: 'Ice cream, popsicles, and frozen desserts'
    },
    { 
      id: 'hot-drinks',
      icon: Coffee, 
      name: 'Hot Drinks', 
      color: 'from-brown-500 to-orange-700', 
      count: '30+',
      description: 'Coffee, tea, and hot beverages'
    }
  ];

  const categoryProducts = {
    frozen: [
      {
        id: 1,
        name: 'Frozen Mixed Vegetables 500g',
        brand: 'Arctic Fresh',
        price: '3,800 IQD',
        originalPrice: '4,500 IQD',
        rating: 4.3,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 16,
        inStock: true
      },
      {
        id: 2,
        name: 'Frozen Chicken Nuggets 1kg',
        brand: 'Golden Crispy',
        price: '12,500 IQD',
        originalPrice: '15,000 IQD',
        rating: 4.6,
        image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 17,
        inStock: true
      }
    ],
    bakery: [
      {
        id: 3,
        name: 'Fresh White Bread 500g',
        brand: 'Daily Bakery',
        price: '2,200 IQD',
        originalPrice: '2,800 IQD',
        rating: 4.5,
        image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 21,
        inStock: true
      },
      {
        id: 4,
        name: 'Chocolate Croissant 6pcs',
        brand: 'French Delights',
        price: '8,500 IQD',
        originalPrice: '10,000 IQD',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=200',
        discount: 15,
        inStock: true
      }
    ],
    snacks: [
      {
        id: 5,
        name: 'Chocolate Chip Cookies 400g',
        brand: 'Sweet Delight',
        price: '4,600 IQD',
        originalPrice: '6,500 IQD',
        rating: 4.7,
        image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 30,
        inStock: true
      },
      {
        id: 6,
        name: 'Potato Chips 150g',
        brand: 'Crispy Delight',
        price: '3,900 IQD',
        originalPrice: '4,500 IQD',
        rating: 4.5,
        image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 13,
        inStock: true
      }
    ],
    'cold-drinks': [
      {
        id: 7,
        name: 'Coca Cola 1.5L',
        brand: 'Coca Cola',
        price: '3,200 IQD',
        originalPrice: '4,000 IQD',
        rating: 4.4,
        image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 20,
        inStock: true
      },
      {
        id: 8,
        name: 'Orange Juice 1L',
        brand: 'Pure Squeeze',
        price: '4,200 IQD',
        originalPrice: '5,000 IQD',
        rating: 4.6,
        image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 16,
        inStock: true
      }
    ],
    cleaning: [
      {
        id: 9,
        name: 'All-Purpose Cleaner 750ml',
        brand: 'CleanMax Pro',
        price: '5,200 IQD',
        originalPrice: '7,000 IQD',
        rating: 4.6,
        image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 25,
        inStock: true
      },
      {
        id: 10,
        name: 'Dish Soap 500ml',
        brand: 'Clean Pro',
        price: '4,600 IQD',
        originalPrice: '5,500 IQD',
        rating: 4.4,
        image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 16,
        inStock: true
      }
    ],
    'personal-service': [
      {
        id: 11,
        name: 'Shampoo 400ml',
        brand: 'Hair Care Pro',
        price: '8,500 IQD',
        originalPrice: '10,000 IQD',
        rating: 4.5,
        image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 15,
        inStock: true
      },
      {
        id: 12,
        name: 'Toothpaste 100g',
        brand: 'Fresh Smile',
        price: '3,200 IQD',
        originalPrice: '4,000 IQD',
        rating: 4.7,
        image: 'https://images.pexels.com/photos/298611/pexels-photo-298611.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 20,
        inStock: true
      }
    ],
    'mobile-accessories': [
      {
        id: 13,
        name: 'Phone Case iPhone 14',
        brand: 'TechGuard',
        price: '15,000 IQD',
        originalPrice: '18,000 IQD',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 17,
        inStock: true
      },
      {
        id: 14,
        name: 'USB-C Cable 2m',
        brand: 'FastCharge',
        price: '8,500 IQD',
        originalPrice: '10,000 IQD',
        rating: 4.6,
        image: 'https://images.pexels.com/photos/163125/phone-mobile-smartphone-android-163125.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 15,
        inStock: true
      }
    ],
    'electric-tools': [
      {
        id: 15,
        name: 'Electric Drill 18V',
        brand: 'PowerTech',
        price: '85,000 IQD',
        originalPrice: '100,000 IQD',
        rating: 4.7,
        image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 15,
        inStock: true
      },
      {
        id: 16,
        name: 'LED Flashlight',
        brand: 'BrightLight',
        price: '12,000 IQD',
        originalPrice: '15,000 IQD',
        rating: 4.5,
        image: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 20,
        inStock: true
      }
    ],
    toys: [
      {
        id: 17,
        name: 'Building Blocks Set',
        brand: 'Creative Kids',
        price: '25,000 IQD',
        originalPrice: '30,000 IQD',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/298825/pexels-photo-298825.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 17,
        inStock: true
      },
      {
        id: 18,
        name: 'Remote Control Car',
        brand: 'SpeedRacer',
        price: '45,000 IQD',
        originalPrice: '55,000 IQD',
        rating: 4.6,
        image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 18,
        inStock: true
      }
    ],
    'ice-cream': [
      {
        id: 19,
        name: 'Vanilla Ice Cream 1L',
        brand: 'Creamy Dreams',
        price: '7,500 IQD',
        originalPrice: '9,000 IQD',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 17,
        inStock: true
      },
      {
        id: 20,
        name: 'Chocolate Popsicles 6pcs',
        brand: 'Cool Treats',
        price: '4,500 IQD',
        originalPrice: '5,500 IQD',
        rating: 4.5,
        image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 18,
        inStock: true
      }
    ],
    'hot-drinks': [
      {
        id: 21,
        name: 'Instant Coffee 200g',
        brand: 'Morning Brew',
        price: '12,000 IQD',
        originalPrice: '15,000 IQD',
        rating: 4.6,
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 20,
        inStock: true
      },
      {
        id: 22,
        name: 'Green Tea 100 bags',
        brand: 'Pure Leaf',
        price: '6,200 IQD',
        originalPrice: '7,500 IQD',
        rating: 4.7,
        image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=200',
        discount: 17,
        inStock: true
      }
    ]
  };

  const getCurrentProducts = () => {
    if (selectedCategory === 'all') {
      return Object.values(categoryProducts).flat();
    }
    return categoryProducts[selectedCategory] || [];
  };

  const sortProducts = (products) => {
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => 
          parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''))
        );
      case 'price-high':
        return [...products].sort((a, b) => 
          parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''))
        );
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'discount':
        return [...products].sort((a, b) => b.discount - a.discount);
      default:
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const ProductCard = ({ product, isGrid }) => {
    if (isGrid) {
      return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
          <div className="relative">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                -{product.discount}%
              </span>
            </div>
            <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors">
              <Heart className="h-3 w-3 text-gray-600" />
            </button>
          </div>
          
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
            <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs font-medium text-gray-700">{product.rating}</span>
              </div>
              <span className="text-xs text-orange-600 font-medium">✓ In Stock</span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-bold text-orange-600 text-xs">{product.price}</span>
                <span className="text-xs text-gray-500 line-through ml-1">{product.originalPrice}</span>
              </div>
            </div>
            
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-1">
              <ShoppingCart className="h-3 w-3" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex space-x-3">
            <div className="relative">
              <img 
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="absolute -top-1 -right-1">
                <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold">
                  -{product.discount}%
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-600">{product.brand}</p>
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                </div>
                <span className="text-xs text-orange-600 font-medium">✓ In Stock</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-orange-600 text-sm">{product.price}</span>
                  <span className="text-xs text-gray-500 line-through ml-2">{product.originalPrice}</span>
                </div>
                <button className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-orange-600 transition-colors flex items-center space-x-1">
                  <ShoppingCart className="h-3 w-3" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const currentProducts = sortProducts(getCurrentProducts());
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <section className="pt-20 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Categories</h1>
          <p className="text-gray-600">Browse products by category</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-2xl p-3 text-center hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white border border-gray-100'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform ${
                selectedCategory === category.id
                  ? 'bg-white/20'
                  : `bg-gradient-to-r ${category.color}`
              }`}>
                <category.icon className={`h-5 w-5 ${
                  selectedCategory === category.id ? 'text-white' : 'text-white'
                }`} />
              </div>
              <div className={`font-semibold text-xs mb-1 ${
                selectedCategory === category.id ? 'text-white' : 'text-gray-900'
              }`}>
                {category.name}
              </div>
              <div className={`text-xs ${
                selectedCategory === category.id ? 'text-white/80' : 'text-gray-600'
              }`}>
                {category.count}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Category Info */}
        {selectedCategoryData && (
          <div className={`rounded-2xl p-4 mb-6 text-white bg-gradient-to-r ${selectedCategoryData.color}`}>
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <selectedCategoryData.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{selectedCategoryData.name}</h2>
                <p className="text-white/90 text-sm">{selectedCategoryData.description}</p>
                <p className="text-white/80 text-xs mt-1">{currentProducts.length} products available</p>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 px-3 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Best Deals</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Products Grid/List */}
        {currentProducts.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-3'}>
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} isGrid={viewMode === 'grid'} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="text-gray-400 mb-4">
              <selectedCategoryData.icon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              We're working on adding more products to this category.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
            >
              Browse All Categories
            </button>
          </div>
        )}

        {/* Quick Stats */}
        {selectedCategory === 'all' && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-xs text-gray-600">Categories</div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-red-600">500+</div>
              <div className="text-xs text-gray-600">Products</div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-purple-600">4.6</div>
              <div className="text-xs text-gray-600">Avg Rating</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;