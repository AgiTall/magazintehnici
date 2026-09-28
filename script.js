const db = [
            {
                id: 1, name: "Yale Linus Smart Lock", category: "smart", price: 120000, oldPrice: 142000,
                image: "https://gw-assets.assaabloy.com/is/image/assaabloy/5052847131336.MAIN-6",
                badge: "-15%",
                desc: "Yale Linus® Smart Lock — это умный замок, который позволяет закрывать и открывать дверь без ключа. Он устанавливается поверх существующего цилиндра с внутренней стороны двери, поэтому снаружи ваша дверь выглядит так же, как и раньше. Управляйте доступом со смартфона, выдавайте виртуальные ключи гостям и просматривайте историю входов.",
                specs: { "Тип устройства": "Умный дверной замок", "Совместимость": "Apple HomeKit, Google Home", "Протокол": "Bluetooth 4.2, Wi-Fi", "Питание": "4 батарейки AA", "Материал": "Металл", "Цвет": "Серебристый" }
            },
            {
                id: 2, name: "Roborock S7 MaxV Ultra", category: "cleaning", price: 450000, oldPrice: null,
                image: "https://resources.cdn-kaspi.kz/img/m/p/hb7/hc1/65052476243998.jpg?format=gallery-medium",
                badge: "HIT",
                desc: "Флагманский робот-пылесос с самой продвинутой док-станцией Empty Wash Fill Dock. Он не только пылесосит и моет пол (виброшвабра), но и сам очищает пылесборник, стирает тряпку и наполняет бак водой. Встроенная камера с ИИ и 3D-сканированием распознает провода, носки и экскременты животных, объезжая их даже в полной темноте.",
                specs: { "Мощность": "5100 Па", "Навигация": "LiDAR + RGB + 3D", "Влажная уборка": "Sonic Mopping", "Станция": "Самоочистка (мусор/вода/тряпка)", "Аккумулятор": "5200 мАч", "Шум": "67 дБ" }
            },
            {
                id: 3, name: "Dyson Purifier Cool™ TP07", category: "smart", price: 320000, oldPrice: null,
                image: "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/hero/385278-01.png?$responsive$&cropPathE=mobile&fit=stretch,1&wid=640",
                badge: null,
                desc: "Интеллектуальный очиститель воздуха с функцией вентилятора. Улавливает 99.95% мельчайших частиц, включая аллергены и вирусы H1N1. Полностью герметичен по стандарту HEPA H13. Автоматически распознает и удаляет загрязнители, отображая информацию на LCD-экране в реальном времени. Работает тихо в ночном режиме.",
                specs: { "Фильтр": "HEPA H13 + Угольный", "Площадь": "до 40 м²", "Управление": "Пульт, Dyson Link App", "Функции": "Очистка, Охлаждение", "Вращение": "350°", "Вес": "4.65 кг" }
            },
            {
                id: 4, name: "Smeg Espresso Machine", category: "kitchen", price: 180000, oldPrice: null,
                image: "https://cdn.entero.ru/mp@2x/77/e2/77e2bbce525230cd6cc4ffa1137f0dde.jpg",
                badge: "Design",
                desc: "Эспрессо-кофемашина в стиле 50-х годов. Идеальное сочетание итальянского дизайна и современных технологий. Приготовьте настоящий эспрессо или капучино с густой пенкой благодаря профессиональному давлению 15 бар. Термоблок обеспечивает быстрый нагрев воды до идеальной температуры.",
                specs: { "Давление": "15 Бар", "Тип": "Рожковая", "Капучинатор": "Ручной (паровая трубка)", "Корпус": "Нержавеющая сталь", "Объем бака": "1 л", "Страна": "Италия" }
            },
            {
                id: 5, name: "Samsung Bespoke Fridge", category: "kitchen", price: 850000, oldPrice: 940000,
                image: "https://image-us.samsung.com/SamsungUS/home/home-appliances/refrigerators/bespoke/rf23bb8600qlaa/RF23BB8600QL_01_Stainless_Steel_SCOM.jpg?$product-details-jpg$?$product-details-jpg$",
                badge: "SALE",
                desc: "Холодильник, который подстраивается под вас. Система Bespoke позволяет менять цвета и фактуру внешних панелей, чтобы идеально вписать технику в интерьер вашей кухни. Технология Metal Cooling сохраняет свежесть продуктов дольше, удерживая холод внутри даже при частом открывании дверцы.",
                specs: { "Объем": "350 л", "Система": "Full No Frost", "Особенность": "Сменные панели", "Компрессор": "Инверторный", "Шум": "35 дБ (Тихий)", "Класс": "A+" }
            },
            {
                id: 6, name: "Sonos One Gen 2", category: "smart", price: 110000, oldPrice: null,
                image: "https://m.media-amazon.com/images/I/71dJ0HXTD0L._AC_SL1500_.jpg",
                badge: null,
                desc: "Компактная умная колонка с мощным звуком, заполняющим комнату. Идеально подходит для кухни или ванной благодаря влагозащите. Поддерживает Apple AirPlay 2 и голосовое управление. Можно объединить две колонки в стереопару или подключить к саундбару Sonos для домашнего кинотеатра.",
                specs: { "Подключение": "Wi-Fi, Ethernet, AirPlay 2", "Влагозащита": "Есть (устойчив к пару)", "Микрофоны": "Дальнего поля", "Аудио": "2 цифровых усилителя", "Габариты": "161x119 мм" }
            }
        ];

        const initialReviews = [
            { name: "Азамат К.", rating: "★★★★★", text: "Замок Yale - топ. Работает с HomeKit.", product: "Yale Linus Smart Lock", photo: "" },
            { name: "Елена С.", rating: "★★★★★", text: "Робот спасение от шерсти. Карта точная.", product: "Roborock S7 MaxV Ultra", photo: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=200&auto=format&fit=crop" },
            { name: "Дмитрий В.", rating: "★★☆☆☆", text: "Доставка опоздала на 2 дня. Упаковка была помята, но холодильник цел.", product: "Samsung Bespoke Fridge", photo: "" },
            { name: "Алина М.", rating: "★★★★★", text: "Smeg - украшение кухни. Кофе варит вкусный.", product: "Smeg Espresso Machine", photo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=200&auto=format&fit=crop" }
        ];

        const PRODUCT_IMAGE_PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#102029"/><path d="M240 140h120v100H240zM250 225l30-35 25 20 20-25 25 40" fill="none" stroke="#54e8ff" stroke-width="3"/><text x="300" y="280" text-anchor="middle" fill="#54e8ff" font-family="sans-serif" font-size="18">DoubleSmart / No photo</text></svg>');

        const app = {
            cart: [],
            isVip: false,
            currentPaymentMethod: 'Карта',
            currentFilter: 'all',
            paymentTimer: null,
            paymentPending: false,
            paymentType: 'card',
            lastOrder: null,
            modalTriggers: new Map(),

            init: function () {
                this.loadDb();
                const state = this.readStorage('ds_state', {});
                this.isVip = state?.isVip === true;
                this.cart = Array.isArray(state?.cart) ? state.cart.flatMap(item => {
                    const product = this.getProductById(item?.id);
                    return product ? [{ ...product, tId: Date.now() + Math.random() }] : [];
                }) : [];
                const reviews = this.readStorage('ds_reviews', null);
                if (Array.isArray(reviews)) {
                    initialReviews.splice(0, initialReviews.length, ...reviews.filter(r => r && typeof r.name === 'string' && typeof r.text === 'string' && typeof r.rating === 'string' && typeof r.product === 'string'));
                }
                this.renderProducts('all');
                this.renderReviews();
                this.populateProductSelect();
                this.updateCartUI();
                document.getElementById('loyaltySuccess').style.display = this.isVip ? 'block' : 'none';
                document.querySelectorAll('.modal-overlay').forEach(modal => {
                    modal.setAttribute('role', 'dialog');
                    modal.setAttribute('aria-modal', 'true');
                    if (!modal.hasAttribute('aria-label')) modal.setAttribute('aria-label', modal.querySelector('h3')?.textContent.trim() || 'Информация о товаре');
                    modal.querySelector('.close-btn')?.setAttribute('aria-label', 'Закрыть окно');
                });
                document.getElementById('editProdImage').addEventListener('input', event => {
                    document.getElementById('editProdPhotoFile').value = '';
                    document.getElementById('editPhotoName').textContent = 'Можно вставить URL или выбрать файл';
                    document.getElementById('editPhotoPreview').src = this.safeImage(event.target.value);
                });
            },

            readStorage: function (key, fallback) {
                try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
                catch { return fallback; }
            },

            writeStorage: function (key, value) {
                try { localStorage.setItem(key, JSON.stringify(value)); return true; }
                catch { this.showToast('Не удалось сохранить данные в браузере. Они доступны до обновления страницы.'); return false; }
            },

            safeImage: function (value) {
                const url = String(value || '').trim();
                return /^(https?:\/\/|data:image\/(png|jpeg|jpg|gif|webp|svg\+xml)[;,])/i.test(url) ? url : PRODUCT_IMAGE_PLACEHOLDER;
            },

            readPhoto: function (file) {
                if (!file) return Promise.resolve('');
                if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return Promise.reject(new Error('Выберите изображение PNG, JPG, WEBP или GIF.'));
                if (file.size > 2 * 1024 * 1024) return Promise.reject(new Error('Размер фото не должен превышать 2 МБ.'));
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject(new Error('Не удалось прочитать фото.'));
                    reader.readAsDataURL(file);
                });
            },

            priceFor: function (product) { return Math.round(Number(product.price) * (this.isVip ? 0.8 : 1) * 100) / 100; },
            money: function (value) { return Number(value).toLocaleString('ru-RU', { maximumFractionDigits: 2 }) + ' ₸'; },
            totals: function () {
                const raw = Math.round(this.cart.reduce((sum, item) => sum + Number(item.price), 0) * 100) / 100;
                const total = Math.round(this.cart.reduce((sum, item) => sum + this.priceFor(item), 0) * 100) / 100;
                return { raw, total, discount: Math.round((raw - total) * 100) / 100 };
            },

            escapeHTML: function (value) {
                return String(value ?? '')
                    .replaceAll('&', '&amp;')
                    .replaceAll('<', '&lt;')
                    .replaceAll('>', '&gt;')
                    .replaceAll('"', '&quot;')
                    .replaceAll("'", '&#039;');
            },

            getProductImage: function (product) {
                return this.safeImage(product?.image);
            },

            getProductById: function (id) {
                return db.find(x => String(x.id) === String(id));
            },

            getCategoryTitle: function (cat) {
                const names = { smart: 'Smart Home', kitchen: 'Кухня', cleaning: 'Уборка', computers: 'Компьютеры', home: 'Бытовая техника' };
                return names[cat] || cat || 'Другое';
            },

            specsToText: function (specs) {
                return Object.entries(specs || {}).map(([key, value]) => `${key}: ${value}`).join('\n');
            },

            specsFromText: function (text) {
                const specs = {};
                String(text || '').split('\n').forEach(line => {
                    const separatorIndex = line.indexOf(':');
                    if (separatorIndex === -1) return;
                    const key = line.slice(0, separatorIndex).trim();
                    const value = line.slice(separatorIndex + 1).trim();
                    if (key && value) specs[key] = value;
                });
                return specs;
            },

            refreshCatalog: function () {
                this.renderProducts(this.currentFilter || 'all');
                this.populateProductSelect();
                this.updateCartUI();
            },

            renderProducts: function (cat) {
                this.currentFilter = cat || this.currentFilter || 'all';
                const products = db.filter(p => this.currentFilter === 'all' || p.category === this.currentFilter || (this.currentFilter === 'home' && ['kitchen', 'cleaning'].includes(p.category)));

                document.getElementById('productsContainer').innerHTML = products.length ? products.map(p => {
                    const safeName = this.escapeHTML(p.name);
                    const safeCategory = this.escapeHTML(this.getCategoryTitle(p.category));
                    const safeImage = this.escapeHTML(this.getProductImage(p));
                    const safeBadge = this.escapeHTML(p.badge || '');
                    const price = this.priceFor(p);
                    const oldPrice = this.isVip ? Number(p.price) : (p.oldPrice ? Number(p.oldPrice) : null);
                    const priceHtml = oldPrice
                        ? `<div class="product-price-block"><span class="price-old">${oldPrice.toLocaleString('ru-RU')} ₸</span><span class="price-current">${price.toLocaleString('ru-RU')} ₸</span></div>`
                        : `<div class="product-price-block"><span class="price-current">${price.toLocaleString('ru-RU')} ₸</span></div>`;

                    return `
                        <div class="product-card" onclick="app.openProductModal(${p.id})">
                            ${p.badge ? `<div class="sale-badge">${safeBadge}</div>` : ''}
                            <div class="catalog-admin-actions" onclick="event.stopPropagation()">
                                <button class="admin-btn edit" onclick="app.openEditProductModal(${p.id})">Изменить</button>
                                <button class="admin-btn delete" onclick="app.deleteProduct(${p.id})">Удалить</button>
                            </div>
                            <div class="product-image-wrapper"><img src="${safeImage}" alt="${safeName}"></div>
                            <div class="product-info">
                                <span class="product-cat">${safeCategory}</span>
                                <div class="product-title">${safeName}</div>
                                ${priceHtml}
                                <div class="card-buttons">
                                    <button class="btn-details" type="button" onclick="event.stopPropagation(); app.openProductModal(${p.id})">Детали</button>
                                    <button class="btn" onclick="event.stopPropagation(); app.addToCart(${p.id})">В корзину</button>
                                </div>
                            </div>
                        </div>`;
                }).join('') : '<div class="empty-catalog">В этой категории пока нет товаров.</div>';
            },

            filterProducts: function (cat, btn) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderProducts(cat);
            },

            openProductModal: function (id) {
                const p = this.getProductById(id);
                if (!p) return this.showToast('Товар не найден');

                let specs = '';
                for (let k in (p.specs || {})) {
                    specs += `<tr><td class="specs-key">${this.escapeHTML(k)}</td><td class="specs-val">${this.escapeHTML(p.specs[k])}</td></tr>`;
                }
                if (!specs) specs = '<tr><td class="specs-key">Характеристики</td><td class="specs-val">Не указаны</td></tr>';

                const price = this.priceFor(p);
                let priceDisplay = `<div class="pd-price-lg">${price.toLocaleString('ru-RU')} ₸</div>`;
                if (this.isVip || p.oldPrice) {
                    priceDisplay = `<div style="display:flex;gap:15px;align-items:baseline;margin-bottom:20px;"><div style="text-decoration:line-through;color:var(--text-muted);font-size:20px;">${this.money(this.isVip ? p.price : p.oldPrice)}</div><div class="pd-price-lg">${this.money(price)}</div></div>`;
                }

                document.getElementById('productModalBody').innerHTML = `
                    <div class="pd-grid">
                        <div class="pd-image-col"><img src="${this.escapeHTML(this.getProductImage(p))}" alt="${this.escapeHTML(p.name)}"></div>
                        <div class="pd-info-col">
                            <div class="pd-header"><div class="pd-title-lg">${this.escapeHTML(p.name)}</div>${priceDisplay}</div>
                            <div class="pd-description">${this.escapeHTML(p.desc || '')}</div>
                            <h4 style="margin-bottom:15px; color:white;">Характеристики</h4>
                            <table class="specs-table">${specs}</table>
                            <div class="pd-actions">
                                <button class="btn" onclick="app.addToCart(${p.id}); app.closeModal('productModal')">Добавить в корзину</button>
                                <button class="btn-outline" onclick="app.openEditProductModal(${p.id})">Изменить</button>
                                <button class="btn-danger" onclick="app.deleteProduct(${p.id})">Удалить</button>
                            </div>
                        </div>
                    </div>
                `;
                this.openModal('productModal');
            },

            openModal: function (id) {
                const modal = document.getElementById(id);
                this.modalTriggers.set(id, document.activeElement);
                document.querySelectorAll('.modal-overlay.active').forEach(other => this.closeModal(other.id));
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                [...document.body.children].forEach(child => { if (child !== modal && !child.matches('script, style, #toastContainer')) child.inert = true; });
                modal.querySelector('input:not([type="hidden"]), button, [tabindex="0"]')?.focus();
            },

            closeModal: function (id) {
                const modal = document.getElementById(id);
                if (!modal?.classList.contains('active')) return;
                if (id === 'checkoutModal') this.cancelPayment();
                modal.classList.remove('active');
                [...document.body.children].forEach(child => { child.inert = false; });
                document.body.style.overflow = '';
                const trigger = this.modalTriggers.get(id);
                if (trigger?.isConnected) trigger.focus();
            },

            addToCart: function (id) {
                const p = this.getProductById(id);
                if (!p) return this.showToast('Товар не найден');
                this.cart.push({ ...p, tId: Date.now() + Math.random() });
                this.updateCartUI();
                this.showToast('✅ Добавлено');
            },

            removeFromCart: function (tId) {
                this.cart = this.cart.filter(x => String(x.tId) !== String(tId));
                this.updateCartUI();
            },

            updateCartUI: function () {
                document.getElementById('headerCartCount').innerText = this.cart.length;
                let html = this.cart.length ? this.cart.map(i => `<div class="cart-item"><div><div>${this.escapeHTML(i.name)}</div><div style="font-size:12px; color:#aaa;">${Number(i.price || 0).toLocaleString('ru-RU')} ₸</div></div><button onclick="app.removeFromCart('${i.tId}')" style="background:none; color:#555; font-size:18px;">✕</button></div>`).join('') : '<p style="text-align:center;color:#555">Пусто</p>';
                document.getElementById('cartItemsList').innerHTML = html;
                const { total, discount } = this.totals();
                if (this.isVip) {
                    document.getElementById('cartVipLine').style.display = 'flex';
                    document.getElementById('cartDiscount').innerText = '− ' + this.money(discount);
                } else {
                    document.getElementById('cartVipLine').style.display = 'none';
                }
                document.getElementById('cartTotal').innerText = this.money(total);
                document.querySelectorAll('.final-price').forEach(e => e.innerText = this.money(total));
                this.writeStorage('ds_state', { cart: this.cart.map(({ id }) => ({ id })), isVip: this.isVip });
            },

            toggleCart: function () {
                if (document.getElementById('cartModal').classList.contains('active')) this.closeModal('cartModal');
                else this.openModal('cartModal');
            },

            openCheckout: function () {
                if (!this.cart.length) return this.showToast('Добавьте товар в корзину перед оформлением.');
                this.cancelPayment();
                document.getElementById('stepContacts').classList.add('active');
                document.getElementById('stepPayment').classList.remove('active');
                document.getElementById('stepSuccess').classList.remove('active');
                this.selectPayment('card', document.querySelector('.pay-opt'));
                this.openModal('checkoutModal');
            },

            goToPayment: function () {
                const name = document.getElementById('clientName');
                const phone = document.getElementById('clientPhone');
                if (name.value.trim().length < 2) { name.focus(); return this.showToast('Введите имя (не менее двух символов).'); }
                if (!/^[78]\d{10}$/.test(phone.value.replace(/\D/g, ''))) { phone.focus(); return this.showToast('Введите телефон: +7 и ещё 10 цифр.'); }
                document.getElementById('stepContacts').classList.remove('active');
                document.getElementById('stepPayment').classList.add('active');
                document.querySelector('.pay-opt.active').focus();
            },

            backToContacts: function () {
                this.cancelPayment();
                document.getElementById('stepPayment').classList.remove('active');
                document.getElementById('stepContacts').classList.add('active');
                document.getElementById('clientName').focus();
            },

            selectPayment: function (type, btn) {
                this.cancelPayment();
                this.paymentType = type;
                this.currentPaymentMethod = type === 'card' ? 'Банковская карта' : (type === 'kaspi' ? 'Kaspi QR' : 'Halyk QR');
                document.querySelectorAll('.pay-opt').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('payContentCard').style.display = type === 'card' ? 'block' : 'none';
                document.getElementById('payContentQR').style.display = type !== 'card' ? 'block' : 'none';
                if (type !== 'card') {
                    document.getElementById('qrTitle').innerText = (type === 'kaspi' ? 'Kaspi QR' : 'Halyk QR') + ' — демо';
                }
            },

            cancelPayment: function () {
                clearTimeout(this.paymentTimer);
                this.paymentTimer = null;
                this.paymentPending = false;
                document.querySelectorAll('[data-click="app.processPayment(this)"]').forEach(button => {
                    button.disabled = false;
                    button.innerHTML = 'Подтвердить демооплату <span class="final-price"></span>';
                });
                const { total } = this.totals();
                document.querySelectorAll('.final-price').forEach(el => el.textContent = this.money(total));
            },

            processPayment: function (btn) {
                if (this.paymentPending || !this.cart.length || !document.getElementById('stepPayment').classList.contains('active')) return;
                this.paymentPending = true;
                btn.disabled = true;
                btn.innerText = 'Обработка...';
                this.paymentTimer = setTimeout(() => {
                    if (this.paymentPending && document.getElementById('checkoutModal').classList.contains('active')) this.finishPayment();
                }, 1000);
            },

            finishPayment: function () {
                if (!this.paymentPending || !this.cart.length) return;
                this.cancelPayment();
                const date = new Date().toLocaleString('ru-RU');
                const orderId = Date.now();

                const { raw: rawTotal, discount, total: finalTotal } = this.totals();
                this.lastOrder = { id: orderId, date, name: document.getElementById('clientName').value.trim(), phone: document.getElementById('clientPhone').value.trim(), items: this.cart.map(i => ({ name: i.name, price: i.price })), total: finalTotal, discount, method: this.currentPaymentMethod };

                let itemsHtml = '';
                this.cart.forEach(i => { itemsHtml += `<div class="receipt-row"><span>${this.escapeHTML(i.name)}</span><span>${Number(i.price || 0).toLocaleString('ru-RU')}</span></div>`; });

                let pricingHtml = this.isVip
                    ? `<div class="receipt-row"><span>Подытог:</span><span>${rawTotal.toLocaleString('ru-RU')}</span></div><div class="receipt-row"><span>Скидка VIP:</span><span>-${discount.toLocaleString('ru-RU')}</span></div><div class="receipt-line"></div><div class="receipt-row receipt-bold"><span>ИТОГО:</span><span>${finalTotal.toLocaleString('ru-RU')} ₸</span></div>`
                    : `<div class="receipt-row receipt-bold"><span>ИТОГО:</span><span>${finalTotal.toLocaleString('ru-RU')} ₸</span></div>`;

                document.getElementById('receiptPlace').innerHTML = `
                    <div class="receipt-container">
                        <div class="receipt-header"><h2>DoubleSmart</h2><p>Демонстрационный заказ</p><p class="receipt-bold">ЗАКАЗ №${orderId}</p><p>${this.escapeHTML(this.lastOrder.name)}</p></div>
                        <div class="receipt-line"></div>${itemsHtml}<div class="receipt-line"></div>${pricingHtml}<div class="receipt-line"></div>
                        <div class="receipt-row"><span>Оплата:</span><span>${this.currentPaymentMethod}</span></div>
                        <div class="receipt-row"><span>Дата:</span><span>${date}</span></div>
                        <div class="receipt-footer"><p>ДЕМО — НЕ ФИСКАЛЬНЫЙ ЧЕК</p><p>Деньги не списывались. Заказ не отправлен в магазин.</p></div>
                    </div>
                `;
                this.cart = [];
                this.updateCartUI();
                document.getElementById('stepPayment').classList.remove('active');
                document.getElementById('stepSuccess').classList.add('active');
                document.querySelector('#stepSuccess button').focus();
            },

            downloadReceipt: function () {
                if (!this.lastOrder) return this.showToast('Сначала оформите демозаказ.');
                const order = this.lastOrder;
                const text = ['DoubleSmart — демонстрационный заказ №' + order.id, order.date, order.name, order.phone, ...order.items.map(i => i.name + ': ' + this.money(i.price)), 'Скидка: ' + this.money(order.discount), 'Итого: ' + this.money(order.total), 'Способ: ' + order.method, 'ДЕМО. Деньги не списывались. Не является фискальным чеком.'].join('\n');
                const url = URL.createObjectURL(new Blob(['\uFEFF' + text], { type: 'text/plain;charset=utf-8' }));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'DoubleSmart-demo-' + order.id + '.txt';
                document.body.appendChild(link);
                link.click();
                link.remove();
                setTimeout(() => URL.revokeObjectURL(url), 1000);
                this.closeModal('checkoutModal');
            },

            checkLoyalty: function () {
                if (/^DS-[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(document.getElementById('contractInput').value.trim().toUpperCase())) {
                    this.isVip = true;
                    document.getElementById('loyaltySuccess').style.display = 'block';
                    this.refreshCatalog();
                    this.showToast('Демоскидка 20% активирована.');
                } else this.showToast('Введите код в формате DS-KAZ-2026.');
            },

            renderReviews: function () {
                document.getElementById('reviewsList').innerHTML = initialReviews.map(r => this.createReviewHTML(r)).join('');
            },

            createReviewHTML: function (r) {
                const imgHTML = r.photo ? `<button type="button" class="review-photo-button" aria-label="Увеличить фото отзыва"><img alt="Фото из отзыва" src="${this.escapeHTML(this.safeImage(r.photo))}" class="review-img-preview"></button>` : '';
                return `<div class="review-card"><div style="display:flex;justify-content:space-between;margin-bottom:8px;"><div class="stars">${this.escapeHTML(r.rating)}</div><span style="font-size:10px;color:var(--accent-glow);background:rgba(84,232,255,0.1);padding:2px 8px;border-radius:4px;">${this.escapeHTML(r.product)}</span></div><p style="font-size:14px;color:#ccc;">"${this.escapeHTML(r.text)}"</p>${imgHTML}<div class="user" style="display:flex;gap:10px;align-items:center;margin-top:15px;"><div style="width:32px;height:32px;background:#333;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;">${this.escapeHTML(r.name[0] || '?')}</div><div style="font-size:13px;font-weight:600;">${this.escapeHTML(r.name)}</div></div></div>`;
            },

            populateProductSelect: function () {
                const select = document.getElementById('revProduct');
                if (!select) return;
                select.innerHTML = '<option disabled selected value="">Выберите купленный товар</option>';
                db.forEach(p => {
                    const o = document.createElement('option');
                    o.value = p.name;
                    o.innerText = p.name;
                    select.appendChild(o);
                });
            },

            handleFileSelect: function (input) {
                if (input.files[0]) document.getElementById('fileName').innerText = input.files[0].name;
            },

            submitReview: async function (e) {
                e.preventDefault();
                const name = document.getElementById('revName').value.trim();
                const prod = document.getElementById('revProduct').value;
                const text = document.getElementById('revText').value.trim();
                const rating = document.getElementById('revRating').value;
                const file = document.getElementById('revPhoto').files[0];
                if (!name || !prod || !text) return this.showToast('Заполните имя, товар и текст отзыва.');
                const submit = e.target.querySelector('[type="submit"]');
                if (submit.disabled) return;
                submit.disabled = true;
                let photo;
                try { photo = await this.readPhoto(file); }
                catch (err) { return this.showToast(err.message); }
                finally { submit.disabled = false; }
                initialReviews.unshift({ name, product: prod, rating, text, photo });
                this.writeStorage('ds_reviews', initialReviews);
                this.renderReviews();
                e.target.reset();
                document.getElementById('fileName').textContent = 'Прикрепить фото товара';
                this.showToast('Отзыв добавлен');
            },

            openAddProductModal: function () {
                this.openModal('addProductModal');
            },

            submitNewProduct: function (e) {
                e.preventDefault();
                const name = document.getElementById('newProdName').value.trim();
                const cat = document.getElementById('newProdCat').value;
                const price = Number(document.getElementById('newProdPrice').value);
                const image = document.getElementById('newProdImage').value.trim();
                const desc = document.getElementById('newProdDesc').value.trim();
                const specs = this.specsFromText(document.getElementById('newProdSpecs').value);

                if (!name || !['smart', 'kitchen', 'cleaning', 'computers'].includes(cat) || !Number.isFinite(price) || price <= 0 || !image) return this.showToast('Заполните название, категорию, положительную цену и фото');
                if (!/^https?:\/\//i.test(image)) return this.showToast('Укажите адрес фото, начинающийся с https:// или http://.');

                db.push({
                    id: Date.now(),
                    name,
                    category: cat,
                    price,
                    oldPrice: null,
                    image,
                    badge: 'NEW',
                    desc,
                    specs
                });

                this.saveDb();
                this.currentFilter = 'all';
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('.filter-btn')?.classList.add('active');
                this.refreshCatalog();
                this.closeModal('addProductModal');
                e.target.reset();
                this.showToast('Товар добавлен');
            },

            openEditProductModal: function (id) {
                const p = this.getProductById(id);
                if (!p) return this.showToast('Товар не найден');
                this.closeModal('productModal');

                document.getElementById('editProdId').value = p.id;
                document.getElementById('editProdName').value = p.name || '';
                document.getElementById('editProdCat').value = p.category || 'smart';
                document.getElementById('editProdPrice').value = p.price || '';
                document.getElementById('editProdImage').value = p.image || '';
                document.getElementById('editProdDesc').value = p.desc || '';
                document.getElementById('editProdSpecs').value = this.specsToText(p.specs || {});
                document.getElementById('editPhotoName').innerText = 'Можно вставить URL или выбрать файл';
                document.getElementById('editProdPhotoFile').value = '';
                document.getElementById('editPhotoPreview').src = this.getProductImage(p);
                this.openModal('editProductModal');
            },

            previewEditProductPhoto: async function (input) {
                const file = input.files && input.files[0];
                if (!file) return;
                try {
                    document.getElementById('editPhotoPreview').src = await this.readPhoto(file);
                    document.getElementById('editPhotoName').innerText = file.name;
                } catch (err) { input.value = ''; this.showToast(err.message); }
            },

            getSelectedEditPhoto: function () {
                const fileInput = document.getElementById('editProdPhotoFile');
                const file = fileInput.files && fileInput.files[0];
                if (!file) return Promise.resolve(document.getElementById('editProdImage').value.trim());

                return this.readPhoto(file);
            },

            submitEditProduct: async function (e) {
                e.preventDefault();
                const id = document.getElementById('editProdId').value;
                const p = this.getProductById(id);
                if (!p) return this.showToast('Товар не найден');

                const newPrice = Number(document.getElementById('editProdPrice').value);
                if (!Number.isFinite(newPrice) || newPrice <= 0) return this.showToast('Цена должна быть больше нуля');
                if (!document.getElementById('editProdName').value.trim()) return this.showToast('Введите название товара.');

                let selectedImage = '';
                try {
                    selectedImage = await this.getSelectedEditPhoto();
                } catch (err) {
                    return this.showToast(err.message);
                }

                p.name = document.getElementById('editProdName').value.trim() || p.name;
                p.category = document.getElementById('editProdCat').value;
                p.price = newPrice;
                p.image = selectedImage || p.image || PRODUCT_IMAGE_PLACEHOLDER;
                p.desc = document.getElementById('editProdDesc').value.trim();
                p.specs = this.specsFromText(document.getElementById('editProdSpecs').value);

                this.cart = this.cart.map(item => String(item.id) === String(p.id) ? { ...item, ...p, tId: item.tId } : item);
                this.saveDb();
                this.refreshCatalog();
                this.closeModal('editProductModal');
                e.target.reset();
                document.getElementById('editProdPhotoFile').value = '';
                this.showToast('Товар обновлён');
            },

            deleteProduct: function (id) {
                const p = this.getProductById(id);
                if (!p) return this.showToast('Товар не найден');
                const ok = confirm(`Удалить товар «${p.name}»?`);
                if (!ok) return;

                const index = db.findIndex(x => String(x.id) === String(id));
                if (index !== -1) db.splice(index, 1);
                this.cart = this.cart.filter(item => String(item.id) !== String(id));
                this.saveDb();
                this.closeModal('productModal');
                this.closeModal('editProductModal');
                this.refreshCatalog();
                this.showToast('Товар удалён');
            },

            saveDb: function () {
                return this.writeStorage('ds_db', db);
            },

            loadDb: function () {
                const parsed = this.readStorage('ds_db', null);
                if (!Array.isArray(parsed) || !parsed.every(p => p && Number.isSafeInteger(p.id) && p.id > 0 && typeof p.name === 'string' && Number.isFinite(p.price) && p.price > 0 && ['smart','kitchen','cleaning','computers'].includes(p.category)) || new Set(parsed.map(p => p.id)).size !== parsed.length) return;
                db.splice(0, db.length, ...parsed);
            },

            showToast: function (msg) {
                const container = document.getElementById('toastContainer');
                if ([...container.children].some(toast => toast.textContent === msg)) return;
                if (container.children.length >= 3) container.firstElementChild.remove();
                const t = document.createElement('div');
                t.className = 'toast';
                t.setAttribute('role', 'status');
                t.innerText = msg;
                container.appendChild(t);
                setTimeout(() => { t.classList.add('show'); }, 10);
                setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
            }
        };

        window.app = app;

        const style = document.createElement('style'); style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`; document.head.appendChild(style);
        document.addEventListener('DOMContentLoaded', () => app.init(), { once: true });

document.addEventListener('click', function (event) {
    const target = event.target.closest('[data-click]');
    if (!target) return;
    event.preventDefault();
    Function('event', 'element', target.dataset.click).call(target, event, target);
});

document.addEventListener('submit', function (event) {
    const target = event.target.closest('[data-submit]');
    if (!target) return;
    Function('event', 'element', target.dataset.submit).call(target, event, target);
});

document.addEventListener('change', function (event) {
    const target = event.target.closest('[data-change]');
    if (!target) return;
    Function('event', 'element', target.dataset.change).call(target, event, target);
});

document.addEventListener('error', event => {
    const img = event.target;
    if (img instanceof HTMLImageElement && img.src !== PRODUCT_IMAGE_PLACEHOLDER) img.src = PRODUCT_IMAGE_PLACEHOLDER;
}, true);

document.addEventListener('click', event => {
    if (event.target.classList.contains('modal-overlay')) app.closeModal(event.target.id);
    const photo = event.target.closest('.review-photo-button');
    if (photo) {
        document.getElementById('reviewPhotoLarge').src = photo.querySelector('img').src;
        app.openModal('reviewPhotoModal');
    }
});

document.addEventListener('keydown', event => {
    const modal = document.querySelector('.modal-overlay.active');
    if (!modal) {
        if (event.key === 'Enter' && event.target.id === 'contractInput') app.checkLoyalty();
        return;
    }
    if (event.key === 'Escape') { event.preventDefault(); app.closeModal(modal.id); }
    if (event.key === 'Enter' && ['clientName','clientPhone'].includes(event.target.id)) { event.preventDefault(); app.goToPayment(); }
    if (event.key === 'Tab') {
        const items = [...modal.querySelectorAll('button, input, select, textarea, a[href], [tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
});

// Observe new catalog/review blocks as well as their first viewport entry.
function initSignalReveals() {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return;
    const selector = '.hero-copy, .cyber-terminal, .product-card, .review-card, .loyalty-banner, .reviews-layout > .ds-inline-7, .empty-catalog, .cart-item';
    const seen = new WeakSet();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            observer.unobserve(target);
            if (!motion.matches) target.classList.add('signal-enter');
        });
    }, { threshold: 0.08 });
    function register(root) {
        if (!(root instanceof Element)) return;
        const blocks = [...root.querySelectorAll(selector)];
        if (root.matches(selector)) blocks.unshift(root);
        blocks.forEach(block => {
            if (seen.has(block)) return;
            seen.add(block);
            observer.observe(block);
        });
    }
    register(document.body);
    new MutationObserver(records => {
        records.forEach(record => {
            record.removedNodes.forEach(root => {
                if (!(root instanceof Element)) return;
                observer.unobserve(root);
                root.querySelectorAll(selector).forEach(block => observer.unobserve(block));
            });
            record.addedNodes.forEach(register);
        });
    }).observe(document.body, { childList: true, subtree: true });
    document.addEventListener('animationend', event => {
        if (event.animationName === 'signal-in') event.target.classList.remove('signal-enter');
    });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSignalReveals, { once: true });
} else {
    initSignalReveals();
}
