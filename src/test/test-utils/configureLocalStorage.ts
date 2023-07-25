const configureLocalStorage = () => {
  let store: {[key: string]: string} = {};

  return {
    getItem: function(key: string) {
      return store[key];
    },
    setItem: function(key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key: string) {
      delete store[key];
    },
    length: Object.keys(store).length,
    getLocalStorage: () => store,
  };
};

export default configureLocalStorage;
