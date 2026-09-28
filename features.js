// Local profile, review rating and deterministic catalog sonar.
(() => {
    const original = {
        init: app.init, finishPayment: app.finishPayment, openCheckout: app.openCheckout,
        refreshCatalog: app.refreshCatalog, filterProducts: app.filterProducts
    };
    Object.assign(app, {
        profile: {}, orders: [], radarCategory: 'all', radarTimer: null,

        init() {
            original.init.call(this);
            const saved = this.readStorage('ds_profile', {});
            this.profile = Object.fromEntries(['name', 'email', 'phone', 'address'].map(key => [key, typeof saved?.[key] === 'string' ? saved[key].slice(0, 300) : '']));
            const orders = this.readStorage('ds_orders', []);
            this.orders = Array.isArray(orders) ? orders.filter(order => order && Number.isSafeInteger(order.id) && Number.isFinite(order.total) && Number.isFinite(order.discount) && typeof order.date === 'string' && Array.isArray(order.items) && order.items.every(item => item && typeof item.name === 'string' && Number.isFinite(item.price))).slice(0, 50) : [];
            this.paintRating(5);
            const stars = document.getElementById('ratingStars');
            let selectedRating = 5;
            stars.addEventListener('change', event => {
                const value = Number(event.target.value);
                selectedRating = value;
                document.getElementById('revRating').value = '★'.repeat(value) + '☆'.repeat(5 - value);
                this.confirmRating(value);
            });
            stars.addEventListener('click', event => {
                if (event.target.matches('input') && Number(event.target.value) === selectedRating) this.confirmRating(selectedRating);
            });
            stars.querySelectorAll('.rating-star').forEach((label, i) => {
                label.style.setProperty('--star-index', i);
                label.addEventListener('pointerenter', event => {
                    if (event.pointerType === 'touch') return;
                    this.clearRatingAnimations();
                    stars.classList.add('previewing');
                    this.paintRating(i + 1, true);
                });
            });
            stars.addEventListener('pointerleave', () => {
                stars.classList.remove('previewing');
                this.clearRatingAnimations();
                this.paintRating(selectedRating);
            });
            stars.closest('form').addEventListener('reset', () => requestAnimationFrame(() => {
                selectedRating = 5;
                stars.classList.remove('previewing');
                this.clearRatingAnimations();
                document.getElementById('revRating').value = '★★★★★';
                this.paintRating(5);
            }));
            document.querySelectorAll('[data-radar]').forEach(button => button.addEventListener('click', () => this.startRadar(button.dataset.radar)));
            document.querySelectorAll('[data-account-tab]').forEach(button => {
                button.addEventListener('click', () => this.accountTab(button.dataset.accountTab));
                button.addEventListener('keydown', event => {
                    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
                        event.preventDefault();
                        const tab = event.key === 'Home' ? 'profile' : event.key === 'End' ? 'orders' : button.dataset.accountTab === 'profile' ? 'orders' : 'profile';
                        this.accountTab(tab);
                        document.getElementById(tab + 'Tab').focus();
                    }
                });
            });
            this.startRadar('all', false);
        },

        paintRating(value, preview = false) {
            document.getElementById('ratingStars').style.setProperty('--rating-count', value);
            document.querySelectorAll('.rating-star').forEach((star, i) => star.classList.toggle('lit', i < value));
            if (!preview) {
                document.getElementById('ratingLabel').textContent = `${value} / 5 — ${['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'][value - 1]}`;
            }
        },

        clearRatingAnimations() {
            document.querySelectorAll('.rating-star span').forEach(star => {
                star.getAnimations().forEach(animation => {
                    if (animation.id === 'rating-preview' || animation.id === 'rating-confirmation') {
                        animation.cancel();
                    }
                });
            });
        },

        confirmRating(value) {
            const stars = document.getElementById('ratingStars');
            stars.classList.remove('previewing');
            this.clearRatingAnimations();
            this.paintRating(value);
            stars.querySelectorAll('.rating-star span').forEach((star, i) => {
                if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                const cyan = i < value ? '#54e8ff' : '#243942';
                const red = i < value ? '#ff3555' : '#243942';
                const animation = star.animate([
                    { color: cyan, opacity: 1, textShadow: 'none', offset: 0 },
                    { color: red, opacity: .8, textShadow: i < value ? '2px 0 #ff3555, -2px 0 #54e8ff' : 'none', offset: .12 },
                    { color: cyan, opacity: 1, textShadow: i < value ? '0 0 15px #54e8ff66' : 'none', offset: .34 },
                    { color: red, opacity: .8, textShadow: i < value ? '-2px 0 #ff3555, 2px 0 #54e8ff' : 'none', offset: .56 },
                    { color: cyan, opacity: 1, textShadow: i < value ? '0 0 15px #54e8ff66' : 'none', offset: .78 },
                    { color: cyan, opacity: 1, textShadow: i < value ? '0 0 15px #54e8ff33' : 'none', offset: 1 }
                ], { duration: 900, delay: Math.max(0, value - 1 - i) * 80, easing: 'steps(1, end)' });
                animation.id = 'rating-confirmation';
            });
        },

        startRadar(category = this.radarCategory, applyCatalog = true) {
            clearTimeout(this.radarTimer);
            this.radarCategory = category;
            const radar = document.getElementById('radar');
            const results = document.getElementById('radarResults');
            results.hidden = true;
            radar.classList.remove('is-scanning');
            // Restart the sweep even when the same category is scanned again.
            void radar.offsetWidth;
            radar.classList.add('is-scanning');
            radar.setAttribute('aria-busy', 'true');
            document.getElementById('radarStatus').textContent = 'Сканирование сектора…';
            document.querySelectorAll('[data-radar]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.radar === category)));
            const products = db.filter(p => category === 'all' || p.category === category || (category === 'home' && ['kitchen', 'cleaning'].includes(p.category)));
            const points = document.getElementById('radarPoints');
            points.replaceChildren();
            products.slice(0, 16).forEach((product, i) => {
                const angle = i * 2.39996 + .4;
                const radius = 16 + (i % 4) * 7;
                const point = document.createElement('button');
                point.type = 'button';
                point.className = 'radar-point';
                point.style.left = `${50 + Math.cos(angle) * radius}%`;
                point.style.top = `${50 + Math.sin(angle) * radius}%`;
                point.style.setProperty('--ping-delay', `${i * 100}ms`);
                point.setAttribute('aria-label', 'Показать ' + product.name);
                point.title = product.name;
                point.addEventListener('click', () => this.openProductModal(product.id));
                points.appendChild(point);
            });
            this.radarTimer = setTimeout(() => {
                radar.classList.remove('is-scanning');
                radar.setAttribute('aria-busy', 'false');
                document.getElementById('radarStatus').textContent = products.length ? `Поиск завершён / найдено: ${products.length}` : 'Поиск завершён / сектор пуст';
                const suggestions = document.getElementById('radarSuggestions');
                suggestions.replaceChildren();
                document.getElementById('radarResultCount').textContent = `${products.length} в каталоге`;
                if (!products.length) {
                    const empty = document.createElement('p');
                    empty.className = 'radar-empty';
                    empty.textContent = 'В этой категории пока нет товаров. Выберите другой сектор или добавьте свой товар в каталог.';
                    suggestions.appendChild(empty);
                }
                products.slice(0, 6).forEach(product => {
                    const card = document.createElement('button');
                    card.type = 'button';
                    card.className = 'radar-suggestion signal-enter';
                    card.innerHTML = `<span class="radar-result-marker" aria-hidden="true">⌖</span><span><strong>${this.escapeHTML(product.name)}</strong><small>${this.escapeHTML(this.getCategoryTitle(product.category))}</small></span><span class="radar-result-price">${this.money(this.priceFor(product))}<span aria-hidden="true"> ↗</span></span>`;
                    card.addEventListener('click', () => this.openProductModal(product.id));
                    suggestions.appendChild(card);
                });
                results.hidden = false;
                if (applyCatalog) {
                    this.renderProducts(category);
                    document.querySelectorAll('.filter-btn').forEach(button => button.classList.toggle('active', button.dataset.click.includes(`'${category}'`)));
                }
            }, 2400);
        },

        filterProducts(category, button) {
            original.filterProducts.call(this, category, button);
            this.startRadar(category, false);
        },

        refreshCatalog() {
            original.refreshCatalog.call(this);
            this.startRadar(this.radarCategory, false);
        },

        openAccount() {
            for (const key of ['name', 'email', 'phone', 'address']) document.getElementById('profile' + key[0].toUpperCase() + key.slice(1)).value = this.profile[key] || '';
            this.renderAccount();
            this.accountTab('profile');
            this.openModal('accountModal');
        },

        renderAccount() {
            document.getElementById('accountName').textContent = this.profile.name || 'Ваш профиль';
            document.getElementById('accountAvatar').textContent = this.profile.name ? this.profile.name.trim().split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase() : 'DS';
            document.getElementById('accountVip').textContent = this.isVip ? 'VIP / демоскидка 20%' : 'Стандартный доступ';
            const list = document.getElementById('accountOrders');
            list.replaceChildren();
            if (!this.orders.length) {
                const empty = document.createElement('p');
                empty.className = 'account-empty';
                empty.textContent = 'Заказов пока нет. После демооплаты здесь появятся товары и чек.';
                list.appendChild(empty);
            }
            this.orders.forEach(order => {
                const card = document.createElement('article');
                card.className = 'account-order';
                card.innerHTML = `<div class="account-order-title"><strong>Заказ №${order.id}</strong><span>ДЕМО</span></div><p>${this.escapeHTML(order.date)}</p><ul>${order.items.map(item => `<li>${this.escapeHTML(item.name)} <span>${this.money(item.price)}</span></li>`).join('')}</ul><div class="account-order-total"><strong>${this.money(order.total)}</strong><button type="button" class="btn-outline">Скачать чек</button></div>`;
                card.querySelector('button').addEventListener('click', () => {
                    const previous = this.lastOrder;
                    this.lastOrder = order;
                    this.downloadReceipt();
                    this.lastOrder = previous;
                });
                list.appendChild(card);
            });
        },

        accountTab(tab) {
            for (const name of ['profile', 'orders']) {
                document.getElementById(name + 'Panel').hidden = tab !== name;
                const button = document.getElementById(name + 'Tab');
                button.setAttribute('aria-selected', String(tab === name));
                button.tabIndex = tab === name ? 0 : -1;
            }
        },

        saveProfile(event) {
            event.preventDefault();
            const fields = Object.fromEntries(['name', 'email', 'phone', 'address'].map(key => [key, document.getElementById('profile' + key[0].toUpperCase() + key.slice(1)).value.trim()]));
            if (fields.name.length < 2) return this.showToast('Введите имя: не менее двух символов.');
            if (fields.phone && !/^[78]\d{10}$/.test(fields.phone.replace(/\D/g, ''))) return this.showToast('Введите телефон: +7 и ещё 10 цифр.');
            this.profile = fields;
            const saved = this.writeStorage('ds_profile', fields);
            this.renderAccount();
            if (saved) this.showToast('Профиль сохранён.');
        },

        openCheckout() {
            if (this.profile.name) document.getElementById('clientName').value = this.profile.name;
            if (this.profile.phone) document.getElementById('clientPhone').value = this.profile.phone;
            original.openCheckout.call(this);
        },

        finishPayment() {
            const previous = this.lastOrder;
            original.finishPayment.call(this);
            if (this.lastOrder && this.lastOrder !== previous) {
                this.orders.unshift(this.lastOrder);
                this.orders = this.orders.slice(0, 50);
                this.writeStorage('ds_orders', this.orders);
            }
        }
    });
})();
