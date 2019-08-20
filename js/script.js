var main = document.querySelector('.main'),
    content = document.querySelector('.content'),
    button = document.querySelector('.button'),
    buttonModalWindow = document.querySelector('.but_modal_window'),
    buttonListSettings = document.querySelector('.but_list_settings');

var Container = window.task.Container;
var Settings = window.task.Settings;
var Notification = window.task.Notification;

var modalWindow = new Container('modal_window', content, 'The title of the modal window.'),
    listSettings = new Container('list_settings', content, 'Notifications settings windows.', 'Show notifications'),
    listNotifications = new Container('list_notifications', content);

var notifications = window.task.notifications;

var arrNotifications = [],
    arrNotificationsForShow = [];

main.onclick = function(event) {
    var target = event.target,
        modalWindowField = document.querySelector('.modal_window');

    if (target === buttonModalWindow) {
        showModalWindow(target);

    } else if (event.currentTarget === main && modalWindowField && target !== modalWindowField && target.tagName !== 'H2') {
        hideModalWindow();
    
    } else if (target === buttonListSettings) {
        showListSettings(target);

    } else if (target === content && document.querySelector('.list_settings')) {
        hideListSettings();

    } else if (target.classList.contains('but_list_notification')) {
        showNotifications(target);

    } else if (target.classList.contains('close_button')) {
        hideNotification(target);
    }
}

function showModalWindow(target) {
    modalWindow.create();
    modalWindow.show();
    modalWindow.statusButton(target, 1);
    modalWindow.showBackground();
}

function hideModalWindow() {
    modalWindow.hide();
    modalWindow.statusButton(buttonModalWindow, 0);
    modalWindow.showBackground();
}

function showListSettings(target) {
    listSettings.create();
    listSettings.show();
    listSettings.statusButton(target, 1);
    
    for (var key in notifications) {    
            arrNotifications.push( new Settings(notifications[key].type, notifications[key].color, notifications[key].time) );
        }

    arrNotifications.forEach(function(item) {
        item.create();
        item.show();
        }
    );
}

function hideListSettings() {
    listSettings.hide();
    listSettings.statusButton(buttonListSettings, 0);
    arrNotifications = [];
}

function showNotifications(target) {
    listNotifications.create();
    listNotifications.show();
    listNotifications.statusButton(target, 1);

    for (var key in notifications) {    
        arrNotificationsForShow.push( new Notification(notifications[key].type, notifications[key].text, notifications[key].icon, notifications[key].color, notifications[key].time) );
        }

        arrNotificationsForShow.forEach(function(item) {
            item.create();
            item.show();
        });

    listSettings.hide();
}

function hideNotification(target) {
    var id = target.parentElement.getAttribute('data-timerId');

    arrNotificationsForShow.forEach(function(item) {

        if (item.timerId === +id) {
            item.hide(item, item.list);
        }
    });

    clearTimeout(id);
}

function setInformation(event) {
    var target = event.currentTarget,
        inputType = target.getAttribute('data-type'),
        inputProperty = target.getAttribute('data-property'),
        targetValue = notifications[inputType][inputProperty];

    if (inputProperty === 'color' && /^(\d{1,3}), (\d{1,3}), (\d{1,3})$/.test(target.value)) {
        target.innerHTML = target.value;
        notifications[inputType][inputProperty] = target.value;
        target.style = 'background-color: rgb(' + target.value + ')';

    } else if (inputProperty === 'color') {
        alert('Error. You must enter a color in RGB format 255, 255, 255.');
        target.value = targetValue;

    } else if (inputProperty === 'time' && /^([1-9])(\d{2,5})$/.test(target.value)){
        target.innerHTML = target.value;
        notifications[inputType][inputProperty] = target.value;

    } else if (inputProperty === 'time') {
        alert('Error. You must enter the time the message is displayed in the interval 100 - 999999 ms.');
        target.value = targetValue;
    }
}