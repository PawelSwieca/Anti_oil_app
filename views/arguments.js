// Moduł renderujący stronę z argumentami

export function renderArguments(container) {
    container.innerHTML = `
        <section class="section">
            <div class="container">
                <h2 class="section-title">Dlaczego eksploatacja ropy naftowej musi się skończyć</h2>
                <p class="lead mb-5">Wydobycie i wykorzystanie ropy naftowej niesie ze sobą katastrofalne skutki dla naszej planety i zdrowia ludzi. Oto kluczowe argumenty przemawiające za odejściem od ropy.</p>
                
                <div class="row g-4 mb-5">
                    <div class="col-md-6">
                        <div class="card h-100 shadow-sm argument-card">
                            <div class="card-body">
                                <h3 class="card-title"><i class="fa-solid fa-temperature-arrow-up text-danger me-2"></i>Zmiany klimatyczne</h3>
                                <p class="card-text">Spalanie produktów ropopochodnych jest jednym z głównych źródeł emisji gazów cieplarnianych, które napędzają globalne ocieplenie. Według najnowszych badań:</p>
                                <ul>
                                    <li>Przemysł naftowy odpowiada za około 35% globalnych emisji CO2</li>
                                    <li>Średnia temperatura globalna wzrosła o ponad 1°C od czasów przedindustrialnych</li>
                                    <li>Bez drastycznego ograniczenia emisji przekroczymy krytyczny próg 1,5°C już w najbliższej dekadzie</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card h-100 shadow-sm argument-card">
                            <div class="card-body">
                                <h3 class="card-title"><i class="fa-solid fa-skull-crossbones text-danger me-2"></i>Zanieczyszczenie powietrza</h3>
                                <p class="card-text">Spalanie paliw kopalnych, w tym ropy naftowej, powoduje emisję szkodliwych substancji, które pogarszają jakość powietrza i prowadzą do przedwczesnych zgonów:</p>
                                <ul>
                                    <li>Każdego roku około 7 milionów ludzi umiera przedwcześnie z powodu zanieczyszczenia powietrza</li>
                                    <li>Transport drogowy jest jednym z głównych źródeł zanieczyszczenia w miastach</li>
                                    <li>Cząstki stałe (PM2.5) emitowane przez silniki spalinowe zwiększają ryzyko chorób układu oddechowego i krążenia</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card h-100 shadow-sm argument-card">
                            <div class="card-body">
                                <h3 class="card-title"><i class="fa-solid fa-water text-danger me-2"></i>Wycieki i katastrofy ekologiczne</h3>
                                <p class="card-text">Wydobycie i transport ropy naftowej niosą ze sobą ryzyko wycieków, które mają katastrofalne skutki dla ekosystemów:</p>
                                <ul>
                                    <li>Od 1970 roku doszło do ponad 10 000 znaczących wycieków ropy na całym świecie</li>
                                    <li>Wycieki ropy zabijają morskie ssaki, ptaki i ryby oraz niszczą siedliska na dziesięciolecia</li>
                                    <li>Większość ekosystemów morskich nigdy w pełni nie odzyskuje się po poważnych wyciekach ropy</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card h-100 shadow-sm argument-card">
                            <div class="card-body">
                                <h3 class="card-title"><i class="fa-solid fa-seedling text-danger me-2"></i>Utrata bioróżnorodności</h3>
                                <p class="card-text">Wydobycie ropy naftowej często wymaga ingerencji w dziewicze ekosystemy, co prowadzi do utraty bioróżnorodności:</p>
                                <ul>
                                    <li>Platformy wiertnicze, rurociągi i infrastruktura transportowa fragmentują siedliska i zakłócają szlaki migracyjne zwierząt</li>
                                    <li>Wydobycie ropy w rejonach polarnych zagraża unikalnym gatunkom zwierząt, takim jak niedźwiedzie polarne</li>
                                    <li>Według raportu WWF, populacje dzikich zwierząt zmniejszyły się o 68% od 1970 roku, częściowo z powodu przemysłu wydobywczego</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card h-100 shadow-sm argument-card">
                            <div class="card-body">
                                <h3 class="card-title"><i class="fa-solid fa-hand-holding-dollar text-danger me-2"></i>Niestabilność ekonomiczna</h3>
                                <p class="card-text">Zależność od ropy naftowej tworzy niestabilną ekonomię podatną na gwałtowne wahania cen i konflikty geopolityczne:</p>
                                <ul>
                                    <li>Kraje zależne od eksportu ropy doświadczają "klątwy surowcowej" - zwiększonej korupcji i niestabilności politycznej</li>
                                    <li>Szoki naftowe mogą wywoływać globalne kryzysy gospodarcze, jak miało to miejsce w latach 70. i 2008</li>
                                    <li>Koszty społeczne i środowiskowe związane z ropą naftową nie są uwzględniane w jej cenie rynkowej</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card h-100 shadow-sm argument-card">
                            <div class="card-body">
                                <h3 class="card-title"><i class="fa-solid fa-lightbulb text-danger me-2"></i>Dostępne alternatywy</h3>
                                <p class="card-text">Już dziś mamy technologie, które mogą zastąpić ropę naftową w większości zastosowań:</p>
                                <ul>
                                    <li>Odnawialne źródła energii (słoneczna, wiatrowa, wodna) są obecnie konkurencyjne cenowo wobec paliw kopalnych</li>
                                    <li>Pojazdy elektryczne stają się coraz bardziej dostępne i efektywne, eliminując potrzebę stosowania benzyny i oleju napędowego</li>
                                    <li>Materiały biobazowane mogą zastąpić produkty petrochemiczne w wielu zastosowaniach</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card shadow-sm mb-5">
                    <div class="card-body">
                        <h3 class="card-title mb-4">Porównanie emisji CO2 - różne źródła energii</h3>
                        <div class="chart-container position-relative" style="min-height: 300px; height: 40vh;">
                            <canvas id="emissionsChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="row g-4">
                    <div class="col-lg-6">
                        <h3 class="mb-4">Co mówią eksperci?</h3>
                        <div class="card mb-3 shadow-sm">
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p>"Jeśli poważnie traktujemy cele Porozumienia Paryskiego, nie możemy wydobyć i spalić większości znanych złóż ropy naftowej. Ponad 80% rezerw musi pozostać pod ziemią."</p>
                                    <footer class="blockquote-footer">Dr. Maria Rodriguez, <cite>Instytut Badań Klimatycznych</cite></footer>
                                </blockquote>
                            </div>
                        </div>
                        <div class="card mb-3 shadow-sm">
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p>"Przejście na odnawialne źródła energii to nie tylko konieczność ekologiczna, ale również ogromna szansa gospodarcza. Kraje, które jako pierwsze dokonają tej transformacji, będą liderami w XXI wieku."</p>
                                    <footer class="blockquote-footer">Prof. Jan Kowalski, <cite>Wydział Ekonomii i Zrównoważonego Rozwoju</cite></footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h3 class="mb-4">Najczęściej zadawane pytania</h3>
                        <div class="accordion" id="faqAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                        Czy odejście od ropy naftowej nie spowoduje utraty miejsc pracy?
                                    </button>
                                </h2>
                                <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Transformacja energetyczna stworzy więcej miejsc pracy niż zlikwiduje. Badania pokazują, że energia odnawialna tworzy trzy razy więcej miejsc pracy niż paliwa kopalne na jednostkę energii. Kluczowe jest jednak zapewnienie sprawiedliwej transformacji i wsparcia dla pracowników przemysłu naftowego w zdobywaniu nowych umiejętności.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                        Jak szybko możemy odejść od ropy naftowej?
                                    </button>
                                </h2>
                                <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Przy odpowiednich inwestycjach i politykach, większość krajów rozwiniętych może znacząco ograniczyć zużycie ropy w ciągu 10-15 lat. Według analiz, do 2040 roku możliwe jest niemal całkowite wyeliminowanie ropy z sektora transportu i energetyki. Kluczowe jest jednak rozpoczęcie tej transformacji natychmiast.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                        Co z produktami codziennego użytku, które pochodzą z ropy?
                                    </button>
                                </h2>
                                <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Dla większości produktów petrochemicznych istnieją już alternatywy biobazowane lub można je wytworzyć z innych surowców. Tworzywa sztuczne można produkować z roślin, a wiele materiałów można zastąpić bardziej zrównoważonymi rozwiązaniami. Ponadto, wiele produktów naftowych można poddać recyklingowi zamiast produkować nowe.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Inicjalizacja wykresu po załadowaniu strony
    initEmissionsChart();

}
// Funkcja inicjalizująca wykres emisji CO2
function initEmissionsChart() {
    const ctx = document.getElementById('emissionsChart');
    if (!ctx) return;

    // Funkcja do obsługi responssywności wykresu przy zmianie rozmiaru okna
    const resizeChart = () => {
        if (window.chart) {
            window.chart.resize();
        }
    };

    // Nasłuchiwanie zmiany rozmiaru okna
    window.addEventListener('resize', resizeChart);

    window.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Węgiel', 'Ropa naftowa', 'Gaz ziemny', 'Biomasa', 'Energia słoneczna', 'Energia wiatrowa', 'Energia wodna'],
            datasets: [{
                label: 'Emisja CO2 (g/kWh)',
                data: [820, 720, 490, 230, 48, 12, 24],
                backgroundColor: [
                    '#3d3d3d',
                    '#8B0000',
                    '#FFA500',
                    '#90EE90',
                    '#FFD700',
                    '#87CEEB',
                    '#4682B4'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Emisja CO2 (g/kWh)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Emisja CO2 z różnych źródeł energii',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Emisja: ${context.raw} g/kWh`;
                        }
                    }
                }
            }
        }
    });
}