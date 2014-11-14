/*global Hammer:false */
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
            'yearStr': ('0' + year).substr(-4),
            'month': month,
            'monthStr': ('0' + month).substr(-2),
            'day': day,
            'dayStr': ('0' + day).substr(-2),
            'weekday': weekday,
            'weekdayStr': weekdays[weekday]
        };
        if (entry.time === '') {
            entry.hasTime = false;
        } else {
            var time = entry.time.split('-');
            entry.parsedTime = {
                'beginHour': time[0].split(':')[0],
                'beginHourStr': ('0' + time[0].split(':')[0]).substr(-2),
                'beginMinute': time[0].split(':')[1],
                'beginMinuteStr': ('0' + time[0].split(':')[1]).substr(-2),
                'endHour': time[1].split(':')[0],
                'endHourStr': ('0' + time[1].split(':')[0]).substr(-2),
                'endMinute': time[1].split(':')[1],
                'endMinuteStr': ('0' + time[1].split(':')[1]).substr(-2)
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

var MobileHome = function() {
    var _this = this;
    _this.entryInView = 2;
};

MobileHome.prototype = new Timeline();
MobileHome.prototype.constructor = MobileHome;

MobileHome.prototype.resize = function() {
    var _this = this;
    _this.height = _this.container.height();
    _this.width = _this.container.width();
    _this.elementWidth = Math.floor((_this.height - 112) * 2 / 3);
    _this.elementMargin = _this.width - 2 * _this.elementWidth;
    _this.elementFullWidth = _this.width - _this.elementWidth;
    $('div.timeline-entry').height(_this.height)
        .width(_this.elementWidth)
        .css('margin-right', _this.elementMargin);
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
            .html(entry.parsedDate.weekdayStr + '<br/>' + 
                entry.parsedDate.monthStr + '/' + entry.parsedDate.dayStr)
            .appendTo(newElement.parent);
        newElement.cover = $('<img>')
            .addClass('entry-cover')
            .attr('src', entry.media)
            .attr('alt', entry.title)
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
    _this.currentPosition = 1;
    _this.movePosition(1);
    _this.container.on('resize', function() {
        _this.resize();
    });
    _this.hammer = new Hammer(_this.container[0]);
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
    _this.currentPosition = pos;
    _this.scrollWrapper.removeClass('scroll-transition');
    _this.scrollWrapper.css('left', (- pos) * _this.elementFullWidth);
};

MobileHome.prototype.moveLeft = function () {
    var _this = this;
    if (_this.currentPosition == _this.count) {
        _this.scrollWrapper.removeClass('scroll-transition');
        _this.scrollWrapper.css('left', 0);
        _this.currentPosition = 0;
    }
    setTimeout(function () {
        _this.currentPosition = _this.currentPosition + 1;
        _this.scrollWrapper.addClass('scroll-transition');
        _this.scrollWrapper.css('left', (- _this.currentPosition) * _this.elementFullWidth);
    }, 0);
};

MobileHome.prototype.moveRight = function () {
    var _this = this;
    if (_this.currentPosition === 0) {
        _this.scrollWrapper.removeClass('scroll-transition');
        _this.scrollWrapper.css('left', (- _this.count) * _this.elementFullWidth);
        _this.currentPosition = _this.count;
    }
    setTimeout(function () {
        _this.currentPosition = _this.currentPosition - 1;
        _this.scrollWrapper.addClass('scroll-transition');
        _this.scrollWrapper.css('left', (- _this.currentPosition) * _this.elementFullWidth);
    }, 0);
};

var MobileDetail = function () {
    var _this = this;
    _this.entryInView = 1;
};

MobileDetail.prototype = new Timeline();
MobileDetail.prototype.constructor = MobileDetail;
    
MobileDetail.prototype.resize = function () {
    var _this = this;
    _this.width = _this.container.width();
    _this.elementWidth = _this.width;
    _this.elementMargin = 0;
    _this.elementFullWidth = _this.width;
    $('div.timeline-entry').width(_this.elementWidth)
        .css('margin-right', _this.elementMargin);
    $('div.entry-cover').width(_this.elementWidth)
        .height(Math.floor(_this.elementWidth * 3 / 2));
    _this.height = Math.floor(_this.elementWidth * 3 / 2) + 125;
    _this.container.height(_this.height);
    _this.scrollWrapper.width((_this.count + 2) * _this.elementFullWidth);
};

MobileDetail.prototype.render = function () {
    var _this = this;
    _this.cleanTextFormat(true, true, 'eventGroup');
    _this.cleanTextFormat(true, true, 'eventTitle');
    _this.cleanTextFormat(true, false, 'text');
    _this.container.addClass('mobile-detail-timeline-container')
        .css('background-color', _this.config.backgroundColor);
    _this.scrollWrapper = $('<div></div>').addClass('scroll-content');
    $.each(_this.data, function(i, entry) {
        var newElement = {};
        newElement.parent = $('<div></div>')
            .addClass('timeline-entry')
            .appendTo(_this.scrollWrapper);
        newElement.cover = $('<img>')
            .addClass('entry-cover')
            .attr('src', entry.media)
            .attr('alt', entry.title)
            .appendTo(newElement.parent);
        newElement.footer = $('<div></div>')
            .addClass('entry-footer')
            .appendTo(newElement.parent);
        newElement.group = $('<p></p>')
            .addClass('entry-group')
            .html(entry.eventGroup)
            .appendTo(newElement.footer);
        newElement.title = $('<p></p>')
            .addClass('entry-title')
            .html(entry.eventTitle)
            .appendTo(newElement.footer);
        newElement.timeLocation = $('<p></p>')
            .addClass('entry-time-location')
            .html(entry.parsedDate.yearStr + '.' + entry.parsedDate.monthStr + '.' +
                entry.parsedDate.dayStr)
            .appendTo(newElement.footer);
        if (entry.hasTime) {
            newElement.timeLocation.append(', ' + entry.parsedTime.beginHourStr + ':' +
                entry.parsedTime.beginMinuteStr + '~' + entry.parsedTime.endHourStr + ':' +
                entry.parsedTime.endMinuteStr);
        }
        newElement.timeLocation.append(', ' + entry.location);
        newElement.expandBox = $('<div></div>')
            .addClass('entry-expand-box')
            .appendTo(newElement.parent);
        newElement.expandWrapper = $('<div></div>')
            .addClass('expand-wrapper')
            .appendTo(newElement.expandBox);
        newElement.description = $('<p></p>')
            .addClass('entry-description')
            .html(entry.text)
            .appendTo(newElement.expandWrapper);
        _this.data[i].dom = newElement;
    });
    _this.data[0].dom.parent.clone().appendTo(_this.scrollWrapper);
    _this.data[_this.count - 1].dom.parent.clone().prependTo(_this.scrollWrapper);
    _this.scrollWrapper.appendTo(_this.container);
    _this.resize();
    _this.currentPosition = 1;
    _this.movePosition(1);
    _this.container.on('resize', function() {
        _this.resize();
    });
    _this.hammer = new Hammer(_this.container[0]);
    _this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    _this.hammer.on('swipeleft', function () {
        _this.moveLeft();
        console.log('swipe left');
    });
    _this.hammer.on('swiperight', function () {
        _this.moveRight();
        console.log('swipe right');
    });
    _this.hammer.on('swipeup', function () {
        _this.expand();
    });
    _this.hammer.on('swipedown', function () {
        _this.collapse();
    });
};

MobileDetail.prototype.expand = function () {
    var _this = this,
        entry = _this.data[_this.currentPosition - 1];
    if (!entry.expanded) {
        entry.expanded = true;
        setTimeout(function () {
            entry.dom.description.css({
                'visibility': 'visible',
                'opacity': 1
            });
        }, 50);
        entry.dom.expandBox.css('height', 185 + entry.dom.description.height());
    }
};

MobileDetail.prototype.collapse = function () {
    var _this = this,
        entry = _this.data[_this.currentPosition - 1];
    if (entry.expanded) {
        entry.expanded = false;
        entry.dom.description.css('opacity', 0);
        setTimeout(function () {
            entry.dom.description.css('visibility', 'hidden');
        }, 100);
        entry.dom.expandBox.css('height', 125);
    }
};

MobileDetail.prototype.movePosition = function ( pos ) {
    var _this = this;
    if (!_this.moveLock) {
        _this.moveLock = true;
        _this.collapse();
        _this.currentPosition = pos;
        _this.scrollWrapper.removeClass('scroll-transition');
        _this.scrollWrapper.css('left', (- pos) * _this.elementFullWidth);
        _this.moveLock = false;
    }
};

MobileDetail.prototype.moveLeft = function () {
    var _this = this;
    if (!_this.moveLock) {
        _this.moveLock = true;
        _this.collapse();
        if (_this.currentPosition == _this.count) {
            _this.scrollWrapper.removeClass('scroll-transition');
            _this.scrollWrapper.css('left', 0);
            _this.currentPosition = 0;
        }
        console.log(_this.scrollWrapper.css('left'));
        setTimeout(function () {
            _this.currentPosition = _this.currentPosition + 1;
            _this.scrollWrapper.addClass('scroll-transition');
            _this.scrollWrapper.css('left', (- _this.currentPosition) * _this.elementFullWidth);
        }, 50);
        _this.moveLock = false;
    }
};

MobileDetail.prototype.moveRight = function () {
    var _this = this;
    if (!_this.moveLock) {
        console.log('not locked');
        _this.moveLock = true;
        _this.collapse();
        if (_this.currentPosition === 1) {
            _this.scrollWrapper.removeClass('scroll-transition');
            _this.scrollWrapper.css('left', (- 1 - _this.count) * _this.elementFullWidth);
            _this.currentPosition = _this.count + 1;
        }
        console.log(_this.scrollWrapper.css('left'));
        setTimeout(function () {
            _this.currentPosition = _this.currentPosition - 1;
            _this.scrollWrapper.addClass('scroll-transition');
            _this.scrollWrapper.css('left', (- _this.currentPosition) * _this.elementFullWidth);
        }, 50);
        _this.moveLock = false;
    }
};

var DesktopTimeline = function () {
};

DesktopTimeline.prototype = new Timeline();
DesktopTimeline.prototype.constructor = DesktopTimeline;

DesktopTimeline.prototype.resize = function () {
    var _this = this;
    _this.width = _this.container.width();
    _this.height = _this.container.height();
    _this.elementWidth = _this.width;
    _this.elementHeight = _this.height - 195;
    _this.elementMargin = 0;
    _this.elementFullWidth = _this.width;
    _this.dateWidth = 70;
    _this.dateMargin = 0;
    _this.dateFullWidth = 70;
    $('div.main-panel').height(_this.elementHeight);
    $('div.timeline-entry').width(_this.elementWidth)
        .css('margin-right', _this.elementMargin);
    $('img.entry-cover').width(Math.floor(_this.elementHeight * 2 / 3));
    $('p.entry-description').css('left', Math.floor(_this.elementHeight * 2 / 3) + 20);
    $('div.middle-panel').width(_this.width - 100);
    _this.scrollWrapper.width(_this.count * _this.elementFullWidth);
    _this.scrollDate.width(_this.count * _this.dateFullWidth);
    _this.dateStartPos = Math.floor((_this.width - _this.dateFullWidth) / 2);
};

DesktopTimeline.prototype.render = function () {
    var _this = this;
    _this.cleanTextFormat(false, true, 'eventGroup');
    _this.cleanTextFormat(false, true, 'eventTitle');
    _this.container.addClass('desktop-timeline-container')
        .css('background-color', _this.config.backgroundColor);
    _this.mainPanel = $('<div></div>')
        .addClass('main-panel')
        .appendTo(_this.container);
    _this.controlPanel = $('<div></div>')
        .addClass('control-panel')
        .appendTo(_this.container);
    _this.leftPanel = $('<div></div>')
        .addClass('left-panel')
        .appendTo(_this.controlPanel);
    _this.middlePanel = $('<div></div>')
        .addClass('middle-panel')
        .appendTo(_this.controlPanel);
    _this.entryGroup = $('<p></p>')
        .addClass('entry-group')
        .appendTo(_this.middlePanel);
    _this.entryTitle = $('<p></p>')
        .addClass('entry-title')
        .appendTo(_this.middlePanel);
    _this.entryTime = $('<p></p>')
        .addClass('entry-time')
        .appendTo(_this.middlePanel);
    _this.entryLocation = $('<p></p>')
        .addClass('entry-location')
        .appendTo(_this.middlePanel);
    _this.rightPanel = $('<div></div>')
        .addClass('right-panel')
        .appendTo(_this.controlPanel);
    _this.datePanel = $('<div></div>')
        .addClass('date-panel')
        .appendTo(_this.container);
    _this.scrollWrapper = $('<div></div>').addClass('scroll-content');
    _this.scrollDate = $('<div></div>').addClass('scroll-date');
    $.each(_this.data, function(i, entry) {
        var newElement = {};
        newElement.parent = $('<div></div>')
            .addClass('timeline-entry')
            .appendTo(_this.scrollWrapper);
        newElement.cover = $('<img>')
            .addClass('entry-cover')
            .attr('src', entry.media)
            .attr('alt', entry.title)
            .appendTo(newElement.parent);
        newElement.description = $('<p></p>')
            .addClass('entry-description')
            .html(entry.text)
            .appendTo(newElement.parent);
        newElement.entryDate = $('<p></p>')
            .addClass('entry-date')
            .html(entry.parsedDate.month + '月' + entry.parsedDate.day + '日')
            .appendTo(_this.scrollDate);
        _this.data[i].dom = newElement;
    });
    _this.scrollWrapper.appendTo(_this.mainPanel);
    _this.scrollDate.appendTo(_this.datePanel);
    _this.resize();
    _this.currentPosition = 0;
    _this.movePosition(0);
    _this.container.on('resize', function() {
        _this.resize();
    });
    _this.leftPanel.on('click', function () {
        _this.moveLeft();
    });
    _this.rightPanel.on('click', function () {
        _this.moveRight();
    });
    $('.entry-date').on('click', function () {
        _this.movePosition(this.indexOf('.entry-date'));
    });
    _this.hammer = new Hammer(_this.container[0]);
    _this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    _this.hammer.on('swipeleft', function () {
        _this.moveLeft();
    });
    _this.hammer.on('swiperight', function () {
        _this.moveRight();
    });
};

DesktopTimeline.prototype.movePosition = function ( pos ) {
    var _this = this;
    if (!_this.moveLock) {
        _this.moveLock = true;
        _this.currentPosition = pos;
        var entry = _this.data[_this.currentPosition];
        _this.entryGroup.html(entry.eventGroup);
        _this.entryTitle.html(entry.eventTitle);
        _this.entryTime.html(entry.parsedDate.yearStr + '年' + entry.parsedDate.monthStr + '月' +
                entry.parsedDate.dayStr + '日');
        if (entry.hasTime) {
            _this.entryTime.append(', ' + entry.parsedTime.beginHourStr + ':' +
                entry.parsedTime.beginMinuteStr + '~' + entry.parsedTime.endHourStr + ':' +
                entry.parsedTime.endMinuteStr);
        }
        _this.entryLocation.html(entry.location);
        _this.scrollWrapper.css('left', (- pos) * _this.elementFullWidth);
        _this.scrollDate.css('left', _this.dateStartPos + (- _this.currentPosition) * _this.dateFullWidth);
        _this.moveLock = false;
    }
};

DesktopTimeline.prototype.moveLeft = function () {
    var _this = this;
    if (!_this.moveLock) {
        _this.moveLock = true;
        _this.currentPosition = _this.currentPosition + 1;
        var entry = _this.data[_this.currentPosition];
        _this.entryGroup.html(entry.eventGroup);
        _this.entryTitle.html(entry.eventTitle);
        _this.entryTime.html(entry.parsedDate.yearStr + '年' + entry.parsedDate.monthStr + '月' +
                entry.parsedDate.dayStr + '日');
        if (entry.hasTime) {
            _this.entryTime.append(', ' + entry.parsedTime.beginHourStr + ':' +
                entry.parsedTime.beginMinuteStr + '~' + entry.parsedTime.endHourStr + ':' +
                entry.parsedTime.endMinuteStr);
        }
        _this.entryLocation.html(entry.location);
        _this.scrollWrapper.css('left', (- _this.currentPosition) * _this.elementFullWidth);
        _this.scrollDate.css('left', _this.dateStartPos + (- _this.currentPosition) * _this.dateFullWidth);
        _this.moveLock = false;
    }
};

DesktopTimeline.prototype.moveRight = function () {
    var _this = this;
    if (!_this.moveLock) {
        _this.moveLock = true;
        _this.currentPosition = _this.currentPosition - 1;
        var entry = _this.data[_this.currentPosition];
        _this.entryGroup.html(entry.eventGroup);
        _this.entryTitle.html(entry.eventTitle);
        _this.entryTime.html(entry.parsedDate.yearStr + '年' + entry.parsedDate.monthStr + '月' +
                entry.parsedDate.dayStr + '日');
        if (entry.hasTime) {
            _this.entryTime.append(', ' + entry.parsedTime.beginHourStr + ':' +
                entry.parsedTime.beginMinuteStr + '~' + entry.parsedTime.endHourStr + ':' +
                entry.parsedTime.endMinuteStr);
        }
        _this.entryLocation.html(entry.location);
        _this.scrollWrapper.css('left', (- _this.currentPosition) * _this.elementFullWidth);
        _this.scrollDate.css('left', _this.dateStartPos + (- _this.currentPosition) * _this.dateFullWidth);
        _this.moveLock = false;
    }
};