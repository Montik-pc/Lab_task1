;window.task = window.task || {};

task.Notification = (function() {
    var Container = window.task.Container;

    function Notification(type, text, icon, color, time) {
        Container.apply(this, arguments);
        this.text = text;
        this.icon = icon;
        this.color = color;
        this.time = +time;
        this.list = document.querySelector('.list_notifications');
    }

    Notification.prototype = Object.create(Container.prototype);
    Notification.prototype.constructor = Notification;

    Notification.prototype.create = function() {
        Container.prototype.create.apply(this, arguments);
        var strType = this.type[0].toUpperCase() + this.type.slice(1);

        this.container.innerHTML = '<img class="icon" src="img/' + this.icon + '"><div><h3>' +  strType + '!!!</h3>' + this.text + '</div>' +
                                    '<img class="close_button" src="img/close_button.png">';
    }

    Notification.prototype.show = function() {
        this.list.appendChild(this.container);
        document.querySelector('.' + this.type).style.background = 'rgb(' + this.color + ')';
        this.timerId = setTimeout(Notification.prototype.hide, this.time, this, this.list);
        this.container.setAttribute('data-timerId', this.timerId);
    }

    Notification.prototype.hide = function(item, parentContainer) {
        var message = document.querySelector('.' + item.type);

        if (parentContainer.childNodes.length <= 2) {
            parentContainer.remove();
            listSettings.statusButton(buttonListSettings, 0);
            arrNotificationsForShow = [];

        } else if (message) {
            message.remove();
        }
    }
    
    return Notification;
})();
