import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  MapPin, 
  Clock, 
  Truck, 
  CreditCard,
  Gift,
  Tag,
  ArrowRight,
  Package,
  Heart,
  Star,
  AlertCircle
} from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Basmati Rice 5kg',
      brand: 'Premium Quality',
      price: 17000,
      originalPrice: 21000,
      quantity: 2,
      image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Grains & Rice',
      inStock: true,
      discount: 20
    },
    {
      id: 2,
      name: 'Extra Virgin Olive Oil 1L',
      brand: 'Mediterranean Gold',
      price: 11800,
      originalPrice: 14400,
      quantity: 1,
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=200',
      category: 'Oils & Vinegar',
      inStock: true,
      discount: 18
    },
    {
      id: 3,
      name: 'Chocolate Chip Cookies 400g',
      brand: 'Sweet Delight',
      price: 4600,
      originalPrice: 6500,
      quantity: 3,
      image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Snacks',
      inStock: true,
      discount: 30
    },
    {
      id: 4,
      name: 'Fresh Milk 1L',
      brand: 'Daily Farm',
      price: 3400,
      originalPrice: 4000,
      quantity: 2,
      image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=200',
      category: 'Dairy',
      inStock: false,
      discount: 15
    }
  ]);

  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const MINIMUM_ORDER_FOR_FREE_DELIVERY = 5000;
  const DELIVERY_FEE = 2000;

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      time: '2-3 hours',
      price: 0,
      icon: Truck,
      description: 'Free on orders over 5,000 IQD'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      time: '30-60 minutes',
      price: 0,
      icon: Clock,
      description: 'Free on orders over 5,000 IQD'
    },
    {
      id: 'pickup',
      name: 'Store Pickup',
      time: '15-30 minutes',
      price: 0,
      icon: Package,
      description: 'Always free collection from store'
    }
  ];

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const moveToWishlist = (id: number) => {
    // In a real app, this would add to wishlist and remove from cart
    removeItem(id);
  };

  const applyPromoCode = () => {
    const validCodes = {
      'SAVE10': { discount: 0.1, description: '10% off total' },
      'NEWUSER': { discount: 0.15, description: '15% off for new users' },
      'BULK20': { discount: 0.2, description: '20% off bulk orders' }
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        ...validCodes[promoCode.toUpperCase()]
      });
      setPromoCode('');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => 
      total + ((item.originalPrice - item.price) * item.quantity), 0
    );
  };

  const getDeliveryPrice = () => {
    const subtotal = calculateSubtotal();
    if (deliveryOption === 'pickup') return 0;
    return subtotal >= MINIMUM_ORDER_FOR_FREE_DELIVERY ? 0 : DELIVERY_FEE;
  };

  const calculatePromoDiscount = () => {
    if (!appliedPromo) return 0;
    return Math.round(calculateSubtotal() * appliedPromo.discount);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const delivery = getDeliveryPrice();
    const promoDiscount = calculatePromoDiscount();
    return subtotal + delivery - promoDiscount;
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} IQD`;
  };

  const getRemainingForFreeDelivery = () => {
    const subtotal = calculateSubtotal();
    return Math.max(0, MINIMUM_ORDER_FOR_FREE_DELIVERY - subtotal);
  };

  const inStockItems = cartItems.filter(item => item.inStock);
  const outOfStockItems = cartItems.filter(item => !item.inStock);

  if (cartItems.length === 0) {
    return (
      <section className="pt-20 pb-24 bg-gray-50 min-h-screen">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="text-gray-400 mb-4">
              <ShoppingCart className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold">
              Start Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (showCheckout) {
    return (
      <section className="pt-20 pb-24 bg-gray-50 min-h-screen">
        <div className="max-w-md mx-auto px-4">
          {/* Checkout Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowCheckout(false)}
              className="text-orange-600 font-medium"
            >
              ← Back to Cart
            </button>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
            <div></div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({inStockItems.length} items)</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className={getDeliveryPrice() === 0 ? 'text-orange-600' : ''}>
                  {getDeliveryPrice() === 0 ? 'Free' : formatPrice(getDeliveryPrice())}
                </span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-orange-600">
                  <span>Promo ({appliedPromo.code})</span>
                  <span>-{formatPrice(calculatePromoDiscount())}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-orange-600">{formatPrice(calculateTotal())}</span>
              </div>
            </div>
          </div>

          {/* Delivery Banner */}
          <div className={`rounded-2xl p-4 mb-4 text-white ${
            getDeliveryPrice() === 0 
              ? 'bg-gradient-to-r from-orange-500 to-red-500' 
              : 'bg-gradient-to-r from-gray-500 to-gray-600'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                {getDeliveryPrice() === 0 ? (
                  <>
                    <h3 className="font-bold">🎉 Free Delivery!</h3>
                    <p className="text-sm text-orange-100">Your order qualifies for free delivery</p>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold">Delivery Fee: {formatPrice(DELIVERY_FEE)}</h3>
                    <p className="text-sm text-gray-100">
                      Add {formatPrice(getRemainingForFreeDelivery())} more for free delivery
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">Delivery Address</h3>
              <button className="text-orange-600 text-sm">Change</button>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Ahmed Al-Rashid</p>
                <p className="text-sm text-gray-600">Haifa Street, Al-Karkh, Baghdad</p>
                <p className="text-sm text-gray-600">+964 770 123 4567</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">Payment Method</h3>
              <button className="text-orange-600 text-sm">Change</button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Cash on Delivery</p>
                <p className="text-sm text-gray-600">Pay when you receive your order</p>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all">
            Place Order • {formatPrice(calculateTotal())}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            By placing this order, you agree to our Terms & Conditions
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <span className="text-sm text-gray-600">{cartItems.length} items</span>
        </div>

        {/* Delivery Status Banner */}
        <div className={`rounded-2xl p-4 mb-6 text-white ${
          getDeliveryPrice() === 0 
            ? 'bg-gradient-to-r from-orange-500 to-red-500' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              {getDeliveryPrice() === 0 ? (
                <>
                  <h3 className="font-bold">🎉 Free Delivery Unlocked!</h3>
                  <p className="text-sm text-orange-100">Your order qualifies for free delivery</p>
                </>
              ) : (
                <>
                  <h3 className="font-bold">Add {formatPrice(getRemainingForFreeDelivery())} for Free Delivery</h3>
                  <p className="text-sm text-blue-100">
                    Minimum order: {formatPrice(MINIMUM_ORDER_FOR_FREE_DELIVERY)} • Current: {formatPrice(calculateSubtotal())}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Out of Stock Items Alert */}
        {outOfStockItems.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-800">Items Out of Stock</h3>
                <p className="text-sm text-orange-700">
                  {outOfStockItems.length} item(s) in your cart are currently unavailable
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {/* In Stock Items */}
          {inStockItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-600">{item.brand}</p>
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mt-1">
                        {item.category}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-orange-600 text-sm">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                        <span className="bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded">
                          -{item.discount}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Total: {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => moveToWishlist(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-200 rounded-lg"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-200 rounded-lg"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Out of Stock Items */}
          {outOfStockItems.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-2xl p-4 opacity-60">
              <div className="flex space-x-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg grayscale"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-700 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.brand}</p>
                      <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                        Out of Stock
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-gray-500 text-sm">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => moveToWishlist(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-900 mb-3">Promo Code</h3>
          {appliedPromo ? (
            <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-orange-600" />
                <div>
                  <span className="font-medium text-orange-800">{appliedPromo.code}</span>
                  <p className="text-xs text-orange-600">{appliedPromo.description}</p>
                </div>
              </div>
              <button
                onClick={removePromoCode}
                className="text-orange-600 hover:text-orange-700 text-sm"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
              <button
                onClick={applyPromoCode}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Delivery Options */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-900 mb-3">Delivery Options</h3>
          <div className="space-y-3">
            {deliveryOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  deliveryOption === option.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={deliveryOption === option.id}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                  className="sr-only"
                />
                <div className={`p-2 rounded-lg ${
                  deliveryOption === option.id ? 'bg-orange-100' : 'bg-gray-100'
                }`}>
                  <option.icon className={`h-4 w-4 ${
                    deliveryOption === option.id ? 'text-orange-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{option.name}</p>
                      <p className="text-xs text-gray-600">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-orange-600">
                        {option.id === 'pickup' || getDeliveryPrice() === 0 ? 'Free' : formatPrice(DELIVERY_FEE)}
                      </p>
                      <p className="text-xs text-gray-600">{option.time}</p>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal ({inStockItems.length} items)</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between text-orange-600">
              <span>You saved</span>
              <span>-{formatPrice(calculateSavings())}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className={getDeliveryPrice() === 0 ? 'text-orange-600' : ''}>
                {getDeliveryPrice() === 0 ? 'Free' : formatPrice(getDeliveryPrice())}
              </span>
            </div>
            {appliedPromo && (
              <div className="flex justify-between text-orange-600">
                <span>Promo discount</span>
                <span>-{formatPrice(calculatePromoDiscount())}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-orange-600">{formatPrice(calculateTotal())}</span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        {inStockItems.length > 0 && (
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        )}

        {/* Continue Shopping */}
        <button className="w-full mt-3 bg-white text-gray-700 py-3 rounded-2xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
          Continue Shopping
        </button>

        {/* Recommendations */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">You might also like</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                name: 'Organic Honey 500g',
                price: '8,500 IQD',
                image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=200',
                rating: 4.8
              },
              {
                name: 'Green Tea 100 bags',
                price: '6,200 IQD',
                image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=200',
                rating: 4.7
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-2xl p-3 shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <h4 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-orange-600 text-sm">{product.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-1.5 rounded-lg text-xs font-medium mt-2 hover:bg-orange-600">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;