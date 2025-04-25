import { getFromLocalStorage } from '../utils/storage.js';
import { updateCounter } from '../utils/counter.js';
import { initializeShareButtons } from './petition.js';


export function renderHome(container) {
    container.innerHTML = `
        <section class="hero">
            <div class="hero-content">
                <h1 class="hero-title">Stop Oil!</h1>
                <p class="hero-subtitle">Czas zakończyć erę ropy naftowej i przejść na czyste źródła energii</p>
                <div class="mt-4">
                    <a href="#arguments" class="btn btn-danger btn-lg me-3">Dlaczego to ważne</a>
                    <a href="#petition" class="btn btn-outline-light btn-lg">Podpisz petycję</a>
                </div>
                
                <div class="counter-container row mt-5">
                    <div class="col-md-4 counter-item">
                        <div class="counter-value" id="barrels-counter">0</div>
                        <div class="counter-label">Baryłek ropy wyciekło od dziś rana</div>
                    </div>
                    <div class="col-md-4 counter-item">
                        <div class="counter-value" id="emissions-counter">0</div>
                        <div class="counter-label">Ton CO2 wyemitowanych z ropy</div>
                    </div>
                    <div class="col-md-4 counter-item">
                        <div class="counter-value" id="signatures-counter">0</div>
                        <div class="counter-label">Osób podpisało petycję</div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="section bg-light">
            <div class="container">
                <h2 class="section-title">Dlaczego musimy działać teraz?</h2>
                <div class="row">
                    <div class="col-md-6">
                        <p class="lead">Wydobycie i spalanie ropy naftowej to jedno z głównych źródeł zanieczyszczenia powietrza i zmian klimatycznych, które zagrażają naszej planecie.</p>
                        <p>Każdego roku:
                            <ul>
                                <li>Dochodzi do setek wycieków ropy zanieczyszczających oceany i wybrzeża</li>
                                <li>Spalanie produktów naftowych prowadzi do emisji miliardów ton CO2</li>
                                <li>Zanieczyszczenie powietrza związane z ropą powoduje miliony przedwczesnych zgonów</li>
                            </ul>
                        </p>
                        <p>Już dziś mamy technologie, które mogą zastąpić ropę naftową. Energia słoneczna, wiatrowa, wodna oraz elektryczna mobilność są gotowe, by przejąć rolę paliw kopalnych.</p>
                        <a href="#arguments" class="btn btn-success mt-3">Dowiedz się więcej</a>
                    </div>
                    <div class="col-md-6">
                        <div class="ratio ratio-16x9">
                            <iframe src="https://www.youtube.com/embed/oJAbATJCugs" title="Stop Oil Campaign Video" allowfullscreen></iframe>
                        </div>
                        <p class="text-muted mt-2">Film przedstawiający skutki uzależnienia od ropy naftowej</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="section">
            <div class="container">
                <h2 class="section-title">Co możesz zrobić?</h2>
                <div class="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100 shadow-sm argument-card">
                            <div class="card-body text-center">
                                <i class="fa-solid fa-signature argument-icon"></i>
                                <h3 class="card-title">Podpisz petycję</h3>
                                <p class="card-text">Dołącz do tysięcy osób domagających się zakończenia wydobycia ropy naftowej i przejścia na odnawialne źródła energii.</p>
                                <a href="#petition" class="btn btn-outline-success mt-3">Podpisz teraz</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100 shadow-sm argument-card">
                            <div class="card-body text-center">
                                <i class="fa-solid fa-share-nodes argument-icon"></i>
                                <h3 class="card-title">Udostępnij</h3>
                                <p class="card-text">Rozpowszechnij informacje o zagrożeniach związanych z wydobyciem ropy i o możliwych alternatywach.</p>
                                <div class="share-buttons mt-3">
                                    <button class="btn btn-outline-primary me-2"><i class="fab fa-facebook-f"></i></button>
                                    <button class="btn btn-outline-info me-2"><i class="fab fa-twitter"></i></button>
                                    <button class="btn btn-outline-success"><i class="fab fa-whatsapp"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100 shadow-sm argument-card">
                            <div class="card-body text-center">
                                <i class="fa-solid fa-user-group argument-icon"></i>
                                <h3 class="card-title">Dołącz do akcji</h3>
                                <p class="card-text">Weź udział w lokalnych protestach, dołącz do organizacji ekologicznych lub wspieraj je finansowo.</p>
                                <button class="btn btn-outline-danger mt-3" id="find-events-btn">Znajdź wydarzenia</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="section bg-light">
            <div class="container">
                <h2 class="section-title">Najnowsze wydarzenia</h2>
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm">
                            <img src="./hello_pictures/anti_oil_protest.jpg" class="card-img-top" alt="Protest przeciwko ropie">
                            <div class="card-body">
                                <h5 class="card-title">Ogólnokrajowy protest przeciwko nowym odwiertom</h5>
                                <p class="card-text">Tysiące osób protestowało w weekend przeciwko planom nowych odwiertów naftowych na Morzu Północnym.</p>
                                <p class="text-muted"><i class="fa-regular fa-calendar me-2"></i>25 marca 2025</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm">
                            <img src="./hello_pictures/brasil_oil_leak.jpg" class="card-img-top" alt="Wyciek ropy">
                            <div class="card-body">
                                <h5 class="card-title">Nowy wyciek ropy u wybrzeży Brazylii</h5>
                                <p class="card-text">Rozległy wyciek ropy z platformy wiertniczej zagraża rezerwatom przyrody i plaży wzdłuż brazylijskiego wybrzeża.</p>
                                <p class="text-muted"><i class="fa-regular fa-calendar me-2"></i>18 marca 2025</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm">
                            <img src="./hello_pictures/onz_conference.jpg" class="card-img-top" alt="Konferencja klimatyczna">
                            <div class="card-body">
                                <h5 class="card-title">Konferencja ONZ wzywa do ograniczenia wydobycia</h5>
                                <p class="card-text">Nowy raport ONZ wzywa kraje do natychmiastowego ograniczenia wydobycia ropy o 50% do 2030 roku.</p>
                                <p class="text-muted"><i class="fa-regular fa-calendar me-2"></i>10 marca 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    updateCounter('barrels-counter', 0, 15837, {
            duration: 2000,
            format: value => Math.round(value)
        });
    updateCounter('emissions-counter', 0, 185490, {
            duration: 1000,
            format: value => Math.round(value)
        });
    updateCounter('signatures-counter', 0, getFromLocalStorage('petitionSignatures') || 47829, {
            duration: 1000,
            format: value => Math.round(value)
        });

    // Inicjalizacja liczników z konkretnymi wartościami początkowymi
    const barrelsStartValue = 15837;
    const emissionsStartValue = 185490;
    
    // Wartości przyrostu na sekundę (zmniejszone dla CO2)
    const barrelsPerSecond = 0.8;  // Około 70,000 baryłek dziennie
    const emissionsPerSecond = 0.5; 
    
    // Referencje do elementów DOM
    const barrelsCounter = document.getElementById('barrels-counter');
    const emissionsCounter = document.getElementById('emissions-counter');
    // const signaturesCounter = document.getElementById('signatures-counter');
    
    // Aktualne wartości
    let currentBarrels = barrelsStartValue;
    let currentEmissions = emissionsStartValue;
    
    // Funkcja formatująca liczby z separatorem tysięcy
    function formatNumber(number) {
        return Math.floor(number).toLocaleString('pl-PL');
    }
    
    // Funkcja aktualizująca liczniki w interwałach czasowych
    function updateCounters() {
        // Aktualizacja licznika baryłek ropy
        currentBarrels += barrelsPerSecond;
        barrelsCounter.textContent = formatNumber(currentBarrels);
        
        // Aktualizacja licznika emisji CO2
        currentEmissions += emissionsPerSecond;
        emissionsCounter.textContent = formatNumber(currentEmissions);
    }
    
    // Ustawienie interwału aktualizacji co 1 sekundę zamiast przy każdej klatce
    setInterval(updateCounters, 1000);
    
    // Inicjalizacja liczników przy pierwszym ładowaniu
    barrelsCounter.textContent = formatNumber(barrelsStartValue);
    emissionsCounter.textContent = formatNumber(emissionsStartValue);
    
    // Interakcje do przycisku "Znajdź wydarzenia"
    const findEventsBtn = document.getElementById('find-events-btn');
    if (findEventsBtn) {
        findEventsBtn.addEventListener('click', () => {
            window.open("https://www.greenpeace.org/eu-unit/");
        });
    }
    // Inicjalizacja przycisków udostępniania
    initializeShareButtons();
}