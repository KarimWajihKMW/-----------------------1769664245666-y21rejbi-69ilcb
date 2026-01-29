console.log('Akwadra Super Builder Initialized');

/* --- MOCK DATA --- */
const products = [
    {
        id: 1,
        name: "سماعة رأس بريميوم",
        price: 299,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        description: "تجربة صوتية لا مثيل لها مع عزل ضوضاء فائق وراحة تدوم طويلاً. بطارية تدوم 30 ساعة."
    },
    {
        id: 2,
        name: "ساعة ذكية رياضية",
        price: 199,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
        description: "تتبع نشاطك الرياضي بدقة مع شاشة AMOLED وتصميم مقاوم للماء. رفيقك المثالي للصحة."
    },
    {
        id: 3,
        name: "حذاء سنيكرز عصري",
        price: 159,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
        description: "تصميم أنيق ومريح لكل يوم. نعل مرن يمتص الصدمات وقماش يتنفس."
    },
    {
        id: 4,
        name: "نظارة شمسية كلاسيك",
        price: 89,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60",
        description: "حماية كاملة من الأشعة فوق البنفسجية بتصميم كلاسيكي يناسب جميع الأذواق."
    },
    {
        id: 5,
        name: "كاميرا احترافية",
        price: 1299,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60",
        description: "التقط أجمل اللحظات بدقة 4K. مستشعر كبير وعدسة قابلة للتغيير."
    },
    {
        id: 6,
        name: "حقيبة ظهر جلدية",
        price: 120,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
        description: "جلد طبيعي فاخر. مساحة واسعة للابتوب وجميع أغراضك الشخصية."
    },
    {
        id: 7,
        name: "جاكيت جينز",
        price: 180,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&auto=format&fit=crop&q=60",
        description: "أناقة لا تبطل موضتها. قماش دنيم عالي الجودة وتفاصيل متقنة."
    },
    {
        id: 8,
        name: "مجموعة عناية بالبشرة",
        price: 75,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop&q=60",
        description: "عناية طبيعية لبشرة نضرة ومشرقة. مكونات عضوية 100%."
    }
];

/* --- STATE --- */
let cart = [];
let currentCategory = 'all';
let currentSort = 'default';

