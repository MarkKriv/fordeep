// Основной файл JavaScript для доски объявлений

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация приложения
    initApp();
    
    // Обработчики событий
    setupEventListeners();
});

// Инициализация приложения
function initApp() {
    // Проверяем, авторизован ли пользователь
    checkAuthState();
    
    // Загружаем объявления
    loadAds();
    
    // Загружаем новости
    loadNews();
    
    // Инициализируем текущую страницу
    showPage('home');
}

// Проверка состояния авторизации
function checkAuthState() {
    const user = JSON.parse(localStorage.getItem('user'));
    const accountBtn = document.getElementById('account-btn');
    const userStatus = document.getElementById('user-status');
    const adminLink = document.querySelector('.admin-link');
    
    if (user) {
        // Пользователь авторизован
        accountBtn.innerHTML = '<i class="fas fa-user"></i><span>' + user.firstName + '</span>';
        userStatus.textContent = user.firstName;
        
        // Обновляем аватар
        updateUserAvatar(user);
        
        // Проверяем, является ли пользователь администратором
        if (user.role === 'admin') {
            adminLink.style.display = 'flex';
        } else {
            adminLink.style.display = 'none';
        }
    } else {
        // Пользователь не авторизован
        accountBtn.innerHTML = '<i class="fas fa-user"></i><span>Войти</span>';
        userStatus.textContent = 'Войти';
        document.querySelector('.account-avatar').textContent = 'Г';
        document.getElementById('user-fullname').textContent = 'Гость';
        document.getElementById('user-company').textContent = '';
        adminLink.style.display = 'none';
    }
}

// Обновление аватара пользователя
function updateUserAvatar(user) {
    const avatar = document.querySelector('.account-avatar');
    const fullName = document.getElementById('user-fullname');
    const company = document.getElementById('user-company');
    
    if (user.avatar) {
        avatar.style.backgroundImage = 'url(' + user.avatar + ')';
        avatar.textContent = '';
    } else {
        avatar.style.backgroundImage = '';
        avatar.textContent = user.firstName.charAt(0) + (user.lastName ? user.lastName.charAt(0) : '');
    }
    
    fullName.textContent = user.firstName + (user.lastName ? ' ' + user.lastName : '');
    company.textContent = user.company ? 'Компания: ' + user.company : '';
}

// Установка обработчиков событий
function setupEventListeners() {
    // Навигация
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Быстрые действия
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Кнопка личного кабинета
    document.getElementById('account-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            showPage('account');
            loadUserProfile(user);
        } else {
            openModal('login-modal');
        }
    });
    
    // Кнопка добавления объявления
    document.getElementById('add-ad-btn').addEventListener('click', function() {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            openModal('add-ad-modal');
        } else {
            openModal('login-modal');
        }
    });
    
    // Фильтры объявлений
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    
    // Модальные окна
    setupModalEvents();
    
    // Формы
    setupFormEvents();
    
    // Вкладки личного кабинета
    setupAccountTabs();
    
    // Вкладки админ-панели
    setupAdminTabs();
}

// Показать страницу
function showPage(pageId) {
    // Скрываем все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Показываем нужную страницу
    document.getElementById(pageId).style.display = 'block';
    
    // Обновляем активную ссылку в навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Загружаем данные для страницы
    switch(pageId) {
        case 'home':
            loadAds();
            break;
        case 'buy':
            loadBuyAds();
            break;
        case 'account':
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                loadUserProfile(user);
            } else {
                openModal('login-modal');
                showPage('home');
            }
            break;
        case 'admin':
            const adminUser = JSON.parse(localStorage.getItem('user'));
            if (adminUser && adminUser.role === 'admin') {
                loadAdminDashboard();
            } else {
                showPage('home');
            }
            break;
        case 'news':
            loadNews();
            break;
    }
}

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
        // Другие объявления...
    ];
    
    displayAds(ads, 'ads-container');
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
}

