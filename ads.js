// Функции для работы с объявлениями

// Загрузка объявлений
function loadAds() {
    // В реальном приложении здесь был бы запрос к серверу
    const ads = [
        {
            id: 1,
            title: 'Молибден листовой 0.5-50мм ГОСТ 13617-68',
            description: 'Молибден листовой 0.5-50мм, ГОСТ 13617-68. Поставки от 1кг. Возможен самовывоз или доставка. Качество подтверждено сертификатами.',
            price: 1850,
            currency: '₽/кг',
            location: 'Москва',
            date: '12.05.2023',
            category: 'rare',
            type: 'sheet',
            region: 'moscow',
            images: ['https://images.unsplash.com/photo-1581093057305-2551ae5a01c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
            isNew: false,
            isFavorite: false
        },
        {
            id: 2,
            title: 'Титан ВТ1-0 в прутках диаметром 10-150мм',
            description: 'Титан ВТ1-0 в прутках диаметром 10-150мм. Качество подтверждено сертификатами. Оптовые партии. Доставка по всей России.',
            price: 3200,
            currency: '₽/кг',
            location: 'Екатеринбург',
            date: '10.05.2023',
            category: 'color',
            type: 'bar',
            region: 'central',
            images: ['https://images.unsplash.com/photo-1581093057927-02a75e4d5b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
            isNew: true,
            isFavorite: true
        },
        {
            id: 3,
            title: 'Нихром Х20Н80 проволока 0.1-5.0мм',
            description: 'Нихром Х20Н80 проволока 0.1-5.0мм, лента 0.1-3.0мм. Наличие на складе. Доставка по всей России. Гарантия качества.',
            price: 1150,
            currency: '₽/кг',
            location: 'Новосибирск',
            date: '08.05.2023',
            category: 'color',
            type: 'wire',
            region: 'central',
            images: [],
            isNew: false,
            isFavorite: false
        },
        {
            id: 4,
            title: 'Фехраль Х23Ю5Т лента 0.5-3.0мм',
            description: 'Фехраль Х23Ю5Т лента 0.5-3.0мм, проволока 0.5-6.0мм. Производство Россия. Наличие на складе. Оптовые цены.',
            price: 950,
            currency: '₽/кг',
            location: 'Челябинск',
            date: '05.05.2023',
            category: 'color',
            type: 'sheet',
            region: 'central',
            images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
            isNew: false,
            isFavorite: false
        },
        {
            id: 5,
            title: 'Тантал листовой ТЧ толщиной 0.5-10мм',
            description: 'Тантал листовой ТЧ толщиной 0.5-10мм. Высокое качество. Сертификаты. Доставка по РФ. Самовывоз со склада в Москве.',
            price: 12500,
            currency: '₽/кг',
            location: 'Москва',
            date: '03.05.2023',
            category: 'rare',
            type: 'sheet',
            region: 'moscow',
            images: ['https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
            isNew: false,
            isFavorite: true
        },
        {
            id: 6,
            title: 'Молибденовый порошок МЧ 99.95%',
            description: 'Молибденовый порошок МЧ 99.95%. Фракция 1-10 мкм. Упаковка 1-5 кг. Доставка по РФ. Сертификаты качества.',
            price: 2300,
            currency: '₽/кг',
            location: 'Санкт-Петербург',
            date: '01.05.2023',
            category: 'rare',
            type: 'powder',
            region: 'spb',
            images: ['https://images.unsplash.com/photo-1581093057305-2551ae5a01c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
            isNew: true,
            isFavorite: false
        }
    ];
    
    // Применяем фильтры
    const filteredAds = applyFiltersToAds(ads);
    
    // Отображаем объявления
    displayAds(filteredAds, 'ads-container');
}

// Применение фильтров к объявлениям
function applyFiltersToAds(ads) {
    const metalType = document.getElementById('metal-type').value;
    const metalCategory = document.getElementById('metal-category').value;
    const metalRegion = document.getElementById('metal-region').value;
    
    return ads.filter(ad => {
        // Фильтр по типу металла
        if (metalType !== 'all' && ad.category !== metalType) {
            return false;
        }
        
        // Фильтр по категории продукции
        if (metalCategory !== 'all' && ad.type !== metalCategory) {
            return false;
        }
        
        // Фильтр по региону
        if (metalRegion !== 'all' && ad.region !== metalRegion) {
            return false;
        }
        
        return true;
    });
}

// Загрузка объявлений для покупки
function loadBuyAds() {
    // В реальном приложении здесь был бы запрос к серверу
    const ads = []; // Получаем объявления для покупки
    displayAds(ads, 'buy-ads-container');
}

// Загрузка объявлений пользователя
function loadUserAds(userId) {
    // В реальном приложении здесь был бы запрос к серверу
    const ads = []; // Получаем объявления пользователя
    displayAds(ads, 'account-ads-container');
}

// Загрузка объявлений на модерацию
function loadModerationAds() {
    // В реальном приложении здесь был бы запрос к серверу
    const ads = []; // Получаем объявления на модерацию
    displayAds(ads, 'moderation-ads-container');
}

// Отображение объявлений
function displayAds(ads, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    ads.forEach(ad => {
        const adElement = document.createElement('div');
        adElement.className = `ad-card fade-in ${ad.isNew ? 'new' : ''} ${ad.status === 'pending' ? 'pending' : ''}`;
        
        let imagesHTML = '';
        if (ad.images && ad.images.length > 0) {
            imagesHTML = `<img src="${ad.images[0]}" alt="${ad.title}">`;
        } else {
            imagesHTML = `
                <div class="no-image">
                    <i class="fas fa-cube"></i>
                    <p>Изображение отсутствует</p>
                </div>
            `;
        }
        
        adElement.innerHTML = `
            <div class="ad-image">
                ${imagesHTML}
            </div>
            <div class="ad-content">
                <h3 class="ad-title">${ad.title}</h3>
                <div class="ad-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${ad.location}</span>
                    <span><i class="far fa-calendar-alt"></i> ${ad.date}</span>
                </div>
                <div class="ad-price">${ad.price} ${ad.currency}</div>
                <p class="ad-description">${ad.description}</p>
                <div class="ad-actions">
                    <a href="#" class="ad-btn favorite ${ad.isFavorite ? 'active' : ''}" data-ad-id="${ad.id}"><i class="fas fa-heart"></i></a>
                    <a href="#" class="ad-btn secondary" data-ad-id="${ad.id}">Подробнее</a>
                    <a href="#" class="ad-btn primary" data-ad-id="${ad.id}">Купить</a>
                </div>
            </div>
        `;
        
        container.appendChild(adElement);
    });
    
    // Добавляем обработчики событий для кнопок объявлений
    setupAdButtons();
}

// Настройка обработчиков для кнопок объявлений
function setupAdButtons() {
    // Кнопка "В избранное"
    document.querySelectorAll('.ad-btn.favorite').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const adId = this.getAttribute('data-ad-id');
            toggleFavorite(adId, this);
        });
    });
    
    // Кнопка "Подробнее"
    document.querySelectorAll('.ad-btn.secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const adId = this.getAttribute('data-ad-id');
            showAdDetails(adId);
        });
    });
    
    // Кнопка "Купить"
    document.querySelectorAll('.ad-btn.primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const adId = this.getAttribute('data-ad-id');
            startChat(adId);
        });
    });
}

