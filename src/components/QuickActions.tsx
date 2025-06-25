import React from 'react';
import { Truck, Clock, Percent, Gift as Gift2, ShoppingBag } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Truck,
      title: 'Free Delivery',
      subtitle: 'Orders over 5,000 IQD',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Clock,
      title: 'Same Day',
      subtitle: 'Fast delivery',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Percent,
      title: 'Daily Deals',
      subtitle: 'Up to 50% off',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: ShoppingBag,
      title: 'Bulk Orders',
      subtitle: 'Special prices',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-6 bg-white">
      <div className="max-w-md mx-auto px-4">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`bg-gradient-to-r ${action.color} rounded-2xl p-4 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className="text-xs text-white/80">{action.subtitle}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;