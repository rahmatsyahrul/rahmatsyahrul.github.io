var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BNb-CHASfEmV9A8YagprAaSsihtmT8I2SzHRWtgYAnwBaRTKes1TfkcIYWYf61nRTW5J-30IcBb8irD91k7TPwc",
    "privateKey": "qecreH99rJjYDZPgfp0Hd9di7jLrbDy4TXydTVxLlAQ"
};


webPush.setVapidDetails(
    'mailto:info@mediadesa.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cFpOWskiFdQ:APA91bF0i0kw6NxJ9284pU4wA8XKLO4fTtk_bTHkuBqaq7p948E1KtELHI0L7JBIfWfPIf94LAHJmpaVwsCFdKYx4D20AisXmq1Rth2bZVdkfvkULJKqMK3b1H0YD36gdMdXXyrIfy3k",
    "keys": {
        "p256dh": "BOy6L4PlazppTVvN0ps3ntUZ9D6/+2Z2oA9hYLgBoCnoxMrb9ccLzCitcvkVdkSJptMfpSWgv1tqmddOtVNt368=",
        "auth": "dHB4iAmJP9ZjQkXWSFzTbQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '20465488166',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);