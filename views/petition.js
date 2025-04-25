// Moduł renderujący formularz petycji
import { updateCounter } from "../utils/counter.js";
import {saveToLocalStorage, getFromLocalStorage } from "../utils/storage.js";

export function renderPetition(container) {
    container.innerHTML = `
        <section class="section petition-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 mb-4 mb-lg-0">
                        <h2 class="section-title">Dołącz do petycji</h2>
                        <p class="lead mb-4">Żądamy zaostrzenia przepisów dotyczących bezpieczeństwa wydobycia i transportu ropy naftowej oraz zwiększenia odpowiedzialności koncernów naftowych za wyrządzone szkody środowiskowe.</p>
                        
                        <div class="petition-info mb-4">
                            <h5>Nasze postulaty:</h5>
                            <ul class="petition-points">
                                <li>Wzmocnienie wymogów bezpieczeństwa dla platform wiertniczych i tankowców</li>
                                <li>Zwiększenie częstotliwości niezależnych kontroli instalacji naftowych</li>
                                <li>Podniesienie kar finansowych za wycieki i naruszenia zasad bezpieczeństwa</li>
                                <li>Pełna odpowiedzialność finansowa za szkody ekologiczne i społeczne</li>
                                <li>Obowiązkowe ubezpieczenie od katastrof naftowych dla koncernów</li>
                                <li>Zwiększenie funduszy na badania nad bezpiecznymi alternatywami dla ropy</li>
                            </ul>
                        </div>
                        
                        <div class="petition-stats mb-4 d-flex justify-content-around text-center">
                            <div class="petition-stat">
                                <div class="petition-stat-value" id="signatures-counter">0</div>
                                <div class="petition-stat-label">Podpisów</div>
                            </div>
                            <div class="petition-stat">
                                <div class="petition-stat-value" id="countries-counter">0</div>
                                <div class="petition-stat-label">Krajów</div>
                            </div>
                            <div class="petition-stat">
                                <div class="petition-stat-value" id="days-counter">0</div>
                                <div class="petition-stat-label">Dni do złożenia</div>
                            </div>
                        </div>
                        
                        <div class="petition-progress mb-4">
                            <div class="d-flex justify-content-between mb-1">
                                <small>Cel: 100 000 podpisów</small>
                                <small id="progress-percentage">0%</small>
                            </div>
                            <div class="progress">
                                <div class="progress-bar bg-success" id="petition-progress-bar" role="progressbar" style="width: 0" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-5">
                        <div class="card petition-form-card">
                            <div class="card-body">
                                <h5 class="card-title text-center mb-4">Podpisz petycję</h5>
                                
                                <form id="petition-form">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Imię i nazwisko <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="name" required>
                                        <div class="invalid-feedback">Proszę podać imię i nazwisko.</div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="email" class="form-label">E-mail <span class="text-danger">*</span></label>
                                        <input type="email" class="form-control" id="email" required>
                                        <div class="invalid-feedback">Proszę podać poprawny adres e-mail.</div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="country" class="form-label">Kraj <span class="text-danger">*</span></label>
                                        <select class="form-select" id="country" required>
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
                                        <div class="invalid-feedback">Proszę wybrać kraj.</div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label class="form-label">Wiek</label>
                                        <div class="d-flex gap-3">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="age" id="age1" value="18-25">
                                                <label class="form-check-label" for="age1">18-25</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="age" id="age2" value="26-40">
                                                <label class="form-check-label" for="age2">26-40</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="age" id="age3" value="41-60">
                                                <label class="form-check-label" for="age3">41-60</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="age" id="age4" value="60+">
                                                <label class="form-check-label" for="age4">60+</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="comment" class="form-label">Komentarz (opcjonalnie)</label>
                                        <textarea class="form-control" id="comment" rows="3" placeholder="Twój komentarz do petycji..."></textarea>
                                    </div>
                                    
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" id="newsletter">
                                        <label class="form-check-label" for="newsletter">Chcę otrzymywać informacje o kampanii</label>
                                    </div>
                                    
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" id="privacy-policy" required>
                                        <label class="form-check-label" for="privacy-policy">Akceptuję <a href="#" data-bs-toggle="modal" data-bs-target="#privacyModal">politykę prywatności</a> <span class="text-danger">*</span></label>
                                        <div class="invalid-feedback">Musisz zaakceptować politykę prywatności.</div>
                                    </div>
                                    
                                    <div class="d-grid">
                                        <button type="submit" class="btn btn-primary">Podpisz petycję</button>
                                    </div>
                                    
                                    <div class="mt-3 text-center">
                                        <small class="text-muted">Pola oznaczone <span class="text-danger">*</span> są wymagane</small>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Modal Polityki Prywatności -->
        <div class="modal fade" id="privacyModal" tabindex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="privacyModalLabel">Polityka Prywatności</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h6>1. Informacje ogólne</h6>
                        <p>Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z podpisaniem petycji.</p>
                        
                        <h6>2. Administrator danych</h6>
                        <p>Administratorem danych osobowych jest Politechnika Lubelska z siedzibą w Lublinie, ul. Nadbystrzycka 38d, 20-618 Lublin.</p>
                        
                        <h6>3. Cel zbierania danych</h6>
                        <p>Dane osobowe są zbierane w celu:</p>
                        <ul>
                            <li>Umożliwienia podpisania petycji</li>
                            <li>Zaliczenia projektu na zajęcia z Podstaw Aplikacji Internetowych</li>
                            <li>Przekazania petycji odpowiednim organom władzy</li>
                            <li>Informowania o działaniach związanych z kampanią (opcjonalnie)</li>
                        </ul>
                        
                        <h6>4. Zakres zbieranych danych</h6>
                        <p>Zbieramy następujące dane:</p>
                        <ul>
                            <li>Imię i nazwisko</li>
                            <li>Adres e-mail</li>
                            <li>Kraj</li>
                            <li>Wiek (opcjonalnie)</li>
                            <li>Komentarz (opcjonalnie)</li>
                        </ul>
                        
                        <h6>5. Prawo do wglądu i modyfikacji danych</h6>
                        <p>Każdy Użytkownik ma prawo dostępu do treści swoich danych oraz prawo ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu.</p>
                        
                        <h6>6. Okres przechowywania danych</h6>
                        <p>Dane będą przechowywane przez okres niezbędny do realizacji celu petycji oraz przez okres wymagany przepisami prawa.</p>
                        
                        <h6>7. Zabezpieczenie danych</h6>
                        <p>Administrator, czyli Paweł Świeca dokłada wszelkich starań, aby zapewnić wszelkie środki fizycznej, technicznej i organizacyjnej ochrony danych osobowych przed ich przypadkowym czy umyślnym zniszczeniem, utratą, zmianą, nieuprawnionym ujawnieniem, wykorzystaniem czy dostępem.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal Podziękowania -->
        <div class="modal fade" id="thankYouModal" tabindex="-1" aria-labelledby="thankYouModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="thankYouModalLabel">Dziękujemy!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center">
                            <i class="fa-solid fa-check-circle text-success" style="font-size: 3rem;"></i>
                            <h4 class="mt-3 mb-3">Twój podpis został dodany</h4>
                            <p>Dziękujemy za wsparcie naszej petycji. Twój głos ma znaczenie!</p>
                            <p>Zachęcamy do udostępnienia petycji w mediach społecznościowych, aby dotarła do jak największej liczby osób.</p>
                            
                            <div class="share-buttons mt-4">
                                <button class="btn btn-outline-primary me-2">
                                    <i class="fab fa-facebook-f me-1"></i> Udostępnij
                                </button>
                                <button class="btn btn-outline-info me-2">
                                    <i class="fab fa-twitter me-1"></i> Tweet
                                </button>
                                <button class="btn btn-outline-success">
                                    <i class="fab fa-whatsapp me-1"></i> WhatsApp
                                </button>
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

    // Inicjalizacja liczników
    initializeCounters();

    // Inicjalizacja paska postępu
    updateProgressBar();

    // Obsługa formularza
    initializeForm();
}

//Funkcja inicjalizująca liczniki
function initializeCounters() {
    // Pobieranie danych z localStorage lub wartości domyślne
    const signatures = getFromLocalStorage('petitionSignatures') || 47838;
    const countries = 78;
    const daysLeft = 43;

    // Inicjalizacja licznika podpisów
    updateCounter('signatures-counter', 0, signatures, {
        duration: 2000,
        format: value => formatNumber(Math.round(value))
    });

    // Inicjalizacja licznika krajów
    updateCounter('countries-counter', 0, countries, {
        duration: 1500
    });

    // Inicjalizacja licznika dni do złożenia petycji
    updateCounter('days-counter', 0, daysLeft, {
        duration: 1000
    });
}

//Funkcja aktualizująca pasek postępu
function updateProgressBar() {
    const signatures = getFromLocalStorage('petitionSignatures') || 47829;
    const goal = 100000;
    const percentage = Math.min(Math.round((signatures / goal) * 100), 100);

    const progressBar = document.getElementById('petition-progress-bar');
    const progressText = document.getElementById('progress-percentage');

    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', percentage);
    progressText.textContent = `${percentage}%`;
}

// Funkcja inicjalizująca formularz
function initializeForm() {
    const form = document.getElementById('petition-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Zapisanie danych petycji
        savePetitionData();

        // Wyświetlenie modalu z podziękowaniem
        const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
        thankYouModal.show();

        // Inicjalizacja przycisków udostępniania po wyświetleniu modalu
        document.getElementById('thankYouModal').addEventListener('shown.bs.modal', function() {
            initializeShareButtons();
        });

        // Zresetowanie formularza
        form.reset();
    });
}

function validateForm() {
    const form = document.getElementById('petition-form');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }

        // Dodatkowa walidacja dla adresu email
        if (input.id === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                input.classList.add('is-invalid');
                isValid = false;
            }
        }

        // Dodatkowa walidacja dla imienia i nazwiska
        if (input.id === 'name' && input.value.trim()) {
            // Regex uwzględniający polskie znaki, wymaga imienia i nazwiska oddzielonych spacją
            // Dopuszcza litery (w tym polskie), myślniki i spacje
            const nameRegex = /^[\p{L}\- ]+ [\p{L}\- ]+$/u;

            if (!nameRegex.test(input.value.trim())) {
                input.classList.add('is-invalid');

                // Dodanie niestandardowego komunikatu o błędzie
                const errorMessage = document.getElementById('name-error-message');
                if (errorMessage) {
                    errorMessage.textContent = "Proszę podać poprawne imię i nazwisko oddzielone spacją";
                }

                isValid = false;
            }
        }
    });

    // Sprawdzenie akceptacji polityki prywatności
    const privacyPolicy = document.getElementById('privacy-policy');
    if (!privacyPolicy.checked) {
        privacyPolicy.classList.add('is-invalid');
        isValid = false;
    } else {
        privacyPolicy.classList.remove('is-invalid');
    }

    return isValid;
}

// Funkcja zapisująca dane petycji
function savePetitionData() {
    // Pobranie aktualnej liczby podpisów
    let signatures = getFromLocalStorage('petitionSignatures') || 47829;

    // Dodanie nowego podpisu
    signatures++;

    // Zapisanie zaktualizowanej liczby podpisów
    saveToLocalStorage('petitionSignatures', signatures);

    // Aktualizacja licznika i paska postępu
    const counter = document.getElementById('signatures-counter');
    counter.textContent = formatNumber(signatures);

    updateProgressBar();

    // Zapisanie danych użytkownika
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        country: document.getElementById('country').value,
        age: document.querySelector('input[name="age"]:checked')?.value || '',
        comment: document.getElementById('comment').value,
        newsletter: document.getElementById('newsletter').checked,
        timestamp: new Date().toISOString()
    };

    // Zapisanie danych w localStorage
    const signatures_data = getFromLocalStorage('signatures_data') || [];
    signatures_data.push(userData);
    saveToLocalStorage('signatures_data', signatures_data);

    // W prawdziwej aplikacji tutaj byłby kod wysyłający dane do API
    console.log('Zapisano dane podpisu:', userData);
}

//Funkcja formatująca liczby (dodająca separatory tysięcy)
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Funkcje dla obsługi udostępniania w mediach społecznościowych
export function initializeShareButtons() {
    // Przykładowa implementacja - w prawdziwej aplikacji użyto by API mediów społecznościowych
    const facebookButton = document.querySelector('.share-buttons .btn-outline-primary');
    const twitterButton = document.querySelector('.share-buttons .btn-outline-info');
    const whatsappButton = document.querySelector('.share-buttons .btn-outline-success');

    if (facebookButton) {
        facebookButton.addEventListener('click', () => {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent('Petycja: Bezpieczniejsze wydobycie ropy naftowej');
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`, '_blank');
        });
    }

    if (twitterButton) {
        twitterButton.addEventListener('click', () => {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Podpisałem petycję o zaostrzenie przepisów dotyczących bezpieczeństwa wydobycia ropy. Dołącz do mnie! #EkoMorze #OchronaŚrodowiska');
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        });
    }

    if (whatsappButton) {
        whatsappButton.addEventListener('click', () => {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Podpisałem petycję o zaostrzenie przepisów dotyczących bezpieczeństwa wydobycia ropy. Dołącz do mnie!');
            window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
        });
    }
}
