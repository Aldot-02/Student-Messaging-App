const functions = require("firebase-functions");

const axios = require("axios");

exports.createChatEngineUser = functions.auth.user().onCreate((user) => {
    axios.post(
        "https://api.chatengine.io/users/",
        {
          username: user.email,
          secret: user.uid,
          email: user.email,
          first_name: user.displayName,
        },
        { headers: { "Private-Key": "eb810948-8e49-405c-97d9-a34f2ce74a21" } }
      );
});

exports.deleteChatEngineUser = functions.auth.user().onDelete((user) => {
    axios.delete("https://api.chatengine.io/users/me/", {
        headers: {
          "Project-ID": "bf1f7b4a-d4c7-435a-9519-d1e55241689b",
          "User-Name": user.email,
          "User-Secret": user.uid,
        },
      });
});