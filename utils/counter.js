//Do skasowania




// Funkcja inicjalizująca liczniki
// export function initializeCounter() {
//     // Pobieranie danych z localStorage lub wartości domyślne
//     const signatures = getFromLocalStorage('petitionSignatures') || 47829;
//     const countries = 78;
//     const daysLeft = 43;
    
//     // Inicjalizacja licznika podpisów
//     updateCounter('signatures-counter', 0, signatures, {
//         duration: 2000,
//         format: value => formatNumber(Math.round(value))
//     });
    
//     // Inicjalizacja licznika krajów
//     updateCounter('countries-counter', 0, countries, {
//         duration: 1500
//     });
    
//     // Inicjalizacja licznika dni do złożenia petycji
//     updateCounter('days-counter', 0, daysLeft, {
//         duration: 1000
//     });
// }

// // Funkcja aktualizująca licznik - zmieniona nazwa z initializeCounter na updateCounter
export function updateCounter(id, start, end, options = {}) {
    const duration = options.duration || 2000;
    const element = document.getElementById(id);
    const format = options.format || (value => Math.round(value));
    
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            const currentValue = start + (end - start) * easeOutQuad(progress);
            element.textContent = format(currentValue);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = format(end);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

//Funkcja łagodzenia dla animacji
function easeOutQuad(t) {
    return t * (2 - t);
}

//Funkcja formatująca liczby (dodająca separatory tysięcy)
// function formatNumber(num) {
//     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// }

// // // Funkcja aktualizująca pasek postępu
// export function updateProgressBar() {
//     const signatures = getFromLocalStorage('petitionSignatures') || 47829;
//     const goal = 100000;
//     const percentage = Math.min(Math.round((signatures / goal) * 100), 100);
    
//     const progressBar = document.getElementById('petition-progress-bar');
//     const progressText = document.getElementById('progress-percentage');
    
//     if (progressBar && progressText) {
//         progressBar.style.width = `${percentage}%`;
//         progressBar.setAttribute('aria-valuenow', percentage);
//         progressText.textContent = `${percentage}%`;
//     }
// }
