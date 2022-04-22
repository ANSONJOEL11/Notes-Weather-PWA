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

const notifyActions = async () => {
  const permission = await askPermission();
  if (permission) {
    const title = "Transfer Request!"
    const msg = {
      badge: "badge.png",
      tag: 'transfer-request',
      icon: 'badge.png',
      image: 'transfer.png',
      body: "You have an incoming transfer of 10000000 vbux!",
      actions: [
        { action: "accept", title: "Accept", icon: "yes.png" },
        { action: "decline", title: "Decline", icon: "no.png" },
      ]
    }
    const rslt = notify(title, msg);
    console.log('Success!', rslt);
  }
}