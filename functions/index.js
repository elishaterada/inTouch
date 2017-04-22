const functions = require('firebase-functions');
const gravatar = require('gravatar');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
exports.gravatar = functions.database
  .ref('/profiles/{profileId}').onWrite(event => {
    const profile = event.data.val();
    const gravatarUrl = gravatar.url(profile.email);

    if (gravatarUrl) {
      console.log('Updating avatar', gravatarUrl);
      return event.data.adminRef.update({
        avatar: gravatarUrl
      })
    } else {
      console.log('Failed to update avatar');
    }
  });
