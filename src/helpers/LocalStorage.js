
export class LocalStorage {
    storage = window.localStorage

    putObject(key, value) {
        this.storage.setItem(key, JSON.stringify((value) ? value : {}))
    }
    getObject(key) {
        const get = this.storage.getItem(key)
        return JSON.parse(get)
    }
    removeObject(key) {
        this.storage.removeItem(key)
    }
    clearObject() {
        this.storage.clear()
    }
}