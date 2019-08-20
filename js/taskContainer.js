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
        this.container.classList.add('animation_on');
    }

    Container.prototype.show = function() {
        this.content.appendChild(this.container);
    }

    Container.prototype.hide = function() {
        this.container.classList.toggle('animation_on');
        this.container.classList.toggle('animation_off');
        var self = document.querySelector('.' + this.type);

        setTimeout(function(self) {self.remove()}, 450, self);
    }

    Container.prototype.statusButton = function(target, status) {
        target.disabled = status;
    }

    Container.prototype.showBackground = function() {
        var fildBackground = document.querySelector('.background');

        if (fildBackground) {
            fildBackground.remove();

        } else {
            var fild = document.createElement('div');
            document.querySelector('.main').appendChild(fild);
            fild.classList.toggle('background');
        }
    }

    return Container;
})();