// Показать детали объявления
function showAdDetails(adId) {
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Просмотр деталей объявления ${adId}`);
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

// Загрузка профиля пользователя
function loadUserProfile(user) {
    // В реальном приложении здесь был бы запрос к серверу
    document.getElementById('first-name').value = user.firstName || '';
    document.getElementById('last-name').value = user.lastName || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('company').value = user.company || '';
    
    // Загружаем статистику
    document.getElementById('active-ads-count').textContent = user.stats?.activeAds || 0;
    document.getElementById('completed-deals-count').textContent = user.stats?.completedDeals || 0;
    document.getElementById('favorites-count').textContent = user.stats?.favorites || 0;
    
    // Загружаем объявления пользователя
    loadUserAds(user.id);
    
    // Загружаем избранное
    loadFavorites(user.id);
    
    // Загружаем сообщения
    loadChats(user.id);
    
    // Загружаем уведомления
    loadNotifications(user.id);
}

// Загрузка объявлений пользователя
function loadUserAds(userId) {
    // В реальном приложении здесь был бы запрос к серверу
    const ads = []; // Получаем объявления пользователя
    displayAds(ads, 'account-ads-container');
}

// Загрузка избранного
function loadFavorites(userId) {
    // В реальном приложении здесь был бы запрос к серверу
    const ads = []; // Получаем избранные объявления
    displayAds(ads, 'favorites-container');
}

// Загрузка чатов
function loadChats(userId) {
    // В реальном приложении здесь был бы запрос к серверу
    const chats = []; // Получаем чаты пользователя
    displayChats(chats);
}

// Отображение чатов
function displayChats(chats) {
    const container = document.getElementById('chat-list');
    container.innerHTML = '';
    
    chats.forEach(chat => {
        const chatElement = document.createElement('div');
        chatElement.className = `chat-item ${chat.unread ? 'unread' : ''}`;
        chatElement.setAttribute('data-chat-id', chat.id);
        
        chatElement.innerHTML = `
            <div class="chat-item-header">
                <div class="chat-item-name">${chat.partnerName}</div>
                <div class="chat-item-time">${chat.lastMessageTime}</div>
            </div>
            <div class="chat-item-preview">${chat.lastMessagePreview}</div>
        `;
        
        container.appendChild(chatElement);
    });
    
    // Добавляем обработчики для чатов
    setupChatEvents();
}

// Настройка обработчиков для чатов
function setupChatEvents() {
    document.querySelectorAll('.chat-item').forEach(item => {
        item.addEventListener('click', function() {
            const chatId = this.getAttribute('data-chat-id');
            loadChatMessages(chatId);
        });
    });
}

// Загрузка сообщений чата
function loadChatMessages(chatId) {
    // В реальном приложении здесь был бы запрос к серверу
    const messages = []; // Получаем сообщения чата
    displayChatMessages(messages);
}

// Отображение сообщений чата
function displayChatMessages(messages) {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';
    
    messages.forEach(msg => {
        const msgElement = document.createElement('div');
        msgElement.className = `message ${msg.outgoing ? 'outgoing' : 'incoming'}`;
        
        msgElement.innerHTML = `
            <div class="message-content">${msg.text}</div>
            <div class="message-time">${msg.time}</div>
        `;
        
        container.appendChild(msgElement);
    });
    
    // Прокручиваем вниз
    container.scrollTop = container.scrollHeight;
}

// Загрузка уведомлений
function loadNotifications(userId) {
    // В реальном приложении здесь был бы запрос к серверу
    const notifications = []; // Получаем уведомления пользователя
    displayNotifications(notifications);
}

// Отображение уведомлений
function displayNotifications(notifications) {
    const container = document.getElementById('notifications-list');
    container.innerHTML = '';
    
    notifications.forEach(notification => {
        const notifElement = document.createElement('div');
        notifElement.className = `notification ${notification.unread ? 'unread' : ''}`;
        
        notifElement.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
            <div class="notification-text">${notification.text}</div>
        `;
        
        container.appendChild(notifElement);
    });
}

