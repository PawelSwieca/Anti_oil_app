// Moduł renderujący statystyki dotyczące katastrof naftowych
import { updateCounter } from '../utils/counter.js'; // Importuj funkcję updateCounter


export function renderStats(container, disasters) {
    // Przygotowanie danych do statystyk
    const statsData = prepareStatsData(disasters);
    
    container.innerHTML = `
        <section class="section stats-section">
            <div class="container">
                <h2 class="section-title">Statystyki katastrof naftowych</h2>
                <p class="lead mb-5">Dane liczbowe pokazujące skalę problemu wycieków ropy na przestrzeni lat.</p>
                
                <div class="row mb-5">
                    <div class="col-md-3 mb-4 mb-md-0">
                        <div class="card text-center h-100 border-0 shadow-sm">
                            <div class="card-body">
                                <div class="counter-value" id="total-spills-counter">0</div>
                                <h5 class="counter-title">Katastrof</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-4 mb-md-0">
                        <div class="card text-center h-100 border-0 shadow-sm">
                            <div class="card-body">
                                <div class="counter-value" id="total-oil-counter">0</div>
                                <h5 class="counter-title">Ton ropy</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-4 mb-md-0">
                        <div class="card text-center h-100 border-0 shadow-sm">
                            <div class="card-body">
                                <div class="counter-value" id="affected-area-counter">0</div>
                                <h5 class="counter-title">km² skażonego obszaru</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-center h-100 border-0 shadow-sm">
                            <div class="card-body">
                                <div class="counter-value" id="cleanup-cost-counter">0</div>
                                <h5 class="counter-title">mld $ kosztów</h5>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-lg-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Wycieki ropy według dekad</h5>
                                <canvas id="decades-chart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Ilość wycieków według skali</h5>
                                <canvas id="impact-chart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-lg-8 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Trend wycieków ropy na przestrzeni lat</h5>
                                <canvas id="trend-chart"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Najpoważniejsze katastrofy</h5>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Nazwa</th>
                                                <th>Rok</th>
                                                <th>Wyciek (tony)</th>
                                            </tr>
                                        </thead>
                                        <tbody id="top-disasters">
                                            <!-- Dane wypełniane dynamicznie -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="alert alert-info">
                            <h5 class="alert-heading">Źródła danych</h5>
                            <p class="mb-0">Statystyki oparte na danych z ITOPF (International Tanker Owners Pollution Federation), 
                            NOAA (National Oceanic and Atmospheric Administration) oraz raportach środowiskowych organizacji Greenpeace.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Inicjalizacja liczników
    initializeCounters(statsData);
    
    // Inicjalizacja wykresów
    initializeCharts(statsData);
    
    // Wypełnienie tabeli najpoważniejszych katastrof
    populateTopDisastersTable(statsData.topDisasters);
}

// Funkcja przygotowująca dane statystyczne
function prepareStatsData(disasters) {
    // Sprawdzenie, czy disasters jest tablicą i czy nie jest pusta
    if (!Array.isArray(disasters) || disasters.length === 0) {
        console.warn('Brak danych o katastrofach lub nieprawidłowy format danych');
        return {
            totalDisasters: 0,
            totalOilSpilled: 0,
            totalAffectedArea: 0,
            totalCleanupCost: 0,
            decadeData: {},
            impactData: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            yearData: {},
            topDisasters: []
        };
    }
    
    const decadeData = {};
    const impactData = {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };
    const yearData = {};
    
    let totalOilSpilled = 0;
    let totalAffectedArea = 0;
    let totalCleanupCost = 0;
    
    // Przetwarzanie danych katastrof
    disasters.forEach(disaster => {
        // Zliczanie według dekad
        const year = new Date(disaster.date).getFullYear();
        const decade = Math.floor(year / 10) * 10;
        decadeData[decade] = (decadeData[decade] || 0) + 1;
        
        // Zliczanie według poziomu wpływu (używamy impactScale zamiast impactLevel)
        const impactLevel = disaster.impactScale || 1;
        const normalizedLevel = Math.min(Math.max(Math.round(impactLevel / 2), 1), 5); // Normalizacja skali z 1-10 do 1-5
        impactData[normalizedLevel] = (impactData[normalizedLevel] || 0) + 1;
        
        // Dane roczne do trendu
        yearData[year] = (yearData[year] || 0) + disaster.oilSpilled;
        
        // Sumy ogólne
        totalOilSpilled += disaster.oilSpilled || 0;
        totalAffectedArea += (disaster.oilSpilled * 0.05); // Szacowana powierzchnia na podstawie wycieku
        totalCleanupCost += (disaster.oilSpilled * 0.00005); // Szacowany koszt na podstawie wycieku
    });
    
    // Sortowanie katastrof według ilości rozlanej ropy
    const topDisasters = [...disasters]
        .sort((a, b) => b.oilSpilled - a.oilSpilled)
        .slice(0, 5);
    
    return {
        totalDisasters: disasters.length,
        totalOilSpilled: totalOilSpilled,
        totalAffectedArea: totalAffectedArea,
        totalCleanupCost: totalCleanupCost,
        decadeData: decadeData,
        impactData: impactData,
        yearData: yearData,
        topDisasters: topDisasters
    };
}

// Funkcja inicjalizująca liczniki
function initializeCounters(statsData) {
    // Inicjalizacja licznika całkowitej liczby katastrof
    updateCounter('total-spills-counter', 0, statsData.totalDisasters, {
        duration: 2000,
        format: value => Math.round(value)
    });
    
    // Inicjalizacja licznika całkowitej ilości rozlanej ropy
    updateCounter('total-oil-counter', 0, statsData.totalOilSpilled, {
        duration: 2500,
        format: value => formatNumber(Math.round(value))
    });
    
    // Inicjalizacja licznika całkowitego obszaru skażonego
    updateCounter('affected-area-counter', 0, statsData.totalAffectedArea, {
        duration: 2300,
        format: value => formatNumber(Math.round(value))
    });
    
    // Inicjalizacja licznika całkowitych kosztów oczyszczania
    updateCounter('cleanup-cost-counter', 0, statsData.totalCleanupCost, {
        duration: 2700,
        format: value => formatNumber(value.toFixed(1))
    });
}

// Funkcja inicjalizująca wykresy
function initializeCharts(statsData) {
    try {
        // Wykres katastrof według dekad
        const decadesCtx = document.getElementById('decades-chart');
        if (decadesCtx) {
            new Chart(decadesCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(statsData.decadeData).sort(),
                    datasets: [{
                        label: 'Liczba wycieków',
                        data: Object.keys(statsData.decadeData).sort().map(decade => statsData.decadeData[decade]),
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Liczba wycieków'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Dekada'
                            }
                        }
                    }
                }
            });
        }
        
        // Wykres katastrof według poziomu wpływu
        const impactLabels = {
            1: 'Niski',
            2: 'Średni',
            3: 'Wysoki',
            4: 'Katastrofalny',
            5: 'Ekstremalny'
        };
        
        const impactCtx = document.getElementById('impact-chart');
        if (impactCtx) {
            new Chart(impactCtx, {
                type: 'pie',
                data: {
                    labels: Object.keys(statsData.impactData).map(level => impactLabels[level]),
                    datasets: [{
                        data: Object.values(statsData.impactData),
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(255, 205, 86, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 51, 51, 0.7)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 205, 86, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 51, 51, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw;
                                    const percentage = Math.round((value / Object.values(statsData.impactData).reduce((a, b) => a + b, 0)) * 100);
                                    return `${label}: ${value} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Wykres trendu wycieków na przestrzeni lat
        const years = Object.keys(statsData.yearData).sort();
        const oilSpilledByYear = years.map(year => statsData.yearData[year]);
        
        const trendCtx = document.getElementById('trend-chart');
        if (trendCtx) {
            new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Wycieki ropy (tony)',
                        data: oilSpilledByYear,
                        fill: false,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        tension: 0.1,
                        pointRadius: 3,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Ilość wycieku (tony)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Rok'
                            }
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Błąd podczas inicjalizacji wykresów:', error);
    }
}

// Funkcja wypełniająca tabelę najpoważniejszych katastrof
function populateTopDisastersTable(topDisasters) {
    const tableBody = document.getElementById('top-disasters');
    if (!tableBody) return;
    
    topDisasters.forEach(disaster => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = disaster.name;
        
        const yearCell = document.createElement('td');
        yearCell.textContent = new Date(disaster.date).getFullYear();
        
        const spillCell = document.createElement('td');
        spillCell.textContent = formatNumber(disaster.oilSpilled);
        
        row.appendChild(nameCell);
        row.appendChild(yearCell);
        row.appendChild(spillCell);
        
        tableBody.appendChild(row);
    });
}

// Funkcja formatująca liczby (dodaje separatory tysięcy)
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}