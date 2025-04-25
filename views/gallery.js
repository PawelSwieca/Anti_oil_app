// Moduł renderujący galerię zdjęć

export function renderGallery(container, disasters) {
    container.innerHTML = `
        <section class="section">
            <div class="container">
                <h2 class="section-title">Galeria katastrof naftowych</h2>
                <p class="lead mb-5">Wydobycie i transport ropy naftowej prowadzą do licznych katastrof ekologicznych. Poniżej prezentujemy zdjęcia dokumentujące niszczycielskie skutki wycieków ropy i awarii platform wiertniczych.</p>
                
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="text" class="form-control" id="gallery-search" placeholder="Szukaj katastrof...">
                            <button class="btn btn-outline-secondary" type="button" id="search-button">
                                <i class="fa-solid fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex justify-content-md-end mt-3 mt-md-0">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-outline-primary" id="sort-date">
                                    <i class="fa-solid fa-calendar me-1"></i> Data
                                </button>
                                <button type="button" class="btn btn-outline-primary" id="sort-impact">
                                    <i class="fa-solid fa-triangle-exclamation me-1"></i> Skala
                                </button>
                                <button type="button" class="btn btn-outline-primary" id="sort-name">
                                    <i class="fa-solid fa-font me-1"></i> Nazwa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="gallery-container" id="gallery-container">
                    <!-- Dynamicznie generowana zawartość galerii -->
                </div>
                
                <div class="lightbox" id="lightbox">
                    <button class="lightbox-close" id="lightbox-close">&times;</button>
                    <button class="lightbox-prev" id="lightbox-prev">&lt;</button>
                <div class="lightbox-content" style="display: flex; justify-content: center; align-items: center; height: 100%;">
                    <img src="" alt="" class="lightbox-image" id="lightbox-image" style="max-height: 90%; max-width: 90%; object-fit: contain;">
                <div class="lightbox-caption" id="lightbox-caption"></div>
                </div>
                    <button class="lightbox-next" id="lightbox-next">&gt;</button>
                </div>
                
                <div class="mt-5">
                    <h3 class="mb-4">Wpływ wycieków na środowisko morskie</h3>
                    <div class="row">
                        <div class="col-lg-6">
                            <p>Wycieki ropy do oceanów mają niszczycielski wpływ na ekosystemy morskie:</p>
                            <ul>
                                <li><strong>Ptaki morskie</strong> - ropa przylepia się do piór, uniemożliwiając latanie i termoregulację</li>
                                <li><strong>Ssaki morskie</strong> - ropa niszczy ich naturalną izolację, prowadząc do hipotermii</li>
                                <li><strong>Ryby i skorupiaki</strong> - toksyczne związki zaburzają rozwój i prowadzą do deformacji</li>
                                <li><strong>Rafy koralowe</strong> - ropa blokuje dostęp światła i zatruwa organizmy koralowe</li>
                                <li><strong>Rośliny przybrzeżne</strong> - ropa niszczy siedliska takie jak namorzyny, które są kluczowe dla wielu gatunków</li>
                            </ul>
                            <p>Proces oczyszczania po wyciekach może trwać latami, a pełna regeneracja ekosystemów wymaga dekad, jeśli w ogóle jest możliwa.</p>
                        </div>
                        <div class="col-lg-6">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Długoterminowe skutki wycieków</h5>
                                    <p class="card-text">Nawet po usunięciu widocznej ropy, związki chemiczne pozostają w środowisku przez lata, wpływając na łańcuchy pokarmowe i bioróżnorodność obszarów morskich.</p>
                                    <a href="#" class="btn btn-primary" id="learn-more-btn">Dowiedz się więcej</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Renderowanie elementów galerii
    renderGalleryItems(disasters);

    // Inicjalizacja funkcji wyszukiwania
    initializeSearch(disasters);

    // Inicjalizacja funkcji sortowania
    initializeSorting(disasters);

    // Inicjalizacja lightboxa
    initializeLightbox(disasters);

    // Inicjalizacja dodatkowych przycisków
    document.getElementById('learn-more-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showInfoModal("Długotrwałe skutki katastrof naftowych",
            `<p>Katastrofy naftowe mają długotrwały wpływ na ekosystemy, który może utrzymywać się przez dekady:</p>
            <ul>
                <li>Toksyczne związki pozostają w osadach dennych przez 30+ lat</li>
                <li>Spadek liczebności populacji kluczowych gatunków o 30-70%</li>
                <li>Zmniejszenie bioróżnorodności na obszarach przybrzeżnych o 40-60%</li>
                <li>Zanieczyszczenie łańcucha pokarmowego, wpływające na zdrowie ludzi</li>
                <li>Destabilizacja całych ekosystemów morskich</li>
            </ul>
            <p>Badania naukowe wykazują, że niektóre obszary po wielkich wyciekach, jak Exxon Valdez czy Deepwater Horizon, wciąż nie powróciły do stanu sprzed katastrofy.</p>`);
    });

    // Zapisanie danych w localStorage
    saveToLocalStorage('disastersData', disasters);
}


// Funkcja renderująca elementy galerii
function renderGalleryItems(disasters) {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = '';

    if (disasters.length === 0) {
        galleryContainer.innerHTML = '<div class="alert alert-info">Nie znaleziono żadnych katastrof spełniających kryteria.</div>';
        return;
    }

    // Upewnij się, że kontener ma pełną szerokość
    galleryContainer.className = 'container-fluid px-4';

    const row = document.createElement('div');
    // Zmodyfikowano klasę wiersza, aby zajmował pełną szerokość
    row.className = 'row g-4';

    disasters.forEach((disaster, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';

        // Upewnij się, że używamy lokalnych plików zdjęć
        // Przekształć nazwę katastrofy na nazwę pliku
        const fileName = disaster.name.toLowerCase().replace(/\s+/g, '_') + '.jpg';
        const imagePath = `./photos/${fileName}`;

        col.innerHTML = `
            <div class="gallery-item card h-100 w-100">
                <div class="gallery-image-container" style="height: 250px; position: relative; cursor: pointer;" data-index="${index}">
                    <img src="${imagePath}" alt="${disaster.name}" class="gallery-image card-img-top" style="object-fit: cover; height: 100%; width: 100%;">
                    <div class="image-overlay" style="position: absolute; top: 0; right: 0; padding: 8px;">
                        <button class="btn btn-sm btn-light gallery-view" data-index="${index}" title="Powiększ zdjęcie">
                            <i class="fa-solid fa-expand"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title" style="font-size: 1.2rem;">${disaster.name}</h5>
                    <p class="card-text text-muted">
                        <small>
                            <i class="fa-solid fa-calendar me-1"></i> ${formatDate(disaster.date)}
                            <span class="ms-2 me-2">|</span>
                            <i class="fa-solid fa-triangle-exclamation me-1"></i> 
                            ${getImpactLabel(disaster.impactScale)}
                        </small>
                    </p>
                    <p class="card-text disaster-description" style="font-size: 1rem;">${truncateText(disaster.description, 120)}</p>
                </div>
                <div class="card-footer bg-transparent">
                    <button class="btn btn-outline-secondary details-btn w-100" data-index="${index}" style="font-size: 0.9rem; padding: 0.4rem 0.8rem;">
                        Szczegóły katastrofy
                    </button>
                </div>
            </div>
        `;
        row.appendChild(col);
    });

    galleryContainer.appendChild(row);

    // Dodanie obsługi zdarzeń dla przycisków szczegółów
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showDisasterDetails(disasters[index]);
        });
    });

    // Dodanie obsługi zdarzeń dla przycisków powiększenia i kontenera zdjęcia
    document.querySelectorAll('.gallery-view').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Zapobiega propagacji zdarzenia do kontenera
            const index = parseInt(this.getAttribute('data-index'));
            openLightbox(disasters, index);
        });
    });

    // Dodanie obsługi kliknięcia na cały kontener zdjęcia
    document.querySelectorAll('.gallery-image-container').forEach(container => {
        container.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            openLightbox(disasters, index);
        });
    });
}

// Funkcja inicjalizująca wyszukiwanie
function initializeSearch(disasters) {
    const searchInput = document.getElementById('gallery-search');
    const searchButton = document.getElementById('search-button');

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            renderGalleryItems(disasters);
            return;
        }

        const filteredDisasters = disasters.filter(disaster =>
            disaster.name.toLowerCase().includes(searchTerm) ||
            disaster.description.toLowerCase().includes(searchTerm) ||
            disaster.location.toLowerCase().includes(searchTerm)
        );

        renderGalleryItems(filteredDisasters);
    };

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Funkcja inicjalizująca sortowanie
function initializeSorting(disasters) {
    const sortDateBtn = document.getElementById('sort-date');
    const sortImpactBtn = document.getElementById('sort-impact');
    const sortNameBtn = document.getElementById('sort-name');

    let sortDirection = {
        date: 'desc',
        impact: 'desc',
        name: 'asc'
    };

    sortDateBtn.addEventListener('click', function() {
        sortDirection.date = sortDirection.date === 'asc' ? 'desc' : 'asc';
        updateSortButtonStates(this);

        const sortedDisasters = [...disasters].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortDirection.date === 'asc'
                ? dateA - dateB
                : dateB - dateA;
        });

        renderGalleryItems(sortedDisasters);
    });

    sortImpactBtn.addEventListener('click', function() {
        sortDirection.impact = sortDirection.impact === 'asc' ? 'desc' : 'asc';
        updateSortButtonStates(this);

        const sortedDisasters = [...disasters].sort((a, b) => {
            return sortDirection.impact === 'asc'
                ? a.impactLevel - b.impactLevel
                : b.impactLevel - a.impactLevel;
        });

        renderGalleryItems(sortedDisasters);
    });

    sortNameBtn.addEventListener('click', function() {
        sortDirection.name = sortDirection.name === 'asc' ? 'desc' : 'asc';
        updateSortButtonStates(this);

        const sortedDisasters = [...disasters].sort((a, b) => {
            return sortDirection.name === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });

        renderGalleryItems(sortedDisasters);
    });

    // Domyślne sortowanie po dacie (najnowsze pierwsze)
    sortDateBtn.click();
}

// Funkcja aktualizująca stan przycisków sortowania
function updateSortButtonStates(activeButton) {
    const buttons = document.querySelectorAll('.btn-group button');
    buttons.forEach(button => {
        button.classList.remove('active');
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline-primary');
    });

    activeButton.classList.add('active');
    activeButton.classList.remove('btn-outline-primary');
    activeButton.classList.add('btn-primary');
}

// Funkcja inicjalizująca lightbox
function initializeLightbox(disasters) {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentIndex = 0;

    // Zamykanie lightboxa
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    });

    // Obsługa kliknięcia poza obrazem
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.classList.remove('lightbox-open');
        }
    });

    // Nawigacja do poprzedniego obrazu
    lightboxPrev.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateLightboxContent(disasters, currentIndex);
        }
    });

    // Nawigacja do następnego obrazu
    lightboxNext.addEventListener('click', function() {
        if (currentIndex < disasters.length - 1) {
            currentIndex++;
            updateLightboxContent(disasters, currentIndex);
        }
    });

    // Obsługa klawiszy
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                lightbox.classList.remove('active');
                document.body.classList.remove('lightbox-open');
                break;
            case 'ArrowLeft':
                if (currentIndex > 0) {
                    currentIndex--;
                    updateLightboxContent(disasters, currentIndex);
                }
                break;
            case 'ArrowRight':
                if (currentIndex < disasters.length - 1) {
                    currentIndex++;
                    updateLightboxContent(disasters, currentIndex);
                }
                break;
        }
    });
}

// Funkcja otwierająca lightbox - POPRAWIONA
function openLightbox(disasters, index) {
    const lightbox = document.getElementById('lightbox');

    // Ustawienie aktualnego indeksu
    // Aktualizacja zawartości lightboxa
    updateLightboxContent(disasters, index);

    // Pokazanie lightboxa
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
}

// Funkcja aktualizująca zawartość lightboxa - POPRAWIONA
function updateLightboxContent(disasters, index) {
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    const disaster = disasters[index];

    // Generowanie URL obrazka w sposób spójny z renderGalleryItems
    const fileName = disaster.name.toLowerCase().replace(/\s+/g, '_') + '.jpg';
    // Ustawienie źródła obrazka
    lightboxImage.src = `./photos/${fileName}`;
    lightboxImage.alt = disaster.name;

    // Aktualizacja podpisu
    lightboxCaption.innerHTML = `
        <h3>${disaster.name}</h3>
        <p><strong>Data:</strong> ${formatDate(disaster.date)} | <strong>Lokalizacja:</strong> ${disaster.location || 'Nie podano'}</p>
        <p>${disaster.description || 'Brak opisu'}</p>
    `;

    // Aktualizacja stanu przycisków nawigacji
    lightboxPrev.style.visibility = index > 0 ? 'visible' : 'hidden';
    lightboxNext.style.visibility = index < disasters.length - 1 ? 'visible' : 'hidden';
}

// Funkcja wyświetlająca modal ze szczegółami katastrofy
function showDisasterDetails(disaster) {
    const fileName = disaster.name.toLowerCase().replace(/\s+/g, '_') + '.jpg';
    const imagePath = `./photos/${fileName}`;

    const modalHTML = `
        <div class="modal fade" id="disasterModal" tabindex="-1" aria-labelledby="disasterModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="disasterModalLabel">${disaster.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${imagePath}" alt="${disaster.name}" class="img-fluid rounded mb-3">
                            </div>
                            <div class="col-md-6">
                                <h6>Szczegóły zdarzenia</h6>
                                <ul class="list-group mb-3">
                                    <li class="list-group-item"><strong>Data:</strong> ${formatDate(disaster.date)}</li>
                                    <li class="list-group-item"><strong>Lokalizacja:</strong> ${disaster.location || 'Nie podano'}</li>
                                    <li class="list-group-item"><strong>Skala zniszczeń:</strong> ${getImpactLabel(disaster.impactScale)}</li>
                                    <li class="list-group-item"><strong>Wyciek ropy:</strong> ${disaster.oilSpilled || 'Brak danych'} ${disaster.oilSpilled ? 'ton' : ''}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12">
                                <h6>Opis katastrofy</h6>
                                <p>${disaster.description || 'Brak opisu'}</p>
                                
                                <h6 class="mt-4">Skutki środowiskowe</h6>
                                <p>${disaster.impactDescription || 'Brak danych o skutkach środowiskowych'}</p>
                                
                                <h6 class="mt-4">Działania naprawcze</h6>
                                <p>${disaster.remedialAction || 'Brak danych o działaniach naprawczych'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Dodanie modalu do dokumentu
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    // Inicjalizacja i wyświetlenie modalu
    const modalElement = document.getElementById('disasterModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    // Czyszczenie po zamknięciu modalu
    modalElement.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modalContainer);
    });
}

// Funkcja wyświetlająca informacyjny modal
function showInfoModal(title, content) {
    const modalHTML = `
        <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="infoModalLabel">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Dodanie modalu do dokumentu
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    // Inicjalizacja i wyświetlenie modalu
    const modalElement = document.getElementById('infoModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    // Czyszczenie po zamknięciu modalu
    modalElement.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modalContainer);
    });
}

// Funkcja formatująca datę
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Funkcja zwracająca etykietę dla poziomu wpływu
function getImpactLabel(impactLevel) {
    const labels = {
        7: '<span class="badge bg-warning">Wysoki</span>',
        8: '<span class="badge bg-danger">Katastrofalny</span>',
        9: '<span class="badge bg-dark">Ekstremalny</span>'
    };

    return labels[impactLevel] || '<span class="badge bg-secondary">Nieznany</span>';
}

// Funkcja skracająca tekst
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Funkcja zapisująca dane w localStorage
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Błąd zapisywania w localStorage:', error);
    }
}

// Eksport dodatkowych funkcji
export {
    openLightbox,
    showDisasterDetails,
};