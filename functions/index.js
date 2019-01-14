// import { functions } from 'firebase-functions';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = (notification => {
  return admin
    .firestore()
    .collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc))
})

exports.newTicket = functions.firestore
  .document('tickets/{ticketId}')
  .onCreate(doc => {
    const ticket = doc.data();
    const notification = {
      content: 'stofnaði nýja beiðni',
      user: `${ticket.name}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);
  });

exports.createdAccount = functions.auth
  .user()
  .onCreate(user => {
    return admin
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        const newUser = doc.data();
        const notification = {
          content: 'stofnaði aðgang',
          user: newUser.name,
          time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
      })
  })