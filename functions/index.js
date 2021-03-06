const functions = require('firebase-functions');
const gravatar = require('gravatar');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
exports.gravatar = functions.database
  .ref('/profiles/{profileId}').onWrite(event => {
    const profile = event.data.val();

    // Exit when the data is deleted.
    if (!event.data.exists()) {
      return;
    }

    if(profile.email) {
      const gravatarUrl = gravatar.url(profile.email);

      return event.data.adminRef.update({
        avatar: gravatarUrl
      })
    } else {
      return event.data.adminRef.update({
        avatar: ''
      })
    }
  });
