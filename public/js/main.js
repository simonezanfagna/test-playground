/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  // GESTIONE DELL' HEADER DURANTE LO SCROLL
  // Verifico se durante il resize della pagina sia già stato fatto uno scroll della pagina stessa
  // Quindi imposto una variabile 'scroll' inizialmente a 0
  // se si effettua lo scroll verso il basso, la variabile diventa 1
  // se si effettua lo scroll verso l'alto e si ritorna all' inizio della pagina
  // la variabile 'scroll' ritorna a 0
  // questo permette di mantenere il background dell' header invariato anche se si effettua
  // il resize dopo aver fatto lo scroll.
  var scroll = 0;
  $(window).resize(function () {
    if ($(window).width() >= 811 && scroll == 0) {
      $('header').css({
        background: "transparent"
      });
    } else if ($(window).width() >= 811 && scroll == 1) {
      $('header').css({
        background: "black"
      });
    } else {
      $('header').css({
        background: "white"
      });
    }
  });
  $(document).scroll(function () {
    if ($(window).scrollTop()) {
      if ($(window).width() >= 811) {
        $('header').css({
          background: "black"
        });
        scroll = 1;
      }
    } else {
      if ($(window).width() >= 811) {
        $('header').css({
          background: "transparent"
        });
        scroll = 0;
      }
    }
  }); // GESTIONE DELLO SLIDER
  // aggiungo l' eveto 'click' al tag svg che ha classe 'svg-right'
  // la funzione associata a questo evento crea quattro variabili:
  // slide_corrente (la slide visibile attualmente sullo schermo con classe 'active-slide')
  // 'nuova_slide' (la slide successiva alla slide_corrente)
  // 'bullet_span_corrente' (il pallino associato alla 'slide_corrente' con classe 'active-bullet')
  // 'nuova_bullet' (il pallino successivo a 'bullet_span_corrente')
  // se 'nuova_slide' è l' ultima, significa che al click la slide da mostrare non esiste, allora diventa la prima slide e gli viene associata la classe 'active-slide'
  // mentre 'nuova_bullet' diventa la prima bullet e gli viene associata la classe 'active-bullet'
  // se 'nuova_slide' non è l'ultima allora si associa la classe 'active-slide' alla 'nuova_slide' (la slide successiva)
  // e si associa la classe 'active-bullet' a nuova_bullet (la bullet succesiva).
  // Questo evita la creazione di errori quando le slide terminano.

  $('.svg-right').click(function () {
    var slide_corrente = $('.container-img div.active-slide');
    var nuova_slide = slide_corrente.next('div.slide-container');
    var bullet_span_corrente = $('.bullet span.active-bullet');
    var nuova_bullet = bullet_span_corrente.next('span');

    if (nuova_slide.length == 0) {
      nuova_slide = $('.container-img div.slide-container:first-child');
      nuova_bullet = $('.bullet span:first-child');
    }

    slide_corrente.removeClass('active-slide');
    nuova_slide.addClass('active-slide');
    bullet_span_corrente.removeClass('active-bullet');
    nuova_bullet.addClass('active-bullet');
  }); // aggiungo l' eveto 'click' al tag svg che ha classe 'svg-left'
  // la logica del funzionamento è la stessa di 'svg-right'
  // ma ovviamente associa la classe 'active-slide' alla slide precedente,
  // la classe 'active-bullet' alla bullet precedente.
  // Ma se al click la slide non esiste perchè sono teminate, allora la classe 'active-slide' si associa all' ultima slide,
  // e la casse 'active-bullet' all' ultima bullet.

  $('.svg-left').click(function () {
    var slide_corrente = $('.container-img div.active-slide');
    var nuova_slide = slide_corrente.prev('div.slide-container');
    var bullet_span_corrente = $('.bullet span.active-bullet');
    var nuova_bullet = bullet_span_corrente.prev('span');

    if (nuova_slide.length == 0) {
      nuova_slide = $('.container-img div.slide-container:last-child');
      nuova_bullet = $('.bullet span:last-child');
    }

    slide_corrente.removeClass('active-slide');
    nuova_slide.addClass('active-slide');
    bullet_span_corrente.removeClass('active-bullet');
    nuova_bullet.addClass('active-bullet');
  }); // aggiungo l' eveto 'click' al tag span figlio del div con classe 'bullet'
  // la funzione associata a questo evento mi permette di vedere la slide avente lo stesso indice del bullet cliccato

  $('.bullet span').click(function () {
    var bullet_span_corrente = $('.bullet span.active-bullet');
    var bullet_span_click = $(this).index();
    bullet_span_corrente.removeClass('active-bullet');
    var nuova_bullet = $(this).addClass('active-bullet');
    var slide_corrente = $('.container-img div.active-slide');
    slide_corrente.removeClass('active-slide');
    var nuova_slide = $('.container-img div.slide-container').eq(bullet_span_click).addClass('active-slide');
  }); // GESTIONE DELLE 3 TAB
  // compilo il template tramite Handlebars

  var source = $('#entry-template').html();
  var template = Handlebars.compile(source); // effettuo la chiamata ajax al tab1.json in modo che al caricamento della pagina
  // il primo tab sia già popolato

  $.ajax({
    'url': 'assets/ajax/tab1.json',
    'method': 'GET',
    'success': function success(data) {
      var item = data.item;
      var context = {
        content: item.content.join(' ')
      }; // aggiungo il template al div con classe 'tab-content'

      var html = template(context);
      $('.tab-content').append(html);
    },
    'error': function error() {
      alert('errore');
    }
  }); // aggiungo l' evento click al tag p che contiene il titolo del tab
  // la funzione associata a questo eveneto mi permette di gestire lo stile del tag p e una succesiva chiamata ajax alla relativa tab json

  $('.p-tab-title').click(function () {
    // se questo p ha la classe 'gray'
    // tolgo le classi 'black' e 'color-white' dal p fratello e gli riposiziono la freccia verso l' alto e gli aggiungo la classe 'gray'
    // invece al p cliccato aggiungo le classi 'black' e 'color-white' e mostro l' icona che ha la freccia verso il basso
    if ($(this).hasClass('gray')) {
      $('.p-tab-title').siblings().removeClass('black color-white').addClass('gray');
      $('.p-tab-title').children('svg.svg-down').addClass('none');
      $('.p-tab-title').children('svg.svg-up').removeClass('none');
      $(this).removeClass('gray').addClass('black color-white');
      $(this).children('svg.svg-up').addClass('none');
      $(this).children('svg.svg-down').removeClass('none');
    } // effettuo la chiamata ajax relativa al p cliccato
    // prendo l' attributo data associato al p contente il titolo del tab dal quale mostrare il contenuto


    var dataTab = $(this).attr('data-tab'); // tolgo dal div con classe 'tab-content' il p con il contenuto del tab

    $('.tab-content p').remove(); // effettuo la chiamata ajax al tab json per predere il contenuto del tab associato al titolo (p) cliccato

    $.ajax({
      'url': 'assets/ajax/' + dataTab + '.json',
      'method': 'GET',
      'success': function success(data) {
        var item = data.item;
        var context = {
          content: item.content.join(' ')
        }; // aggiungo il template al div con classe 'tab-content'

        var html = template(context);
        $('.tab-content').append(html);
      },
      'error': function error() {
        alert('errore');
      }
    });
  }); // mostro il png loader durante la fase di iniziale della chiamata ajax
  // una volta terminata la chiamata lo nascondo
  // questo avviene togliendo e aggiungendo la classe 'none'

  $(document).ajaxStart(function () {
    $('.tab-content img').removeClass('none');
  }).ajaxComplete(function () {
    $('.tab-content img').addClass('none');
  }); // GESTIONE VALIDAZIONE DATI FORM
  // aggiungo l' evento click al tag button contenuto nel form
  // la funzione associata a questo evento mi permette di gestire la validazione dei campi email e textarea(message)
  // creo due variabili contenenti i rispettivi valori
  // nella variabile 'email_valid' aggiungo l' espressione regolare per controllare la forma dell' email digitata dall' utente

  $('form button').click(function () {
    var email = $('form[name=datiForm] input[name=email]').val();
    var message = $('form[name=datiForm] textarea[name=message]').val(); // se l' email non è stata scritta nella forma contenuta in 'email_valid' oppure è uguale a "" oppure è uguale ad "undefined"
    // allora mostra un alert e si blocca

    var email_valid = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;

    if (!email_valid.test(email) || email == "" || email == "undefined") {
      alert("Devi inserire un indirizzo mail corretto");
      $('form[name=datiForm] input[name=email]').focus();
      return false;
    } // se il message è uguale a ""
    // allora mostra un alert e si blocca


    if (message.trim() == "") {
      alert("Devi inserire un messaggio corretto");
      $('form[name=datiForm] textarea[name=message]').focus();
      return false;
    } // se i dati sono corretti al form viene attribuita l' action = 'index.html' (ovviamnete quato contenuto dell' action è un esempio)
    // (si dovrebbe inserire la rotta)
    // e poi effettua il submit
    else {
        $('form[name=datiForm]').attr('action', "index.html");
        $('form[name=datiForm]').submit();
      }
  }); // GESTIONE DELLA BARRA DELLA COOKIE POLICY
  // La barra della cookie policy scompare quando si clicca sul button con id 'accept'

  $('#accept').click(function () {
    $('#cookie').hide();
  }); // GESTIONE DEL MENU MOBILE
  // qunado si clicca sul svg con classe 'menu-mobile-icon'
  // la funzione associata al click, mostra e nasconde il contenuto del menu
  // (per il mobile)

  $('.menu-mobile-icon').click(function () {
    $('.menu-mobile').toggle();
  }); // questo controllo sul resize della pagina
  // evita la visione del 'menu-mobile' quando si apre il menu (senza una succesiva chiusura) con una larghezza dello schermo minore a 811px
  // e successivamente si effettua un resize superando la larghezza di 811px

  $(window).resize(function () {
    if ($(window).width() >= 811) {
      $('.menu-mobile').css({
        display: "none"
      });
    }
  });
});

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi ./src/js/app.js ./src/scss/app.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\MAMP\htdocs\BooleanPHP\PLAYGROUND-test\src\js\app.js */"./src/js/app.js");
module.exports = __webpack_require__(/*! C:\MAMP\htdocs\BooleanPHP\PLAYGROUND-test\src\scss\app.scss */"./src/scss/app.scss");


/***/ })

/******/ });