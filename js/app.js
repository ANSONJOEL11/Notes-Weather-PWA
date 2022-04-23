// Registering ServiceWorker
if ( 'serviceWorker' in navigator ) {
  navigator.serviceWorker.register( 'sw.js' ).then(function(registration) {

    // Registration was successful
    console.log( 'ServiceWorker registration successful. Scope: ' + registration.scope )
  }).catch(function(err) {

    // Registration failed with error
    console.log( 'ServiceWorker registration failed. Error: ' + err);
  });
}

const elements = {
  notifyActionsBtn: document.querySelector('#notify-actions'),
}

const serviceWorkerNotify = async (title, msg) => {
  const registration = await navigator.serviceWorker.ready;
  if (registration) return registration.showNotification(title, msg);
}

const notify = (title, msg) => !msg?.actions ? new Notification(title, msg) : serviceWorkerNotify(title, msg);

const askPermission = async () => {
  // Is Web Notifications available on the browser
  if(!("Notification" in window)) {
    console.error("Notification API is not available on this device!");
    return false;
  }

  // Did the user previously allow notifications
  if (Notification.permission === 'granted') {
    return true;
  }

  // If the user denied or hasn't been asked yet
  if (Notification.permission === 'denied' || Notification.permission === 'default') {
    try {
      // Ask for permission
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        return true;
      }
      return false;
    } catch (e) {
      console.error("There was an issue acquiring Notification permissions", e);
      return false;
    }
  }
  return false;
}

const notifyActions = async () => {
  const permission = await askPermission();
  if (permission) {
    const title = "Notes APP"
    const msg = {
      //badge: "badge.png",
      tag: 'transfer-request',
      // icon: 'badge.png',
      //image: 'transfer.png',
      body: "You are in the Notes App",
      actions: [
        { action: "accept", title: "Accept" },
        { action: "decline", title: "Decline" },
      ]
    }
    const rslt = notify(title, msg);
    console.log('Success!', rslt);
  }
}


elements.notifyActionsBtn.addEventListener('click', notifyActions);