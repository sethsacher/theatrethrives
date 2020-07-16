/**
 * Template Name: TheEvent - v2.1.0
 * Template URL: https://bootstrapmade.com/theevent-conference-event-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

!(function ($) {
  'use strict';

  var isProd = window.location.hostname.includes('theatrethrives.org');
  if (!isProd) {
    console.log('Prod environment? ' + isProd);
  }

  var intervalId;

  var path = window.location.pathname;
  var page = path.split("/").pop();

  var youTubeURL = 'https://www.youtube.com/embed/'
  // https://www.youtube.com/live_chat?v=WzWKcLOCYbc&embed_domain=localhost
  var youTubeChatURL = 'https://www.youtube.com/live_chat?v=';
  var youTubeChatEmbedDomain = '&embed_domain=';
  var domain = window.location.hostname;
  var currentYouTubeId;

  // Website Configurations (banner, youtube)
  var websiteConfigFile = 'https://community-theatre-thrives-banner.s3.amazonaws.com/website-config.json'

  function updateBanner(bannerMsg) {
    if (bannerMsg.length > 0) {
      $('#notification').text(bannerMsg)
      $('#banner').show();
      $('#header').css("top", "25px");
    } else {
      $('#banner').hide();
      $('#header').css("top", "0px");
    }
  }

  function getWebsiteConfig() {
    $.ajax({
      url: websiteConfigFile,
      dataType: 'json',
      success: function (data) {

        // Set banner
        updateBanner(data.bannerMsg)

        // Set YouTube URL
        if (!currentYouTubeId || currentYouTubeId !== data.youTubeId) {
          currentYouTubeId = data.youTubeId;

          $('#video-iframe').attr("src", youTubeURL + data.youTubeId)
          console.log('Active YouTube Video: ' + youTubeURL + data.youTubeId)
          $('#chat-iframe').attr("src", youTubeChatURL + data.youTubeId + youTubeChatEmbedDomain + domain)
          console.log('Active YouTube Chat: ' + youTubeChatURL + data.youTubeId + youTubeChatEmbedDomain + domain)
        }

        // Update the repeated call
        if (!intervalId) {
          // Time in ms (5000 ms = 5 s)
          intervalId = window.setInterval(function () {
            getWebsiteConfig(websiteConfigFile);
          }, 5000);
        } else if (intervalId && data.bannerHalt) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
      },
      error: function (data) {
        console.log('ERROR: ', data);
        // Stop the repeated call
        if (intervalId) {
          window.clearInterval(intervalId);
          intervalId = null;
          updateBanner("An error has occurred, please refresh your browser.")
        }
      }
    });
  }

  if (!page.includes('donate')) {
    $(document).ready(function () {
      // Force the video to appear, for testing.
      // Need to comment out the clock/video toggle below as well.
      // $("#clock-wrapper").hide();
      // $("#video-wrapper").show();

      getWebsiteConfig(websiteConfigFile);
    });
  }

  // Countdown Timer
  var endTime = moment.tz('2020-07-17 18:00', 'America/New_York');

  $(document).ready(function () {
    if (moment().diff(endTime, 'minutes') < 0) {
      $("#clock-wrapper").show();
      $("#video-wrapper").hide();
    } else {
      $("#clock-wrapper").hide();
      $("#video-wrapper").show();
    }
  });

  $('#clock')
    .countdown(endTime.toDate())
    .on('update.countdown', function (event) {
      var $this = $(this).html(
        event.strftime(
          '' +
          '<span class="h1 font-weight-bold">%D</span> Day%!d' +
          '<span class="h1 font-weight-bold">%H</span> Hr' +
          '<span class="h1 font-weight-bold">%M</span> Min' +
          '<span class="h1 font-weight-bold">%S</span> Sec'
        )
      );
    })
    .on('finish.countdown', function (event) {
      $("#clock-wrapper").hide();
      $("#video-wrapper").show();
    });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      1500,
      'easeInOutExpo'
    );
    return false;
  });

  function toggleChat(win) {
    if (win.width() <= 850) {
      $("#chat").hide();
    } else {
      $("#chat").show();
    }
    return;
  }

  // Hide video chat when window is too small
  $(document).ready(function () {
    toggleChat($(this));
  });

  $(window).on('resize', function () {
    var win = $(this); //this = window
    toggleChat(win);
  });

  // Header fixed on scroll
  // $(window).scroll(function() {
  //   if ($(this).scrollTop() > 100) {
  //     $('#header').addClass('header-scrolled');
  //   } else {
  //     $('#header').removeClass('header-scrolled');
  //   }
  // });

  // if ($(window).scrollTop() > 100) {
  //   $('#header').addClass('header-scrolled');
  // }

  // Real view height for mobile devices
  if (window.matchMedia('(max-width: 767px)').matches) {
    $('#intro').css({
      height: $(window).height(),
    });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $('.venobox').venobox({
    bgcolor: '',
    overlayColor: 'rgba(6, 12, 34, 0.85)',
    closeBackground: '',
    closeColor: '#fff',
    share: false,
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show',
    },
    speed: 400,
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav',
    });
    $mobile_nav.find('> ul').attr({
      class: '',
      id: '',
    });
    $('body').append($mobile_nav);
    $('body').prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'
    );
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav')
      .find('.menu-has-children')
      .prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass('fa-chevron-up fa-chevron-down');
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $('#mobile-nav, #mobile-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($('#mobile-nav, #mobile-nav-toggle').length) {
    $('#mobile-nav, #mobile-nav-toggle').hide();
  }

  // Disable scroll animation when not on the root page
  var is_root = location.pathname == '/';
  var scroll = is_root;

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
    scroll = false;
    if (
      location.pathname.replace(/^\//, '') ==
      this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate(
          {
            scrollTop: target.offset().top - top_space,
          },
          1500,
          'easeInOutExpo',
          function () {
            scroll = true;
          }
        );

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }

        // update the URL in location bar
        window.location.hash = $.attr(this, 'href').substr(1);
        ga('send', 'pageview', window.location.hash);

        return false;
      }
    }
    scroll = true;
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('menu-active');
        }
        main_nav
          .find('a[href="/#' + $(this).attr('id') + '"]')
          .parent('li')
          .addClass('menu-active');

        if (
          scroll === true &&
          window.location.hash !== '#' + $(this).attr('id')
        ) {
          window.history.pushState('', '', '#' + $(this).attr('id'));
          ga('send', 'pageview', '#' + $(this).attr('id'));
        }
      }
      if (cur_pos < 300) {
        $('.nav-menu ul:first li:first').addClass('menu-active');
        if (scroll === true) {
          window.history.pushState('', '', '#home');
          ga('send', 'pageview', '#home');
        }
      }
    });
  });

  // Gallery carousel (uses the Owl Carousel library)
  $('.gallery-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });

  // Buy tickets select the ticket type on click
  $('#buy-ticket-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data('ticket-type');
    var modal = $(this);
    modal.find('#ticket-type').val(ticketType);
  });
})(jQuery);
