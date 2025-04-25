// Funkcja pobierająca dane z localStorage
export function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Błąd odczytu z localStorage:', error);
        return null;
    }
}

// Funkcja zapisująca dane do localStorage
export function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Błąd zapisu do localStorage:', error);
        return false;
    }
}