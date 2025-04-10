// Функции для работы с аутентификацией

// Проверка состояния аутентификации
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

// Вход пользователя
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Простая валидация
    if (!email || !password) {
        showNotification('error', 'Заполните все поля');
        return;
    }
    
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
    
    // Простая валидация
    if (!firstName || !email || !phone || !password || !confirmPassword) {
        showNotification('error', 'Заполните все обязательные поля');
        return;
    }
    
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