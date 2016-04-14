'use strict';

// Create the chat configuration
module.exports = function (io, socket) {

  socket.on('articleNotification', function (notification) {
    notification.created = Date.now();
    notification.icon = 'mif-stack';
    notification.user = socket.request.user;

    io.emit('articleNotification', notification);
  });
};
