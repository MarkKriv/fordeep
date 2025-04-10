document.addEventListener('DOMContentLoaded', function() {
    // Подключаемся к WebSocket (в реальном приложении)
    connectWebSocket();
    
    // Загружаем уведомления
    loadNotifications();
    
    // Обработчики вкладок
    document.querySelectorAll('.notifications-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.notifications-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            this.classList.add('active');
            loadNotifications(this.getAttribute('data-type'));
        });
    });
    
    // Кнопка "Отметить все как прочитанные"
    document.getElementById('mark-all-read').addEventListener('click', markAllAsRead);
});

function connectWebSocket() {
    // В реальном приложении здесь было бы подключение к WebSocket серверу
    console.log('Подключение к серверу уведомлений...');
    
    // Имитация получения нового уведомления
    setInterval(() => {
        const randomTypes = ['system', 'message', 'ad'];
        const randomType = randomTypes[Math.floor(Math.random() * randomTypes.length)];
        
        receiveNewNotification({
            id: Date.now(),
            type: randomType,
            title: 'Новое уведомление',
            text: 'Это тестовое уведомление в реальном времени',
            time: 'Только что',
            isRead: false
        });
    }, 30000); // Каждые 30 секунд
}

function loadNotifications(filter = 'all') {
    // В реальном приложении здесь был бы запрос к серверу
    const notifications = [
        {
            id: 1,
            type: 'system',
            title: 'Обновление системы',
            text: 'Запланировано техническое обслуживание 15.05.2023 с 03:00 до 05:00',
            time: '2 часа назад',
            isRead: true
        },
        {
            id: 2,
            type: 'message',
            title: 'Новое сообщение',
            text: 'У вас новое сообщение от пользователя ООО МеталлТрейд',
            time: 'Вчера',
            isRead: false
        },
        {
            id: 3,
            type: 'ad',
            title: 'Статус объявления',
            text: 'Ваше объявление "Молибден листовой" прошло модерацию и опубликовано',
            time: '15.05.2023',
            isRead: true
        }
    ];
    
    // Фильтрация
    let filteredNotifications = notifications;
    
    if (filter === 'unread') {
        filteredNotifications = notifications.filter(n => !n.isRead);
    } else if (filter !== 'all') {
        filteredNotifications = notifications.filter(n => n.type === filter);
    }
    
    displayNotifications(filteredNotifications);
}

function displayNotifications(notifications) {
    const container = document.getElementById('notifications-list');
    container.innerHTML = '';
    
    if (notifications.length === 0) {
        container.innerHTML = '<div class="no-notifications">Нет уведомлений</div>';
        return;
    }
    
    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification ${notification.isRead ? '' : 'unread'}`;
        notificationElement.setAttribute('data-id', notification.id);
        
        let icon;
        switch(notification.type) {
            case 'system':
                icon = 'fas fa-cog';
                break;
            case 'message':
                icon = 'fas fa-envelope';
                break;
            case 'ad':
                icon = 'fas fa-tag';
                break;
            default:
                icon = 'fas fa-bell';
        }
        
        notificationElement.innerHTML = `
            <div class="notification-icon">
                <i class="${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-text">${notification.text}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
            <div class="notification-actions">
                ${!notification.isRead ? '<button class="mark-as-read" title="Отметить как прочитанное"><i class="fas fa-check"></i></button>' : ''}
                <button class="delete-notification" title="Удалить"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        container.appendChild(notificationElement);
    });
    
    // Обработчики для кнопок уведомлений
    setupNotificationEvents();
}

function setupNotificationEvents() {
    // Отметить как прочитанное
    document.querySelectorAll('.mark-as-read').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const notificationId = this.closest('.notification').getAttribute('data-id');
            markAsRead(notificationId);
        });
    });
    
    // Удалить уведомление
    document.querySelectorAll('.delete-notification').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const notificationId = this.closest('.notification').getAttribute('data-id');
            deleteNotification(notificationId);
        });
    });
    
    // Клик по уведомлению
    document.querySelectorAll('.notification').forEach(notification => {
        notification.addEventListener('click', function() {
            const notificationId = this.getAttribute('data-id');
            openNotification(notificationId);
        });
    });
}

function markAsRead(notificationId) {
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Отметить как прочитанное: ${notificationId}`);
    
    // Обновляем интерфейс
    const notificationElement = document.querySelector(`.notification[data-id="${notificationId}"]`);
    if (notificationElement) {
        notificationElement.classList.remove('unread');
        notificationElement.querySelector('.mark-as-read').remove();
    }
}

function markAllAsRead() {
    // В реальном приложении здесь был бы запрос к серверу
    console.log('Отметить все как прочитанные');
    
    // Обновляем интерфейс
    document.querySelectorAll('.notification.unread').forEach(notification => {
        notification.classList.remove('unread');
        const markBtn = notification.querySelector('.mark-as-read');
        if (markBtn) markBtn.remove();
    });
}

function deleteNotification(notificationId) {
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Удалить уведомление: ${notificationId}`);
    
    // Обновляем интерфейс
    const notificationElement = document.querySelector(`.notification[data-id="${notificationId}"]`);
    if (notificationElement) {
        notificationElement.remove();
    }
}

function openNotification(notificationId) {
    // В реальном приложении здесь была бы навигация по уведомлению
    console.log(`Открыть уведомление: ${notificationId}`);
    
    // Отмечаем как прочитанное при открытии
    markAsRead(notificationId);
}

function receiveNewNotification(notification) {
    // Добавляем новое уведомление в начало списка
    const container = document.getElementById('notifications-list');
    const firstChild = container.firstChild;
    
    const notificationElement = document.createElement('div');
    notificationElement.className = `notification unread pulse`;
    notificationElement.setAttribute('data-id', notification.id);
    
    let icon;
    switch(notification.type) {
        case 'system':
            icon = 'fas fa-cog';
            break;
        case 'message':
            icon = 'fas fa-envelope';
            break;
        case 'ad':
            icon = 'fas fa-tag';
            break;
        default:
            icon = 'fas fa-bell';
    }
    
    notificationElement.innerHTML = `
        <div class="notification-icon">
            <i class="${icon}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${notification.title}</div>
            <div class="notification-text">${notification.text}</div>
            <div class="notification-time">${notification.time}</div>
        </div>
        <div class="notification-actions">
            <button class="mark-as-read" title="Отметить как прочитанное"><i class="fas fa-check"></i></button>
            <button class="delete-notification" title="Удалить"><i class="fas fa-trash"></i></button>
        </div>
    `;
    
    if (firstChild) {
        container.insertBefore(notificationElement, firstChild);
    } else {
        container.appendChild(notificationElement);
    }
    
    // Добавляем обработчики
    setupNotificationEvents();
    
    // Показываем уведомление
    showNotification('info', notification.text);
    
    // Убираем пульсацию через 3 секунды
    setTimeout(() => {
        notificationElement.classList.remove('pulse');
    }, 3000);
}