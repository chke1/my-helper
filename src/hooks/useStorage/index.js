export function useLocalStorage() {
  return {
    getItem: function (key) {
      return JSON.parse(localStorage.getItem(key));
    },
    setItem: function (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: function (key) {
      localStorage.removeItem(key);
    },
    clear: function () {
      localStorage.clear();
    },
  };
}

export function useSessionStorage() {
  return {
    getItem: function (key) {
      return JSON.parse(sessionStorage.getItem(key));
    },
    setItem: function (key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: function (key) {
      sessionStorage.removeItem(key);
    },
    clear: function () {
      sessionStorage.clear();
    },
  };
}
