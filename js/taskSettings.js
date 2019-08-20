;window.task = window.task || {};

task.Settings = (function() {
    var Container = window.task.Container;

    function Settings(type, color, time) {
        Container.apply(this, arguments);
        this.color = color;
        this.time = time;
        this.containerSettings = document.querySelector('.list_settings');
    }

    Settings.prototype.create = function() {
        Container.prototype.create.apply(this, arguments);
        this.container = document.createElement('div');
        var strType = this.type[0].toUpperCase() + this.type.slice(1);
        this.container.innerHTML = '<form><h3>' + strType + '</h3>' +
                                    '<label>Color: </label><input data-type="' + this.type + '" data-property="color" onblur="setInformation(event)" type="text" ' +
                                    'style="background-color: rgb(' + this.color + ');" value="' + this.color + '" title="Enter RGB color.">' +
                                    '<label>Time: </label><input  data-type="' + this.type + '" data-property="time" onblur="setInformation(event)" type="text" ' +
                                    'value="' + this.time + '" title="Enter the message display time (1000 - 30000) ms."></form>';
    }

    Settings.prototype.show = function() {
        this.containerSettings.appendChild(this.container);
    }

    Settings.prototype.hide = function() {
        document.querySelector('.' + this.type).remove();
    }

    return Settings;
})();