// Загрузка новостей
function loadNews() {
    // В реальном приложении здесь был бы запрос к серверу
    const news = [
        {
            id: 1,
            title: 'Новые правила торговли металлопрокатом',
            date: '15.05.2023',
            text: 'С 1 июня вступают в силу новые правила торговли металлопрокатом на территории РФ...',
            image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        // Другие новости...
    ];
    
    displayNews(news, 'news-container');
}

// Отображение новостей
function displayNews(news, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    news.forEach(item => {
        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';
        
        newsElement.innerHTML = `
            <div class="news-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="news-content">
                <h3 class="news-title">${item.title}</h3>
                <span class="news-date">${item.date}</span>
                <p class="news-text">${item.text}</p>
                <a href="#" class="news-read-more">Читать далее...</a>
            </div>
        `;
        
        container.appendChild(newsElement);
    });
}

// Загрузка админ-панели
function loadAdminDashboard() {
    // В реальном приложении здесь был бы запрос к серверу
    document.getElementById('total-users').textContent = '125';
    document.getElementById('total-ads').textContent = '543';
    document.getElementById('active-ads').textContent = '489';
    document.getElementById('pending-ads').textContent = '54';
    
    // Загружаем активность
    loadAdminActivity();
    
    // Загружаем объявления на модерацию
    loadModerationAds();
    
    // Загружаем пользователей
    loadAdminUsers();
    
    // Загружаем новости для администрирования
    loadAdminNews();
}

// Загрузка активности для админ-панели
function loadAdminActivity() {
    // В реальном приложении здесь был бы запрос к серверу
    const activity = []; // Получаем активность
    displayAdminActivity(activity);
}

// Отображение активности
function displayAdminActivity(activity) {
    const container = document.getElementById('admin-activity');
    container.innerHTML = '';
    
    activity.forEach(item => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        
        activityElement.innerHTML = `
            <div class="activity-text">${item.text}</div>
            <div class="activity-time">${item.time}</div>
        `;
        
        container.appendChild(activityElement);
    });
}

// Загрузка объявлений на модерацию
function loadModerationAds() {
    // В реальном приложении здесь был бы запрос к серверу
    const ads = []; // Получаем объявления на модерацию
    displayAds(ads, 'moderation-ads-container');
}

// Загрузка пользователей для администрирования
function loadAdminUsers() {
    // В реальном приложении здесь был бы запрос к серверу
    const users = []; // Получаем пользователей
    displayAdminUsers(users);
}

