import React from 'react';
import { Percent, Clock, Gift, Tag } from 'lucide-react';

const Deals = () => {
  const deals = [
    {
      id: 1,
      title: 'Weekly Sale',
      description: 'Up to 40% off on selected items',
      timeLeft: '3d 12h',
      icon: Percent,
      color: 'from-red-500 to-pink-500',
      products: 25
    },
    {
      id: 2,
      title: 'Buy 2 Get 1',
      description: 'Free item on cleaning products',
      timeLeft: '2d 8h',
      icon: Gift,
      color: 'from-orange-500 to-red-500',
      products: 18
    },
    {
      id: 3,
      title: 'Free Delivery',
      description: 'Free delivery on orders over 5,000 IQD',
      timeLeft: 'Always',
      icon: Tag,
      color: 'from-orange-500 to-yellow-500',
      products: 'All items'
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Special Offers</h2>
          <button className="text-orange-600 font-medium text-sm">All Deals</button>
        </div>

        <div className="space-y-4">
          {deals.map((deal) => (
            <div key={deal.id} className={`bg-gradient-to-r ${deal.color} rounded-2xl p-4 text-white relative overflow-hidden`}>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-xl">
                      <deal.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{deal.title}</h3>
                      <p className="text-white/90 text-sm">{deal.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold">⏰ {deal.timeLeft} {deal.timeLeft !== 'Always' ? 'left' : ''}</span>
                    </div>
                    <span className="text-xs text-white/80">{deal.products} {typeof deal.products === 'number' ? 'products' : ''}</span>
                  </div>
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all">
                    Shop Now
                  </button>
                </div>
              </div>
              
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full"></div>
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/5 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deals;