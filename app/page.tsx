'use client';

import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, MessageCircle, Check, Info } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<any[]>([]);

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
      name: 'كريم إيفار للعناية والتفتيح - 50 مل',
      category: 'الأحجام الفردية',
      price: 79,
      oldPrice: 99,
      size: '50 مل',
      badge: 'الحجم التجريبي',
      description: 'حجم مثالي للتجربة والتنقل، يمنح البشرة ترطيباً عميقاً وإشراقة طبيعية.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      name: 'كريم إيفار للعناية والتفتيح - 100 مل',
      category: 'الأحجام الفردية',
      price: 129,
      oldPrice: 159,
      size: '100 مل',
      badge: 'الأكثر طلباً ✨',
      description: 'الحجم الأكثر شعبية واستخداماً، مناسب للاستعمال اليومي المستمر.',
      image: 'https://images.unsplash.com/photo-1608248597263-00079e96147a?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      name: 'كريم إيفار للعناية والتفتيح - 200 مل',
      category: 'الأحجام الفردية',
      price: 199,
      oldPrice: 249,
      size: '200 مل',
      badge: 'الحجم التوفيري',
      description: 'عبوة توفيرية مضاعفة تضمن لكِ عناية وترطيباً يدوم لفترة طويلة.',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop&q=60'
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
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sendWhatsAppOrder = (product: any) => {
    const text = `مرحباً إيفار 👋%0Aأود طلب: *${product.name}*%0Aالسعر: *${product.price} ر.س*%0Aيرجى تزويدي بالتفاصيل لإكمال الطلب.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dir-rtl" dir="rtl">
      {/* Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-amber-400 p-2 rounded-xl text-slate-900">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">إيفار | IVAR</h1>
              <p className="text-xs text-amber-300">عناية فاخرة ببشرتكِ</p>
            </div>
          </div>

          <a 
            href={`https://wa.me/${whatsappNumber}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تواصل معنا</span>
          </a>
        </div>
      </header>

      {/* Hero / Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold inline-block">
            إصدار خاص وبتركيبة مميزة
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            كريم إيفار المتكامل للترطيب والتفتيح
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            تركيبة غنية تمنح بشرتكِ نعومة فائقة وإشراقة تدوم. اختاري الحجم المناسب لكِ واستفيدي من عروضنا الحصرية.
          </p>
        </div>
      </section>

      {/* Search & Categories */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          {/* Categories */}
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

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="بحث عن حجم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-9 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* Section Details / Information Tab */}
        {selectedCategory === 'عن المنتَج' ? (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 border-b pb-4">
              <Info className="w-6 h-6 text-amber-500" />
              <h3 className="text-lg font-bold">لماذا تختارين كريم إيفار؟</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>ترطيب عميق يدوم طوال اليوم دون ملمس دهني.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>يساعد على توحيد لون البشرة واستعادة إشراقتها الطبيعية.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>آمن ومناسب لمختلف أنواع البشرة.</span>
              </li>
            </ul>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-slate-100">
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

                    <p className="text-xs text-slate-500 line-clamp-2">
                      {product.description}
                    </p>

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
                    onClick={() => sendWhatsAppOrder(product)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>طلب مباشر عبر الواتساب</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
