'use strict';

var weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

var defaultOptions = {
    'dataLocation': 'timeline.json',
    'maxEntryNumber': 999,
    'switchInterval': 10000,
    'backgroundColor': '#FFF'
};

var Timeline = function() {
};

Timeline.prototype.start = function ( container, options ) {
    var _this = this;
    _this.container = container;
    _this.config = defaultOptions;
    if (typeof options != 'undefined') {    
        $.each(options, function (key, value) {    
            if (_this.config[key]) {
                _this.config[key] = options[key];
            }
        });
    }
    $.getJSON(_this.config.dataLocation)
    .done(function ( jsonData ) {
        console.log(jsonData);
        _this.data = jsonData;
        _this.count = jsonData.length;
        _this.parseDateTime();
        _this.render();
    })
    .fail(function ( errorMsg ) {
        console.log(errorMsg);
    });
};

Timeline.prototype.parseDateTime = function() {
    var _this = this;
    $.each(_this.data, function (i, entry) {
        var date = entry.date.split(','),
            year = date[0],
            ye = Math.ceil(year / 100),
            ar = year % 100,
            month = date[1],
            day = date[2],
            weekday = (day + Math.floor(2.6 * month - 0.2) - 2 * ye + ar +
                Math.floor(ye / 4) + Math.floor(ar / 4)) % 7;
        entry.parsedDate = {
            'year': year,
            'month': month,
            'day': day,
            'weekday': weekday
        };
        if (entry.time === '') {
            entry.hasTime = false;
        } else {
            var time = entry.time.split('-');
            entry.parsedTime = {
                'beginHour': time[0].split(':')[0],
                'beginMinute': time[0].split(':')[1],
                'endHour': time[1].split(':')[0],
                'endMinute': time[1].split(':')[1]
            };
        }
    });
};

Timeline.prototype.cleanTextFormat = function (clearTag, clearBr, content) {
    var _this = this;
    var clearDoubleTags = /<([A-Za-z]+)>(.*?)<\/\1>/gi;
    var clearBrs = /<br\s*\/>/gi;
    $.each(_this.data, function( i, event ) {
        if (clearTag) {
            event[content] = event[content].replace(clearDoubleTags, '$2');
        }
        if (clearBr) {
            event[content] = event[content].replace(clearBrs, ' ');
        }
    });
};

Timeline.prototype.render = function () {
};

var MobileHome = function() {
};

MobileHome.prototype = new Timeline();
MobileHome.prototype.constructor = MobileHome;

MobileHome.prototype.resize = function() {
    var _this = this;
    _this.height = _this.container.height();
    _this.width = _this.container.width();
    _this.elementWidth = Math.floor((_this.height - 112) * 2 / 3);
    _this.elementFullWidth = _this.width - _this.elementWidth;
    $('div.timeline-entry').height(_this.height)
        .width(_this.elementWidth)
        .css('margin-right', _this.width - 2 * _this.elementWidth);
    $('div.timeline-entry img.entry-cover').height(_this.height - 112);
    _this.scrollWrapper.width((_this.count + 2) * _this.elementFullWidth);
};

MobileHome.prototype.render = function () {
    var _this = this;
    _this.cleanTextFormat(true, true, 'eventTitle');
    _this.cleanTextFormat(true, true, 'eventGroup');
    _this.cleanTextFormat(true, false, 'text');
    _this.container.addClass('mobile-home-timeline-container')
        .css('background-color', _this.config.backgroundColor);
    _this.scrollWrapper = $('<div></div>')
        .addClass('scroll-content');
    _this.entryElement = [];
    $.each(_this.data, function(i, entry) {
        var newElement = {};
        newElement.parent = $('<div></div>')
            .addClass('timeline-entry')
            .appendTo(_this.scrollWrapper);
        newElement.header = $('<div></div>')
            .addClass('entry-header')
            .appendTo(newElement.parent);
        newElement.group = $('<p></p>')
            .addClass('entry-group')
            .html(entry.eventGroup)
            .appendTo(newElement.header);
        newElement.date = $('<p></p>')
            .addClass('entry-date')
            .html(weekdays[entry.parsedDate.weekday] + '<br/>' + 
                entry.parsedDate.month + '/' + entry.parsedDate.day)
            .appendTo(newElement.parent);
        newElement.cover = $('<img>')
            .addClass('entry-cover')
            .attr('src', entry.media)
            .appendTo(newElement.parent);
        newElement.footer = $('<div></div>')
            .addClass('entry-footer')
            .appendTo(newElement.parent);
        newElement.title = $('<p></p>')
            .addClass('entry-title')
            .html(entry.eventTitle)
            .appendTo(newElement.footer);
        _this.data[i].dom = newElement;
    });
    _this.data[0].dom.parent.clone().appendTo(_this.scrollWrapper);
    _this.data[_this.count - 1].dom.parent.clone().prependTo(_this.scrollWrapper);
    _this.scrollWrapper.appendTo(_this.container);
    _this.resize();
    _this.hammer = new Hammer(_this.container[0], {'velocity': 0});
    _this.currentPosition = 1;
    _this.movePosition(1);
    _this.container.on('resize', function() {
        _this.resize();
    });
    _this.intervalAction = function () {
        _this.moveLeft();
    };
    _this.autoSwitch = setInterval(_this.intervalAction, _this.config.switchInterval);
    _this.hammer.on('panstart', function () {
        clearInterval(_this.autoSwitch);
    });
    _this.hammer.on('panend', function () {
        _this.autoSwitch = setInterval(_this.intervalAction, _this.config.switchInterval);        
    });
    _this.hammer.on('swipeleft', function () {
        _this.moveLeft();
    });
    _this.hammer.on('swiperight', function () {
        _this.moveRight();
    });
};


MobileHome.prototype.movePosition = function ( pos ) {
    var _this = this;
    console.log('moving position');
    _this.currentPosition = pos;
    _this.scrollWrapper.removeClass('scroll-transition');
    console.log(_this.elementFullWidth);
    console.log((-pos) * _this.elementFullWidth);
    _this.scrollWrapper.css('left', (-pos) * _this.elementFullWidth);
};

MobileHome.prototype.moveLeft = function () {
    var _this = this;
    if (_this.currentPosition == _this.count) {
        console.log('reseting');
        _this.scrollWrapper.removeClass('scroll-transition');
        console.log(_this.scrollWrapper.css('left'));
        _this.scrollWrapper.css('left', 0);
        console.log(_this.scrollWrapper.css('left'));
        _this.currentPosition = 0;
    }
    _this.scrollWrapper.addClass('scroll-transition');
    _this.scrollWrapper.css('left', (-1 - _this.currentPosition) * _this.elementFullWidth);
    _this.currentPosition = _this.currentPosition + 1;
    console.log(_this.currentPosition);
};

MobileHome.prototype.moveRight = function () {
    var _this = this;
    if (_this.currentPosition === 0) {
        console.log('reseting');
        _this.scrollWrapper.removeClass('scroll-transition');
        console.log(_this.scrollWrapper.css('left'));
        _this.scrollWrapper.css('left', (-_this.count) * _this.elementFullWidth);
        console.log(_this.scrollWrapper.css('left'));
        _this.currentPosition = _this.count;
    }
    _this.scrollWrapper.addClass('scroll-transition');
    _this.scrollWrapper.css('left', (1 - _this.currentPosition) * _this.elementFullWidth);
    _this.currentPosition = _this.currentPosition - 1;
    console.log(_this.currentPosition);
};