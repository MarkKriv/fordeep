document.addEventListener('DOMContentLoaded', function() {
    // Загружаем рейтинги
    loadRatings();
    
    // Обработчики фильтров
    document.getElementById('rating-category').addEventListener('change', loadRatings);
    document.getElementById('rating-region').addEventListener('change', loadRatings);
    document.getElementById('rating-sort').addEventListener('change', loadRatings);
    
    // Обработчик пагинации
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
                
                // Перезагружаем рейтинги
                loadRatings(newPage);
            }
        });
    });
});

function loadRatings(page = 1) {
    const category = document.getElementById('rating-category').value;
    const region = document.getElementById('rating-region').value;
    const sort = document.getElementById('rating-sort').value;
    
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Загрузка рейтингов: категория=${category}, регион=${region}, сортировка=${sort}, страница=${page}`);
    
    // Пример данных
    const users = [
        {
            id: 1,
            name: 'ООО МеталлТрейд',
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
            rating: 4.9,
            reviews: 42,
            region: 'moscow',
            type: 'company',
            deals: 128
        },
        {
            id: 2,
            name: 'Иван Иванов',
            avatar: null,
            rating: 4.7,
            reviews: 24,
            region: 'spb',
            type: 'seller',
            deals: 56
        },
        {
            id: 3,
            name: 'Алексей Петров',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            rating: 4.5,
            reviews: 18,
            region: 'central',
            type: 'buyer',
            deals: 32
        },
        {
            id: 4,
            name: 'ПАО Металлург',
            avatar: null,
            rating: 4.3,
            reviews: 15,
            region: 'northwest',
            type: 'company',
            deals: 89
        },
        {
            id: 5,
            name: 'Мария Сидорова',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
            rating: 4.2,
            reviews: 12,
            region: 'moscow',
            type: 'seller',
            deals: 45
        }
    ];
    
    // Фильтрация
    let filteredUsers = users.filter(user => {
        if (category !== 'all') {
            if (category === 'buyers' && user.type !== 'buyer') return false;
            if (category === 'sellers' && user.type !== 'seller') return false;
            if (category === 'companies' && user.type !== 'company') return false;
        }
        
        if (region !== 'all' && user.region !== region) return false;
        
        return true;
    });
    
    // Сортировка
    sortUsers(filteredUsers, sort);
    
    // Отображение
    displayRatings(filteredUsers);
}

function sortUsers(users, sort) {
    switch(sort) {
        case 'rating-asc':
            users.sort((a, b) => a.rating - b.rating);
            break;
        case 'reviews-desc':
            users.sort((a, b) => b.reviews - a.reviews);
            break;
        default: // rating-desc
            users.sort((a, b) => b.rating - a.rating);
    }
}

function displayRatings(users) {
    const container = document.getElementById('ratings-list');
    container.innerHTML = '';
    
    if (users.length === 0) {
        container.innerHTML = '<div class="no-results">Пользователи не найдены</div>';
        return;
    }
    
    users.forEach((user, index) => {
        const userElement = document.createElement('div');
        userElement.className = 'rating-item';
        
        let regionText;
        switch(user.region) {
            case 'moscow': regionText = 'Москва'; break;
            case 'spb': regionText = 'Санкт-Петербург'; break;
            case 'central': regionText = 'Центральный ФО'; break;
            case 'northwest': regionText = 'Северо-Западный ФО'; break;
            default: regionText = '';
        }
        
        let typeText;
        switch(user.type) {
            case 'buyer': typeText = 'Покупатель'; break;
            case 'seller': typeText = 'Продавец'; break;
            case 'company': typeText = 'Компания'; break;
            default: typeText = '';
        }
        
        userElement.innerHTML = `
            <div class="rating-position">${index + 1}</div>
            <div class="rating-user">
                <div class="user-avatar">
                    ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}">` : user.name.charAt(0)}
                </div>
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="user-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${regionText}</span>
                        <span><i class="fas fa-tag"></i> ${typeText}</span>
                        <span><i class="fas fa-handshake"></i> ${user.deals} сделок</span>
                    </div>
                </div>
            </div>
            <div class="rating-value">
                <div class="rating-stars">
                    ${renderStars(user.rating)}
                </div>
                <div class="rating-number">${user.rating.toFixed(1)}</div>
                <div class="rating-reviews">${user.reviews} отзывов</div>
            </div>
            <div class="rating-actions">
                <button class="btn small">Профиль</button>
                <button class="btn small">Оставить отзыв</button>
            </div>
        `;
        
        container.appendChild(userElement);
    });
}

function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}