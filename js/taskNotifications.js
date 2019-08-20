;window.task = window.task || {};

task.notifications = (function() {
    task.notifications = {
        error: {
            type:'error',
            text: 'Oops, something is wrong',
            icon: 'error.png',
            color: '255, 0, 0',
            time: '5000'
        },
        warning: {
            type: 'warning',
            text: 'A new virus has been detected',
            icon: 'warning.png',
            color: '255, 165, 0',
            time: '2000'
        },
        success: {
            type: 'success',
            text: 'Everthing is fine',
            icon: 'success.png',
            color: '0, 128, 0',
            time: '3000'
        },
        info: {
            type: 'info',
            text: 'Your attention is given the solution to task1',
            icon: 'info.png',
            color: '192, 192, 192',
            time: '6000'
        }
    };

    return task.notifications;
})();
