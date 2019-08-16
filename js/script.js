var main = document.querySelector('.main'),
    content = document.querySelector('.content'),
    button = document.querySelector('.button'),
    buttonModalWindow = document.querySelector('.but_modal_window'),
    buttonListNotifications = document.querySelector('.but_list_notifications');
    

function Field(type, content) {
    this.type = type;
}

Field.prototype.create = function() {
    
    this.field = document.createElement('div');
    this.field.setAttribute('class', this.type);
}

Field.prototype.show = function() {
    content.appendChild(this.field);
}

Field.prototype.hide = function() {
    document.querySelector('.' + this.type).remove();
}

Field.prototype.showButton = function(target) {
    target.classList.toggle('hidden');
}

Field.prototype.showBackground = function() {
    content.classList.toggle('background');
}

var modalWindow = new Field('modal_window'),
    listNotifications = new Field('list_notifications');





function Notification(type, text, icon, color, time) {
    Field.apply(this, arguments);
    this.text = text;
    this.icon = icon;
    this.color = color;
    this.time = time;
    this.list = document.getElementsByClassName('list_notifications')[0];
}

Notification.prototype = Object.create(Field.prototype);
Notification.prototype.constructor = Notification;

Notification.prototype.create = function() {
    Field.prototype.create.apply(this, arguments);
    this.field.innerHTML = '<img class="icon" src="img/' + this.icon + '"><div><h3>' + this.type[0].toUpperCase() + this.type.slice(1) + '!!!</h3>' + this.text + '</div><img class="close_button" src="img/close_button.png">';
}

Notification.prototype.show = function() {
    this.list.appendChild(this.field);
    document.querySelector('.' + this.type).style.background = String(this.color);

    this.timerId = setTimeout(Notification.prototype.hide, this.time, this, this.list);
}

Notification.prototype.hide = function(item, parent) {
    var message = document.querySelector('.' + item.type);

    if (parent.childNodes.length <= 1) {
        parent.remove();
        listNotifications.showButton(document.querySelector('.but_list_notifications'));

    } else if (message) {
        message.remove();

    }

        // (parent.childNodes.length > 1) ? message.remove() : (parent.remove(), listNotifications.showButton(document.querySelector('.but_list_notifications')));
    
}

var notifications = {
    error: {
        type:'error',
        text: 'Oops, something is wrong',
        icon: 'error.png',
        color: 'red',
        time: 5000
    },
    warning: {
        type: 'warning',
        text: 'A new virus has been detected',
        icon: 'warning.png',
        color: 'orange',
        time: 2000
    },
    success: {
        type: 'success',
        text: 'Everthing is fine',
        icon: 'success.png',
        color: 'green',
        time: 3000
    },
    info: {
        type: 'info',
        text: 'Your attention is given the solution to task1',
        icon: 'info.png',
        color: 'silver',
        time: 6000
    }
};

var arrNotifications = [];

main.onclick = function(event) {
    var target = event.target;

    if (target === buttonModalWindow) {
        modalWindow.create();
        modalWindow.show();
        modalWindow.showButton(target);
        modalWindow.showBackground();

    } else if (event.currentTarget === main && document.querySelector('.modal_window') && target !== document.querySelector('.modal_window') ) {
        modalWindow.hide();
        modalWindow.showButton(buttonModalWindow);
        modalWindow.showBackground();
    
    } else if (target === buttonListNotifications) {
        listNotifications.create();
        listNotifications.show();
        listNotifications.showButton(target);

        for (var key in notifications) {    
            arrNotifications.push( new Notification(notifications[key].type, notifications[key].text, notifications[key].icon, notifications[key].color, notifications[key].time) );
        }

        arrNotifications.forEach(function(item) {
            item.create();
            item.show();
            }
        );
    }
}

content.onclick = function(event) {
    var target = event.target;

    if (target.classList[0] === 'close_button') {
        // var arr = document.getElementsByClassName('close_button');
        target.parentElement.remove();

    }
}