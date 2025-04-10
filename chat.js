// Функции для работы с чатом и сообщениями

// Загрузка чатов пользователя
function loadChats(userId) {
    // В реальном приложении здесь был бы запрос к серверу
    const chats = [
        {
            id: 1,
            partnerName: 'ООО МеталлТрейд',
            lastMessage: 'Здравствуйте, интересует ваш молибден',
            lastMessageTime: '12:30',
            unread: true
        },
        {
            id: 2,
            partnerName: 'Иван Петров',
            lastMessage: 'Какие условия доставки?',
            lastMessageTime: '10:45',
            unread: false
        },
        {
            id: 3,
            partnerName: 'Алексей Сидоров',
            lastMessage: 'Спасибо за сделку!',
            lastMessageTime: 'Вчера',
            unread: false
        }
    ];
    
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
            <div class="chat-item-preview">${chat.lastMessage}</div>
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
            // Удаляем активный класс у всех чатов
            document.querySelectorAll('.chat-item').forEach(chat => {
                chat.classList.remove('active');
            });
            
            // Добавляем активный класс текущему чату
            this.classList.add('active');
            
            const chatId = this.getAttribute('data-chat-id');
            loadChatMessages(chatId);
        });
    });
    
    // Активируем первый чат в списке
    const firstChat = document.querySelector('.chat-item');
    if (firstChat) {
        firstChat.click();
    }
}

// Загрузка сообщений чата
function loadChatMessages(chatId) {
    // В реальном приложении здесь был бы запрос к серверу
    const messages = [
        {
            id: 1,
            text: 'Здравствуйте, интересует ваш молибден',
            time: '12:30',
            outgoing: false
        },
        {
            id: 2,
            text: 'Добрый день! Да, молибден в наличии. Какое количество вас интересует?',
            time: '12:35',
            outgoing: true
        },
        {
            id: 3,
            text: 'Нужно около 50 кг. Какая у вас цена?',
            time: '12:40',
            outgoing: false
        }
    ];
    
    // Устанавливаем имя партнера по чату
    const activeChat = document.querySelector('.chat-item.active');
    if (activeChat) {
        const partnerName = activeChat.querySelector('.chat-item-name').textContent;
        document.getElementById('chat-partner-name').textContent = partnerName;
    }
    
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

// Отправка сообщения
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        const chatId = document.querySelector('.chat-item.active')?.getAttribute('data-chat-id');
        
        if (!chatId) {
            showNotification('error', 'Выберите чат');
            return;
        }
        
        // В реальном приложении здесь был бы запрос к серверу
        console.log(`Отправка сообщения в чат ${chatId}: ${message}`);
        
        // Создаем временное сообщение
        const tempMessage = {
            id: Date.now(),
            text: message,
            time: 'Только что',
            outgoing: true
        };
        
        // Добавляем сообщение в чат
        const container = document.getElementById('chat-messages');
        const msgElement = document.createElement('div');
        msgElement.className = 'message outgoing';
        msgElement.innerHTML = `
            <div class="message-content">${tempMessage.text}</div>
            <div class="message-time">${tempMessage.time}</div>
        `;
        container.appendChild(msgElement);
        
        // Очищаем поле ввода
        input.value = '';
        
        // Прокручиваем вниз
        container.scrollTop = container.scrollHeight;
        
        // В реальном приложении здесь был бы ответ от сервера
        setTimeout(() => {
            const replyMessage = {
                id: Date.now() + 1,
                text: 'Спасибо за ваше сообщение. Мы ответим вам в ближайшее время.',
                time: 'Только что',
                outgoing: false
            };
            
            const replyElement = document.createElement('div');
            replyElement.className = 'message incoming';
            replyElement.innerHTML = `
                <div class="message-content">${replyMessage.text}</div>
                <div class="message-time">${replyMessage.time}</div>
            `;
            container.appendChild(replyElement);
            
            // Прокручиваем вниз
            container.scrollTop = container.scrollHeight;
        }, 1000);
    }
}

// Инициализация обработчиков чата
function initChat() {
    // Обработчик отправки сообщения по нажатию Enter
    document.getElementById('message-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Обработчик кнопки отправки
    document.getElementById('send-message-btn').addEventListener('click', sendMessage);
}

// Инициализируем чат при загрузке страницы
document.addEventListener('DOMContentLoaded', initChat);

// В initChat()
document.getElementById('report-spam-btn').addEventListener('click', openSpamReportModal);
document.getElementById('confirm-spam-report').addEventListener('click', submitSpamReport);

function openSpamReportModal() {
    const activeChat = document.querySelector('.chat-item.active');
    if (!activeChat) {
        showNotification('error', 'Выберите чат для жалобы');
        return;
    }
    
    openModal('report-spam-modal');
}

function submitSpamReport() {
    const reason = document.getElementById('spam-reason').value;
    const comments = document.getElementById('spam-comments').value;
    const activeChat = document.querySelector('.chat-item.active');
    const chatId = activeChat.getAttribute('data-chat-id');
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Жалоба на спам: чат=${chatId}, причина=${reason}`);
    
    // Закрываем модальное окно
    closeModal('report-spam-modal');
    
    // Показываем уведомление
    showNotification('success', 'Ваша жалоба отправлена. Спасибо!');
    
    // В реальном приложении можно скрыть чат или пометить как спам
    activeChat.style.opacity = '0.5';
    activeChat.querySelector('.chat-item-name').innerHTML += ' <i class="fas fa-flag text-danger"></i>';
}