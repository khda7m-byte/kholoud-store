'use client';

import React, { useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const whatsappNumber = '966501358096';

  const categories = [
    'الكل',
    'الأحجام الفردية',
    'العروض التوفيرية 🔥',
    'عن المنتَج'
  ];

  const products = [
    {
      id: 1,
      name: 'كريم إيفار للتفتيح الفوري - 50 مل',
      category: 'الأحجام الفردية',
      price: 79,
      oldPrice: 99,
      size: '50 مل',
      badge: 'الحجم التجريبي',
      description: 'حجم مثالي للتجربة والتنقل، يمنح البشرة ترطيباً عميقاً وإشراقة طبيعية.',
      image: 'https://i.ibb.co/Cp4SfL6b/image-2.png'
    },
    {
      id: 2,
      name: 'كريم إيفار للتفتيح الفوري - 100 مل',
      category: 'الأحجام الفردية',
      price: 129,
      oldPrice: 159,
      size: '100 مل',
      badge: 'الأكثر طلباً ✨',
      description: 'الحجم الأكثر شعبية واستخداماً، مناسب للاستعمال اليومي المستمر.',
      image: 'https://i.ibb.co/hFfyRND2/image.png'
    },
    {
      id: 3,
      name: 'كريم إيفار للتفتيح الفوري - 200 مل',
      category: 'الأحجام الفردية',
      price: 199,
      oldPrice: 249,
      size: '200 مل',
      badge: 'الحجم التوفيري',
      description: 'عبوة توفيرية مضاعفة تضمن لكِ عناية وترطيباً يدوم لفترة طويلة.',
      image: 'https://i.ibb.co/n8rfK9qC/image-3.png'
    },
    {
      id: 4,
      name: 'عرض العلبة المزدوجة (2 × 50 مل)',
      category: 'العروض التوفيرية 🔥',
      price: 135,
      oldPrice: 158,
      size: '2 عبوة × 50 مل',
      badge: 'وفر 23 ر.س',
      description: 'احصلي على علبتين حجم 50 مل بسعر موفر وخاص!',
      image: 'https://i.ibb.co/Cp4SfL6b/image-2.png'
    }
  ];

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;

    let itemsList = cart
      .map((item) => `• ${item.name} (${item.quantity}×) - ${item.price * item.quantity} ر.س`)
      .join('%0A');

    const text = `مرحباً إيفار 👋%0Aأود إتمام الطلب التالي:%0A%0A${itemsList}%0A%0A*الإجمالي الكلي: ${cartTotal} ر.س*%0A%0Aيرجى تزويدي بتفاصيل الدفع والشحن.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dir-rtl" dir="rtl">
      {/* Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-amber-400 p-2 rounded-xl text-slate-900 font-bold">✨</div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">إيفار | IVAR</h1>
              <p className="text-xs text-amber-300">عناية فاخرة ببشرتكِ</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-4 py-2 rounded-xl text-sm transition flex items-center gap-2"
          >
            <span>🛒 السلة</span>
            {cartCount > 0 && (
              <span className="bg-slate-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero / Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold inline-block">
            إصدار خاص وبتركيبة مميزة
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            كريم إيفار المتكامل للتفتيح الفوري
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            تركيبة غنية تمنح بشرتكِ نعومة فائقة وإشراقة تدوم. اختاري الحجم المناسب لكِ واستفيدي من عروضنا الحصرية.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex gap-2 overflow-x-auto w-full pb-2 sm:pb-0 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap font-medium transition ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="🔍 بحث عن حجم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {selectedCategory === 'عن المنتَج' ? (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 border-b pb-4">
              <span className="text-2xl">ℹ️</span>
              <h3 className="text-lg font-bold">لماذا تختارين كريم إيفار؟</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>ترطيب عميق يدوم طوال اليوم دون ملمس دهني.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>يساعد على توحيد لون البشرة واستعادة إشراقتها الطبيعية فوراً.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>آمن ومناسب لمختلف أنواع البشرة.</span>
              </li>
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.badge && (
                      <span className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-lg">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-slate-900">{product.name}</h3>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md shrink-0">
                        {product.size}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>

                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="text-xl font-extrabold text-slate-900">{product.price} ر.س</span>
                      {product.oldPrice && (
                        <span className="text-xs text-slate-400 line-through">{product.oldPrice} ر.س</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition"
                  >
                    <span>🛍️ إضافة إلى السلة</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-6 shadow-xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="font-bold text-lg text-slate-900">سلة التسوق ({cartCount})</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-xl font-bold px-2"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-3">
                  <span className="text-4xl block">🛒</span>
                  <p>السلة فارغة حالياً</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-3 gap-3"
                    >
                      <div>
                        <h4 className="font-semibold text-sm text-slate-900">{item.name}</h4>
                        <p className="text-xs text-slate-500">{item.price} ر.س للقطعة</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>المجموع الإجمالي:</span>
                  <span className="text-emerald-600">{cartTotal} ر.س</span>
                </div>

                <button
                  onClick={checkoutWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition"
                >
                  <span>💬 إتمام الطلب عبر الواتساب</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
