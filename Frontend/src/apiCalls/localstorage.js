export function getLocalStorage(name) {
    return localStorage.getItem(name)
}
export function setLocalStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value))
}
export function deleteLocalStorage(name) {
    localStorage.removeItem(name)
}