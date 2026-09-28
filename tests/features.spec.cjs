const { test, expect } = require('@playwright/test');
test.beforeEach(async ({ page }) => {
    page.errors = [];
    page.on('pageerror', error => page.errors.push(error.message));
    await page.route(/^https:\/\//, route => route.abort());
    await page.goto('/');
    await expect(page.locator('.product-card')).toHaveCount(6);
});
test.afterEach(async ({ page }) => expect(page.errors).toEqual([]));

test('stars replay their motion on every new rating and support keyboard', async ({ page }) => {
    await page.evaluate(() => {
        window.starAnimations = 0;
        const animate = Element.prototype.animate;
        Element.prototype.animate = function (...args) {
            if (this.matches('.rating-star span')) window.starAnimations++;
            return animate.apply(this, args);
        };
    });
    for (const value of [3, 2, 4]) {
        await page.locator(`.rating-star input[value="${value}"]`).check();
        await expect(page.locator('#revRating')).toHaveValue('★'.repeat(value) + '☆'.repeat(5 - value));
        await expect(page.locator('.rating-star.lit')).toHaveCount(value);
    }
    expect(await page.evaluate(() => window.starAnimations)).toBe(15);
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('#revRating')).toHaveValue('★★★☆☆');
    await page.locator('#revName').fill('Проверка звёзд');
    await page.locator('#revProduct').selectOption({ index: 1 });
    await page.locator('#revText').fill('Проверка сохранения оценки');
    await page.getByRole('button', { name: 'Опубликовать отзыв' }).click();
    await expect(page.locator('.review-card .stars').first()).toHaveText('★★★☆☆');
    await expect(page.locator('#revRating')).toHaveValue('★★★★★');
    await expect(page.locator('.rating-star.lit')).toHaveCount(5);
});

test('sonar stops after search, keeps points and opens found products', async ({ page }) => {
    await expect(page.locator('#radar')).toHaveClass(/is-scanning/);
    const rect = await page.locator('#radar').boundingBox();
    expect(Math.abs(rect.width - rect.height)).toBeLessThan(1);
    await expect(page.locator('#radarStatus')).toContainText('Поиск завершён');
    await expect(page.locator('#radar')).not.toHaveClass(/is-scanning/);
    await expect(page.locator('.radar-point')).toHaveCount(6);
    await expect(page.locator('.radar-suggestion')).toHaveCount(6);
    await page.locator('.radar-point').first().click();
    await expect(page.locator('#productModal')).toBeVisible();
    await page.keyboard.press('Escape');
    await page.locator('.radar-suggestion').first().click();
    await expect(page.locator('#productModal')).toBeVisible();
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Повторить поиск радара' }).click();
    await expect(page.locator('#radar')).toHaveClass(/is-scanning/);
    await expect(page.locator('#radarResults')).toBeHidden();
    await expect(page.locator('#radarStatus')).toContainText('Поиск завершён');
});

test('radar filters and rapid changes produce only latest suggestions', async ({ page }) => {
    await page.locator('[data-radar="home"]').click();
    await expect(page.locator('#radarStatus')).toContainText('найдено: 3');
    await expect(page.locator('.product-card')).toHaveCount(3);
    await expect(page.locator('.radar-suggestion')).toHaveCount(3);
    await page.locator('[data-radar="smart"]').click();
    await page.locator('[data-radar="computers"]').click();
    await expect(page.locator('#radarStatus')).toContainText('сектор пуст');
    await expect(page.locator('.radar-point')).toHaveCount(0);
    await expect(page.locator('.radar-empty')).toBeVisible();
    await expect(page.locator('.product-card')).toHaveCount(0);
    await page.locator('[data-radar="all"]').click();
    await expect(page.locator('#radarStatus')).toContainText('найдено: 6');
    await expect(page.locator('.product-card')).toHaveCount(6);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: test.info().outputPath('radar.png'), fullPage: true });
});