// Добавление/удаление из избранного
function toggleFavorite(adId, button) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        openModal('login-modal');
        return;
    }
    
    button.classList.toggle('active');
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Объявление ${adId} ${button.classList.contains('active') ? 'добавлено в' : 'удалено из'} избранное`);
    
    // Обновляем счетчик избранного
    if (button.classList.contains('active')) {
        user.stats.favorites++;
    } else {
        user.stats.favorites--;
    }
    
    localStorage.setItem('user', JSON.stringify(user));
    updateUserStats();
}

// Обновление статистики пользователя
function updateUserStats() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.stats) {
        document.getElementById('active-ads-count').textContent = user.stats.activeAds || 0;
        document.getElementById('completed-deals-count').textContent = user.stats.completedDeals || 0;
        document.getElementById('favorites-count').textContent = user.stats.favorites || 0;
    }
}

// Показать детали объявления
function showAdDetails(adId) {
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Просмотр деталей объявления ${adId}`);
    
    // Пример открытия страницы с деталями объявления
    alert(`Детали объявления #${adId}`);
}

// Начать чат по объявлению
function startChat(adId) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        openModal('login-modal');
        return;
    }
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Начало чата по объявлению ${adId}`);
    
    // Переходим в личный кабинет на вкладку сообщений
    showPage('account');
    document.querySelector('.account-menu a[data-tab="messages"]').click();
}

// Сохранение объявления
function saveAd() {
    const title = document.getElementById('ad-title').value;
    const category = document.getElementById('ad-category').value;
    const type = document.getElementById('ad-type').value;
    const description = document.getElementById('ad-description').value;
    const price = document.getElementById('ad-price').value;
    const region = document.getElementById('ad-region').value;
    
    // Простая валидация
    if (!title || !category || !type || !description || !price || !region) {
        showNotification('error', 'Заполните все обязательные поля');
        return;
    }
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Сохранение объявления: ${title}`);
    
    // Закрываем модальное окно
    closeModal('add-ad-modal');
    
    // Показываем уведомление
    showNotification('success', 'Объявление отправлено на модерацию');
    
    // Обновляем список объявлений
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        loadUserAds(user.id);
    }
}