/* --- INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
    // Preserve original functionality
    const card = document.querySelector('.card');
    if(card) {
        card.addEventListener('click', () => {
            console.log('تم النقر على البطاقة!');
            alert('أهلاً بك في عالم البناء بدون كود!');
        });
    }

    renderProducts();
    setupFilters();
    setupListeners();
});

/* --- RENDER FUNCTIONS --- */
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    // Filter
    let filtered = products.filter(p => currentCategory === 'all' || p.category === currentCategory);

    // Sort
    if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    }

    filtered.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl product-card border border-gray-100 flex flex-col h-full opacity-0 animate-scale-up';
        card.style.animationDelay = `${index * 50}ms`;
        
        card.innerHTML = `
            <div class="relative h-48 mb-4 overflow-hidden rounded-xl bg-gray-100 cursor-pointer" onclick="openProduct(${product.id})">
                <img src="${product.image}" alt="${product.name}" class="product-img w-full h-full object-cover transition-transform duration-500">
                <div class="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md text-gray-600">
                    ${getCategoryName(product.category)}
                </div>
            </div>
            <div class="flex-1 flex flex-col">
                <h3 class="text-lg font-bold text-gray-800 mb-1 cursor-pointer hover:text-indigo-600 transition-colors" onclick="openProduct(${product.id})">${product.name}</h3>
                <p class="text-gray-500 text-sm mb-4 line-clamp-2">${product.description}</p>
                <div class="mt-auto flex items-center justify-between">
                    <span class="text-xl font-bold text-indigo-700">${product.price} ر.س</span>
                    <button onclick="addToCart(${product.id})" class="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-200 active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const countBadge = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Update Count
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    countBadge.innerText = totalItems;
    if (totalItems > 0) {
        countBadge.classList.remove('scale-0');
        checkoutBtn.disabled = false;
    } else {
        countBadge.classList.add('scale-0');
        checkoutBtn.disabled = true;
    }

    // Update List
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p>السلة فارغة حالياً</p>
            </div>`;
    } else {
        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'flex gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm animate-scale-up';
            itemEl.innerHTML = `
                <img src="${item.product.image}" class="w-16 h-16 rounded-lg object-cover bg-gray-100">
                <div class="flex-1 flex flex-col justify-between">
                    <div>
                        <h4 class="font-bold text-gray-800 text-sm">${item.product.name}</h4>
                        <span class="text-xs text-gray-500">${item.product.price} ر.س</span>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center gap-2 bg-gray-50 rounded-lg px-1">
                            <button onclick="updateQty(${item.product.id}, -1)" class="p-1 hover:text-indigo-600 font-bold text-lg leading-none">-</button>
                            <span class="text-sm font-semibold w-4 text-center">${item.qty}</span>
                            <button onclick="updateQty(${item.product.id}, 1)" class="p-1 hover:text-indigo-600 font-bold text-lg leading-none">+</button>
                        </div>
                        <button onclick="removeFromCart(${item.product.id})" class="text-gray-400 hover:text-red-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(itemEl);
        });
    }

    // Update Total
    const total = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
    totalEl.innerText = total + ' ر.س';
}

/* --- LOGIC --- */
function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            buttons.forEach(b => {
                b.classList.remove('bg-slate-800', 'text-white', 'shadow-md');
                b.classList.add('bg-gray-100', 'text-gray-600');
            });
            // Add active to current
            btn.classList.remove('bg-gray-100', 'text-gray-600');
            btn.classList.add('bg-slate-800', 'text-white', 'shadow-md');
            
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });

    const select = document.getElementById('sort-select');
    select.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });
}

function setupListeners() {
    // Scroll Header effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.classList.add('shadow-md', 'bg-white/95');
            nav.classList.remove('bg-white/80');
        } else {
            nav.classList.remove('shadow-md', 'bg-white/95');
            nav.classList.add('bg-white/80');
        }
    });
}

function getCategoryName(cat) {
    const map = {
        'electronics': 'إلكترونيات',
        'clothing': 'ملابس',
        'accessories': 'إكسسوارات',
        'all': 'الكل'
    };
    return map[cat] || cat;
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.product.id === id);
    
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ product, qty: 1 });
    }
    
    renderCart();
    showToast();
    
    // If sidebar is closed, maybe bounce cart icon?
}

function updateQty(id, change) {
    const index = cart.findIndex(item => item.product.id === id);
    if (index === -1) return;
    
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    renderCart();
}

function removeFromCart(id) {
    const index = cart.findIndex(item => item.product.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
        renderCart();
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');
    
    if (sidebar.classList.contains('pointer-events-none')) {
        // Open
        sidebar.classList.remove('pointer-events-none');
        overlay.classList.remove('opacity-0');
        panel.classList.remove('-translate-x-full');
    } else {
        // Close
        sidebar.classList.add('pointer-events-none');
        overlay.classList.add('opacity-0');
        panel.classList.add('-translate-x-full');
    }
}

function openProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-title').innerText = product.name;
    document.getElementById('modal-desc').innerText = product.description;
    document.getElementById('modal-price').innerText = product.price + ' ر.س';
    document.getElementById('modal-category').innerText = getCategoryName(product.category);
    
    // Add button listener needs closure
    const btn = document.getElementById('modal-add-btn');
    btn.onclick = () => {
        addToCart(product.id);
        closeProductModal();
    };

    const modal = document.getElementById('product-modal');
    modal.classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('translate-y-24');
    setTimeout(() => {
        toast.classList.add('translate-y-24');
    }, 3000);
}

/* --- CHECKOUT LOGIC --- */
function openCheckout() {
    if (cart.length === 0) return;
    toggleCart(); // Close cart
    document.getElementById('checkout-modal').classList.remove('hidden');
    nextStep(1); // Reset to step 1
}

function closeCheckout() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

function nextStep(step) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');

    // Update Indicators
    updateStepIndicator(step);

    // If Step 2, update totals
    if (step === 2) {
        const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
        const tax = Math.round(subtotal * 0.15);
        const total = subtotal + tax;
        
        document.getElementById('checkout-subtotal').innerText = subtotal + ' ر.س';
        document.getElementById('checkout-tax').innerText = tax + ' ر.س';
        document.getElementById('checkout-total').innerText = total + ' ر.س';
    }
}

function updateStepIndicator(current) {
    // Reset all
    const indicators = document.querySelectorAll('.step-indicator');
    indicators.forEach((el, idx) => {
        const num = idx + 1;
        const div = el.querySelector('div');
        const span = el.querySelector('span');
        
        if (num < current) {
            // Completed
            el.classList.add('text-indigo-600');
            div.className = 'w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold';
            div.innerHTML = '✓';
        } else if (num === current) {
            // Active
            el.classList.add('active', 'text-gray-800');
            div.className = 'w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold';
            div.innerText = num;
        } else {
            // Pending
            el.classList.remove('active', 'text-indigo-600', 'text-gray-800');
            el.classList.add('text-gray-400');
            div.className = 'w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center font-bold bg-white';
            div.innerText = num;
        }
    });

    // Progress Bars
    if (current > 1) document.getElementById('step-bar-1').style.width = '100%';
    else document.getElementById('step-bar-1').style.width = '0';
    
    if (current > 2) document.getElementById('step-bar-2').style.width = '100%';
    else document.getElementById('step-bar-2').style.width = '0';
}

function resetCart() {
    cart = [];
    renderCart();
}