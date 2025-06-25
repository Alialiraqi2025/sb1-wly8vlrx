import React from 'react';
import { Plus, Star, ShoppingCart } from 'lucide-react';

const PopularProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Jasmine Rice 2kg',
      brand: 'Premium',
      price: '9,200 IQD',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Grains & Rice',
      inStock: true
    },
    {
      id: 2,
      name: 'Sunflower Oil 1L',
      brand: 'Pure Gold',
      price: '6,500 IQD',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300',
      category: 'Oils & Vinegar',
      inStock: true
    },
    {
      id: 3,
      name: 'Potato Chips 150g',
      brand: 'Crispy Delight',
      price: '3,900 IQD',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Snacks',
      inStock: true
    },
    {
      id: 4,
      name: 'Dish Soap 500ml',
      brand: 'Clean Pro',
      price: '4,600 IQD',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Cleaning',
      inStock: true
    },
    {
      id: 5,
      name: 'Red Apples 1kg',
      brand: 'Farm Fresh',
      price: '4,200 IQD',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Fresh Produce',
      inStock: true
    },
    {
      id: 6,
      name: 'Greek Yogurt 500g',
      brand: 'Creamy Delight',
      price: '5,800 IQD',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Dairy',
      inStock: true
    }
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Popular Items</h2>
          <button className="text-orange-600 font-medium text-sm">See More</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-colors">
                  <Plus className="h-3 w-3 text-gray-600" />
                </button>
                <div className="absolute bottom-2 left-2">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-orange-600 text-xs">{product.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                  </div>
                </div>
                
                <button className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center space-x-1">
                  <ShoppingCart className="h-3 w-3" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;