// Применение фильтров
function applyFilters() {
    const metalType = document.getElementById('metal-type').value;
    const metalCategory = document.getElementById('metal-category').value;
    const metalRegion = document.getElementById('metal-region').value;
    
    // В реальном приложении здесь был бы запрос к серверу с параметрами фильтрации
    console.log(`Применены фильтры: тип=${metalType}, категория=${metalCategory}, регион=${metalRegion}`);
    
    loadAds(); // Перезагружаем объявления с учетом фильтров
}

// Сброс фильтров
function resetFilters() {
    document.getElementById('metal-type').value = 'all';
    document.getElementById('metal-category').value = 'all';
    document.getElementById('metal-region').value = 'all';
    
    loadAds(); // Перезагружаем объявления без фильтров
}

// Новая функция для загрузки объявлений с пагинацией
function loadAds(page = 1, pageSize = 10) {
    // В реальном приложении здесь был бы запрос к серверу с параметрами page и pageSize
    console.log(`Загрузка объявлений, страница ${page}, размер ${pageSize}`);
    
    // Пример данных
    const ads = [
        // массив объявлений
    ];
    
    // Отображаем объявления
    displayAds(ads, 'ads-container');
    
    // Отображаем пагинацию
    displayPagination(page, 5); // 5 - общее количество страниц
}

function displayPagination(currentPage, totalPages) {
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    
    let html = `
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}">
                ${i}
            </button>
        `;
    }
    
    html += `
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    paginationContainer.innerHTML = html;
    
    // Добавляем пагинацию после списка объявлений
    const adsContainer = document.getElementById('ads-container');
    adsContainer.parentNode.insertBefore(paginationContainer, adsContainer.nextSibling);
    
    // Обработчики для кнопок пагинации
    setupPaginationEvents();
}

function setupPaginationEvents() {
    document.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.disabled) {
                const page = this.textContent || 
                            (this.querySelector('.fa-chevron-left') ? 'prev' : 'next';
                
                // Определяем номер страницы
                let newPage;
                const currentPage = parseInt(document.querySelector('.pagination-btn.active').textContent);
                
                if (page === 'prev') {
                    newPage = currentPage - 1;
                } else if (page === 'next') {
                    newPage = currentPage + 1;
                } else {
                    newPage = parseInt(page);
                }
                
                // Перезагружаем объявления
                loadAds(newPage);
            }
        });
    });
}