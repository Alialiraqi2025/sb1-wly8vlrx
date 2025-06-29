import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Basmati Rice 5kg',
      brand: 'Premium Quality',
      price: '17,000 IQD',
      rating: 4.8,
      inStock: true,
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: '20% OFF',
      category: 'Grains & Rice'
    },
    {
      id: 2,
      name: 'Extra Virgin Olive Oil 1L',
      brand: 'Mediterranean Gold',
      price: '11,800 IQD',
      rating: 4.9,
      inStock: true,
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400',
      discount: 'Best Seller',
      category: 'Oils & Vinegar'
    },
    {
      id: 3,
      name: 'Chocolate Chip Cookies',
      brand: 'Sweet Delight 400g',
      price: '4,600 IQD',
      rating: 4.7,
      inStock: true,
      image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: '30% OFF',
      category: 'Snacks'
    },
    {
      id: 4,
      name: 'All-Purpose Cleaner 750ml',
      brand: 'CleanMax Pro',
      price: '5,200 IQD',
      rating: 4.6,
      inStock: true,
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: '25% OFF',
      category: 'Cleaning'
    },
    {
      id: 5,
      name: 'Fresh Bananas 1kg',
      brand: 'Farm Fresh',
      price: '2,800 IQD',
      rating: 4.5,
      inStock: true,
      image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: '15% OFF',
      category: 'Fresh Produce'
    },
    {
      id: 6,
      name: 'Fresh Milk 1L',
      brand: 'Daily Farm',
      price: '3,400 IQD',
      rating: 4.8,
      inStock: true,
      image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400',
      discount: 'Fresh Today',
      category: 'Dairy'
    }
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
          <button className="text-orange-600 font-medium text-sm">View All</button>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.discount}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    {product.category}
                  </span>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-orange-50 px-2 py-1 rounded-lg">
                    <Star className="h-3 w-3 text-orange-600 fill-current" />
                    <span className="text-xs font-semibold text-orange-600">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-orange-600">{product.price}</span>
                  </div>
                  <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors">
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="mt-2 text-xs text-orange-600 font-medium">
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;