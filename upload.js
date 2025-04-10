document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const selectFilesBtn = document.getElementById('select-files-btn');
    const uploadProgress = document.getElementById('upload-progress');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const fileList = document.getElementById('file-list');
    const uploadedList = document.getElementById('uploaded-list');
    
    let filesToUpload = [];
    
    // Обработчик клика по кнопке выбора файлов
    selectFilesBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    // Обработчик выбора файлов
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });
    
    // Обработчики для drag and drop
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
        }
    });
    
    // Функция обработки выбранных файлов
    function handleFiles(files) {
        filesToUpload = [];
        
        // Проверяем каждый файл
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Проверяем тип файла
            if (!file.type.match('image.*')) {
                showNotification('error', `Файл ${file.name} не является изображением`);
                continue;
            }
            
            // Проверяем размер файла
            if (file.size > 5 * 1024 * 1024) {
                showNotification('error', `Файл ${file.name} слишком большой (макс. 5MB)`);
                continue;
            }
            
            filesToUpload.push(file);
        }
        
        if (filesToUpload.length > 0) {
            showSelectedFiles();
        }
    }
    
    // Показать выбранные файлы перед загрузкой
    function showSelectedFiles() {
        fileList.innerHTML = '';
        
        filesToUpload.forEach((file, index) => {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.innerHTML = `
                    <div class="file-preview">
                        <img src="${e.target.result}" alt="${file.name}">
                    </div>
                    <div class="file-info">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${formatFileSize(file.size)}</div>
                    </div>
                    <button class="file-remove" data-index="${index}">&times;</button>
                `;
                
                fileList.appendChild(fileItem);
            };
            
            reader.readAsDataURL(file);
        });
        
        // Кнопка начала загрузки
        const uploadBtn = document.createElement('button');
        uploadBtn.className = 'btn upload-btn';
        uploadBtn.textContent = 'Начать загрузку';
        uploadBtn.addEventListener('click', startUpload);
        
        fileList.appendChild(uploadBtn);
        
        // Кнопки удаления файлов
        document.querySelectorAll('.file-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                filesToUpload.splice(index, 1);
                showSelectedFiles();
            });
        });
        
        uploadProgress.style.display = 'block';
    }
    
    // Начать загрузку файлов
    function startUpload() {
        const totalFiles = filesToUpload.length;
        let uploadedCount = 0;
        
        filesToUpload.forEach((file, index) => {
            const formData = new FormData();
            formData.append('image', file);
            
            // В реальном приложении здесь был бы AJAX-запрос к серверу
            // Для демонстрации используем setTimeout
            setTimeout(() => {
                uploadedCount++;
                const progress = Math.round((uploadedCount / totalFiles) * 100);
                
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `${progress}%`;
                
                // Добавляем загруженный файл в список
                if (uploadedCount === totalFiles) {
                    showUploadedFiles();
                    showNotification('success', 'Все файлы успешно загружены');
                }
            }, index * 1000);
        });
    }
    
    // Показать загруженные файлы
    function showUploadedFiles() {
        filesToUpload.forEach(file => {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const uploadedItem = document.createElement('div');
                uploadedItem.className = 'uploaded-item';
                uploadedItem.innerHTML = `
                    <div class="uploaded-preview">
                        <img src="${e.target.result}" alt="${file.name}">
                    </div>
                    <div class="uploaded-info">
                        <div class="uploaded-name">${file.name}</div>
                        <div class="uploaded-size">${formatFileSize(file.size)}</div>
                        <div class="uploaded-actions">
                            <button class="btn small"><i class="fas fa-link"></i> Копировать ссылку</button>
                            <button class="btn small danger"><i class="fas fa-trash"></i> Удалить</button>
                        </div>
                    </div>
                `;
                
                uploadedList.appendChild(uploadedItem);
            };
            
            reader.readAsDataURL(file);
        });
        
        // Очищаем список загружаемых файлов
        filesToUpload = [];
        fileList.innerHTML = '';
        uploadProgress.style.display = 'none';
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
    }
    
    // Форматирование размера файла
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
});