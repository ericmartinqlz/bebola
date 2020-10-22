const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLZRoQQAs5AUhSQ61jMgi-F0Y3DnCKZg1mYVkKMCyIQnOyt7nqOWzDSNWi-8YggXNan9eGecqOnA0V2HzDl-Djw",
   "privateKey": "VM2bzIWn9UQjMMMn9C0xHEm1hOi_Si0DHfV95ucjbNw"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/d1f8E9sm7mU:APA91bEhBXdNz8dujCgQGDU_Us3rqj5Nc0jfnbnLGBSHf9Gqq6Qp30GD1mpr5_2416eg2puwX9NDB5XBi9mzS6ZYZDVGJznZ9WNLVCM7rBgC8SwxnbhuKqGNfPt3M6uB2xj9hIrahfq3",
   "keys": {
       "p256dh": "BIui/KnCNJREkLfTu/F1mwRl1xxBjqQs1lpril4gy7/Y/eCsLIUJIEwsLHmypJi90K0hVuWjZXJeC9HnryUhh7Y=",
       "auth": "2l2xJMZ9p7lAZXAAWO3fcg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1033882226951',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);