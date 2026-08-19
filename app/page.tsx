'use client';
import { useState } from 'react';

export default function Home() {
  const phoneNumber = '966501358096';

  const [cart, setCart] = useState<{ id: number; name: string; price: number; image: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    details: string[];
  } | null>(null);

  const products = [
    {
      id: 1,
      name: 'عطر Cloudy Bloom',
      price: 280,
      category: 'العطور والبخور',
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60',
      description: 'عطر فاخر يتميز بنفحات بودرية ناعمة مع أزهار بيضاء، يمنحك شعوراً بالنقاء والانتعاش يدوم طويلاً.',
      details: ['الحجم: 200 مل', 'التركيز: أودو بارفان', 'المكونات: مسك بودري، مسك الروم، أزهار بيضاء']
    },
    {
      id: 2,
      name: 'مجموعة العناية النياسيناميد',
      price: 120,
      category: 'الجمال والعناية',
      isNew: true,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60',
      description: 'سيروم ومجموعة نياسيناميد لترطيب البشرة وتوحيد لونها وإعطائها نضارة فائقة.',
      details: ['الحجم: 50 مل', 'مناسب لجميع أنواع البشرة', 'خالي من العطور']
    },
    {
      id: 3,
      name: 'حقيبة حفظ الجوالات',
      price: 45,
      category: 'الاكسسوارات',
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60',
      description: 'حقيبة أمان مخصصة للمناسبات وقاعات الأفراح لحفظ الجوالات ومنع التصوير بشكل آمن وأنيق.',
      details: ['الخامة: قماش قفل أمان عالي الجودة', 'اللون: أحمر / أسود', 'مناسب لجميع أنواع الجوالات']
    },
    {
      id: 4,
      name: 'سماعة لاسلكية عصرية',
      price: 199,
      category: 'الأجهزة والتقنية',
      isNew: true,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
      description: 'سماعة رأس عالية النقاوة مع خاصية عزل الضوضاء وعمر بطارية يدوم حتى 30 ساعة متواصلة.',
      details: ['الاتصال: بلوتوث 5.2', 'البطارية: 30 ساعة', 'المميزات: عزل ضوضاء، ميكروفون مدمج']
    },
    {
      id: 5,
      name: 'فستان صيفي أنيق',
      price: 250,
      category: 'الملابس والأزياء',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop&q=60',
      description: 'فستان ناعم ومريح مصنوع من أجود أنواع القطن الطبيعي بتصميم عصري يناسب الإطلالات اليومية.',
      details: ['الخامة: 100% قطن', 'المقاسات: S, M, L, XL', 'الألوان: أبيض / بيج']
    },
    {
      id: 6,
      name: 'نقش حناء هندسي',
      price: 35,
      category: 'الجمال والعناية',
      isBestSeller: true,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=60',
      description: 'تصاميم هندسية ونباتية ناعمة ومتقنة للأيدي، لمظهر أنيق ومميز في المناسبات.',
      details: ['النوع: حناء طبيعية داكنة', 'الثبات: يدوم من 7 إلى 10 أيام', 'التصميم: على طول اليد والأصابع']
    }
  ];

  const categories = [
    'الكل',
    '⭐ الأكثر مبيعاً',
    '✨ وصل حديثاً',
    'العطور والبخور',
    'الجمال والعناية',
    'الأجهزة والتقنية',
    'الملابس والأزياء',
    'الاكسسوارات'
  ];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.includes(searchQuery) || p.description.includes(searchQuery);
    
    let matchesCategory = false;
    if (selectedCategory === 'الكل') matchesCategory = true;
    else if (selectedCategory === '⭐ الأكثر مبيعاً') matchesCategory = p.isBestSeller ?? false;
    else if (selectedCategory === '✨ وصل حديثاً') matchesCategory = p.isNew ?? false;
    else matchesCategory = p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: { id: number; name: string; price: number; image: string }) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const sendOrderToWhatsApp = () => {
    if (cart.length === 0) return;

    let message = `مرحباً، أود إتمام الطلب من المتجر 🛍️:\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.price} ر.س\n`;
    });
    message += `\n💰 *الإجمالي:* ${totalPrice} ر.س\n\n`;
    message += `يرجى تزويدي بتفاصيل الشحن والدفع. شكراً لك!`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', direction: 'rtl', minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ flexGrow: 1, padding: '20px' }}>
        {/* الهيدر العلوي */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', background: '#1e293b', color: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', cursor: 'pointer' }} onClick={() => {setSelectedProduct(null); setSearchQuery(''); setSelectedCategory('الكل');}}>
            🛍️ متجر خلود
          </h2>
          <button 
            onClick={() => setIsOpen(true)}
            style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '25px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            🛒 السلة <span style={{ background: '#fff', color: '#2563eb', borderRadius: '50%', padding: '2px 8px', fontSize: '0.85rem' }}>{cart.length}</span>
          </button>
        </div>

        {/* تفاصيل المنتج المختار */}
        {selectedProduct ? (
          <div style={{ maxWidth: '800px', margin: '40px auto', background: '#fff', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            <button 
              onClick={() => setSelectedProduct(null)}
              style={{ background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#475569', marginBottom: '20px' }}
            >
              ← العودة للمتجر
            </button>

            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '12px' }} />
              
              <div style={{ flex: 1 }}>
                <span style={{ background: '#e2e8f0', color: '#475569', padding: '4px 12px', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  {selectedProduct.category}
                </span>
                <h1 style={{ margin: '10px 0', color: '#0f172a' }}>{selectedProduct.name}</h1>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669', margin: '0 0 20px 0' }}>{selectedProduct.price} ر.س</p>
                
                <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '1.05rem', marginBottom: '20px' }}>{selectedProduct.description}</p>
                
                <h4 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>المواصفات:</h4>
                <ul style={{ paddingRight: '20px', color: '#64748b', marginBottom: '25px' }}>
                  {selectedProduct.details.map((detail, idx) => (
                    <li key={idx} style={{ marginBottom: '5px' }}>{detail}</li>
                  ))}
                </ul>

                <button 
                  onClick={() => addToCart(selectedProduct)}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
                >
                  إضافة إلى السلة 🛒
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* معرض المنتجات الرئيسي */
          <>
            {/* شريط البحث */}
            <div style={{ maxWidth: '600px', margin: '30px auto 10px', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="🔍 ابحث عن منتج، عطر، أو فستان..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', fontFamily: 'inherit' }}
              />
            </div>

            {/* شريط الأقسام والتصنيفات */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0 10px 0', flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '25px',
                    border: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: selectedCategory === category ? '#2563eb' : '#fff',
                    color: selectedCategory === category ? '#fff' : '#475569',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <p style={{ textAlign: 'center', marginTop: '50px', color: '#64748b', fontSize: '1.1rem' }}>لا توجد منتجات تطابق بحثك. 😔</p>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '20px', flexWrap: 'wrap' }}>
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    style={{ 
                      background: '#fff', 
                      borderRadius: '16px', 
                      overflow: 'hidden', 
                      width: '240px', 
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
                      display: 'flex', 
                      flexDirection: 'column',
                      justify: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      onClick={() => setSelectedProduct(product)}
                      style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                    />
                    
                    <div style={{ padding: '15px', textAlign: 'center' }}>
                      <h3 onClick={() => setSelectedProduct(product)} style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#1e293b' }}>
                        {product.name}
                      </h3>
                      <p style={{ fontWeight: 'bold', color: '#059669', fontSize: '1.2rem', margin: '0 0 15px 0' }}>{product.price} ر.س</p>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          style={{ flex: 1, background: '#f1f5f9', color: '#334155', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                        >
                          التفاصيل 👁️
                        </button>
                        <button 
                          onClick={() => addToCart(product)}
                          style={{ flex: 1, background: '#2563eb', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                        >
                          إضافة 🛒
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* نافذة السلة المنبثقة */}
        {isOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', color: '#000', padding: '25px', borderRadius: '16px', width: '340px', textAlign: 'right' }}>
              <h2 style={{ marginTop: 0, textAlign: 'center', color: '#0f172a' }}>محتويات السلة 🛒</h2>
              
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#64748b', padding: '20px 0' }}>السلة فارغة حالياً</p>
              ) : (
                <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                  {cart.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #f1f5f9', padding: '10px 0' }}>
                      <img src={item.image} alt={item.name} style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: '500' }}>{item.name}</div>
                        <div style={{ fontWeight: 'bold', fontSize: '0.85rem', color: '#059669' }}>{item.price} ر.س</div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(index)}
                        style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <>
                  <hr style={{ margin: '15px 0', borderColor: '#f1f5f9' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '15px' }}>
                    <span>الإجمالي:</span>
                    <span style={{ color: '#059669' }}>{totalPrice} ر.س</span>
                  </div>

                  <button 
                    onClick={sendOrderToWhatsApp}
                    style={{ width: '100%', padding: '12px', background: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                  >
                    💬 إتمام الطلب عبر الواتساب
                  </button>
                </>
              )}

              <button 
                onClick={() => setIsOpen(false)} 
                style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 🦶 الفوتر (تذييل الصفحة) */}
      <footer style={{ background: '#1e293b', color: '#cbd5e1', padding: '40px 20px', marginTop: '40px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '30px' }}>
          
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>🛍️ متجر خلود</h3>
            <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>متجرك الأول لتسوق العطور، التقنية، والموضة بأفضل الأسعار وأعلى جودة. نهدف لتقديم تجربة تسوق سهلة ومريحة.</p>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>روابط هامة</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2', fontSize: '0.95rem' }}>
              <li style={{ cursor: 'pointer' }}>الأسئلة الشائعة</li>
              <li style={{ cursor: 'pointer' }}>سياسة الشحن والتوصيل</li>
              <li style={{ cursor: 'pointer' }}>سياسة الاستبدال والاسترجاع</li>
            </ul>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <h3 style={{ color: '#fff', marginBottom: '15px' }}>تواصل معنا</h3>
            <p style={{ fontSize: '0.95rem', margin: '5px 0' }}>📱 واتساب: 0501358096</p>
            <p style={{ fontSize: '0.95rem', margin: '5px 0' }}>📍 المملكة العربية السعودية</p>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #334155', fontSize: '0.85rem' }}>
          © 2026 متجر خلود. جميع الحقوق محفوظة. تم التطوير بحب 💻✨
        </div>
      </footer>

    </div>
  );
}