// Отображение пользователей для администрирования
function displayAdminUsers(users) {
    const container = document.getElementById('admin-users-list');
    container.innerHTML = '';
    
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'admin-user';
        
        userElement.innerHTML = `
            <div class="admin-user-avatar">${user.firstName.charAt(0)}${user.lastName.charAt(0)}</div>
            <div class="admin-user-info">
                <div class="admin-user-name">${user.firstName} ${user.lastName}</div>
                <div class="admin-user-email">${user.email}</div>
            </div>
            <div class="admin-user-role ${user.role === 'admin' ? 'admin' : ''}">${user.role === 'admin' ? 'Админ' : 'Пользователь'}</div>
            <div class="admin-user-actions">
                <button class="btn small"><i class="fas fa-edit"></i></button>
                <button class="btn small danger"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        container.appendChild(userElement);
    });
}

// Загрузка новостей для администрирования
function loadAdminNews() {
    // В реальном приложении здесь был бы запрос к серверу
    const news = []; // Получаем новости
    displayAdminNews(news);
}

// Отображение новостей для администрирования
function displayAdminNews(news) {
    const container = document.getElementById('admin-news-list');
    container.innerHTML = '';
    
    news.forEach(item => {
        const newsElement = document.createElement('div');
        newsElement.className = 'news-item';
        
        newsElement.innerHTML = `
            <div class="news-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="news-content">
                <h3 class="news-title">${item.title}</h3>
                <span class="news-date">${item.date}</span>
                <div class="news-actions">
                    <button class="btn small"><i class="fas fa-edit"></i> Редактировать</button>
                    <button class="btn small danger"><i class="fas fa-trash"></i> Удалить</button>
                </div>
            </div>
        `;
        
        container.appendChild(newsElement);
    });
}

// Настройка вкладок личного кабинета
function setupAccountTabs() {
    document.querySelectorAll('.account-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс у всех ссылок
            document.querySelectorAll('.account-menu a').forEach(item => {
                item.classList.remove('active');
            });
            
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
            
            // Скрываем все вкладки
            document.querySelectorAll('.account-tab').forEach(tab => {
                tab.style.display = 'none';
            });
            
            // Показываем нужную вкладку
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + '-tab').style.display = 'block';
        });
    });
}

// Настройка вкладок админ-панели
function setupAdminTabs() {
    document.querySelectorAll('.admin-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс у всех ссылок
            document.querySelectorAll('.admin-menu a').forEach(item => {
                item.classList.remove('active');
            });
            
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
            
            // Скрываем все вкладки
            document.querySelectorAll('.admin-tab').forEach(tab => {
                tab.style.display = 'none';
            });
            
            // Показываем нужную вкладку
            const tabId = this.getAttribute('data-admin-tab');
            document.getElementById(tabId + '-tab').style.display = 'block';
        });
    });
}

// Настройка модальных окон
function setupModalEvents() {
    // Кнопки открытия модальных окон
    document.getElementById('register-link').addEventListener('click', function(e) {
        e.preventDefault();
        closeModal('login-modal');
        openModal('register-modal');
    });
    
    document.getElementById('login-link').addEventListener('click', function(e) {
        e.preventDefault();
        closeModal('register-modal');
        openModal('login-modal');
    });
    
    document.getElementById('add-news-btn').addEventListener('click', function() {
        openModal('add-news-modal');
    });
    
    // Кнопки закрытия модальных окон
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Закрытие по клику вне модального окна
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
}

// Открытие модального окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Закрытие модального окна
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Настройка обработчиков форм
function setupFormEvents() {
    // Форма входа
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        loginUser();
    });
    
    // Форма регистрации
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        registerUser();
    });
    
    // Форма профиля
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfile();
    });
    
    // Форма объявления
    document.getElementById('ad-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveAd();
    });
    
    // Форма новости
    document.getElementById('news-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveNews();
    });
    
    // Форма контактов
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        sendContactMessage();
    });
    
    // Форма настроек
    document.getElementById('settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveSettings();
    });
    
    // Форма настроек сайта
    document.getElementById('admin-settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveAdminSettings();
    });
    
    // Кнопка выхода
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        logoutUser();
    });
    
    // Превью фотографий для объявлений
    document.getElementById('ad-photos').addEventListener('change', function() {
        previewPhotos(this, 'photo-preview');
    });
    
    // Превью изображения для новости
    document.getElementById('news-image').addEventListener('change', function() {
        previewPhoto(this, 'news-image-preview');
    });
    
    // Отправка сообщения в чате
    document.getElementById('send-message-btn').addEventListener('click', sendMessage);
}

// Превью фотографий
function previewPhotos(input, previewId) {
    const preview = document.getElementById(previewId);
    preview.innerHTML = '';
    
    if (input.files && input.files.length > 0) {
        for (let i = 0; i < Math.min(input.files.length, 5); i++) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'photo-preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <div class="remove-photo">&times;</div>
                `;
                
                preview.appendChild(previewItem);
                
                // Обработчик удаления фотографии
                previewItem.querySelector('.remove-photo').addEventListener('click', function() {
                    previewItem.remove();
                });
            };
            
            reader.readAsDataURL(input.files[i]);
        }
    }
}

// Превью одной фотографии
function previewPhoto(input, previewId) {
    const preview = document.getElementById(previewId);
    preview.innerHTML = '';
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'photo-preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <div class="remove-photo">&times;</div>
            `;
            
            preview.appendChild(previewItem);
            
            // Обработчик удаления фотографии
            previewItem.querySelector('.remove-photo').addEventListener('click', function() {
                previewItem.remove();
                input.value = '';
            });
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Вход пользователя
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Вход пользователя: ${email}`);
    
    // Пример ответа от сервера
    const user = {
        id: 1,
        firstName: 'Иван',
        lastName: 'Иванов',
        email: email,
        phone: '+7 (999) 123-45-67',
        company: 'ООО "МеталлТрейд"',
        role: 'user', // или 'admin' для администратора
        stats: {
            activeAds: 12,
            completedDeals: 24,
            favorites: 8
        }
    };
    
    // Сохраняем пользователя в localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    // Обновляем интерфейс
    checkAuthState();
    
    // Закрываем модальное окно
    closeModal('login-modal');
    
    // Показываем уведомление
    showNotification('success', 'Вы успешно вошли в систему');
}

