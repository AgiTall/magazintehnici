const { test, expect } = require('@playwright/test');
const fs = require('node:fs');

test.beforeEach(async ({ page }) => {
  page.errors = [];
  page.on('pageerror', error => page.errors.push(error.message));
  // External image/font hosts must not affect store functionality.
  await page.route(/^https:\/\//, route => route.abort());
  await page.goto('/');
  await expect(page.locator('.product-card')).toHaveCount(6);
});
test.afterEach(async ({ page }) => { expect(page.errors).toEqual([]); });

async function addItem(page) {
  await page.locator('.product-card').first().getByRole('button', { name: 'В корзину', exact: true }).click();
}
async function checkout(page) {
  await addItem(page);
  await page.getByRole('button', { name: 'Открыть корзину' }).click();
  await page.getByRole('button', { name: 'Перейти к оформлению' }).click();
  await page.locator('#clientName').fill('Тестовый Покупатель');
  await page.locator('#clientPhone').fill('+7 (777) 123-45-67');
  await page.getByRole('button', { name: /Далее:/ }).click();
}

test('navigation, filters, details and modal dismissal', async ({ page }) => {
  await page.locator('nav').getByRole('link', { name: 'Каталог' }).click();
  await expect(page).toHaveURL(/#catalog$/);
  for (const [label, count] of [['Кухня', 2], ['Уборка', 1], ['Smart Home', 3], ['Все товары', 6]]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await expect(page.locator('.product-card')).toHaveCount(count);
    await expect(page.getByRole('button', { name: label, exact: true })).toHaveClass(/active/);
  }
  await page.locator('.btn-details').first().click();
  await expect(page.locator('#productModal')).toBeVisible();
  await expect(page.locator('.pd-title-lg')).toHaveText('Yale Linus Smart Lock');
  await page.keyboard.press('Escape');
  await expect(page.locator('#productModal')).toBeHidden();
  await page.locator('.product-title').first().click();
  await page.locator('#productModal .close-btn').click();
  await expect(page.locator('#productModal')).toBeHidden();
  for (const [name, hash] of [['Лояльность', 'loyalty'], ['Отзывы', 'reviews']]) {
    await page.locator('nav').getByRole('link', { name }).click();
    await expect(page).toHaveURL(new RegExp('#' + hash + '$'));
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('cart persists, removes items, guards empty checkout and applies VIP prices', async ({ page }) => {
  await addItem(page);
  await page.reload();
  await expect(page.locator('#headerCartCount')).toHaveText('1');
  await page.locator('#contractInput').fill('wrong');
  await page.getByRole('button', { name: 'Активировать', exact: true }).click();
  await expect(page.locator('#loyaltySuccess')).toBeHidden();
  await page.locator('#contractInput').fill(' ds-kaz-2026 ');
  await page.getByRole('button', { name: 'Активировать', exact: true }).click();
  await expect(page.locator('#loyaltySuccess')).toBeVisible();
  expect(await page.locator('.price-current').first().innerText()).toMatch(/96\D*000/);
  await page.getByRole('button', { name: 'Открыть корзину' }).click();
  expect(await page.locator('#cartTotal').innerText()).toMatch(/96\D*000/);
  await page.locator('.cart-item button').click();
  await expect(page.locator('#headerCartCount')).toHaveText('0');
  await page.getByRole('button', { name: 'Перейти к оформлению' }).click();
  await expect(page.locator('#checkoutModal')).toBeHidden();
  await page.keyboard.press('Escape');
  await page.reload();
  await expect(page.locator('#loyaltySuccess')).toBeVisible();
  await expect(page.locator('#headerCartCount')).toHaveText('0');
});

test('create, edit and delete a product, including persistence and cart synchronization', async ({ page }) => {
  await page.getByRole('button', { name: '+ Товар', exact: true }).click();
  await page.locator('#newProdName').fill('Тестовый датчик');
  await page.locator('#newProdCat').selectOption('smart');
  await page.locator('#newProdPrice').fill('1000.50');
  await page.locator('#newProdImage').fill('https://example.com/photo.jpg');
  await page.locator('#newProdDesc').fill('Описание датчика');
  await page.locator('#newProdSpecs').fill('Цвет: Чёрный\nПротокол: Wi-Fi');
  await page.getByRole('button', { name: 'Сохранить товар', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(7);
  await page.reload();
  const card = page.locator('.product-card').filter({ hasText: 'Тестовый датчик' });
  await card.getByRole('button', { name: 'В корзину', exact: true }).click();
  await card.getByRole('button', { name: 'Изменить', exact: true }).click();
  await expect(page.locator('#editProdSpecs')).toHaveValue('Цвет: Чёрный\nПротокол: Wi-Fi');
  await page.locator('#editProdPrice').fill('2000.25');
  await page.locator('#editProdName').fill('Обновлённый датчик');
  await page.getByRole('button', { name: 'Сохранить изменения' }).click();
  await page.getByRole('button', { name: 'Открыть корзину' }).click();
  await expect(page.locator('#cartItemsList')).toContainText('Обновлённый датчик');
  expect(await page.locator('#cartTotal').innerText()).toMatch(/2\D*000,25/);
  await page.keyboard.press('Escape');
  const updated = page.locator('.product-card').filter({ hasText: 'Обновлённый датчик' });
  page.once('dialog', dialog => dialog.dismiss());
  await updated.getByRole('button', { name: 'Удалить', exact: true }).click();
  await expect(updated).toHaveCount(1);
  page.once('dialog', dialog => dialog.accept());
  await updated.getByRole('button', { name: 'Удалить', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(6);
  await expect(page.locator('#headerCartCount')).toHaveText('0');
  await page.reload();
  await expect(page.locator('.product-card')).toHaveCount(6);
});

test('review with uploaded photo persists and photo opens', async ({ page }) => {
  await page.locator('#revName').fill('Тест');
  await page.locator('#revProduct').selectOption({ index: 1 });
  await page.locator('#revText').fill('Хороший товар <script>bad()</script>');
  await page.locator('#revPhoto').setInputFiles({ name: 'pixel.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aD1sAAAAASUVORK5CYII=', 'base64') });
  await expect(page.locator('#fileName')).toHaveText('pixel.png');
  await page.getByRole('button', { name: 'Опубликовать отзыв' }).click();
  await expect(page.locator('.review-card')).toHaveCount(5);
  await expect(page.locator('#fileName')).toHaveText('Прикрепить фото товара');
  await page.reload();
  await expect(page.locator('.review-card')).toHaveCount(5);
  await page.locator('.review-photo-button').first().click();
  await expect(page.locator('#reviewPhotoModal')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#reviewPhotoModal')).toBeHidden();
});

for (const method of ['Карта', 'Kaspi QR', 'Halyk QR']) {
  test('demo payment and receipt: ' + method, async ({ page }) => {
    await checkout(page);
    await page.getByRole('button', { name: method, exact: true }).click();
    await page.getByRole('button', { name: /Подтвердить демооплату/ }).filter({ visible: true }).click();
    await expect(page.locator('#stepSuccess')).toBeVisible();
    await expect(page.locator('#receiptPlace')).toContainText('ДЕМО — НЕ ФИСКАЛЬНЫЙ ЧЕК');
    await expect(page.locator('#headerCartCount')).toHaveText('0');
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Закрыть и скачать' }).click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toMatch(/^DoubleSmart-demo-\d+\.txt$/);
    const text = fs.readFileSync(await download.path(), 'utf8');
    expect(text).toContain('Тестовый Покупатель');
    expect(text).toContain('Yale Linus Smart Lock');
    await expect(page.locator('#checkoutModal')).toBeHidden();
    await checkout(page);
    await expect(page.locator('#stepPayment')).toBeVisible();
    await expect(page.locator('.pay-opt.active')).toContainText('Карта');
  });
}

test('contact validation, cancellation and switching payment cannot complete stale orders', async ({ page }) => {
  await addItem(page);
  await page.getByRole('button', { name: 'Открыть корзину' }).click();
  await page.getByRole('button', { name: 'Перейти к оформлению' }).click();
  await page.getByRole('button', { name: /Далее:/ }).click();
  await expect(page.locator('#stepContacts')).toBeVisible();
  await page.locator('#clientName').fill('Тест');
  await page.locator('#clientPhone').fill('123');
  await page.getByRole('button', { name: /Далее:/ }).click();
  await expect(page.locator('#stepContacts')).toBeVisible();
  await page.locator('#clientPhone').fill('+77771234567');
  await page.getByRole('button', { name: /Далее:/ }).click();
  await page.getByRole('button', { name: 'Kaspi QR', exact: true }).click();
  await page.getByRole('button', { name: /Подтвердить демооплату/ }).filter({ visible: true }).click();
  await page.getByRole('button', { name: 'Карта', exact: true }).click();
  await page.waitForTimeout(1200);
  await expect(page.locator('#stepPayment')).toBeVisible();
  await expect(page.locator('#headerCartCount')).toHaveText('1');
  await page.getByRole('button', { name: /Подтвердить демооплату/ }).filter({ visible: true }).click();
  await page.getByRole('button', { name: 'Назад', exact: true }).click();
  await page.waitForTimeout(1200);
  await expect(page.locator('#stepContacts')).toBeVisible();
  await page.getByRole('button', { name: /Далее:/ }).click();
  await page.getByRole('button', { name: /Подтвердить демооплату/ }).filter({ visible: true }).click();
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1200);
  await expect(page.locator('#headerCartCount')).toHaveText('1');
});

test('corrupt storage does not break startup and failed images have local fallback', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.setItem('ds_db', '{broken');
    localStorage.setItem('ds_state', 'null');
    localStorage.setItem('ds_reviews', 'false');
  });
  await page.reload();
  await expect(page.locator('.product-card')).toHaveCount(6);
  await expect(page.locator('.product-image-wrapper img').first()).toHaveAttribute('src', /^data:image\/svg\+xml/);
  await page.getByRole('button', { name: '+ Товар', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(page.locator('#addProductModal')).toBeHidden();
});

test('product photo upload, negative price validation and keyboard modal controls', async ({ page }) => {
  await page.locator('.admin-btn.edit').first().click();
  await page.locator('#editProdPrice').fill('-5');
  await page.getByRole('button', { name: 'Сохранить изменения' }).click();
  await expect(page.locator('#editProductModal')).toBeVisible();
  await page.locator('#editProdPrice').fill('125000');
  await page.locator('#editProdPhotoFile').setInputFiles({ name: 'sensor.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aD1sAAAAASUVORK5CYII=', 'base64') });
  await expect(page.locator('#editPhotoName')).toHaveText('sensor.png');
  await expect(page.locator('#editPhotoPreview')).toHaveAttribute('src', /^data:image\/png/);
  await page.getByRole('button', { name: 'Сохранить изменения' }).click();
  await page.reload();
  await expect(page.locator('.product-image-wrapper img').first()).toHaveAttribute('src', /^data:image\/png/);
  await page.getByRole('button', { name: 'Открыть корзину' }).click();
  await page.locator('#cartModal .close-btn').focus();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Перейти к оформлению' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#cartModal .close-btn')).toBeFocused();
  await page.locator('#cartModal').click({ position: { x: 2, y: 2 } });
  await expect(page.locator('#cartModal')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Открыть корзину' })).toBeFocused();
});

test('storage denied still allows shopping and reduced motion keeps blocks visible', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage denied'); };
    Storage.prototype.setItem = () => { throw new Error('Storage denied'); };
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('.product-card')).toHaveCount(6);
  await addItem(page);
  await expect(page.locator('#headerCartCount')).toHaveText('1');
  const messages = page.locator('#toastContainer .toast');
  await expect(messages).toHaveCount(2);
  const boxes = await messages.evaluateAll(nodes => nodes.map(n => ({ top: n.offsetTop, bottom: n.offsetTop + n.offsetHeight })));
  expect(boxes[0].bottom).toBeLessThanOrEqual(boxes[1].top);
  await page.getByRole('button', { name: 'Открыть корзину' }).click();
  await expect(page.locator('.cart-item')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: test.info().outputPath('store.png'), fullPage: true });
});
