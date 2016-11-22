//Prefer use old data and fetch new data concurrent
const PERFIX = 'issueblog';
class LocalStorage {
  static get(k) {
    return JSON.parse(localStorage.getItem(`${PERFIX}_${k}`));
  }

  set(k, v) {
    localStorage.setItem(`${PERFIX}_${k}`, JSON.stringify(v));
  }

  delete(k) {
    localStorage.removeItem(`${PERFIX}_${k}`);
  }

  destory() {
    this.keys().forEach(this.delete);
  }

  keys() {
    return Object.keys(localStorage).filter(k => k.startsWith(PERFIX));
  }
}
class MemoryStorage {
  constructor() {
    this._storage = {};
  }

  get(k) {
    return this._storage[k];
  }

  set(k, v) {
    this._storage[k] = v;
  }

  delete(k) {
    delete this._storage[k];
  }

  destory() {
    this._storage = {};
  }

  keys() {
    return Object.keys(this._storage);
  }
}

function Storage() {
  if (window.localStorage) {
    return new LocalStorage();
  } else {
    return new MemoryStorage();
  }
}

module.exports = Storage();
