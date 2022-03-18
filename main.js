"use strict";

$(function () {
  // mv-slide-in
  $(".js-wipe").addClass("is-active");

  // back-to-top
  $(window).scroll(function () {
    if ($(window).scrollTop() > $(window).height()) {
      $("#btt").addClass("is-active");
    } else {
      $("#btt").removeClass("is-active");
    }
  });

  $("#btt").click(function () {
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      600
    );
  });

  // header固定
  $(window).scroll(function () {
    if ($(window).scrollTop() > $(window).height()) {
      $("#header").addClass("is-active");
    } else {
      $("#header").removeClass("is-active");
    }
  });

  // hamburger
  $("#hamburger").click(function () {
    $(this).toggleClass("is-active");
    $(".header-nav").fadeToggle();
    $("body").toggleClass("is-active");
  });

  // スクロールで表示
  $(window).on("scroll", function () {
    $(".slide-trigger").each(function () {
      let trigger_point = $(this).offset().top - $(window).height() / 1.6;
      if ($(window).scrollTop() > trigger_point) {
        $(this).find(".slide").addClass("is-active");
      }
    });
  });

  // slideshow
  let width = $(".works-item").outerWidth(true);
  let length = $(".works-item").length;
  let slideArea = width * length;
  $(".slick-slides").css("width", slideArea);

  let slideCurrent = 0; //スライド初期値(現在地)
  let lastCurrent = $(".works-item").length - 1;

  function changeslide() {
    $(".slick-slides")
      .stop()
      .animate({
        left: slideCurrent * -width,
      });
    let pagiNation = slideCurrent + 1;
    $(".pagination-circle").removeClass("target");
    $(".pagination-circle:nth-of-type(" + pagiNation + ")").addClass("target");
  }

  $(".js-prev").click(function () {
    if (slideCurrent === 0) {
      slideCurrent = lastCurrent;
      changeslide(); //最後のスライドに戻す
    } else {
      slideCurrent--;
      changeslide();
    }
  });
  $(".js-next").click(function () {
    if (slideCurrent === lastCurrent) {
      slideCurrent = 0;
      changeslide(); //始めのスライドに戻す
    } else {
      slideCurrent++;
      changeslide();
    }
  });

  //自動送り
  let Timer;
  function startTimer() {
    Timer = setInterval(function () {
      if (slideCurrent === lastCurrent) {
        slideCurrent = 0;
        changeslide();
      } else {
        slideCurrent++;
        changeslide();
      }
    }, 3000);
  }
  function stopTimer() {
    clearInterval(Timer);
  }
  startTimer();

  $(".btn-prev").click(function () {
    stopTimer();
    startTimer();
    if (slideCurrent === 0) {
      slideCurrent = lastCurrent;
      changeslide();
    } else {
      slideCurrent--;
      changeslide();
    }
  });
  $(".btn-next").click(function () {
    stopTimer();
    startTimer();
    if (slideCurrent === lastCurrent) {
      slideCurrent = 0;
      changeslide();
    } else {
      slideCurrent++;
      changeslide();
    }
  });
});
