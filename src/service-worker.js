importScripts('./ngsw-worker.js');

self.addEventListener('fetch', function (event) { });

self.addEventListener('notificationclick', function (e) {
    var notification = e.notification;
    var action = e.action;
    console.log('notification');
    console.log(e.notification);

    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow('http://www.google.com');
        notification.close();
    }
});

self.addEventListener('push', function (e) {
    var body;

    if (e.data) {
        body = JSON.parse(e.data.text());
    } else {
        body = "Standard Message";
    }

    var options = {
        body: body.Message,
        icon: "assets/icons/icon-512x512.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now()
        },
        actions: [
            {
                action: "explore", title: "Go interact with this!",
                icon: "assets/icons/checkmark.png"
            },
            {
                action: "close", title: "Ignore",
                icon: "assets/icons/red_x.png"
            },
        ]
    };
    console.log('options');
    console.log(options);
    console.log(body);
    console.log(typeof(options.body));
    e.waitUntil(
        self.registration.showNotification(body.Title, options)
    );
});