import React from 'react';
import { MapPin, Star, Clock, ArrowRight, ShoppingBasket } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-28 pb-8 bg-gradient-to-br from-orange-50 via-white to-red-50 safe-top">
      <div className="responsive-container">
        {/* Location & Greeting */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600 text-responsive">Welcome back!</p>
            <div className="flex items-center space-x-1 mt-1">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="text-gray-900 font-medium text-responsive">Haifa street, Baghdad</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">4.9</span>
            </div>
            <p className="text-xs text-gray-600">Store rating</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for groceries, household items..."
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 pl-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm text-responsive ios-input touch-target focus-ring"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-1.5 rounded-lg">
              <ShoppingBasket className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        {/* Featured Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl card-responsive mb-8 text-white relative overflow-hidden hover-lift">
          <div className="relative z-10">
            <h2 className="text-responsive-xl font-bold mb-2">Fresh & Quality Products</h2>
            <p className="text-orange-100 mb-4 text-responsive">Get all your daily essentials at the best prices</p>
            <button className="bg-white text-orange-600 btn-responsive font-semibold flex items-center space-x-2 hover:shadow-lg transition-all ios-button android-button hover-lift touch-active focus-ring">
              <span>Shop Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>
        </div>

        {/* Free Delivery Notice */}
        <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl card-responsive text-white hover-lift">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <ShoppingBasket className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-responsive-lg">Free Delivery Available!</h3>
              <p className="text-sm text-blue-100 text-responsive">On orders over 5,000 IQD</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid-responsive mt-8 mb-8">
          <div className="bg-white rounded-2xl card-responsive text-center shadow-sm hover-lift">
            <div className="text-responsive-xl font-bold text-gray-900">1000+</div>
            <div className="text-xs text-gray-600">Products</div>
          </div>
          <div className="bg-white rounded-2xl card-responsive text-center shadow-sm hover-lift">
            <div className="text-responsive-xl font-bold text-gray-900">5K+</div>
            <div className="text-xs text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white rounded-2xl card-responsive text-center shadow-sm hover-lift">
            <div className="text-responsive-xl font-bold text-gray-900">4.9</div>
            <div className="text-xs text-gray-600">Store Rating</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white border border-gray-200 rounded-2xl card-responsive flex items-center space-x-3 hover:shadow-md transition-all ios-button android-button hover-lift touch-active focus-ring">
            <div className="bg-orange-100 p-2 rounded-xl">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 text-responsive">Fast Delivery</div>
              <div className="text-xs text-gray-600">Same day delivery</div>
            </div>
          </button>
          <button className="bg-white border border-gray-200 rounded-2xl card-responsive flex items-center space-x-3 hover:shadow-md transition-all ios-button android-button hover-lift touch-active focus-ring">
            <div className="bg-red-100 p-2 rounded-xl">
              <Star className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 text-responsive">Best Quality</div>
              <div className="text-xs text-gray-600">Fresh products</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;