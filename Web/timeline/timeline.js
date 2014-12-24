
/*global Hammer:false */
'use strict';

var weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

var defaultOptions = {
    'dataLocation': 'http://tide.myqsc.com/wp/json/',
    'maxEntryNumber': 999,
    'switchInterval': 10000,
    'backgroundColor': '#FFF',
    'siteUrl': 'http://tide.myqsc.com/wp/',
    'startDate': 'nearest',
    'debounce': 200,
    'defaultImage': 'http://tide.myqsc.com/wp/wp-content/themes/NewTide/img/default-poster.svg',
    'initialImage': 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
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
    $.get(_this.config.dataLocation)
    .done(function ( data ) { 
        console.log(data);
        if (typeof data === 'string') {
            _this.data = JSON.parse($(data).text());
        } else {
            _this.data = data;
        }
        localStorage.setItem('timelineData', JSON.stringify(_this.data));
        _this.count = _this.data.length;
        _this.parseDateTime();
        _this.container.empty();
        _this.render();
    })
    .fail(function ( data ) {
        var localData = localStorage.getItem('timelineData');
        _this.data = JSON.parse(localData);
        _this.count = _this.data.length;
        _this.parseDateTime();
        _this.container.empty();
        _this.render();
    });
};

Timeline.prototype.parseDateTime = function() {
    var _this = this;
    var today = new Date(),
        yyyy = today.getFullYear(),
        dd = today.getDate(),
        mm = today.getMonth() + 1;
    console.log(mm + ' ' + dd);
    _this.nearestEntry = _this.count - 1;
    $.each(_this.data, function (i, entry) {
        var date = entry.date.split(','),
            year = date[0],
            month = date[1],
            day = date[2],
            weekday = new Date(year, month - 1, day).getDay();
        entry.parsedDate = {
            'year': parseInt(year),
            'yearStr': ('0' + year).substr(-4),
            'month': parseInt(month),
            'monthStr': ('0' + month).substr(-2),
            'day': parseInt(day),
            'dayStr': ('0' + day).substr(-2),
            'weekday': weekday,
            'weekdayStr': weekdays[weekday]
        };
        if (_this.nearestEntry === _this.count - 1 && (yyyy < entry.parsedDate.year ||
            ((yyyy == entry.parsedDate.year) && ((mm < entry.parsedDate.month) ||
            (mm == entry.parsedDate.month) && (dd <= entry.parsedDate.day))))) {
            _this.nearestEntry = i;
        }
        console.log(_this.nearestEntry);
        if (entry.time === '') {
            entry.hasTime = false;
        } else {
            entry.hasTime = true;
            // var time = entry.time.split('-');
            // entry.parsedTime = {
            //     'beginHour': time[0].split(':')[0],
            //     'beginHourStr': ('0' + time[0].split(':')[0]).substr(-2),
            //     'beginMinute': time[0].split(':')[1],
            //     'beginMinuteStr': ('0' + time[0].split(':')[1]).substr(-2),
            //     'endHour': time[1].split(':')[0],
            //     'endHourStr': ('0' + time[1].split(':')[0]).substr(-2),
            //     'endMinute': time[1].split(':')[1],
            //     'endMinuteStr': ('0' + time[1].split(':')[1]).substr(-2)
            // };
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
    _this.cycle = true;
};

MobileHome.prototype = new Timeline();
MobileHome.prototype.constructor = MobileHome;

MobileHome.prototype.resize = function() {
    var _this = this;
    _this.width = _this.container.width();
    _this.elementMargin = 5;
    _this.elementWidth = Math.floor((_this.width - _this.elementMargin) / 2);
    _this.elementFullWidth = _this.elementWidth + _this.elementMargin;
    _this.elementHeight = Math.floor(_this.elementWidth * 3 / 2);
    _this.height = _this.elementHeight + 6;
    _this.container.height(_this.height);
    $('div.timeline-entry').height(_this.elementHeight)
        .width(_this.elementWidth)
        .css('margin-right', _this.elementMargin);
    $('div.timeline-entry img.entry-cover').height(_this.height - 8);
    _this.scrollWrapper.width((_this.count + 2) * _this.elementFullWidth);

    _this.movePosition(_this.currentPosition);
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
    _this.data.push($.extend(true, {}, _this.data[0]));
    _this.data.unshift($.extend(true, {}, _this.data[_this.count - 1]));
    console.log(_this.data);
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
        if (entry.media === '') {
            entry.media = _this.config.defaultImage;
        }
        newElement.cover = $('<img>')
            .addClass('entry-cover')
            // .attr('src', entry.media)
            .attr('src', _this.config.initialImage)
            .attr('alt', entry.title)
            .appendTo(newElement.parent);
        newElement.footer = $('<div></div>')
            .addClass('entry-footer')
            .appendTo(newElement.parent);
        newElement.title = $('<p></p>')
            .addClass('entry-title')
            .html(entry.eventTitle)
            .appendTo(newElement.footer);
        newElement.parent.on('click', function () {
            window.location.href = _this.config.siteUrl + 'events/#' + _this.currentPosition;
        });
        _this.data[i].dom = newElement;
    });
    _this.scrollWrapper.appendTo(_this.container);
    if (_this.config.startDate === 'nearest') {
        _this.currentPosition = _this.nearestEntry + 1;
        console.log('moving to nearest');
    } else {
        _this.currentPosition = 1;
    }
    _this.resize();
    $(window).on('resize', function() {
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

MobileHome.prototype.loadMedia = function() {
    var _this = this;
    _this.data[_this.currentPosition - 0].dom.cover
        .attr('src', _this.data[_this.currentPosition - 0].media);
    _this.data[_this.currentPosition + 1].dom.cover
        .attr('src', _this.data[_this.currentPosition + 1].media);
    if (_this.currentPosition === 0) {
        _this.data[_this.count - 1].dom.cover
            .attr('src', _this.data[_this.count - 1].media);
        _this.data[_this.count + 0].dom.cover
            .attr('src', _this.data[_this.count + 0].media);
        _this.data[_this.count + 1].dom.cover
            .attr('src', _this.data[_this.count + 1].media);
        _this.data[_this.currentPosition + 2].dom.cover
            .attr('src', _this.data[_this.currentPosition + 2].media);
    } else {
        _this.data[_this.currentPosition - 1].dom.cover
            .attr('src', _this.data[_this.currentPosition - 1].media);
    }
    if (_this.currentPosition == _this.count) {
        _this.data[0].dom.cover
            .attr('src', _this.data[0].media);
        _this.data[1].dom.cover
            .attr('src', _this.data[1].media);
        _this.data[2].dom.cover
            .attr('src', _this.data[2].media);
        _this.data[_this.currentPosition - 1].dom.cover
            .attr('src', _this.data[_this.currentPosition - 1].media);
    } else {
        _this.data[_this.currentPosition + 2].dom.cover
            .attr('src', _this.data[_this.currentPosition + 2].media);
    }
};

MobileHome.prototype.movePosition = function ( pos ) {
    var _this = this;
    _this.currentPosition = pos;
    _this.loadMedia();
    _this.scrollWrapper.removeClass('scroll-transition');
    _this.scrollWrapper.css('transform', 'translate(' + (- _this.currentPosition) * _this.elementFullWidth + 'px, 0)');
};

MobileHome.prototype.moveLeft = function () {
    var _this = this;
    if (_this.currentPosition == _this.count) {
        _this.scrollWrapper.removeClass('scroll-transition');
        _this.scrollWrapper.css('transform', 'translate(0, 0)');
        _this.currentPosition = 0;
    }
    setTimeout(function () {
        _this.currentPosition = _this.currentPosition + 1;
        _this.loadMedia();
        _this.scrollWrapper.addClass('scroll-transition');
        _this.scrollWrapper.css('transform', 'translate(' + (- _this.currentPosition) * _this.elementFullWidth + 'px, 0)');
    }, 0);
};

MobileHome.prototype.moveRight = function () {
    var _this = this;
    if (_this.currentPosition === 0) {
        _this.scrollWrapper.removeClass('scroll-transition');
        _this.scrollWrapper.css('transform', 'translate(' + (- _this.count) * _this.elementFullWidth + 'px, 0)');
        _this.currentPosition = _this.count;
    }
    setTimeout(function () {
        _this.currentPosition = _this.currentPosition - 1;
        _this.loadMedia();
        _this.scrollWrapper.addClass('scroll-transition');
        _this.scrollWrapper.css('transform', 'translate(' + (- _this.currentPosition) * _this.elementFullWidth + 'px, 0)');
    }, 0);
};

var MobileDetail = function () {
    var _this = this;
    _this.entryInView = 1;
    _this.cycle = true;
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
    $('.entry-footer p').width(_this.width - 40);
    $('.entry-cover').height(Math.floor(_this.elementWidth * 3 / 2));
    _this.height = Math.floor(_this.elementWidth * 3 / 2) + 100;
    _this.container.height(_this.height);
    _this.scrollWrapper.width((_this.count + 2) * _this.elementFullWidth);

    _this.movePosition(_this.currentPosition);
};

MobileDetail.prototype.render = function () {
    var _this = this;
    _this.cleanTextFormat(true, true, 'eventGroup');
    _this.cleanTextFormat(true, true, 'eventTitle');
    _this.cleanTextFormat(true, false, 'text');
    _this.container.addClass('mobile-detail-timeline-container')
        .css('background-color', _this.config.backgroundColor);
    _this.scrollWrapper = $('<div></div>').addClass('scroll-content');
    _this.scrollWrapper.appendTo(_this.container);
    _this.data.unshift(_this.data[0]);
    _this.data.push(_this.data[_this.count]);
    $.each(_this.data, function(i, entry) {
        var newElement = {};
        newElement.parent = $('<div></div>')
            .addClass('timeline-entry')
            .appendTo(_this.scrollWrapper);
        if (entry.media === '') {
            entry.media = _this.config.defaultImage;
        }
        newElement.cover = $('<img>')
            .addClass('entry-cover')
            // .attr('src', entry.media)
            .attr('src', _this.config.initialImage)
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
            // newElement.timeLocation.append(', ' + entry.parsedTime.beginHourStr + ':' +
            //     entry.parsedTime.beginMinuteStr + '~' + entry.parsedTime.endHourStr + ':' +
            //     entry.parsedTime.endMinuteStr);
            newElement.timeLocation.append(', ', entry.time);
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
        newElement.expandWrapper.on('click', function () {
            if (_this.data[_this.currentPosition - 1].expanded) {
                _this.collapse();
            } else {
                _this.expand();
            }
        });
        _this.data[i].dom = newElement;
    });
    if (window.location.hash) {
        _this.currentPosition = parseInt(window.location.hash.substr(1));
    } else {
        if (_this.config.startDate === 'nearest') {
            console.log('moving to nearest');
            _this.currentPosition = _this.nearestEntry + 1;
        } else {
            _this.currentPosition = 1;
        }
    }
    _this.resize();
    $(window).on('resize', function() {
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
        entry = _this.data[_this.currentPosition];
    if (!entry.expanded) {
        entry.expanded = true;
        setTimeout(function () {
            entry.dom.description.css({
                'visibility': 'visible',
                'opacity': 1
            });
        }, 50);
        entry.dom.expandBox.css('height', 140 + entry.dom.description.height());
    }
};

MobileDetail.prototype.collapse = function () {
    var _this = this,
        entry = _this.data[_this.currentPosition];
    if (entry.expanded) {
        entry.expanded = false;
        entry.dom.description.css('opacity', 0);
        setTimeout(function () {
            entry.dom.description.css('visibility', 'hidden');
        }, 100);
        entry.dom.expandBox.css('height', 100);
    }
};

MobileDetail.prototype.loadMedia = function() {
    var _this = this;
    _this.data[_this.currentPosition - 1].dom.cover
        .attr('src', _this.data[_this.currentPosition - 1].media);
    _this.data[_this.currentPosition - 0].dom.cover
        .attr('src', _this.data[_this.currentPosition - 0].media);
    _this.data[_this.currentPosition + 1].dom.cover
        .attr('src', _this.data[_this.currentPosition + 1].media);
    if (_this.currentPosition === 1) {
        _this.data[_this.count].dom.cover
            .attr('src', _this.data[_this.count].media);
        _this.data[_this.count + 1].dom.cover
            .attr('src', _this.data[_this.count + 1].media);        
    }
    if (_this.currentPosition == _this.count) {
        _this.data[0].dom.cover
            .attr('src', _this.data[0].media);
        _this.data[1].dom.cover
            .attr('src', _this.data[1].media);
    }
};

MobileDetail.prototype.movePosition = function ( pos ) {
    var _this = this;
    if (!_this.moveLock) {
        _this.moveLock = true;
        _this.collapse();
        _this.currentPosition = pos;
        _this.loadMedia();
        _this.scrollWrapper.removeClass('scroll-transition');
        _this.scrollWrapper.css('transform', 'translate(' + (- _this.currentPosition) * _this.elementFullWidth + 'px, 0)');
        _this.moveLock = false;
        window.location.hash = _this.currentPosition;
    }
};

MobileDetail.prototype.moveLeft = function () {
    var _this = this;
    if (!_this.moveLock) {
        _this.moveLock = true;
        _this.collapse();
        if (_this.currentPosition == _this.count) {
            _this.scrollWrapper.removeClass('scroll-transition');
            _this.scrollWrapper.css('transform', 'translate(0, 0)');
            _this.currentPosition = 0;
        }
        console.log(_this.scrollWrapper.css('left'));
        setTimeout(function () {
            _this.currentPosition = _this.currentPosition + 1;
            _this.loadMedia();
            _this.scrollWrapper.addClass('scroll-transition');
            _this.scrollWrapper.css('transform', 'translate(' + (- _this.currentPosition) * _this.elementFullWidth + 'px, 0)');
            window.location.hash = _this.currentPosition;
        }, 50);
        _this.moveLock = false;
    }
};

MobileDetail.prototype.moveRight = function () {
    var _this = this;
    if (!_this.moveLock) {
        _this.moveLock = true;
        _this.collapse();
        if (_this.currentPosition === 1) {
            _this.scrollWrapper.removeClass('scroll-transition');
            _this.scrollWrapper.css('transform', 'translate(' + (- 1 - _this.count) * _this.elementFullWidth + 'px, 0)');
            _this.currentPosition = _this.count + 1;
        }
        console.log(_this.scrollWrapper.css('left'));
        setTimeout(function () {
            _this.currentPosition = _this.currentPosition - 1;
            _this.loadMedia();
            _this.scrollWrapper.addClass('scroll-transition');
            _this.scrollWrapper.css('transform', 'translate(' + (- _this.currentPosition) * _this.elementFullWidth + 'px, 0)');
            window.location.hash = _this.currentPosition;
        }, 50);
        _this.moveLock = false;
    }
};

var DesktopTimeline = function () {
    var _this = this;
    _this.entryInView = 1;
    _this.cycle = false;
};

DesktopTimeline.prototype = new Timeline();
DesktopTimeline.prototype.constructor = DesktopTimeline;

DesktopTimeline.prototype.resize = function () {
    var _this = this;
    _this.width = _this.container.width();
    _this.height = _this.container.height();
    console.log(_this.width + ' ' + _this.height);
    _this.elementWidth = _this.width - 100;
    _this.elementHeight = _this.height - 195;
    _this.elementMargin = 100;
    _this.elementFullWidth = _this.width;
    _this.infoWidth = _this.width - 100;
    _this.infoFullWidth = _this.width;
    _this.dateWidth = 64;
    _this.dateMargin = 6;
    _this.dateFullWidth = 70;
    $('div.main-panel').height(_this.elementHeight);
    $('div.timeline-entry').width(_this.elementWidth);
    $('img.entry-cover').width(Math.floor(_this.elementHeight * 2 / 3));
    $('p.entry-description').css({
        'left': Math.floor(_this.elementHeight * 2 / 3) + 20,
        'max-height': _this.elementHeight
    });
    $('div.middle-panel').width(_this.width - 100);
    $('div.entry-info').width(_this.infoWidth);
    $.each(_this.data, function ( i, entry ) {
        entry.dom.description.css('top', 
            (_this.elementHeight - entry.dom.description.height()) / 2);
    });
    _this.scrollWrapper.width(_this.count * _this.elementFullWidth);
    _this.scrollInfo.width(_this.count * _this.infoFullWidth);
    _this.scrollDate.width(_this.count * _this.dateFullWidth);
    _this.dateStartPos = Math.floor((_this.width - _this.dateFullWidth) / 2);

    _this.movePosition(_this.currentPosition);
    _this.resizeDebounceLock = false;
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
    _this.panelLeft = $('<div></div>')
        .addClass('panel-left')
        .appendTo(_this.controlPanel);
    _this.buttonLeft = $('<div></div>')
        .addClass('button-left')
        .appendTo(_this.controlPanel);
    _this.panelRight = $('<div></div>')
        .addClass('panel-right')
        .appendTo(_this.controlPanel);
    _this.buttonRight = $('<div></div>')
        .addClass('button-right')
        .appendTo(_this.panelRight);
    _this.datePanel = $('<div></div>')
        .addClass('date-panel')
        .appendTo(_this.container);
    _this.scrollWrapper = $('<div></div>')
        .addClass('scroll-content');
    _this.scrollInfo = $('<div></div>')
        .addClass('scroll-info');
    _this.scrollDate = $('<div></div>')
        .addClass('scroll-date');
    $.each(_this.data, function(i, entry) {
        var newElement = {};
        newElement.parent = $('<div></div>')
            .addClass('timeline-entry')
            .appendTo(_this.scrollWrapper);
        if (entry.media === '') {
            entry.media = _this.config.defaultImage;
        }
        newElement.cover = $('<img>')
            .addClass('entry-cover')
            // .attr('src', entry.media)
            .attr('src', _this.config.initialImage)
            .attr('alt', entry.title)
            .appendTo(newElement.parent);
        newElement.description = $('<p></p>')
            .addClass('entry-description')
            .html(entry.text)
            .appendTo(newElement.parent);
        newElement.info = $('<div></div>')
            .addClass('entry-info')
            .appendTo(_this.scrollInfo);
        newElement.entryGroup = $('<p></p>')
            .addClass('entry-group')
            .html(entry.eventGroup)
            .appendTo(newElement.info);
        newElement.entryTitle = $('<p></p>')
            .addClass('entry-title')
            .html(entry.eventTitle)
            .appendTo(newElement.info);
        newElement.entryTime = $('<p></p>')
            .addClass('entry-time')
            .html(entry.parsedDate.yearStr + '年' + 
                entry.parsedDate.monthStr + '月' +
                entry.parsedDate.dayStr + '日')
            .appendTo(newElement.info);
        if (entry.hasTime) {
            // newElement.entryTime.append(', ' + 
            //     entry.parsedTime.beginHourStr + ':' + entry.parsedTime.beginMinuteStr + '~' + 
            //     entry.parsedTime.endHourStr + ':' + entry.parsedTime.endMinuteStr);
            newElement.entryTime.append(', ', entry.time);
        }
        newElement.entryLocation = $('<p></p>')
            .addClass('entry-location')
            .html(entry.location)
            .appendTo(newElement.info);
        newElement.entryDate = $('<p></p>')
            .addClass('entry-date')
            .html(entry.parsedDate.month + '月' + entry.parsedDate.day + '日')
            .appendTo(_this.scrollDate);
        _this.data[i].dom = newElement;
    });
    _this.scrollWrapper.appendTo(_this.mainPanel);
    _this.scrollInfo.appendTo(_this.controlPanel);
    _this.scrollDate.appendTo(_this.datePanel);
    if (_this.config.startDate === 'nearest') {
        _this.currentPosition = _this.nearestEntry;
    } else {
        _this.currentPosition = 0;
    }
    _this.resize();
    $(window).on('resize', function() {
        clearTimeout(_this.debounceTimeout);
        _this.debounceTimeout = setTimeout(function () {
            _this.resize();
        }, _this.config.debounce);
    });
    $('p.entry-date').on('click', function () {
        console.log('moving to ' + $('.entry-date').index(this));
        _this.movePosition($('.entry-date').index(this));
    });
    _this.buttonLeft.on('click', function () {
        _this.moveRight();
    });
    _this.buttonRight.on('click', function () {
        _this.moveLeft();
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

DesktopTimeline.prototype.loadMedia = function() {
    var _this = this;
    if (_this.currentPosition !== 0) {    
        _this.data[_this.currentPosition - 1].dom.cover
            .attr('src', _this.data[_this.currentPosition - 1].media);
    }
    _this.data[_this.currentPosition - 0].dom.cover
        .attr('src', _this.data[_this.currentPosition - 0].media);
    if (_this.currentPosition != _this.count - 1) {
        _this.data[_this.currentPosition + 1].dom.cover
            .attr('src', _this.data[_this.currentPosition + 1].media);
    }
};

DesktopTimeline.prototype.movePosition = function ( pos ) {
    var _this = this;
    if (!_this.moveLock) {
        _this.moveLock = true;
        _this.data[_this.currentPosition].dom.entryDate.removeClass('highlight');
        _this.currentPosition = pos;
        _this.loadMedia();
        _this.data[_this.currentPosition].dom.entryDate.addClass('highlight');
        if (_this.currentPosition == _this.count - 1) {
            _this.panelRight.addClass('disabled');
        } else {
            _this.panelRight.removeClass('disabled');
        }
        if (_this.currentPosition === 0) {
            _this.panelLeft.addClass('disabled');
        } else {
            _this.panelLeft.removeClass('disabled');
        }

        _this.scrollWrapper.css('transform', 'translate(' + (- _this.currentPosition) * _this.elementFullWidth + 'px, 0)');
        _this.scrollInfo.css('transform', 'translate(' + (- _this.currentPosition) * _this.infoFullWidth + 'px, 0)');
        _this.scrollDate.css('transform', 'translate(' + (_this.dateStartPos + (- _this.currentPosition) * _this.dateFullWidth) + 'px, 0)');
        _this.moveLock = false;
    }
};

DesktopTimeline.prototype.moveLeft = function () {
    var _this = this;
    console.log('moving');
    if (_this.currentPosition == _this.count - 1) {
        return;
    }
    console.log('not exiting');
    if (!_this.moveLock) {
        _this.moveLock = true;
        _this.panelLeft.removeClass('disabled');
        _this.data[_this.currentPosition].dom.entryDate.removeClass('highlight');
        _this.currentPosition = _this.currentPosition + 1;
        _this.loadMedia();
        _this.data[_this.currentPosition].dom.entryDate.addClass('highlight');
        if (_this.currentPosition == _this.count - 1) {
            _this.panelRight.addClass('disabled');
        }

        _this.scrollWrapper.css('transform', 'translate(' + (- _this.currentPosition) * _this.elementFullWidth + 'px, 0)');
        _this.scrollInfo.css('transform', 'translate(' + (- _this.currentPosition) * _this.infoFullWidth + 'px, 0)');
        _this.scrollDate.css('transform', 'translate(' + (_this.dateStartPos + (- _this.currentPosition) * _this.dateFullWidth) + 'px, 0)');
        _this.moveLock = false;
    }
};

DesktopTimeline.prototype.moveRight = function () {
    var _this = this;
    if (_this.currentPosition === 0) {
        return;
    }
    if (!_this.moveLock) {
        _this.moveLock = true;
        _this.panelRight.removeClass('disabled');
        _this.data[_this.currentPosition].dom.entryDate.removeClass('highlight');
        _this.currentPosition = _this.currentPosition - 1;
        _this.loadMedia();
        _this.data[_this.currentPosition].dom.entryDate.addClass('highlight');
        if (_this.currentPosition === 0) {
            _this.panelLeft.addClass('disabled');
        }

        _this.scrollWrapper.css('transform', 'translate(' + (- _this.currentPosition) * _this.elementFullWidth + 'px, 0)');
        _this.scrollInfo.css('transform', 'translate(' + (- _this.currentPosition) * _this.infoFullWidth + 'px, 0)');
        _this.scrollDate.css('transform', 'translate(' + (_this.dateStartPos + (- _this.currentPosition) * _this.dateFullWidth) + 'px, 0)');
        _this.moveLock = false;
    }
};
