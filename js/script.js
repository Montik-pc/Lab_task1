var STATE_ON = 1;
var STATE_OFF = 0;

var main = document.querySelector('.main');
var content = document.querySelector('.content');
var button = document.querySelector('.button');
var buttonModalWindow = document.querySelector('.but_modal_window');
var buttonListSettings = document.querySelector('.but_list_settings');

var Container = window.task.Container;
var Settings = window.task.Settings;
var Notification = window.task.Notification;

var modalWindow = new Container('modal_window', content, 'The title of the modal window.');
var listSettings = new Container('list_settings', content, 'Notifications settings windows.', 'Show notifications');
var listNotifications = new Container('list_notifications', content);

var notifications = window.task.notifications;

var arrSettings = [];
var arrNotificationsForShow = [];

main.onclick = function(event) {
    var target = event.target;
    var modalWindowField = document.querySelector('.modal_window');
    
    if ( isButtonModalWindowClickOn(target) ) {
        showModalWindow(target);

    } else if ( isButtonModalWindowClickOff(target, modalWindowField) ) {
        hideModalWindow();
    
    } else if ( isButtonListSettingsClickOn(target) ) {
        showListSettings(target);

    } else if ( isButtonListSettingsClickOff(target) ) {
        hideListSettings();

    } else if ( isButtonNotificationsClickOn(target) ) {
        showNotifications(target);

    } else if ( isButtonNotificationsClickOff(target) ) {
        hideNotification(target);
    }
}

function isButtonModalWindowClickOn(target) {
    return target === buttonModalWindow;
}

function isButtonModalWindowClickOff(target, modalWindowField) {
    return event.currentTarget === main && modalWindowField &&
            (target !== modalWindowField || modalWindowField.clientWidth === document.documentElement.clientWidth - 10) &&
            target.tagName !== 'H2';
}

function isButtonListSettingsClickOn(target) {
    return target === buttonListSettings;
}

function isButtonListSettingsClickOff(target) {
    return target === main && document.querySelector('.list_settings');
}

function isButtonNotificationsClickOn(target) {
    return target.classList.contains('but_list_notification');
}

function isButtonNotificationsClickOff(target) {
    return target.classList.contains('close_button');
}

function showModalWindow(target) {
    modalWindow.create();
    modalWindow.show();
    modalWindow.statusButton(target, STATE_ON);
    modalWindow.showBackground();
}

function hideModalWindow() {
    modalWindow.hide();
    modalWindow.statusButton(buttonModalWindow, STATE_OFF);
    modalWindow.showBackground();
}

function showListSettings(target) {
    listSettings.create();
    listSettings.show();
    listSettings.statusButton(target, STATE_ON);
    
    for (var key in notifications) {    
            arrSettings.push( new Settings(notifications[key].type, notifications[key].color, notifications[key].time) );
        }

        arrSettings.forEach(function(item) {
        item.create();
        item.show();
        }
    );
}

function hideListSettings() {
    listSettings.hide();
    listSettings.statusButton(buttonListSettings, STATE_OFF);
    arrSettings = [];
}

function showNotifications(target) {
    listNotifications.create();
    listNotifications.show();
    listNotifications.statusButton(target, STATE_ON);

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
    var target = event.currentTarget;
    var inputType = target.getAttribute('data-type');
    var inputProperty = target.getAttribute('data-property');
    var targetValue = notifications[inputType][inputProperty];

    if ( isCorrectColor(target, inputProperty) ) {
        target.innerHTML = target.value;
        notifications[inputType][inputProperty] = target.value;
        target.style = 'background-color: rgb(' + target.value + ')';

    } else if (inputProperty === 'color') {
        alert('Error. You must enter a color in RGB format 255, 255, 255.');
        target.value = targetValue;

    } else if ( isCorrectTime(target, inputProperty) ) {
        target.innerHTML = target.value;
        notifications[inputType][inputProperty] = target.value;

    } else if (inputProperty === 'time') {
        alert('Error. You must enter the time the message is displayed in the interval 100 - 999999 ms.');
        target.value = targetValue;
    }
}

function isCorrectColor(target, inputProperty) {
    return inputProperty === 'color' && /^(\d{1,3}), (\d{1,3}), (\d{1,3})$/.test(target.value);
}

function isCorrectTime(target, inputProperty) {
    return inputProperty === 'time' && /^([1-9])(\d{2,5})$/.test(target.value);
}