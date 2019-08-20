;window.task = window.task || {};

task.Container = (function() {
    function Container(type, content, title, button) {
        this.type = type;
        this.content = content;
        this.title = title || '';
        this.button = button;
    }

    Container.prototype.create = function() {
        this.container = document.createElement('div');
        this.container.innerHTML = (this.button) ? '<h2>' + this.title + '</h2><input class="but_list_notification" type="button" value="' + this.button + '">' :
                                                    '<h2>' + this.title + '</h2>';
        this.container.setAttribute('class', this.type);
    }

    Container.prototype.show = function() {
        this.content.appendChild(this.container);
    }

    Container.prototype.hide = function() {
        document.querySelector('.' + this.type).remove();
    }

    Container.prototype.statusButton = function(target, status) {
        target.disabled = status;
    }

    Container.prototype.showBackground = function() {
        this.content.classList.toggle('background');
    }

    return Container;
})();
