class StorageService {
  addOrUpdateItem(id, str) {
    localStorage.setItem(id, str);
  }
  deleteItem(id) {
    localStorage.removeItem(id);
  }
  getItem(id) {
    return localStorage.getItem(id);
  }
  reset() {
    localStorage.clear();
  }
}
