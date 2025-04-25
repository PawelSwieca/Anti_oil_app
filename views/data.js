// Moduł do zarządzania danymi podpisów petycji
import {saveToLocalStorage, getFromLocalStorage} from "../utils/storage.js";

export function renderPetitionDataManager(container) {
    container.innerHTML = `
        <section class="section petition-data-section">
            <div class="container">
                <div class="row">
                    <div class="col-12 mb-4">
                        <h2 class="section-title">Panel zarządzania podpisami petycji</h2>
                        <p class="lead">Przeglądaj i zarządzaj danymi podpisów zgromadzonymi w ramach petycji.</p>
                    </div>
                </div>
                
        <div class="row mb-4">

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Statystyki podpisów</h5>
                        <div class="row text-center mb-3">
                            <div class="col-6">
                                <div class="petition-stat">
                                    <div class="petition-stat-value" id="total-signatures">1</div>
                                    <div class="petition-stat-label">Łączna liczba podpisów</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="petition-stat">
                                    <div class="petition-stat-value" id="unique-countries">1</div>
                                    <div class="petition-stat-label">Liczba krajów</div>
                                </div>
                            </div>
                        </div>
                        <div class="row text-center mb-3">
                            <div class="col-6">
                                <div class="petition-stat">
                                    <div class="petition-stat-value" id="newsletter-opt-in">1</div>
                                    <div class="petition-stat-label">Zgody na newsletter</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="petition-stat">
                                    <div class="petition-stat-value" id="with-comments">0</div>
                                    <div class="petition-stat-label">Podpisy z komentarzem</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
            
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Narzędzia zarządzania</h5>
                                <div class="d-flex flex-column gap-2">
                                    <button class="btn btn-primary" id="refresh-data-btn">
                                        <i class="fas fa-sync-alt me-2"></i> Odśwież dane
                                    </button>
                                    <button class="btn btn-danger" id="clear-data-btn">
                                        <i class="fas fa-trash-alt me-2"></i> Wyczyść dane
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
                
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h5 class="card-title mb-0">Lista podpisów</h5>
                                    <div class="input-group" style="max-width: 300px;">
                                        <input type="text" class="form-control" id="search-signatures" placeholder="Wyszukaj...">
                                        <button class="btn btn-outline-secondary" type="button" id="search-btn">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Imię i nazwisko</th>
                                                <th scope="col">E-mail</th>
                                                <th scope="col">Kraj</th>
                                                <th scope="col">Wiek</th>
                                                <th scope="col">Newsletter</th>
                                                <th scope="col">Data</th>
                                            </tr>
                                        </thead>
                                        <tbody id="signatures-table-body">
                                            <!-- Dane będą dodawane dynamicznie -->
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div id="pagination-container" class="d-flex justify-content-center mt-4">
                                    <!-- Paginacja będzie dodana dynamicznie -->
                                </div>
                                
                                <div id="no-data-message" class="text-center py-4 d-none">
                                    <i class="fas fa-clipboard-list" style="font-size: 3rem; opacity: 0.3;"></i>
                                    <p class="mt-2">Brak danych podpisów w systemie</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Modal edycji podpisu -->
        <div class="modal fade" id="editSignatureModal" tabindex="-1" aria-labelledby="editSignatureModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editSignatureModalLabel">Edytuj dane podpisu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="edit-signature-form">
                            <input type="hidden" id="edit-signature-index">
                            
                            <div class="mb-3">
                                <label for="edit-name" class="form-label">Imię i nazwisko <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="edit-name" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="edit-email" class="form-label">E-mail <span class="text-danger">*</span></label>
                                <input type="email" class="form-control" id="edit-email" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="edit-country" class="form-label">Kraj <span class="text-danger">*</span></label>
                                <select class="form-select" id="edit-country" required>
                                    <option value="" selected disabled>Wybierz kraj</option>
                                    <option value="PL">Polska</option>
                                    <option value="DE">Niemcy</option>
                                    <option value="FR">Francja</option>
                                    <option value="GB">Wielka Brytania</option>
                                    <option value="US">Stany Zjednoczone</option>
                                    <option value="CA">Kanada</option>
                                    <option value="ES">Hiszpania</option>
                                    <option value="IT">Włochy</option>
                                    <option value="other">Inny</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">Wiek</label>
                                <div class="d-flex gap-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="edit-age" id="edit-age1" value="18-25">
                                        <label class="form-check-label" for="edit-age1">18-25</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="edit-age" id="edit-age2" value="26-40">
                                        <label class="form-check-label" for="edit-age2">26-40</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="edit-age" id="edit-age3" value="41-60">
                                        <label class="form-check-label" for="edit-age3">41-60</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="edit-age" id="edit-age4" value="60+">
                                        <label class="form-check-label" for="edit-age4">60+</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="edit-comment" class="form-label">Komentarz</label>
                                <textarea class="form-control" id="edit-comment" rows="3"></textarea>
                            </div>
                            
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="edit-newsletter">
                                <label class="form-check-label" for="edit-newsletter">Zgoda na newsletter</label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                        <button type="button" class="btn btn-primary" id="save-edit-btn">Zapisz zmiany</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal potwierdzenia usunięcia -->
        <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteConfirmModalLabel">Potwierdź usunięcie</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Czy na pewno chcesz usunąć ten podpis? Tej operacji nie można cofnąć.</p>
                        <input type="hidden" id="delete-signature-index">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                        <button type="button" class="btn btn-danger" id="confirm-delete-btn">Usuń</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal wyświetlania komentarza -->
        <div class="modal fade" id="viewCommentModal" tabindex="-1" aria-labelledby="viewCommentModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="viewCommentModalLabel">Komentarz</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p id="comment-content"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal potwierdzenia wyczyszczenia danych -->
        <div class="modal fade" id="clearDataConfirmModal" tabindex="-1" aria-labelledby="clearDataConfirmModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="clearDataConfirmModalLabel">Potwierdź wyczyszczenie danych</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            <strong>Uwaga!</strong> Ta operacja usunie wszystkie dane podpisów z pamięci przeglądarki. Tej operacji nie można cofnąć.
                        </div>
                        <p>Czy na pewno chcesz kontynuować?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                        <button type="button" class="btn btn-danger" id="confirm-clear-data-btn">Wyczyść dane</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inicjalizacja funkcjonalności
    initPetitionDataManager();
}

// Funkcja inicjalizująca menedżer danych
function initPetitionDataManager() {
    // Ustawienia paginacji
    const pageSize = 10;
    let currentPage = 1;
    let filteredData = [];

    // Ładowanie i wyświetlanie danych
    loadData();

    // Inicjalizacja przycisków i obsługi zdarzeń
    initEventListeners();

    // Główna funkcja ładująca dane
    function loadData(searchTerm = '') {
        // Pobieranie danych z localStorage
        const signatures_data = getFromLocalStorage('signatures_data') || [];

        // Filtrowanie danych jeśli podano wyszukiwaną frazę
        if (searchTerm) {
            searchTerm = searchTerm.toLowerCase();
            filteredData = signatures_data.filter(signature =>
                signature.name.toLowerCase().includes(searchTerm) ||
                signature.email.toLowerCase().includes(searchTerm) ||
                signature.country.toLowerCase().includes(searchTerm) ||
                (signature.comment && signature.comment.toLowerCase().includes(searchTerm))
            );
        } else {
            filteredData = [...signatures_data];
        }

        // Aktualizacja statystyk
        updateStatistics(signatures_data);

        // Aktualizacja tabeli
        renderTable();

        // Obsługa braku danych
        toggleNoDataMessage(filteredData.length === 0);
    }

    // Funkcja aktualizująca statystyki
    function updateStatistics(data) {
        // Łączna liczba podpisów
        document.getElementById('total-signatures').textContent = data.length;

        // Liczba unikalnych krajów
        document.getElementById('unique-countries').textContent = new Set(data.map(item => item.country)).size;

        // Liczba zgód na newsletter
        document.getElementById('newsletter-opt-in').textContent = data.filter(item => item.newsletter).length;

        // Liczba podpisów z komentarzem
        document.getElementById('with-comments').textContent = data.filter(item => item.comment && item.comment.trim() !== '').length;
    }

    // Funkcja renderująca tabelę z danymi
    function renderTable() {
        const tableBody = document.getElementById('signatures-table-body');
        tableBody.innerHTML = '';

        // Obliczanie paginacji
        const totalPages = Math.ceil(filteredData.length / pageSize);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, filteredData.length);

        // Generowanie wierszy tabeli
        for (let i = startIndex; i < endIndex; i++) {
            const signature = filteredData[i];
            const row = document.createElement('tr');

            // Formatowanie daty
            const date = new Date(signature.timestamp);
            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

            // Skrócony komentarz (jeśli istnieje)
            const hasComment = signature.comment && signature.comment.trim() !== '';

            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${signature.name}</td>
                <td>${signature.email}</td>
                <td>${getCountryName(signature.country)}</td>
                <td>${signature.age || '-'}</td>
                <td>${signature.newsletter ? '<span class="badge bg-success">Tak</span>' : '<span class="badge bg-secondary">Nie</span>'}</td>
                <td>${formattedDate}</td>
                <td>
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary edit-btn" data-index="${i}">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${hasComment ? `
                        <button class="btn btn-outline-info view-comment-btn" data-index="${i}">
                            <i class="fas fa-comment"></i>
                        </button>` : ''}
                        <button class="btn btn-outline-danger delete-btn" data-index="${i}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        }


        // Dodanie obsługi przycisków akcji
        addActionButtonsListeners();
    }

    // Funkcja wyświetlająca lub ukrywająca komunikat o braku danych
    function toggleNoDataMessage(show) {
        const noDataMessage = document.getElementById('no-data-message');
        if (show) {
            noDataMessage.classList.remove('d-none');
        } else {
            noDataMessage.classList.add('d-none');
        }
    }

    // Funkcja dodająca obsługę przycisków akcji
    function addActionButtonsListeners() {
        // Przyciski edycji
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                openEditModal(index);
            });
        });

        // Przyciski podglądu komentarza
        const viewCommentButtons = document.querySelectorAll('.view-comment-btn');
        viewCommentButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                openCommentModal(index);
            });
        });

        // Przyciski usuwania
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                openDeleteModal(index);
            });
        });
    }

    // Funkcja otwierająca modal edycji
    function openEditModal(index) {
        const signature = filteredData[index];

        // Wypełnienie formularza danymi
        document.getElementById('edit-signature-index').value = index;
        document.getElementById('edit-name').value = signature.name;
        document.getElementById('edit-email').value = signature.email;
        document.getElementById('edit-country').value = signature.country;
        document.getElementById('edit-comment').value = signature.comment || '';
        document.getElementById('edit-newsletter').checked = signature.newsletter;

        // Zaznaczenie odpowiedniego wieku
        if (signature.age) {
            const ageRadio = document.querySelector(`input[name="edit-age"][value="${signature.age}"]`);
            if (ageRadio) {
                ageRadio.checked = true;
            }
        } else {
            // Odznaczenie wszystkich opcji wieku
            document.querySelectorAll('input[name="edit-age"]').forEach(radio => {
                radio.checked = false;
            });
        }

        // Wyświetlenie modala
        const editModal = new bootstrap.Modal(document.getElementById('editSignatureModal'));
        editModal.show();
    }

    // Funkcja otwierająca modal z komentarzem
    function openCommentModal(index) {
        const signature = filteredData[index];
        document.getElementById('comment-content').textContent = signature.comment || '';

        const commentModal = new bootstrap.Modal(document.getElementById('viewCommentModal'));
        commentModal.show();
    }

    // Funkcja otwierająca modal potwierdzenia usunięcia
    function openDeleteModal(index) {
        document.getElementById('delete-signature-index').value = index;

        const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
        deleteModal.show();
    }

    // Funkcja zapisująca edytowane dane
    function saveEditedSignature() {
        const filteredIndex = parseInt(document.getElementById('edit-signature-index').value);

        // Pobieranie danych z formularza
        const name = document.getElementById('edit-name').value;
        const email = document.getElementById('edit-email').value;
        const country = document.getElementById('edit-country').value;
        const ageRadio = document.querySelector('input[name="edit-age"]:checked');
        const age = ageRadio ? ageRadio.value : '';
        const comment = document.getElementById('edit-comment').value;
        const newsletter = document.getElementById('edit-newsletter').checked;

        // Walidacja podstawowych pól
        if (!name.trim() || !email.trim() || !country) {
            alert('Wypełnij wszystkie wymagane pola');
            return false;
        }

        // Walidacja adresu email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            alert('Podaj poprawny adres email');
            return false;
        }

        // Aktualizacja danych w lokalnej tablicy
        const originalIndex = findOriginalIndex(filteredData[filteredIndex]);
        if (originalIndex !== -1) {
            // Pobieranie wszystkich danych
            const signatures_data = getFromLocalStorage('signatures_data') || [];

            // Aktualizacja konkretnego podpisu
            signatures_data[originalIndex] = {
                ...signatures_data[originalIndex],
                name,
                email,
                country,
                age,
                comment,
                newsletter
            };

            // Zapisanie zaktualizowanych danych
            saveToLocalStorage('signatures_data', signatures_data);

            // Odświeżenie widoku
            loadData(document.getElementById('search-signatures').value);

            return true;
        }

        return false;
    }

    // Funkcja usuwająca podpis
    function deleteSignature() {
        const filteredIndex = parseInt(document.getElementById('delete-signature-index').value);

        // Znalezienie oryginalnego indeksu w pełnej tablicy danych
        const originalIndex = findOriginalIndex(filteredData[filteredIndex]);
        if (originalIndex !== -1) {
            // Pobieranie wszystkich danych
            const signatures_data = getFromLocalStorage('signatures_data') || [];

            // Usunięcie podpisu
            signatures_data.splice(originalIndex, 1);

            // Zapisanie zaktualizowanych danych
            saveToLocalStorage('signatures_data', signatures_data);

            // Odświeżenie widoku
            loadData(document.getElementById('search-signatures').value);

            //Aktualizacja ilości podpisów
            let signatures = getFromLocalStorage('petitionSignatures') || 0;
            if (signatures > 0) {
                signatures -= 1;
                saveToLocalStorage('petitionSignatures', signatures);
            }

            return true;
        }

        return false;
    }

    // Funkcja znajdująca oryginalny indeks w tablicy danych
    function findOriginalIndex(signatureToFind) {
        if (!signatureToFind) return -1;

        const signatures_data = getFromLocalStorage('signatures_data') || [];

        // Używamy timestamp jako unikalnego identyfikatora
        return signatures_data.findIndex(signature =>
            signature.timestamp === signatureToFind.timestamp
        );
    }

    // Funkcja czyszcząca wszystkie dane
    function clearAllData() {
        const clearDataModal = new bootstrap.Modal(document.getElementById('clearDataConfirmModal'));
        clearDataModal.show();
    }

    // Funkcja inicjalizująca obsługę zdarzeń
    function initEventListeners() {
        // Przycisk odświeżania danych
        const refreshDataBtn = document.getElementById('refresh-data-btn');
        if (refreshDataBtn) {
            refreshDataBtn.addEventListener('click', () => {
                loadData();
            });
        }

        // Przycisk czyszczenia danych
        const clearDataBtn = document.getElementById('clear-data-btn');
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => {
                clearAllData();
            });
        }

        // Przycisk wyszukiwania
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const searchTerm = document.getElementById('search-signatures').value;
                loadData(searchTerm);
            });
        }

        // Pole wyszukiwania - obsługa naciśnięcia Enter
        const searchInput = document.getElementById('search-signatures');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    loadData(searchInput.value);
                }
            });
        }

        // Przycisk zapisujący zmiany w modalach
        const saveEditBtn = document.getElementById('save-edit-btn');
        if (saveEditBtn) {
            saveEditBtn.addEventListener('click', () => {
                if (saveEditedSignature()) {
                    const editModal = bootstrap.Modal.getInstance(document.getElementById('editSignatureModal'));
                    editModal.hide();
                }
            });
        }
        // Przycisk potwierdzający usunięcie
        const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', () => {
                if (deleteSignature()) {
                    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal'));
                    deleteModal.hide();
                }
            });
        }

        // Przycisk potwierdzający wyczyszczenie wszystkich danych
        const confirmClearDataBtn = document.getElementById('confirm-clear-data-btn');
        if (confirmClearDataBtn) {
            confirmClearDataBtn.addEventListener('click', () => {
                saveToLocalStorage('signatures_data', []);
                saveToLocalStorage('petitionSignatures', 47838);
                loadData();
                const clearDataModal = bootstrap.Modal.getInstance(document.getElementById('clearDataConfirmModal'));
                clearDataModal.hide();
            });
        }
    }
}

//Zamiana skrótów państw na właściwe nazwy
function getCountryName(code) {
    const countries = {
        'PL': 'Polska',
        'DE': 'Niemcy',
        'FR': 'Francja',
        'GB': 'Wielka Brytania',
        'US': 'Stany Zjednoczone',
        'CA': 'Kanada',
        'ES': 'Hiszpania',
        'IT': 'Włochy',
        'other': 'Inny'
    };
    return countries[code] || code;
}