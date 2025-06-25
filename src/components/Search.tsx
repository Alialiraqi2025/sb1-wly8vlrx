import React, { useState, useEffect } from 'react';
import { 
  Search as SearchIcon, 
  Filter, 
  X, 
  Star, 
  ShoppingCart, 
  Heart, 
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowUpDown,
  MapPin,
  Clock,
  Zap,
  Tag,
  Package,
  TrendingUp,
  History
} from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Rice', 'Olive Oil', 'Milk', 'Bread', 'Chicken'
  ]);
  const [trendingSearches] = useState([
    'Basmati Rice', 'Organic Products', 'Fresh Vegetables', 'Dairy Products', 'Snacks'
  ]);

  const categories = [
    { id: 'all', name: 'All Categories', count: 1000 },
    { id: 'grains', name: 'Grains & Rice', count: 45 },
    { id: 'oils', name: 'Oils & Vinegar', count: 25 },
    { id: 'snacks', name: 'Snacks', count: 80 },
    { id: 'cleaning', name: 'Cleaning', count: 35 },
    { id: 'produce', name: 'Fresh Produce', count: 60 },
    { id: 'dairy', name: 'Dairy', count: 30 },
    { id: 'beverages', name: 'Beverages', count: 40 },
    { id: 'frozen', name: 'Frozen Foods', count: 25 }
  ];

  const sortOptions = [
    { id: 'relevance', name: 'Most Relevant', icon: TrendingUp },
    { id: 'price-low', name: 'Price: Low to High', icon: ArrowUpDown },
    { id: 'price-high', name: 'Price: High to Low', icon: ArrowUpDown },
    { id: 'rating', name: 'Highest Rated', icon: Star },
    { id: 'newest', name: 'Newest First', icon: Clock },
    { id: 'popular', name: 'Most Popular', icon: TrendingUp }
  ];

  const allProducts = [
    {
      id: 1,
      name: 'Premium Basmati Rice 5kg',
      brand: 'Golden Harvest',
      price: 17000,
      originalPrice: 21000,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'grains',
      categoryName: 'Grains & Rice',
      inStock: true,
      discount: 20,
      tags: ['premium', 'basmati', 'rice', 'grain'],
      description: 'Long grain premium basmati rice, perfect for biryanis and pilafs'
    },
    {
      id: 2,
      name: 'Extra Virgin Olive Oil 1L',
      brand: 'Mediterranean Gold',
      price: 11800,
      originalPrice: 14400,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400',
      category: 'oils',
      categoryName: 'Oils & Vinegar',
      inStock: true,
      discount: 18,
      tags: ['olive', 'oil', 'extra virgin', 'cooking'],
      description: 'Cold-pressed extra virgin olive oil from Mediterranean olives'
    },
    {
      id: 3,
      name: 'Chocolate Chip Cookies 400g',
      brand: 'Sweet Delight',
      price: 4600,
      originalPrice: 6500,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'snacks',
      categoryName: 'Snacks',
      inStock: true,
      discount: 30,
      tags: ['cookies', 'chocolate', 'snack', 'sweet'],
      description: 'Crispy chocolate chip cookies made with real chocolate chips'
    },
    {
      id: 4,
      name: 'All-Purpose Cleaner 750ml',
      brand: 'CleanMax Pro',
      price: 5200,
      originalPrice: 7000,
      rating: 4.6,
      reviews: 78,
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'cleaning',
      categoryName: 'Cleaning',
      inStock: true,
      discount: 25,
      tags: ['cleaner', 'cleaning', 'household', 'spray'],
      description: 'Multi-surface cleaner for kitchen, bathroom, and household cleaning'
    },
    {
      id: 5,
      name: 'Fresh Bananas 1kg',
      brand: 'Farm Fresh',
      price: 2800,
      originalPrice: 3200,
      rating: 4.5,
      reviews: 203,
      image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'produce',
      categoryName: 'Fresh Produce',
      inStock: true,
      discount: 15,
      tags: ['banana', 'fruit', 'fresh', 'organic'],
      description: 'Fresh ripe bananas, perfect for snacking or smoothies'
    },
    {
      id: 6,
      name: 'Fresh Milk 1L',
      brand: 'Daily Farm',
      price: 3400,
      originalPrice: 4000,
      rating: 4.8,
      reviews: 167,
      image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'dairy',
      categoryName: 'Dairy',
      inStock: true,
      discount: 15,
      tags: ['milk', 'dairy', 'fresh', 'calcium'],
      description: 'Fresh whole milk from local dairy farms'
    },
    {
      id: 7,
      name: 'Orange Juice 1L',
      brand: 'Pure Squeeze',
      price: 4200,
      originalPrice: 5000,
      rating: 4.4,
      reviews: 92,
      image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'beverages',
      categoryName: 'Beverages',
      inStock: true,
      discount: 16,
      tags: ['juice', 'orange', 'vitamin c', 'fresh'],
      description: '100% pure orange juice with no added sugar'
    },
    {
      id: 8,
      name: 'Frozen Mixed Vegetables 500g',
      brand: 'Arctic Fresh',
      price: 3800,
      originalPrice: 4500,
      rating: 4.3,
      reviews: 64,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'frozen',
      categoryName: 'Frozen Foods',
      inStock: true,
      discount: 16,
      tags: ['vegetables', 'frozen', 'mixed', 'healthy'],
      description: 'Premium frozen mixed vegetables including carrots, peas, and corn'
    }
  ];

  const filterProducts = () => {
    let filtered = allProducts;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query)) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        // In a real app, this would sort by creation date
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Relevance - keep original order for now
        break;
    }

    return filtered;
  };

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setSearchResults(filterProducts());
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('relevance');
    setPriceRange([0, 50000]);
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} IQD`;
  };

  const ProductCard = ({ product, isGrid }: { product: any, isGrid: boolean }) => {
    if (isGrid) {
      return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
          <div className="relative">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                -{product.discount}%
              </span>
            </div>
            <div className="absolute top-3 right-3 flex space-x-1">
              <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors">
                <Heart className="h-3 w-3 text-gray-600" />
              </button>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                {product.categoryName}
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
            <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>
              <span className="text-xs text-orange-600 font-medium">✓ In Stock</span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-bold text-orange-600 text-sm">{formatPrice(product.price)}</span>
                <span className="text-xs text-gray-500 line-through ml-2">{formatPrice(product.originalPrice)}</span>
              </div>
            </div>
            
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-1">
              <ShoppingCart className="h-3 w-3" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex space-x-4">
            <div className="relative">
              <img 
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="absolute -top-1 -right-1">
                <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold">
                  -{product.discount}%
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-600">{product.brand}</p>
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                    {product.categoryName}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                <span className="text-xs text-orange-600 font-medium">✓ In Stock</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-orange-600 text-sm">{formatPrice(product.price)}</span>
                  <span className="text-xs text-gray-500 line-through ml-2">{formatPrice(product.originalPrice)}</span>
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center space-x-1">
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

  return (
    <section className="pt-20 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4">
        {/* Search Header */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for products, brands, categories..."
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Suggestions */}
        {!searchQuery && (
          <div className="mb-6 space-y-4">
            {/* Recent Searches */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <History className="h-4 w-4 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Recent Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="bg-white border border-gray-200 px-3 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Searches */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Trending Now</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-full text-sm hover:shadow-lg transition-all"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Categories Filter */}
        <div className="mb-4">
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
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

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  On Sale
                </button>
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  In Stock
                </button>
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  High Rated (4.5+)
                </button>
                <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Free Delivery
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Results Header */}
        {searchQuery && (
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isSearching ? 'Searching...' : `${searchResults.length} results`}
              </h2>
              <p className="text-sm text-gray-600">for "{searchQuery}"</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}

        {/* Search Results */}
        {!isSearching && searchResults.length > 0 && (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} isGrid={viewMode === 'grid'} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isSearching && searchQuery && searchResults.length === 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="text-gray-400 mb-4">
              <Package className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any products matching "{searchQuery}"
            </p>
            <button
              onClick={clearSearch}
              className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Default Categories View */}
        {!searchQuery && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Browse Categories</h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.slice(1).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{category.name}</div>
                  <div className="text-xs text-gray-600">{category.count} items</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;