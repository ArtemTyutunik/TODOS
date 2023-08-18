const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceWorker.js', {scope: '/'});
  }
}

export default registerServiceWorker;
