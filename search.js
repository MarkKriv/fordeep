document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметры поиска из URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    
    // Устанавливаем значение в поле поиска
    document.getElementById('global-search').value = query;
    document.querySelector('.search-query strong').textContent = `"${query}"`;
    
    // Загружаем результаты поиска
    loadSearchResults(query);
    
    // Обработчик сортировки
    document.getElementById('search-sort').addEventListener('change', function() {
        loadSearchResults(query, this.value);
    });
    
    // Обработчик пагинации
    document.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.disabled) {
                const page = this.textContent;
                loadSearchResults(query, document.getElementById('search-sort').value, page);
            }
        });
    });
});

function loadSearchResults(query, sort = 'date-desc', page = 1) {
    // В реальном приложении здесь был бы запрос к серверу
    console.log(`Поиск: ${query}, сортировка: ${sort}, страница: ${page}`);
    
    // Пример данных
    const results = [
        // массив объявлений, как в ads.js
    ];
    
    // Применяем сортировку
    sortResults(results, sort);
    
    // Отображаем результаты
    displaySearchResults(results);
    
    // Обновляем активную страницу в пагинации
    updatePagination(page);
}

function sortResults(results, sort) {
    switch(sort) {
        case 'date-asc':
            results.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'price-desc':
            results.sort((a, b) => b.price - a.price);
            break;
        case 'price-asc':
            results.sort((a, b) => a.price - b.price);
            break;
        default: // date-desc
            results.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
}

function displaySearchResults(results) {
    const container = document.getElementById('search-results-container');
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">По вашему запросу ничего не найдено</div>';
        return;
    }
    
    // Используем функцию displayAds из ads.js
    displayAds(results, 'search-results-container');
}

function updatePagination(currentPage) {
    document.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.disabled = false;
        
        if (btn.textContent === currentPage.toString()) {
            btn.classList.add('active');
        }
    });
    
    // Делаем кнопки "назад"/"вперед" неактивными при необходимости
    if (currentPage === 1) {
        document.querySelector('.pagination-btn:first-child').disabled = true;
    }
}