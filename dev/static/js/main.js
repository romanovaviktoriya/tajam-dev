// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
    Object.keys = (function() {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;
  
      return function(obj) {
        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }
  
        var result = [], prop, i;
  
        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
  
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }

//** Polyfill Для браузеров не поддерживающих Element.closest(), но позволяющих использовать element.matches() */
  (function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
      };
}(Element.prototype));

//** YouTube Player */
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'KvUgaHTNit4',
        host: 'https://www.youtube.com',
        playerVars: {
            'autoplay': 0,
            //'controls': 0,
            'showinfo': 0,
            'rel': 0,
            'wmode': 'opaque',
            'origin': 'http://localhost:3000'
        },
        events: {
            //'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// -1 unstarted
// 0 ended
// 1 playing
// 2 paused
// 3 buffering
// 5 video cued
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
    if (event.data == YT.PlayerState.ENDED) {
    }
}

function stopVideo() {
    player.stopVideo();
}

document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){

    //** SVG-sprite */
    svg4everybody({});

    const toggler = document.querySelector(`.c-navbar__toggler`);
    const collapse = document.querySelector(`.c-navbar__collapse`);
    const modals = [].slice.call(document.querySelectorAll(`[data-toggle="modal"]`));
    const closeButtons = [].slice.call(document.querySelectorAll(`[data-dismiss="modal"][aria-label="Close"]`));
    const anchors = [].slice.call(document.querySelectorAll(`a[href*="#"]`));
    const animationTime = 300;
    const framesCount = 20;
    const more = document.querySelector(`.c-works__btn`);
    const icons = [].slice.call(document.querySelectorAll(`.c-testimonials__link`));
    const testmonials = document.querySelector(`.c-testimonials__list`);
    const recalls = [].slice.call(testmonials.querySelectorAll(`.c-testimonials__recall`));
    const formContact = document.querySelector(`#contactForm`);
    const formSubscribe = document.querySelector(`#subscribeForm`);

    //** Navbar toggle */
    const toggleMobileMenu = function() {
        toggler.classList.toggle(`collapsed`);
        toggler.classList.contains('collapsed') ? collapse.classList.add(`show`) : collapse.classList.remove(`show`);
    };

    toggler.addEventListener(`click`, toggleMobileMenu);

    //** Modal */
    const toggleShowModal = function(event) {
        event.preventDefault();

        let element = event.currentTarget;
        let mod = element.getAttribute(`data-target`);
        document.querySelector(mod).classList.add(`show`);
        document.body.classList.add(`modal--opened`);
        player.playVideo();
    };

    modals.forEach(function(item) {
        item.addEventListener('click', toggleShowModal);
    });

    //** Close button modal */
    const closeModal = function(event) {
        event.preventDefault();

        let modal = event.target.closest(`.c-modal`);
        modal.classList.remove(`show`);
        document.body.classList.remove(`modal--opened`);
        player.pauseVideo();
    }

    if(closeButtons.length) {
        closeButtons.forEach(function(item) {
            item.addEventListener('click', closeModal);
        });
    }

    //** Anchors scroll */
    anchors.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

            let scroller = setInterval(function() {
            let scrollBy = coordY / framesCount;
            if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                window.scrollBy(0, scrollBy);
            } else {
                window.scrollTo(0, coordY);
                clearInterval(scroller);
            }
            }, animationTime / framesCount);
        });
    });

    //** Works */
    const loadMoreWorks = function(event) {
        event.preventDefault();

        alert(`Заглушка. Возможна ajax-подгрузка данных и вставка на страницу`)
    };

    more.addEventListener(`click`, loadMoreWorks);

    //** Testimonials */
    const toggleRecall = function(event) {
        if (window.event) {
            window.event.returnValue = false;
        }
        event.preventDefault();

        recalls.forEach((el) => {
            el.classList.remove(`c-testimonials__recall--active`);
        });

        icons.forEach((el) => {
            el.parentElement.classList.remove(`c-testimonials__avatar--active`);
        });

        let element = event.currentTarget;
        let id = element.id;
        let recall = testmonials.querySelector(`.c-testimonials__recall[data-id="${id}"]`);
        recall.classList.add(`c-testimonials__recall--active`);
        element.parentElement.classList.add(`c-testimonials__avatar--active`);
    };

    icons.forEach.call(icons,function(el){
        el.addEventListener(`click`, toggleRecall);
    });

    //** Contact form */
    const submitContactForm = function (event) {
        event.preventDefault();

        let request = ('ActiveXObject' in window) ? new ActiveXObject('Msxml2.XMLHTTP') : new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.readyState != 4) return;
            if (request.status != 200 && request.status != 304) {
                return;
            }
        }
        if (request.readyState == 4) return;

        request.open(this.method, this.action, true);
        request.setRequestHeader(`Content-Type`, `application/x-www-form-urlencoded`);

        var data = new FormData(this);

        //for (var key of data.keys())
        //console.log(`[${key}]: ${data.get(key)}`);

        request.send(data);
        this.reset();
    };

    formContact.addEventListener(`submit`, submitContactForm);
    formSubscribe.addEventListener(`submit`, submitContactForm);
});