// Регистрация пользователя
function registerUser() {
    const firstName = document.getElementById('register-first-name').value;
    const lastName = document.getElementById('register-last-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Проверка паролей
    if (password !== confirmPassword) {
        showNotification('error', 'Пароли не совпадают');
        return;
    }
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Регистрация пользователя: ${firstName} ${lastName}, ${email}`);
    
    // Пример ответа от сервера
    const user = {
        id: 2,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        role: 'user',
        stats: {
            activeAds: 0,
            completedDeals: 0,
            favorites: 0
        }
    };
    
    // Сохраняем пользователя в localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    // Обновляем интерфейс
    checkAuthState();
    
    // Закрываем модальное окно
    closeModal('register-modal');
    
    // Показываем уведомление
    showNotification('success', 'Регистрация прошла успешно');
}

// Сохранение профиля
function saveProfile() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Сохранение профиля: ${firstName} ${lastName}`);
    
    // Обновляем данные пользователя
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        user.company = company;
        
        localStorage.setItem('user', JSON.stringify(user));
        checkAuthState();
    }
    
    // Показываем уведомление
    showNotification('success', 'Изменения сохранены');
}

// Сохранение объявления
function saveAd() {
    const title = document.getElementById('ad-title').value;
    const category = document.getElementById('ad-category').value;
    const type = document.getElementById('ad-type').value;
    const description = document.getElementById('ad-description').value;
    const price = document.getElementById('ad-price').value;
    const region = document.getElementById('ad-region').value;
    
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

// Сохранение новости
function saveNews() {
    const title = document.getElementById('news-title').value;
    const short = document.getElementById('news-short').value;
    const text = document.getElementById('news-text').value;
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Сохранение новости: ${title}`);
    
    // Закрываем модальное окно
    closeModal('add-news-modal');
    
    // Показываем уведомление
    showNotification('success', 'Новость опубликована');
    
    // Обновляем список новостей
    loadNews();
    loadAdminNews();
}

// Отправка сообщения из формы контактов
function sendContactMessage() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Отправка сообщения: ${name}, ${email}`);
    
    // Очищаем форму
    document.getElementById('contact-form').reset();
    
    // Показываем уведомление
    showNotification('success', 'Сообщение отправлено');
}

// Сохранение настроек
function saveSettings() {
    const emailNotifications = document.getElementById('email-notifications').value;
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Проверка паролей
    if (newPassword && newPassword !== confirmPassword) {
        showNotification('error', 'Пароли не совпадают');
        return;
    }
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Сохранение настроек: уведомления=${emailNotifications}`);
    
    // Очищаем поля паролей
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    
    // Показываем уведомление
    showNotification('success', 'Настройки сохранены');
}

// Сохранение настроек сайта
function saveAdminSettings() {
    const siteName = document.getElementById('site-name').value;
    const adminEmail = document.getElementById('admin-email').value;
    const moderationType = document.getElementById('moderation-type').value;
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Сохранение настроек сайта: название=${siteName}`);
    
    // Показываем уведомление
    showNotification('success', 'Настройки сайта сохранены');
}

// Отправка сообщения в чате
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        // В реальном приложении здесь был бы запрос к серверу
        console.log(`Отправка сообщения: ${message}`);
        
        // Очищаем поле ввода
        input.value = '';
        
        // Обновляем чат
        const chatId = document.querySelector('.chat-item.active')?.getAttribute('data-chat-id');
        if (chatId) {
            loadChatMessages(chatId);
        }
    }
}

// Выход пользователя
function logoutUser() {
    // Удаляем пользователя из localStorage
    localStorage.removeItem('user');
    
    // Обновляем интерфейс
    checkAuthState();
    
    // Переходим на главную страницу
    showPage('home');
    
    // Показываем уведомление
    showNotification('success', 'Вы вышли из системы');
}

// Показать уведомление
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification-${type}`;
    notification.textContent = message;
    
    // В реальном приложении здесь была бы более сложная система уведомлений
    console.log(`Уведомление: [${type}] ${message}`);
    
    // Пример простого уведомления
    alert(message);
}

// В setupFormEvents()
document.getElementById('submit-report').addEventListener('click', submitReport);

function submitReport() {
    const type = document.getElementById('report-type').value;
    const page = document.getElementById('report-page').value;
    const description = document.getElementById('report-description').value;
    
    if (!description) {
        showNotification('error', 'Пожалуйста, опишите проблему');
        return;
    }
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Отправка отчета: тип=${type}, страница=${page}`);
    
    // Очищаем форму
    document.getElementById('report-page').value = '';
    document.getElementById('report-description').value = '';
    document.getElementById('screenshot-preview').innerHTML = '';
    
    // Показываем уведомление
    showNotification('success', 'Ваш отчет отправлен. Спасибо за помощь!');
}