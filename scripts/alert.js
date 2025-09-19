function notifyUser(message, type) {
    const notificationArea = document.getElementById('notification_area');

    // Create a unique notification container
    const notification = document.createElement('div');
    notification.className = 'notification notification_' + type;

    const notificationText = document.createElement('div');
    notificationText.className = 'notification_text';
    notificationText.innerHTML = `<p>${message}</p>`;

    notification.appendChild(notificationText);
    notificationArea.appendChild(notification);

    // Auto-remove after 7 seconds
    setTimeout(() => {
        notification.remove();
    }, 7000);
}