/*
 * @class Calendar ~jquery-calendar plugin~ (https://github.com/ArrobeFr/jquery-calendar)
 * @author Developped by Arrobe (https://www.arrobe.fr)
 * @license Licensed under MIT (https://github.com/ArrobeFr/jquery-calendar/blob/master/LICENSE)
 */

jQuery(document).ready(function($){

  function Calendar(element, Args) {
    // Check Moment.js dependency
    if (typeof(moment) !== 'function'){
      console.error('Calendar require Moment.js !');
      return;
    }

    // Pre-defined events colors
    var eventColors = [     // https://www.materialui.co/colors (800)
      '#C62828',  // Red
      '#AD1457',  // Pink
      '#6A1B9A',  // Purple
      '#4527A0',  // Deep Purple
      '#283593',  // Indigo
      '#1565C0',  // Blue
      '#0277BD',  // Light Blue
      '#00838F',  // Cyan
      '#00695C',  // Teal
      '#2E7D32',  // Green
      '#558B2F',  // Light Green
      '#9E9D24',  // Lime
      '#F9A825',  // Yellow
      '#FF8F00',  // Amber
      '#EF6C00',  // Orange
      '#D84315',  // Deep Orange
      '#4E342E',  // Brown
      '#424242',  // Grey
      '#37474F',  // Blue Grey
      '#212121',  // Grey (900)
    ];

    // Pre-defined events colors
    var daynoteColors = [     // https://www.materialui.co/colors (800)
      '#EF9A9A',  // Red
      '#F48FB1',  // Pink
      '#CE93D8',  // Purple
      '#B39DDB',  // Deep Purple
      '#9FA8DA',  // Indigo
      '#90CAF9',  // Blue
      '#81D4FA',  // Light Blue
      '#80DEEA',  // Cyan
      '#80CBC4',  // Teal
      '#A5D6A7',  // Green
      '#C5E1A5',  // Light Green
      '#E6EE9C',  // Lime
      '#FFF59D',  // Yellow
      '#FFE082',  // Amber
      '#FFCC80',  // Orange
      '#FFAB91',  // Deep Orange
      '#BCAAA4',  // Brown
      '#EEEEEE',  // Grey
      '#B0BEC5'   // Blue Grey
    ];

    // Define default configuration
    this.conf = {
      locale: (Args.locale) ? Args.locale : 'fr',
      view: 'week',
      enableKeyboard: (Args.enableKeyboard) ? Args.enableKeyboard : true,
      defaultView: {
        largeScreen: (Args.defaultView) ? (Args.defaultView.largeScreen) ? (Args.defaultView.largeScreen) : 'week' : 'week',
        smallScreen: (Args.defaultView) ? (Args.defaultView.smallScreen) ? (Args.defaultView.smallScreen) : 'day' : 'day',
        smallScreenThreshold: (Args.defaultView) ? (Args.defaultView.smallScreenThreshold) ? (Args.defaultView.smallScreenThreshold) : 1000 : 1000
      },
      weekday: {
        timeline: {
          fromHour: (Args.weekday) ? (Args.weekday.timeline) ? (Args.weekday.timeline.fromHour) ? Args.weekday.timeline.fromHour : 7 : 7 : 7,
          toHour: (Args.weekday) ? (Args.weekday.timeline) ? (Args.weekday.timeline.toHour) ? Args.weekday.timeline.toHour : 20 : 20 : 20,
          intervalMinutes: (Args.weekday) ? (Args.weekday.timeline) ? (Args.weekday.timeline.intervalMinutes) ? Args.weekday.timeline.intervalMinutes : 60 : 60 : 60,
          format: (Args.weekday) ? (Args.weekday.timeline) ? (Args.weekday.timeline.format) ? Args.weekday.timeline.format : 'HH:mm' : 'HH:mm' : 'HH:mm',
          heightPx: (Args.weekday) ? (Args.weekday.timeline) ? (Args.weekday.timeline.heightPx) ? Args.weekday.timeline.heightPx : 50 : 50 : 50,
          autoResize: (Args.weekday) ? (Args.weekday.timeline) ? (Args.weekday.timeline.autoResize !== undefined) ? Args.weekday.timeline.autoResize : true : true : true
        },
        dayline: {
          weekdays: (Args.weekday) ? (Args.weekday.dayline) ? (Args.weekday.dayline.weekdays) ? Args.weekday.dayline.weekdays : [0, 1, 2, 3, 4, 5, 6] : [0, 1, 2, 3, 4, 5, 6] : [0, 1, 2, 3, 4, 5, 6],
          format: (Args.weekday) ? (Args.weekday.dayline) ? (Args.weekday.dayline.format) ? Args.weekday.dayline.format : 'dddd DD/MM' : 'dddd DD/MM' : 'dddd DD/MM',
          heightPx: (Args.weekday) ? (Args.weekday.dayline) ? (Args.weekday.dayline.heightPx) ? Args.weekday.dayline.heightPx ? (Args.weekday.dayline.heightPx > 31) ? Args.weekday.dayline.heightPx : 31 : 31 : 31 : 31 : 31,
          month: {
            format: (Args.weekday) ? (Args.weekday.dayline) ? (Args.weekday.dayline.month) ? (Args.weekday.dayline.month.format) ? Args.weekday.dayline.month.format : 'MMMM YYYY' : 'MMMM YYYY' : 'MMMM YYYY' : 'MMMM YYYY',
            heightPx: (Args.weekday) ? (Args.weekday.dayline) ? (Args.weekday.dayline.month) ? (Args.weekday.dayline.month.heightPx) ? Args.weekday.dayline.month.heightPx : 30 : 30 : 30 : 30,
            weekFormat: (Args.weekday) ? (Args.weekday.dayline) ? (Args.weekday.dayline.month) ? (Args.weekday.dayline.month.weekFormat) ? Args.weekday.dayline.month.weekFormat : 'w' : 'w' : 'w' : 'w'
          }
        }
      },
      month: {
        format: (Args.month) ? (Args.month.format) ? Args.month.format : 'MMMM YYYY' : 'MMMM YYYY',
        heightPx: (Args.month) ? (Args.month.heightPx) ? (Args.month.heightPx > 31) ? Args.month.heightPx : 31 : 31 : 31,
        weekline: {
          format: (Args.month) ? (Args.month.weekline) ? (Args.month.weekline.format) ? Args.month.weekline.format : 'w' : 'w' : 'w',
          heightPx: (Args.month) ? (Args.month.weekline) ? (Args.month.weekline.heightPx) ? Args.month.weekline.heightPx : 80 : 80 : 80
        },
        dayheader: {
          weekdays: (Args.month) ? (Args.month.dayheader) ? (Args.month.dayheader.weekdays) ? Args.month.dayheader.weekdays : [0, 1, 2, 3, 4, 5, 6] : [0, 1, 2, 3, 4, 5, 6] : [0, 1, 2, 3, 4, 5, 6],
          format: (Args.month) ? (Args.month.dayheader) ? (Args.month.dayheader.format) ? Args.month.dayheader.format : 'dddd' : 'dddd' : 'dddd',
          heightPx: (Args.month) ? (Args.month.dayheader) ? (Args.month.dayheader.heightPx) ? Args.month.dayheader.heightPx : 30 : 30 : 30
        },
        day: {
          format: (Args.month) ? (Args.month.day) ? (Args.month.day.format) ? Args.month.day.format : 'DD/MM' : 'DD/MM' : 'DD/MM'
        }
      },
      unixTimestamp: (Args.unixTimestamp) ? Args.unixTimestamp : moment().format('X'),
      event: {
        hover: {
          delay: (Args.event) ? (Args.event.hover) ? (Args.event.hover.delay) ? Args.event.hover.delay : 500 : 500 : 500
        }
      },
      colors: {
        events: (Args.colors) ? (Args.colors.events) ? Args.colors.events : eventColors : eventColors,
        daynotes: (Args.colors) ? (Args.colors.daynotes) ? Args.colors.daynotes : daynoteColors : daynoteColors,
        random: (Args.colors) ? (Args.colors.random) ? Args.colors.random : true : true
      },
      categories: {
        enable: (Args.categories) ? (Args.categories.enable !== undefined) ? Args.categories.enable : true : true,
        hover: {
          delay: (Args.categories) ? (Args.categories.hover) ? (Args.categories.hover.delay) ? Args.categories.hover.delay : 500 : 500 : 500
        }
      },
      now: {
        enable: (Args.now) ? (Args.now.enable !== undefined) ? (Args.now.enable) : false : false,
        refresh: (Args.now) ? (Args.now.refresh !== undefined) ? (Args.now.refresh) : false : false,
        heightPx: (Args.now) ? (Args.now.heightPx) ? (Args.now.heightPx) : 1 : 1,
        style: (Args.now) ? (Args.now.style) ? (Args.now.style) : 'solid' : 'solid',
        color: (Args.now) ? (Args.now.color) ? (Args.now.color) : '#03A9F4' : '#03A9F4'
      }
    };

    // Sets moment's locale
    moment.locale(this.conf.locale);

    // Sets colors
    this.setEventColors(this.conf.colors.events);
    this.setDaynoteColors(this.conf.colors.daynotes);

    // Create array to associate colors and categories
    this.eventCategoryColor = [];
    this.daynoteCategoryColor = [];

    // Load events
    this.setEvents((Args.events) ? Args.events : []);

    // Load day notes
    this.setDaynotes((Args.daynotes) ? Args.daynotes : []);

    // Define the default view
    if (this.mobileQuery() == 'mobile'){
      this.setView(this.conf.defaultView.smallScreen);
    }else{
      this.setView(this.conf.defaultView.largeScreen);
    }

    // Init
    this.element = element;
    this.initTime = false;
  }

  Calendar.prototype.init = function() {
    var millis = Date.now();
    this.element.addClass('loading');
    this.calculateCurrentInterval();
    $(this.element).trigger('Calendar.init', [
      this,
      this.getPrevViewInterval(),
      this.getViewInterval(),
      this.getNextViewInterval()
    ]);
    $(this.element).html('');
    if (!$(this.element).hasClass('calendar')){
      $(this.element).addClass('calendar');
    }
    if (this.getView() == 'day' || this.getView() == 'week'){
      if (this.conf.weekday.timeline.autoResize){
        this.resizeTimeline();
      }
    }
    this.drawCategories();
    if (this.getView() == 'day' || this.getView() == 'week'){
      this.weekDrawTime();
      this.weekDrawDays();
      this.weekDrawDaynotes();
      this.weekDrawEvents();
    }
    if (this.getView() == 'month'){
      this.monthDrawWeek();
      this.monthDrawWeekNumbers();
      this.monthDrawWeekDays();
      this.monthDrawDaynotes();
      this.monthDrawEvents();
    }
    this.drawModal();
    this.drawNow();
    this.positionEvents();
    this.hoverEventOrDaynote();
    this.clickEventOrDaynote();
    this.addBtnLeftRight();
    this.addSwipe();
    this.clickSwitchView();
    this.keyboardSwitchView();
    this.defaultEvents();
    this.element.removeClass('loading');
    this.initTime = (Date.now()-millis)+'ms';
  };

  Calendar.prototype.defaultEvents = function() {
    if (this.binded == undefined){
      var eventMouseenterDefault = function(event, self, elem){
        if (!event.isDefaultPrevented()){
          if (parseInt(elem.css('top')) >= (elem.closest('ul').height() / 2) - self.conf.weekday.timeline.heightPx){
            heightPx = parseInt(elem.css('top')) + parseInt(elem.css('height'));
            elem
              .css('z-index', 10)
              .animate({
                height:heightPx,
                top:0,
                width:'100%',
                left:0
              }, 50)
            ;
          }else{
            heightPx = elem.closest('ul').height() - parseInt(elem.css('top'));
            elem
              .css('z-index', 10)
              .animate({
                height:heightPx,
                width:'100%',
                left:0
              }, 50)
            ;
          }
          elem.find('.event-name').removeClass('hidden');
          elem.find('.event-content').removeClass('hidden');
        }
      };
      $(self.element).off('Calendar.event-mouseenter', eventMouseenterDefault).on('Calendar.event-mouseenter', eventMouseenterDefault);
      $(self.element).off('Calendar.daynote-mouseenter', eventMouseenterDefault).on('Calendar.daynote-mouseenter', eventMouseenterDefault);
      var eventMouseleaveDefault = function(event, self, elem){
        if (!event.isDefaultPrevented()){
          elem
            .css('z-index', 'auto')
            .animate({
              height:parseFloat(elem.attr('data-height'))+'px',
              top:parseFloat(elem.attr('data-top')),
              width:parseFloat(elem.attr('data-width'))+'%',
              left:parseFloat(elem.attr('data-left'))+'%'
            }, 50)
          ;
          elem.find('.event-content').addClass('hidden');
        }
      };
      $(self.element).off('Calendar.event-mouseleave', eventMouseleaveDefault).on('Calendar.event-mouseleave', eventMouseleaveDefault);
      $(self.element).off('Calendar.daynote-mouseleave', eventMouseleaveDefault).on('Calendar.daynote-mouseleave', eventMouseleaveDefault);
      var eventClickDefault = function(event, self, elem, evt){
        if (!event.isDefaultPrevented()){
          modal = $(self.element).find('#calendar-modal');
          rgb = self.hexToRgb(elem.attr('data-color'));
          modal.css('background', 'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', 0.5)');
          modal.find('.modal-title').append(elem.attr('data-title')+' ');
          modal.find('.modal-body').append(
            $('<h4>').append(
              $(this).closest('.calendar-events-day').find('span').html()
            ).append(
              ' '
            ).append(
              $('<small>').text(elem.find('.event-date').text())
            )
          );
          modal.find('.modal-body').append(elem.find('.event-content').html());
          modal.modal('show');
          modal.on('hidden.bs.modal', function (e) {
            $(e.target).find('.modal-title').html('');
            $(e.target).find('.modal-body').html('');
          });
        }
      };
      $(self.element).off('Calendar.event-click', eventClickDefault).on('Calendar.event-click', eventClickDefault);
      $(self.element).off('Calendar.daynote-click', eventClickDefault).on('Calendar.daynote-click', eventClickDefault);
      var eventCategoryClickDefault = function(event, self, elem){
        if (!event.isDefaultPrevented()){
          var events = self.element.find('.calendar-event[data-category="'+$(elem).text()+'"]');
          if ($(elem).attr('data-clicked') == 'false'){
            events.animate({
              opacity: 0
            }, 200, function(){
              events.css('display', 'none');
              $(elem).css('background-color', '#E0E0E0');
              $(elem).attr('data-clicked', true);
            });
          }
          if ($(elem).attr('data-clicked') == 'true'){
            events.css('display', 'list-item');
            $(elem).css('background-color', $(elem).attr('data-color'));
            events.animate({
              opacity: 1
            }, 200, function(){
              $(elem).attr('data-clicked', false);
            });
          }
        }
      };
      $(self.element).off('Calendar.category-event-click', eventCategoryClickDefault).on('Calendar.category-event-click', eventCategoryClickDefault);
      $(self.element).off('Calendar.category-daynote-click', eventCategoryClickDefault).on('Calendar.category-daynote-click', eventCategoryClickDefault);
      var eventCategoryMouseenterDefault = function(event, self, elem){
        if (!event.isDefaultPrevented()){
          self.element.find('.calendar-event').each(function(i, e){
            if ($(e).attr('data-category') != elem.text()){
              $(e).css('opacity', 0.2);
            }
          });
        }
      };
      $(self.element).off('Calendar.category-event-mouseenter', eventCategoryMouseenterDefault).on('Calendar.category-event-mouseenter', eventCategoryMouseenterDefault);
      $(self.element).off('Calendar.category-daynote-mouseenter', eventCategoryMouseenterDefault).on('Calendar.category-daynote-mouseenter', eventCategoryMouseenterDefault);
      var eventCategoryMouseleaveDefault = function(event, self, elem){
        if (!event.isDefaultPrevented()){
          self.element.find('.calendar-event').each(function(i, e){
            $(e).css('opacity', 1);
          });
        }
      };
      $(self.element).off('Calendar.category-event-mouseleave', eventCategoryMouseleaveDefault).on('Calendar.category-event-mouseleave', eventCategoryMouseleaveDefault);
      $(self.element).off('Calendar.category-daynote-mouseleave', eventCategoryMouseleaveDefault).on('Calendar.category-daynote-mouseleave', eventCategoryMouseleaveDefault);
      this.binded = true;
    }
  };

  Calendar.prototype.weekDrawTime = function() {
    $(this.element).append($('<div>', {
      class: 'calendar-timeline'
    }));
    $(this.element).find('div.calendar-timeline').css('padding-top', this.conf.weekday.dayline.heightPx+'px');
    var marginTop = this.conf.weekday.dayline.month.heightPx;
    if (this.conf.categories.enable){
      marginTop += 30;
    }
    $(this.element).find('div.calendar-timeline').css('margin-top', marginTop+'px');

    $(this.element).find('div.calendar-timeline').append($('<ul>'));

    ul = $(this.element).find('div.calendar-timeline').find('ul');

    time = moment(moment()).startOf('Week');
    time.add(this.conf.weekday.timeline.fromHour, 'H');

    i = this.conf.weekday.timeline.fromHour;
    while (i < this.conf.weekday.timeline.toHour){
      li = $('<li>');
      li.append($('<span>').text(time.format(this.conf.weekday.timeline.format)));
      li.height(this.conf.weekday.timeline.heightPx);
      ul.append(li);
      i = parseInt(time.format('HH'));
      time.add(this.conf.weekday.timeline.intervalMinutes, 'm');
    }
  };

  Calendar.prototype.weekDrawDays = function() {
    $(this.element).append($('<div>', {
      class: 'calendar-events'
    }));

    var div = $('<div>', {
      class: 'calendar-month'
    })
      .css('height', this.conf.weekday.dayline.month.heightPx+'px')
      .css('text-align', 'center')
      .css('padding-top', (this.conf.weekday.dayline.month.heightPx-20)/2+'px')
    ;
    if (this.getView() == 'week'){
      div.text(this.miscUcfirstString(moment.unix(this.conf.unixTimestamp).format(this.conf.weekday.dayline.month.format)));
      div.addClass('weektomonth');
    }
    if (this.getView() == 'day'){
      div.text(this.miscUcfirstString(moment.unix(this.conf.unixTimestamp).format(this.conf.weekday.dayline.month.weekFormat)));
      div.addClass('daytoweek');
    }
    $(this.element).find('div.calendar-events').append(div);

    $(this.element).find('div.calendar-events').append($('<ul>'));

    ul = $(this.element).find('div.calendar-events').find('ul');

    var days = this.getViewDays();

    for (var i=0; i<days.length; i++){
      time = moment.unix(days[i]);

      li = $('<li>', {
        class: 'calendar-events-day'
      });
      li.css('width',100/days.length+'%');
      div = $('<div>', {
        class: 'calendar-day-header'
      });
      div.height(this.conf.weekday.dayline.heightPx);
      if (i == 0 && this.mobileQuery() == 'desktop'){
        div.append($('<button>', {
          class: 'btn btn-sm btn-default btn-move-calendar'
        }).attr('data-direction', 'left').append($('<i>', {
          class: 'glyphicon glyphicon-arrow-left'
        })));
      }
      div.append($('<span>')
        .addClass('weektoday')
        .css('width', '100%')
        .text(this.miscUcfirstString(time.format(this.conf.weekday.dayline.format)))
      );
      if (i == days.length - 1 && this.mobileQuery() == 'desktop'){
        div.append($('<button>', {
          class: 'btn btn-sm btn-default btn-move-calendar'
        }).attr('data-direction', 'right').append($('<i>', {
          class: 'glyphicon glyphicon-arrow-right'
        })));
      }
      li.append(div);
      li.attr('data-time', time.startOf('day').format('X'));
      li.append($('<ul>'));
      li.find('ul').height(((60 / this.conf.weekday.timeline.intervalMinutes) * (this.conf.weekday.timeline.toHour - this.conf.weekday.timeline.fromHour) * this.conf.weekday.timeline.heightPx) + this.conf.weekday.timeline.heightPx);
      ul.append(li);
    }

    var maxHeight = 0;
    $(this.element).find('.calendar-day-header').each(function(){
      if ($(this).height() > maxHeight){
        maxHeight = $(this).height();
      }
    });
    $(this.element).find('.calendar-day-header').each(function(){
      $(this).height(maxHeight);
    });
  };

  Calendar.prototype.monthDrawWeek = function() {
    $(this.element).append($('<div>', {
      class: 'calendar-events'
    }));
    var div = $('<div>', {
      class: 'calendar-month'
    });
    div.css('height', this.conf.month.heightPx+'px');

    if (this.mobileQuery() == 'desktop'){
      div.append($('<button>', {
        class: 'btn btn-sm btn-default btn-move-calendar'
      })
        .attr('data-direction', 'left')
        .append($('<i>', {
          class: 'glyphicon glyphicon-arrow-left'
        }))
      );
    }
    div.append($('<span>')
      .css('position', 'absolute')
      .css('top', this.conf.month.heightPx/2+'px')
      .css('right', '50%')
      .css('transform', 'translate(50%,-50%)')
      .text(this.miscUcfirstString(moment.unix(this.conf.unixTimestamp).format(this.conf.month.format)))
    );
    if (this.mobileQuery() == 'desktop'){
      div.append($('<button>', {
        class: 'btn btn-sm btn-default btn-move-calendar'
      })
        .css('float', 'right')
        .attr('data-direction', 'right')
        .append($('<i>', {
          class: 'glyphicon glyphicon-arrow-right'
        }))
      );
    }

    $(this.element).find('div.calendar-events').append(div);
    $(this.element).find('div.calendar-events').append($('<ul>'));

    ul = $(this.element).find('div.calendar-events').find('ul');

    var time = moment.unix(this.conf.unixTimestamp).startOf('month');
    var month = parseInt(time.format('MM'));
    var week = parseInt(time.format('w'));
    var nbWeeks=0;
    while (parseInt(time.format('MM')) == month){
      nbWeeks++;
      while (parseInt(time.format('w')) == week){
        time.add(1, 'days');
      }
      week = parseInt(time.format('w'));
    }

    for (var i=0; i<this.conf.month.dayheader.weekdays.length; i++){
      var time = moment().startOf('week').add(this.conf.month.dayheader.weekdays[i], 'days');
      var li = $('<li>', {
        class: 'calendar-month-day-header'
      });
      li.append($('<div>')
        .css('height', this.conf.month.dayheader.heightPx+'px')
        .css('padding-top', (this.conf.month.dayheader.heightPx-20)/2+'px')
        .text(this.miscUcfirstString(time.format(this.conf.month.dayheader.format)))
      );
      li.css('width', 100/this.conf.month.dayheader.weekdays.length+'%');
      li.append($('<ul>').css('height', nbWeeks*this.conf.month.weekline.heightPx+'px'));
      ul.append(li);
    }
    var maxHeight = 0;
    $(this.element).find('.calendar-month-day-header').each(function(){
      var e = $(this).find('div');
      if ($(e).height() > maxHeight){
        maxHeight = $(e).height();
      }
    });
    $(this.element).find('.calendar-month-day-header').each(function(){
      var e = $(this).find('div');
      $(e).height(maxHeight);
    });
  };

  Calendar.prototype.monthDrawWeekNumbers = function() {
    $(this.element).append($('<div>', {
      class: 'calendar-timeline'
    }));
    var marginTop = this.conf.month.dayheader.heightPx;
    marginTop += this.conf.month.heightPx;
    if (this.conf.categories.enable){
      marginTop += 30;
    }
    marginTop += 2;
    $(this.element).find('div.calendar-timeline').css('margin-top', marginTop+'px');
    $(this.element).find('div.calendar-timeline').append($('<ul>'));

    ul = $(this.element).find('div.calendar-timeline').find('ul');

    var time = moment.unix(this.conf.unixTimestamp).startOf('month');
    var month = parseInt(time.format('MM'));
    var week = parseInt(time.format('w'));
    while (parseInt(time.format('MM')) == month){
      li = $('<li>', {
        class: 'monthtoweek'
      });
      li.append($('<span>')
        .attr('data-timestamp', time.format('X'))
        .text(time.format(this.conf.month.weekline.format)).css('margin-top', this.conf.month.weekline.heightPx/2+'px')
      );
      li.height(this.conf.month.weekline.heightPx);
      ul.append(li);
      while (parseInt(time.format('w')) == week){
        time.add(1, 'days');
      }
      week = parseInt(time.format('w'));
    }
  };

  Calendar.prototype.monthDrawWeekDays = function() {
    var days = this.getViewDays();

    var i = parseInt(moment.unix(days[0]).weekday());
    var time = moment.unix(days[0]);
    while (i>0){
      time = time.subtract(1, 'days');
      var targetUl = this.element.find(".calendar-events>ul>.calendar-month-day-header>div:contains('"+this.miscUcfirstString(time.format(this.conf.month.dayheader.format))+"')").parent().find('ul');
      var li = $('<li>');
      li.css('height', this.conf.month.weekline.heightPx+'px');
      $(targetUl).append(li);
      i--;
    }

    for (var i=0; i<days.length; i++){
      var targetUl = this.element.find(".calendar-events>ul>.calendar-month-day-header>div:contains('"+this.miscUcfirstString(moment.unix(days[i]).format(this.conf.month.dayheader.format))+"')").parent().find('ul');
      var li = $('<li>', {
        class: 'calendar-month-events-day'
      });
      li.css('height', this.conf.month.weekline.heightPx+'px');
      li.attr('data-time-from', moment.unix(days[i]).startOf('day').format('X'));
      li.attr('data-time-to', moment.unix(days[i]).endOf('day').format('X'));
      li.append($('<span>').text(moment.unix(days[i]).format(this.conf.month.day.format)));
      $(targetUl).append(li);
    }

    this.element.find('.calendar-month-events-day').each(function() {
      $(this).append($('<ul>'));
    });
  };

  Calendar.prototype.drawCategories = function() {
    this.determineEventsCategories();
    this.determineDaynotesCategories();

    if (this.conf.categories.enable){
      var div = $('<div>', {
        class:'calendar-categories'
      }).css('height', '20px');
      for (var i=0; i<this.eventCategoryColor.length; i++){
        var label = $('<span>', {
          class: 'label label-default calendar-label'
        });
        label.css('margin-right', '5px');
        label.css('background-color', this.eventCategoryColor[i].color);
        label.css('cursor', 'pointer');
        label.attr('data-color', this.eventCategoryColor[i].color);
        label.attr('data-clicked', false);
        label.text(this.eventCategoryColor[i].category);
        div.append(label);
      }
      for (var i=0; i<this.daynoteCategoryColor.length; i++){
        var label = $('<span>', {
          class: 'label label-default calendar-label calendar-label-daynote'
        });
        label.css('margin-right', '5px');
        label.css('background-color', this.daynoteCategoryColor[i].color);
        label.css('cursor', 'pointer');
        label.attr('data-color', this.daynoteCategoryColor[i].color);
        label.attr('data-clicked', false);
        label.text(this.daynoteCategoryColor[i].category);
        div.append(label);
      }
      this.element.prepend(div);
      this.hoverCategory();
      this.clickCategory();
    }
  };

  Calendar.prototype.hoverCategory = function(){
    var self = this;
    this.element.find('.calendar-label').hover(
      function(){
        elem = $(this);
        setTimeoutConst = setTimeout(function(){
          if (elem.hasClass('calendar-label-daynote')){
            $(self.element).trigger('Calendar.category-daynote-mouseenter', [
              self,
              elem
            ]);
          }else{
            $(self.element).trigger('Calendar.category-event-mouseenter', [
              self,
              elem
            ]);
          }
        }, self.conf.categories.hover.delay);
      },
      function(){
        clearTimeout(setTimeoutConst);
        elem = $(this);
        if (elem.hasClass('calendar-label-daynote')){
          $(self.element).trigger('Calendar.category-daynote-mouseleave', [
            self,
            elem
          ]);
        }else{
          $(self.element).trigger('Calendar.category-event-mouseleave', [
            self,
            elem
          ]);
        }
      }
    );
  };

  Calendar.prototype.clickCategory = function(){
    var self = this;
    this.element.find('.calendar-label').click(function(event){
      if ($(event.target).hasClass('calendar-label-daynote')){
        $(self.element).trigger('Calendar.category-daynote-click', [
          self,
          elem
        ]);
      }else{
        $(self.element).trigger('Calendar.category-event-click', [
          self,
          elem
        ]);
      }
    });
  };

  Calendar.prototype.positionEvents = function() {
    if (this.getView() == 'day' || this.getView() == 'week'){
      this.positionEventsInWeek();
    }
    if (this.getView() == 'month'){
      this.positionEventsInMonth();
    }
  };

  Calendar.prototype.positionEventsInWeek = function() {
    self = this;
    zeroLast = 0;
    this.element.find('.calendar-event').each(function(i){
      // Place each event in the grid -> need to set top position and height
      start = parseInt($(this).attr('data-start'));
      end = parseInt($(this).attr('data-end'));
      duration = end - start;
      zero = parseInt($(this).closest('li.calendar-events-day').attr('data-time'))+(self.conf.weekday.timeline.fromHour*60*60);
      if (zero > zeroLast){
        zeroLast = zero;
      }
      eventTop = ((start - zero) / 60 / self.conf.weekday.timeline.intervalMinutes * self.conf.weekday.timeline.heightPx) - 1;
      eventHeight = (duration / 60 / self.conf.weekday.timeline.intervalMinutes * self.conf.weekday.timeline.heightPx) + 1;

      endsOnCurrent = 0;
      nbEventNotOnCurrent = false;
      nbEventOnCurrent = 0;
      tmp = [];
      currentElement = $(this);
      $(this).closest('ul').find('li.calendar-event').each(function(j, e){
        if ($(e)[0] != currentElement[0]){
          if (parseInt(currentElement.attr('data-start')) < parseInt($(e).attr('data-end')) && parseInt(currentElement.attr('data-end')) > parseInt($(e).attr('data-start'))) {
            tmp.push($(e));
            nbEventOnCurrent++;
          }
          if (parseInt(currentElement.attr('data-start')) < parseInt($(e).attr('data-end')) && parseInt(currentElement.attr('data-end')) > parseInt($(e).attr('data-end'))){
            endsOnCurrent++;
          }else if (parseInt(currentElement.attr('data-start')) == parseInt($(e).attr('data-start')) && parseInt($(e).attr('data-index')) < parseInt(currentElement.attr('data-index'))){
            endsOnCurrent++;
          }
        }
      });

      var dates = [];
      dates.push(parseInt(currentElement.attr('data-start')));
      dates.push(parseInt(currentElement.attr('data-end')));

      for (var i=0; i<tmp.length; i++){
        if (parseInt(tmp[i].attr('data-start')) >= parseInt(currentElement.attr('data-start')) && parseInt(tmp[i].attr('data-start')) <= parseInt(currentElement.attr('data-end'))){
          dates.push(parseInt(tmp[i].attr('data-start')));
        }
        if (parseInt(tmp[i].attr('data-end')) >= parseInt(currentElement.attr('data-start')) && parseInt(tmp[i].attr('data-end')) <= parseInt(currentElement.attr('data-end'))){
          dates.push(parseInt(tmp[i].attr('data-end')));
        }
      }

      dates = self.miscUniqueArray(dates);
      dates.sort(function(a,b) {return (a > b) ? 1 : -1;});

      for (var i=0; i<dates.length; i++){
        var enMemeTemps=0;
        for (var j=0; j<tmp.length; j++){
          if (dates[i] > parseInt(tmp[j].attr('data-start')) && dates[i] <= parseInt(tmp[j].attr('data-end'))){
            enMemeTemps++;
          }
        }
        if ((enMemeTemps > 0 && enMemeTemps > nbEventNotOnCurrent) || nbEventNotOnCurrent === false){
          nbEventNotOnCurrent = enMemeTemps;
        }
      }

      currentElement.attr('data-events', nbEventNotOnCurrent + 1);
      currentElement.attr('data-divider', nbEventNotOnCurrent + 1);

      for (var i=0; i<tmp.length; i++){
        if (parseInt(tmp[i].attr('data-divider')) > parseInt(currentElement.attr('data-divider'))){
          currentElement.attr('data-divider', tmp[i].attr('data-divider'));
        }
      }

      var positions = [];
      for (var i=0; i<parseInt(currentElement.attr('data-divider')); i++){
        positions[i] = false;
        for (var j=0; j<tmp.length; j++){
          for (var k=0; k<String(tmp[j].attr('data-positions')).split(',').length; k++){
            var position = String(tmp[j].attr('data-positions')).split(',')[k];
            if (position == i){
              positions[i] = true;
            }
          }
        }
      }

      currentElement.attr('data-positions', -1);

      var i = 0;
      while (parseInt(currentElement.attr('data-positions')) == -1){
        if (positions[i] === false){
          currentElement.attr('data-positions', i);
          if (parseInt(currentElement.attr('data-divider')) - parseInt(currentElement.attr('data-events')) + 1 > 1){
            while (positions[i+1] === false){
              currentElement.attr('data-positions', currentElement.attr('data-positions')+','+(i+1));
              i++;
            }
          }
        }
        i++;
      }

      eventWidth = 100 / (parseInt(currentElement.attr('data-divider')) / String(currentElement.attr('data-positions')).split(',').length);
      eventLeft = (String(currentElement.attr('data-positions')).split(',')[0] / parseInt(currentElement.attr('data-divider'))) * 100;

      self.setEventPosition(this, eventTop, eventHeight, eventLeft, eventWidth);
    });
  };

  Calendar.prototype.positionEventsInMonth = function() {
    var self = this;
    this.element.find('li.calendar-month-events-day').each(function(){
      var n = $(this).find('.calendar-event').length;
      $(this).find('.calendar-event').each(function(i){

        var eventTop = (parseInt($(this).closest('.calendar-month-events-day').index()) * self.conf.month.weekline.heightPx) + 20 - 1;
        var eventHeight = self.conf.month.weekline.heightPx - 21 + 1;
        var eventWidth = 100/n;
        var eventLeft = (100/n)*i;

        self.setEventPosition(this, eventTop, eventHeight, eventLeft, eventWidth);
      });
    });
  };

  Calendar.prototype.setEventPosition = function(elem, eventTop, eventHeight, eventLeft, eventWidth) {
    $(elem).attr('data-top', eventTop);
    $(elem).attr('data-height', eventHeight);
    $(elem).attr('data-left', eventLeft);
    $(elem).attr('data-width', eventWidth);

    $(elem).css({
      top: (eventTop) + 'px',
      height: (eventHeight) + 'px',
      left: eventLeft + '%',
      width: eventWidth + '%'
    });
  };

  Calendar.prototype.weekDrawEvents = function() {
    for (var i=0; i<this.events.length; i++){
      e = this.events[i];
      day = false;
      fromHour = this.conf.weekday.timeline.fromHour;
      toHour = this.conf.weekday.timeline.toHour;
      $(this.element).find('.calendar-events-day').each(function(i, d){
        if (e.start >= (parseInt($(d).attr('data-time'))+fromHour*60*60) && e.end <= (parseInt($(d).attr('data-time'))+toHour*60*60)){
          day = d;
        }
      });
      if (day === false){
        //console.warn('Event '+i+' out of current view');
      }else{
        this.drawEventsOrDaynotes(
          day,
          i,
          moment.unix(e.start).format('X'),
          moment.unix(e.end).format('X'),
          e.title,
          e.content,
          e.category,
          this.getEventCategoryColor(e.category),
          moment.unix(e.start).format(this.conf.weekday.timeline.format)+' - '+moment.unix(e.end).format(this.conf.weekday.timeline.format),
          ['calendar-event']
        );
      }
    }
  };

  Calendar.prototype.weekDrawDaynotes = function() {
    for (var i=0; i<this.daynotes.length; i++){
      e = this.daynotes[i];
      day = false;
      $(this.element).find('.calendar-events-day').each(function(i, d){
        if (parseInt(moment.unix(e.time).startOf('day').format('X')) == parseInt($(d).attr('data-time'))) {
          day = d;
        }
      });

      if (day === false){
        //console.warn('Event '+i+' out of current view');
      }else{
        color = this.getDaynoteCategoryColor(e.category);
        var from = this.conf.weekday.timeline.fromHour;
        var toHour = this.conf.weekday.timeline.toHour + parseInt(this.conf.weekday.timeline.intervalMinutes / 60);
        var toMin = ((this.conf.weekday.timeline.intervalMinutes / 60) - parseInt(this.conf.weekday.timeline.intervalMinutes / 60))*60;
        this.drawEventsOrDaynotes(
          day,
          i,
          moment.unix(e.time).startOf('day').add(from, 'h').format('X'),
          moment.unix(e.time).startOf('day').add(toHour, 'h').add(toMin, 'm').format('X'),
          e.title,
          e.content,
          e.category,
          this.getDaynoteCategoryColor(e.category),
          '',
          ['calendar-event', 'calendar-daynote']
        );
      }
    }
  };

  Calendar.prototype.drawEventsOrDaynotes = function(e, index, start, end, title, content, category, color, time_interval, classes) {
    var li = $('<li>');
    for (var i=0; i<classes.length; i++){
      li.addClass(classes[i]);
    }
    li.attr('data-index', index);
    li.attr('data-start', start);
    li.attr('data-end', end);
    li.attr('data-title', title);
    li.attr('data-content', content);
    li.attr('data-category', category);
    li.attr('data-color', color);
    li.css('background', color);
    a = $('<a>', {
      href: '#'
    });
    a.append($('<em>', {
      class: 'event-name'
    }).text(title));
    a.append($('<em>', {
      class: 'event-content hidden'
    }));

    a.find('.event-content').append($('<b>', {
      class: 'event-date'
    }).html(time_interval));
    a.find('.event-content').append($('<br>'));
    a.find('.event-content').append(content);

    li.append(a);
    $(e).find('ul').append(li);
  };

  Calendar.prototype.monthDrawEvents = function() {
    for (var i=0; i<this.events.length; i++){
      e = this.events[i];
      day = false;
      $(this.element).find('.calendar-month-events-day').each(function(i, d){
        if (e.start >= (parseInt($(d).attr('data-time-from'))) && e.end <= (parseInt($(d).attr('data-time-to')))){
          day = d;
        }
      });
      if (day === false){
        //console.warn('Event '+i+' out of current view');
      }else{
        this.drawEventsOrDaynotes(
          day,
          i,
          moment.unix(e.start).format('X'),
          moment.unix(e.end).format('X'),
          e.title,
          e.content,
          e.category,
          this.getEventCategoryColor(e.category),
          moment.unix(e.start).format(this.conf.month.day.format)+' : '+moment.unix(e.start).format(this.conf.weekday.timeline.format)+' - '+moment.unix(e.end).format(this.conf.weekday.timeline.format),
          ['calendar-event']
        );
      }
    }
  };

  Calendar.prototype.monthDrawDaynotes = function() {
    for (var i=0; i<this.daynotes.length; i++){
      e = this.daynotes[i];
      day = false;
      $(this.element).find('.calendar-month-events-day').each(function(i, d){
        if (e.time >= (parseInt($(d).attr('data-time-from'))) && e.time <= (parseInt($(d).attr('data-time-to')))){
          day = d;
        }
      });
      if (day === false){
        //console.warn('Event '+i+' out of current view');
      }else{
        this.drawEventsOrDaynotes(
          day,
          i,
          moment.unix(e.time).startOf('day').format('X'),
          moment.unix(e.time).endOf('day').format('X'),
          e.title,
          e.content,
          e.category,
          this.getDaynoteCategoryColor(e.category),
          moment.unix(e.time).format(this.conf.month.day.format),
          ['calendar-event', 'calendar-daynote']
        );
      }
    }
  };

  Calendar.prototype.drawModal = function() {
    modal = '<div class="modal fade" id="calendar-modal" tabindex="-1" role="dialog">';
    modal+= '<div class="modal-dialog" role="document">';
    modal+= '<div class="modal-content">';
    modal+= '<div class="modal-header">';
    modal+= '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    modal+= '<h3 class="modal-title"></h3>';
    modal+= '</div>';
    modal+= '<div class="modal-body">';
    modal+= '</div>';
    modal+= '</div>';
    modal+= '</div>';
    modal+= '</div>';
    $(this.element).append(modal);
  };

  Calendar.prototype.drawNow = function() {
    if (this.conf.now.enable){
      var hr = $('<hr>', {
        class: 'featurette-divider calendar-now'
      });
      hr.css('width', '100%');
      hr.css('position', 'absolute');
      hr.css('z-index', 3);
      hr.css('border-top', this.conf.now.heightPx+'px '+this.conf.now.style+' '+this.conf.now.color);
      var top = ((moment().format('X') - moment().startOf('day').add(this.conf.weekday.timeline.fromHour, 'h').format('X')) / 60 / this.conf.weekday.timeline.intervalMinutes * this.conf.weekday.timeline.heightPx) - (this.conf.weekday.timeline.heightPx / 2);
      hr.css('top', top+'px');
      this.element.find('li.calendar-events-day[data-time="'+moment().startOf('day').format('X')+'"]').find('ul').append(hr);
      if (this.conf.now.refresh){
        var self = this;
        setInterval(function(){
          var hr = self.element.find('hr.calendar-now').remove();
          var hr = $('<hr>', {
            class: 'featurette-divider calendar-now'
          });
          hr.css('width', '100%');
          hr.css('position', 'absolute');
          hr.css('z-index', 2);
          hr.css('border-top', self.conf.now.heightPx+'px '+self.conf.now.style+' '+self.conf.now.color);
          var top = ((moment().format('X') - moment().startOf('day').add(self.conf.weekday.timeline.fromHour, 'h').format('X')) / 60 / self.conf.weekday.timeline.intervalMinutes * self.conf.weekday.timeline.heightPx) - (self.conf.weekday.timeline.heightPx / 2);
          hr.css('top', top+'px');
          self.element.find('li.calendar-events-day[data-time="'+moment().startOf('day').format('X')+'"]').find('ul').append(hr);
        }, 10000);
      }
    }
  };

  Calendar.prototype.hoverEventOrDaynote = function() {
    var self = this;
    this.element.find('.calendar-event').each(function(){
      var setTimeoutConst;
      $(this).hover(
        function(){
          elem = $(this);
          setTimeoutConst = setTimeout(function(){
            if (elem.hasClass('calendar-daynote')){
              $(self.element).trigger('Calendar.daynote-mouseenter', [
                self,
                elem
              ]);
            }else{
              $(self.element).trigger('Calendar.event-mouseenter', [
                self,
                elem
              ]);
            }

          }, self.conf.event.hover.delay);
        },
        function(){
          clearTimeout(setTimeoutConst);
          elem = $(this);
          if (elem.hasClass('calendar-daynote')){
            $(self.element).trigger('Calendar.daynote-mouseleave', [
              self,
              elem
            ]);
          }else{
            $(self.element).trigger('Calendar.event-mouseleave', [
              self,
              elem
            ]);
          }

        }
      );
    });
  };

  Calendar.prototype.clickEventOrDaynote = function() {
    self = this;
    this.element.find('.calendar-event').each(function(){
      $(this).click(function(event){
        elem = $(event.target);
        if (elem.prop('nodeName') !== 'LI' && !elem.hasClass('calendar-event')){
          elem = elem.closest('li.calendar-event');
        }
        if (elem.hasClass('calendar-daynote')){
          $(self.element).trigger('Calendar.daynote-click', [
            self,
            elem,
            self.daynotes[parseInt(elem.attr('data-index'))]
          ]);
        }else{
          $(self.element).trigger('Calendar.event-click', [
            self,
            elem,
            self.events[parseInt(elem.attr('data-index'))]
          ]);
        }
      });
    });
  };

  Calendar.prototype.resizeTimeline = function() {
    for (var j=0; j<this.events.length; j++){
      if (parseInt(moment.unix(this.events[j].start).format('HH')) < this.conf.weekday.timeline.fromHour){
        this.conf.weekday.timeline.fromHour = parseInt(moment.unix(this.events[j].start).format('HH'));
      }
      if (parseInt(this.events[j].end) > parseInt(moment.unix(this.events[j].end).startOf('day').add(this.conf.weekday.timeline.toHour, 'hour').format('X'))){
        this.conf.weekday.timeline.toHour = parseInt(moment.unix(this.events[j].end).hour());
        if (this.conf.weekday.timeline.toHour < 23){
          this.conf.weekday.timeline.toHour++;
        }
      }
    }
  };

  Calendar.prototype.getViewDays = function() {
    var days = [];
    if (this.getView() == 'day'){
      days.push(parseInt(moment.unix(this.conf.unixTimestamp).format('X')));
    }
    if (this.getView() == 'week'){
      for (var i=0; i<this.conf.weekday.dayline.weekdays.length; i++){
        days.push(parseInt(moment.unix(this.conf.unixTimestamp).startOf('week').add(this.conf.weekday.dayline.weekdays[i], 'days').format('X')));
      }
    }
    if (this.getView() == 'month'){
      var nbDaysInMonth = moment.unix(this.conf.unixTimestamp).daysInMonth();
      var time = moment.unix(this.conf.unixTimestamp).startOf('month');
      for (var i=0; i<nbDaysInMonth; i++){
        days.push(parseInt(time.startOf('day').format('X')));
        time.add(1, 'days');
      }
    }
    return days;
  };

  Calendar.prototype.addBtnLeftRight = function() {
    var self = this;
    this.element.find('.btn-move-calendar').click(function(event){
      elem = $(event.target);
      if (elem.prop('nodeName') !== 'BUTTON'){
        elem = elem.closest('.btn-move-calendar');
      }
      self.moveCurrentIntervalView($(elem).attr('data-direction'));
    });
  };

  Calendar.prototype.addSwipe = function() {
    var self = this;
    self.element.find('.calendar-events').swipe({
      swipe:function(event, direction) {
        if (direction == 'left' || direction == 'right'){
          // Le swipe est à l'envers
          if (direction == 'left'){
            direction = 'right';
          }else if (direction == 'right'){
            direction = 'left';
          }
          self.moveCurrentIntervalView(direction);
        }
      },
      threshold: 100,
      allowPageScroll: 'auto'
    });
  };

  Calendar.prototype.clickSwitchView = function() {
    var self = this;
    // monthtoweek
    $(this.element).find('.monthtoweek').click(function(){
      self.setTimestamp(parseInt($(this).find('span').attr('data-timestamp')));
      self.setView('week');
      self.init();
    });
    // weektomonth
    $(this.element).find('.weektomonth').click(function(){
      self.setView('month');
      self.init();
    });
    // daytoweek
    $(this.element).find('.daytoweek').click(function(){
      self.setView('week');
      self.init();
    });
    // weektoday
    $(this.element).find('.weektoday').click(function(){
      self.setTimestamp($(this).closest('.calendar-events-day').attr('data-time'));
      self.setView('day');
      self.init();
    });
  };

  Calendar.prototype.keyboardSwitchView = function() {
    if (!this.conf.enableKeyboard){
      return;
    }
    var self = this;
    $(window).unbind('keydown').on('keydown', function(x){
      // Ctrl + left
      if (x.keyCode == 37 && x.ctrlKey){
        self.moveCurrentIntervalView('left');
      }
      // Ctrl + right
      if (x.keyCode == 39 && x.ctrlKey){
        self.moveCurrentIntervalView('right');
      }
      // Ctrl + up
      if (x.keyCode == 38 && x.ctrlKey){
        if (self.getView() == 'week'){
          self.setView('month');
          self.init();
        }
        if (self.getView() == 'day'){
          self.setView('week');
          self.init();
        }
      }
      // Ctrl + down
      if (x.keyCode == 40 && x.ctrlKey){
        if (self.getView() == 'week'){
          self.setView('day');
          self.init();
        }
        if (self.getView() == 'month'){
          self.setView('week');
          self.init();
        }
      }
    });
  };

  Calendar.prototype.moveCurrentIntervalView = function(direction) {
    var word;
    if (this.getView() == 'day'){
      word = 'days';
    }
    if (this.getView() == 'week'){
      word = 'week';
    }
    if (this.getView() == 'month'){
      word = 'month';
    }
    if (direction == 'left'){
      this.conf.unixTimestamp = parseInt(moment.unix(self.conf.unixTimestamp).subtract(1, word).format('X'));
    }
    if (direction == 'right'){
      this.conf.unixTimestamp = parseInt(moment.unix(self.conf.unixTimestamp).add(1, word).format('X'));
    }
    this.init();
  };

  Calendar.prototype.mobileQuery = function() {
    if ($(window).width() < this.conf.defaultView.smallScreenThreshold){
      return 'mobile'
    }
    return 'desktop';
  };

  Calendar.prototype.hexToRgb = function(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  Calendar.prototype.calculateCurrentInterval = function() {
    var days = this.getViewDays();
    this.fromTimestamp = parseInt(moment.unix(days[0]).startOf('day').format('X'));
    this.toTimestamp = parseInt(moment.unix(days[days.length-1]).endOf('day').format('X'));
  };

  Calendar.prototype.getCategories = function(object, attribute1, attribute2){
    var categories = [];
    for (var i=0; i<object.length; i++){
      e = object[i];
      if (parseInt(e[attribute1]) >= parseInt(this.fromTimestamp) && parseInt(e[attribute2]) <= parseInt(this.toTimestamp)){
        categories.push(e.category);
      }
    }
    categories = this.miscUniqueArray(categories);
    return categories;
  };

  Calendar.prototype.getCategoryColor = function(category, object, colors, color) {
    for (var i=0; i<object.length; i++){
      if (object[i].category == category){
        return object[i].color;
      }
    }
    for (var i=0; i<colors.length; i++){
      used = false;
      for (var j=0; j<object.length; j++){
        if (object[j].color == colors[i]){
          used = true;
        }
      }
      if (!used){
        object.push({
          category: category,
          color: colors[i]
        });
        return colors[i];
      }
    }
    return color;
  };

  Calendar.prototype.getEventsCategories = function() {
    return this.getCategories(this.events, 'start', 'end');
  };

  Calendar.prototype.determineEventsCategories = function() {
    var categories = this.getEventsCategories();
    this.eventCategoryColor = [];
    for (var i=0; i<categories.length; i++){
      this.getEventCategoryColor(categories[i]);
    }
  };

  Calendar.prototype.getEventCategoryColor = function(category) {
    return this.getCategoryColor(category, this.eventCategoryColor, this.conf.colors.events, '#000000');
  };

  Calendar.prototype.getEventCategoriesColors = function() {
    return this.eventCategoryColor;
  };

  Calendar.prototype.setEventCategoriesColors = function(categoriesColors) {
    this.eventCategoryColor = categoriesColors;
  };

  Calendar.prototype.getDaynotesCategories = function() {
    return this.getCategories(this.daynotes, 'time', 'time');
  };

  Calendar.prototype.determineDaynotesCategories = function() {
    var categories = this.getDaynotesCategories();
    this.daynoteCategoryColor = [];
    for (var i=0; i<categories.length; i++){
      this.getDaynoteCategoryColor(categories[i]);
    }
  };

  Calendar.prototype.getDaynoteCategoryColor = function(category) {
    return this.getCategoryColor(category, this.daynoteCategoryColor, this.conf.colors.daynotes, '#FEFEFE');
  };

  Calendar.prototype.getDaynoteCategoriesColors = function() {
    return this.daynoteCategoryColor;
  };

  Calendar.prototype.setDaynoteCategoriesColors = function(categoriesColors) {
    this.daynoteCategoryColor = categoriesColors;
  };

  Calendar.prototype.getEventColors = function() {
    return this.conf.colors.events;
  };

  Calendar.prototype.setEventColors = function(array) {
    this.conf.colors.events = this.miscDedupeArray(array);
    if (this.conf.colors.random){
      this.conf.colors.events.sort(function() {return 0.5 - Math.random();});
    }
  };

  Calendar.prototype.getDaynoteColors = function() {
    return this.conf.colors.daynotes;
  };

  Calendar.prototype.setDaynoteColors = function(array) {
    this.conf.colors.daynotes = this.miscDedupeArray(array);
    if (this.conf.colors.random){
      this.conf.colors.daynotes.sort(function() {return 0.5 - Math.random();});
    }
  };

  Calendar.prototype.getEvents = function() {
    return this.events;
  };

  Calendar.prototype.setEvents = function(events) {
    this.events = (events) ? events : [];
    this.events.sort(function(a,b) {return (a.start > b.start) ? 1 : -1;});
  };

  Calendar.prototype.addEvents = function(events) {
    this.events = this.events.concat(events);
    this.events.sort(function(a,b) {return (a.start > b.start) ? 1 : -1;});
  };

  Calendar.prototype.getDaynotes = function() {
    return this.daynotes;
  };

  Calendar.prototype.setDaynotes = function(daynotes) {
    this.daynotes = (daynotes) ? daynotes : [];
    this.daynotes.sort(function(a,b) {return (a.start > b.start) ? 1 : -1;});
  };

  Calendar.prototype.addDaynotes = function(daynotes) {
    this.daynotes.concat(daynotes);
    this.daynotes.sort(function(a,b) {return (a.start > b.start) ? 1 : -1;});
  };

  Calendar.prototype.getInitTime = function() {
    return this.initTime;
  };

  Calendar.prototype.getViewInterval = function() {
    return [this.fromTimestamp, this.toTimestamp];
  };

  Calendar.prototype.getNextViewInterval = function() {
    if (this.getView() == 'day'){
      return [
        parseInt(moment.unix(this.fromTimestamp).add(1, 'd').format('X')),
        parseInt(moment.unix(this.toTimestamp).add(1, 'd').format('X'))
      ];
    }
    if (this.getView() == 'week'){
      return [
        parseInt(moment.unix(this.fromTimestamp).add(1, 'w').format('X')),
        parseInt(moment.unix(this.toTimestamp).add(1, 'w').format('X'))
      ];
    }
    if (this.getView() == 'month'){
      return [
        parseInt(moment.unix(this.fromTimestamp).add(1, 'M').format('X')),
        parseInt(moment.unix(this.toTimestamp).add(1, 'M').format('X'))
      ];
    }
  };

  Calendar.prototype.getPrevViewInterval = function() {
    if (this.getView() == 'day'){
      return [
        parseInt(moment.unix(this.fromTimestamp).subtract(1, 'd').format('X')),
        parseInt(moment.unix(this.toTimestamp).subtract(1, 'd').format('X'))
      ];
    }
    if (this.getView() == 'week'){
      return [
        parseInt(moment.unix(this.fromTimestamp).subtract(1, 'w').format('X')),
        parseInt(moment.unix(this.toTimestamp).subtract(1, 'w').format('X'))
      ];
    }
    if (this.getView() == 'month'){
      return [
        parseInt(moment.unix(this.fromTimestamp).subtract(1, 'M').format('X')),
        parseInt(moment.unix(this.toTimestamp).subtract(1, 'M').format('X'))
      ];
    }
  };

  Calendar.prototype.getTimestamp = function() {
    return this.conf.unixTimestamp;
  };

  Calendar.prototype.setTimestamp = function(timestamp) {
    this.conf.unixTimestamp = parseInt(timestamp);
  };

  Calendar.prototype.getView = function(){
    return this.conf.view;
  };

  Calendar.prototype.setView = function(view){
    if (view == 'day' || view == 'week' || view == 'month') {
      this.conf.view = view;
    }
  };

  Calendar.prototype.miscDedupeArray = function(a) {
    a = a.concat();
    for (var i=0; i<a.length; ++i) {
      for (var j=i+1; j<a.length; ++j) {
        if(a[i] === a[j]){
          a.splice(j--, 1);
        }
      }
    }
    return a;
  };

  Calendar.prototype.miscUniqueArray = function(a) {
    a = a.concat();
    for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
        if(a[i] === a[j])
          a.splice(j--, 1);
      }
    }
    return a;
  };

  Calendar.prototype.miscUcfirstString = function(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  objSchedulesPlan = [];

  // Initialization
  jQuery.extend(jQuery.fn, {
    Calendar: function(objArgs){
      var c = new Calendar($(this), (objArgs === undefined) ? {} : objArgs);
      objSchedulesPlan.push(c);
      return c;
    }
  });

  // Reinitialization on screen rotation
  var resizeListener1;
  pause1 = 500;
  window.addEventListener("orientationchange", function() {
    clearTimeout(resizeListener1);
    resizeListener1 = setTimeout(function(){
      objSchedulesPlan.forEach(function(obj){
        obj.init();
      });
    }, pause1);
  });

  // Reinitialization on screen resize if not mobile
  var resizeListener2;
  pause2 = 500;
  window.addEventListener("resize", function() {
    clearTimeout(resizeListener2);
    resizeListener2 = setTimeout(function(){
      objSchedulesPlan.forEach(function(obj){
        if (obj.mobileQuery() == 'desktop'){
          obj.init();
        }
      });
    }, pause2);
  });

});