test('profile persists, prefills checkout and retains downloadable order history', async ({ page }) => {
    await page.getByRole('button', { name: 'Личный кабинет' }).click();
    await page.getByRole('tab', { name: 'Мои заказы' }).click();
    await expect(page.locator('#accountOrders')).toContainText('Заказов пока нет');
    await page.keyboard.press('ArrowLeft');
    await expect(page.getByRole('tab', { name: 'Профиль' })).toHaveAttribute('aria-selected', 'true');
    await page.locator('#profileName').fill('Иван Тестовый');
    await page.locator('#profileEmail').fill('ivan@example.com');
    await page.locator('#profilePhone').fill('+7 (777) 123-45-67');
    await page.locator('#profileAddress').fill('Астана, тестовый адрес 1');
    await page.getByRole('button', { name: 'Сохранить профиль' }).click();
    await expect(page.locator('#accountName')).toHaveText('Иван Тестовый');
    await page.reload();
    await page.getByRole('button', { name: 'Личный кабинет' }).click();
    await expect(page.locator('#profileName')).toHaveValue('Иван Тестовый');
    await expect(page.locator('#profileAddress')).toHaveValue('Астана, тестовый адрес 1');
    await page.keyboard.press('Escape');
    await page.locator('.product-card').first().getByRole('button', { name: 'В корзину', exact: true }).click();
    await page.getByRole('button', { name: 'Открыть корзину' }).click();
    await page.getByRole('button', { name: 'Перейти к оформлению' }).click();
    await expect(page.locator('#clientName')).toHaveValue('Иван Тестовый');
    await expect(page.locator('#clientPhone')).toHaveValue('+7 (777) 123-45-67');
    await page.getByRole('button', { name: /Далее:/ }).click();
    await page.getByRole('button', { name: /Подтвердить демооплату/ }).filter({ visible: true }).click();
    await expect(page.locator('#stepSuccess')).toBeVisible();
    await page.reload();
    await page.getByRole('button', { name: 'Личный кабинет' }).click();
    await page.getByRole('tab', { name: 'Мои заказы' }).click();
    await expect(page.locator('.account-order')).toHaveCount(1);
    await expect(page.locator('.account-order')).toContainText('Yale Linus Smart Lock');
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Скачать чек', exact: true }).click();
    expect((await downloadEvent).suggestedFilename()).toMatch(/DoubleSmart-demo-/);
    await expect(page.locator('#accountModal')).toBeVisible();
});

test('reduced motion disables star shake and sonar motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('.rating-star input[value="2"]').check();
    expect(await page.locator('.rating-star span').evaluateAll(stars => stars.flatMap(star => star.getAnimations()).length)).toBe(0);
    await page.getByRole('button', { name: 'Повторить поиск радара' }).click();
    expect(await page.locator('.sonar-sweep').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
    await expect(page.locator('#radarStatus')).toContainText('Поиск завершён');
    await expect(page.locator('.radar-point')).toHaveCount(6);
});

test('computer category accepts products and radar finds newly added items', async ({ page }) => {
    await page.getByRole('button', { name: '+ Товар', exact: true }).click();
    await page.locator('#newProdName').fill('Тестовый компьютер');
    await page.locator('#newProdCat').selectOption('computers');
    await page.locator('#newProdPrice').fill('240000');
    await page.locator('#newProdImage').fill('https://example.com/computer.png');
    await page.locator('#newProdDesc').fill('Компьютер для проверки категории');
    await page.getByRole('button', { name: 'Сохранить товар', exact: true }).click();
    await page.reload();
    await page.locator('[data-radar="computers"]').click();
    await expect(page.locator('#radarStatus')).toContainText('найдено: 1');
    await expect(page.locator('.radar-point')).toHaveCount(1);
    await expect(page.locator('.radar-suggestion')).toContainText('Тестовый компьютер');
    await expect(page.locator('.product-card')).toHaveCount(1);
});

test('rating hover previews without saving, confirmation flashes red twice then stays cyan', async ({ page }) => {
    await page.locator('.rating-star').nth(2).hover();
    await expect(page.locator('#ratingStars')).toHaveClass(/previewing/);
    await expect(page.locator('.rating-star.lit')).toHaveCount(3);
    await expect(page.locator('#revRating')).toHaveValue('★★★★★');
    expect(await page.locator('.rating-star span').first().evaluate(el => el.getAnimations().some(a => a.animationName === 'rating-preview' && a.playState === 'running'))).toBe(true);
    await page.locator('.rating-star').nth(3).hover();
    expect(await page.locator('.rating-star span').first().evaluate(el => el.getAnimations().some(a => a.playState === 'running'))).toBe(true);
    await page.locator('.rating-star input[value="3"]').click();
    await expect(page.locator('#revRating')).toHaveValue('★★★☆☆');
    await expect(page.locator('#ratingStars')).not.toHaveClass(/previewing/);
    const samples = await page.locator('.rating-star span').first().evaluate(el => {
        const animation = el.getAnimations().find(a => a.id === 'rating-confirmation');
        animation.pause();
        return [180, 360, 540, 810].map(time => {
            animation.currentTime = time;
            return getComputedStyle(el).color;
        });
    });
    expect(samples).toEqual(['rgb(255, 53, 85)', 'rgb(84, 232, 255)', 'rgb(255, 53, 85)', 'rgb(84, 232, 255)']);
    await page.locator('.rating-star span').first().evaluate(el => el.getAnimations().forEach(a => a.finish()));
    await expect(page.locator('.rating-star span').first()).toHaveCSS('color', 'rgb(84, 232, 255)');
    await page.locator('.rating-star input[value="3"]').click();
    expect(await page.locator('.rating-star span').first().evaluate(el => el.getAnimations().some(a => a.id === 'rating-confirmation' && a.playState === 'running'))).toBe(true);
});
