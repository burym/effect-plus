var currentScroll;
var currentHash = "#an1";

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
    if (!uniqueId) {
      uniqueId = "Don't call this twice without a uniqueId";
    }
    if (timers[uniqueId]) {
      clearTimeout (timers[uniqueId]);
    }
    timers[uniqueId] = setTimeout(callback, ms);
  };
})();

jQuery(document).ready(function($) {

  $('a[href="#"]').click(function(event){
    event.preventDefault();
  });

  $('input.phone').mask('9 (999) 999-99-99');


//----------------------------------------------------------------------------------------
    $('input:text').on('keypress', function(event) {
  			if(event.which == 0) return true;
  			var trg = event.target;
  			var res = 0;
  			if($(trg).hasClass('digit')) if(!in_array(event.which,[8, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57])) res++;
  			if($(trg).hasClass('ceil')) if(!in_array(event.which,[8, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57])) res++;
  			if($(trg).hasClass('positive')) if(!in_array(event.which,[8, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57])) res++;
  			if($(trg).hasClass('phone')) if(!in_array(event.which,[8, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 41, 40, 32, 45])) res++;
  			if(res > 0) {event.keyCode = 0; return false;}
		});

    $('.error').on('keypress', function(){
      $(this).removeClass('error');
    });

	//----------------------------------------------------------------------------------------
	if($('form').length) {
		$('form').each(function (i) {
	     	var frmId = $(this).attr('id');
			var firstInput = $(this).find('input.required').get(0);
			if(firstInput) {
				$(firstInput).keyup(function(){
					var preHuman = $('#'+frmId).find('input[name="ahuman"]');
					if(!($(preHuman).length)) {
						var hiHuman = '<input type="hidden" name="ahuman" value="'+ frmId +'" />';
						$('#'+frmId).append(hiHuman);
					}
				});
				$(firstInput).mouseup(function(){
					var preHuman = $('#'+frmId).find('input[name="ahuman"]');
					if(!($(preHuman).length)) {
						var hiHuman = '<input type="hidden" name="ahuman" value="'+ frmId +'" />';
						$('#'+frmId).append(hiHuman);
					}
				});
				$(firstInput).focus(function(){
					var preHuman = $('#'+frmId).find('input[name="ahuman"]');
					if(!($(preHuman).length)) {
						var hiHuman = '<input type="hidden" name="ahuman" value="'+ frmId +'" />';
						$('#'+frmId).append(hiHuman);
					}
				});
			}
		});
	}

//----------------------------------------------------------------------------------------
  $( window ).on( "orientationchange", function( event ) {

  }); // --- window.orientationchange

  $(window).load(function(){
    scrollAndLoad();
  }); // --- window.load

  $(window).resize(function(){

  }); // --- window.resize

  $(window).scroll(function () {
    scrollAndLoad();
  }); // --- window.scroll

  $('.goup').on('click', function(e){
    $('body, html').scrollTo('0px', 500 );
    e.preventDefault();
		return false;
  });

   /*   $('header--- nav a').on('click', function(e){ // от меню съезжаем
  			$('body, html').scrollTo( ($( $(this).attr("href") ).offset().top + 5)+'px', 800 );
        e.preventDefault();
				return false;
      }); */

    $('.team-icon').colorbox({  // картинки в лайтбохе
        maxWidth: '98%',
        maxHeight: '98%',
        scrolling: false,
        photo: true,
        slideshow: true,
        opacity: 0.65,
        closeButton: true,
       // rel: 'certificat',
        retinaImage: true
    });

    $('.popup-close').on('click', function(){
      $.colorbox.close();
    });

      $('.callme-open').on('click', function(e){
          $.colorbox({
            href: '#callme-dlg',
            scrolling: false,
            inline: true,
            opacity: 0.65,
            className: 'popup-box',
            closeButton: false
          });
        e.preventDefault();
				return false;
      });

      $('.writeus-show').on('click', function(e){
          $.colorbox({
            href: '#writeus-dlg',
            scrolling: false,
            inline: true,
            opacity: 0.65,
            className: 'popup-box',
            closeButton: false
          });
        e.preventDefault();
				return false;
      });

      $('.typical-sale .frm-submit').on('click', function(){
        var thType = $(this).data('offer');
        $('#typesale-form input[name="bottles"]').val(thType);
        $('#typesale-dlg h2').text(thType);
          $.colorbox({
            href: '#typesale-dlg',
            scrolling: false,
            inline: true,
            opacity: 0.65,
            className: 'popup-box',
            closeButton: false
          });
        e.preventDefault();
				return false;
      });

    $('.main-menu a').click(function(e){
      e.preventDefault();
      $('.main-menu a').removeClass('active');
      $('body, html').scrollTo( ($( $(this).attr("href") ).offset().top + 2)+'px', 600 );
      /*
      $(".testdrive-bar").removeClass('expand');
      $(".mainmenu-bar").removeClass('expand');
      $(".mainmenu-link").removeClass('expand');
      $(".main-menu").removeClass('expand');
      */
      $(this).addClass('active');
		 	return false;
    });


$.validator.addMethod('phoneormail', function(value, element) {
  if ( $.trim(value).length == 0 ) return false;
//+  isMail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/.test(value); //  value.match(mailPattern);
  var isMail = /.+@.+\..+/i.test(value);
  var isPhone = ((Number(value.replace(/\D+/g,""))).toString()).length > 9;
 // return this.optional(element) || isPhone || isMail;
  return isPhone || isMail;
}, "Укажите телефон или e-mail");

$.validator.methods.isphone = function( value, element ) {
  return this.optional( element ) || /(?:\+?\d{1} \(\d{3}\)[ ]?\d{3}[-]?\d{2}[-]\d{2})/.test( value );
}


// -------- валидация форм -------------------
		$('#form2').validate({ // свяжемся с вами
  			rules: {
  				// name: "required",
  				phone: {
            required: true,
            isphone: true
  				}
  			},
  			messages: {
  				// name: "Не указано имя",
  				phone: {
            required: "Укажите телефон",
            isphone: "Проверьте номер"
  				}
  			},
  			errorPlacement: function($error, $element) {
  				// $element.parent().find('code.err').eq(0).text( $error.text() ).css('display', 'inline-block');
  			},
  			highlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('error').removeClass('success');
  				$(element).addClass('error').removeClass('success');
  			},
  			unhighlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('success').removeClass('error');
  				$(element).addClass('success').removeClass('error');
					$(element).closest('div, label').find('.err').hide(120);
  			} /*
        ,
  			submitHandler: function(form) {
  	          $(form).ajaxSubmit({
  	                dataType:"json",
  	                success: function(data){
													$('#thanks-box p').text( data.message );
													$('form input[type="text"], form input[type="email"], form textarea').val('');
													$('#thanks-box').lightbox_me({
														centered: true,
														closeSelector: '.popup-close',
													});
  	                	}
  	           });
					  }
*/
  	}); // свяжемся с вами

		$('#callme-form').validate({ // обратный звонок
  			rules: {
  				// name: "required",
  				phone: {
            required: true,
            isphone: true
  				}
  			},
  			messages: {
  				// name: "Не указано имя",
  				phone: {
            required: "Укажите телефон",
            isphone: "Проверьте номер"
  				}
  			},
  			errorPlacement: function($error, $element) {
  				// $element.parent().find('code.err').eq(0).text( $error.text() ).css('display', 'inline-block');
  			},
  			highlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('error').removeClass('success');
  				$(element).addClass('error').removeClass('success');
  			},
  			unhighlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('success').removeClass('error');
  				$(element).addClass('success').removeClass('error');
					$(element).closest('div, label').find('.err').hide(120);
  			}

  	}); // обратный звонок

		$('#typesale-form').validate({ // типовые поставки попап
  			rules: {
  				// name: "required",
  				phone: {
            required: true,
            isphone: true
  				}
  			},
  			messages: {
  				// name: "Не указано имя",
  				phone: {
            required: "Укажите телефон",
            isphone: "Проверьте номер"
  				}
  			},
  			errorPlacement: function($error, $element) {
  				// $element.parent().find('code.err').eq(0).text( $error.text() ).css('display', 'inline-block');
  			},
  			highlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('error').removeClass('success');
  				$(element).addClass('error').removeClass('success');
  			},
  			unhighlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('success').removeClass('error');
  				$(element).addClass('success').removeClass('error');
					$(element).closest('div, label').find('.err').hide(120);
  			}

  	}); // типовые поставки попап

		$('#form4').validate({ // рассчиать мне
  			rules: {
  				// name: "required",
  				phone: {
            required: true,
            isphone: true
  				}
  			},
  			messages: {
  				// name: "Не указано имя",
  				phone: {
            required: "Укажите телефон",
            isphone: "Проверьте номер"
  				}
  			},
  			errorPlacement: function($error, $element) {
  				// $element.parent().find('code.err').eq(0).text( $error.text() ).css('display', 'inline-block');
  			},
  			highlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('error').removeClass('success');
  				$(element).addClass('error').removeClass('success');
  			},
  			unhighlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('success').removeClass('error');
  				$(element).addClass('success').removeClass('error');
					$(element).closest('div, label').find('.err').hide(120);
  			}

  	}); // рассчиать мне

		$('#form3').validate({ // оставить отзыв
  			rules: {
  				message: "required",
  				contact: {
            required: true,
            phoneormail: true
  				}
  			},
  			messages: {
  				message: "Введите текст отзыва",
  				contact: {
            required: "Укажите телефон или e-mail",
            phoneormail: "Проверьте контактные данные"
  				}
  			},
  			errorPlacement: function($error, $element) {
  				// $element.parent().find('code.err').eq(0).text( $error.text() ).css('display', 'inline-block');
  			},
  			highlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('error').removeClass('success');
  				$(element).addClass('error').removeClass('success');
  			},
  			unhighlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('success').removeClass('error');
  				$(element).addClass('success').removeClass('error');
					$(element).closest('div, label').find('.err').hide(120);
  			}

  	}); // оставить отзыв

		$('#form5').validate({ // доставка в регионы
  			rules: {
  				message: "required",
  				contact: {
            required: true,
            phoneormail: true
  				}
  			},
  			messages: {
  				message: "Введите текст сообщения",
  				contact: {
            required: "Укажите телефон",
            phoneormail: "Проверьте контактные данные"
  				}
  			},
  			errorPlacement: function($error, $element) {
  				// $element.parent().find('code.err').eq(0).text( $error.text() ).css('display', 'inline-block');
  			},
  			highlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('error').removeClass('success');
  				$(element).addClass('error').removeClass('success');
  			},
  			unhighlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('success').removeClass('error');
  				$(element).addClass('success').removeClass('error');
					$(element).closest('div, label').find('.err').hide(120);
  			}

  	}); // доставка в регионы

		$('#writeus-form').validate({ // написать нам попап
  			rules: {
  				message: "required",
  				contact: {
            required: true,
            phoneormail: true
  				}
  			},
  			messages: {
  				message: "Введите текст отзыва",
  				contact: {
            required: "Укажите телефон",
            phoneormail: "Проверьте контактные данные"
  				}
  			},
  			errorPlacement: function($error, $element) {
  				// $element.parent().find('code.err').eq(0).text( $error.text() ).css('display', 'inline-block');
  			},
  			highlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('error').removeClass('success');
  				$(element).addClass('error').removeClass('success');
  			},
  			unhighlight: function(element, errorClass, validClass) {
  				$(element).closest('div, label').addClass('success').removeClass('error');
  				$(element).addClass('success').removeClass('error');
					$(element).closest('div, label').find('.err').hide(120);
  			}

  	}); // написать нам попап


    $('#act-begincalc').on('click', function(){
      $('#calc-count').removeClass('error');
      var wantCnt = $('#calc-count').val();
      if( isNaN(wantCnt) === false) {
           wantCnt = parseInt(wantCnt);
           f1calc(wantCnt);
      } else {
        $('#calc-count').val('').addClass('error');
        return false;
      }
    });

}); // --document.ready

//----------------------------------------------------------------------------------------------------
function f1calc(cnt) {
  var perBootle;
  var calcTotal;
  if( cnt <= 99  ) {
    perBootle = 60;
  } else if ( cnt >= 100 && cnt < 1000 ) {
    perBootle = 60;
  } else if (cnt >= 1000 && cnt < 5000) {
    perBootle = 55;
  } else if (cnt >= 5000) {
    perBootle = 50;
  }
  $('#calc-perbottle').text(perBootle);
  calcTotal = cnt * perBootle;
  $('#calc-summ').text(number_format(calcTotal, 0, '.', ' ') );
}

//----------------------------------------------------------------------------------------
function scrollAndLoad() {
    currentScroll = $(window).scrollTop();

    if(currentScroll > ($(window).height() -50) ) {
      $('a.goup').css("visibility", 'visible');
    } else {
      $('a.goup').css("visibility", 'hidden');
    }

   $(document).scroll(function () {
       $(".anchor").each(function () {
           var top = window.pageYOffset;
           var distance = top - $(this).offset().top;
           var hash = $(this).attr("id");
           // 30 is an arbitrary padding choice,
           // if you want a precise check then use distance===0
           if (distance < 30 && distance > -30 && currentHash != hash) {
           	//console.log('hash = '+hash);
        			$(".main-menu a").removeClass("active");
         			$(".main-menu a[href='#" + hash + "']").addClass("active");
              // window.location.hash = (hash);
               currentHash = hash;
           }
       });
   });
}

//----------------------------------------------------------------------------------------------------
//  ScrollTo
// ;(function(k){'use strict';k(['jquery'],function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:!0};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}}return j})}(typeof define==='function'&&define.amd?define:function(a,b){if(typeof module!=='undefined'&&module.exports){module.exports=b(require('jquery'))}else{b(jQuery)}}));
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});

//----------------------------------------------------------------------------------------
	function topGoal(cod) {  // reachGoal  14202010
		// alert('cod '+cod);
		try {
		 	//console.log(cod);
			yaCounter14202010.reachGoal(cod);
			return true;
		} catch(e) {
			console.log(e);
		}
			return true;
	}

//----------------------------------------------------------------------------------------
function in_array(what, where) {
    for(var i=0; i<where.length; i++)
        if(what == where[i])
            return true;
    return false;
}

//----------------------------------------------------------------------------------------
function number_format( number, decimals, dec_point, thousands_sep ) {  // Format a number with grouped thousands
    //
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://crestidg.com)

    var i, j, kw, kd, km;

    // input sanitation & defaults
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 0;
    }
    if( dec_point == undefined ){
        dec_point = ",";
    }
    if( thousands_sep == undefined ){
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


    return km + kw + kd;
}
//----------------------------------------------------------------------------------------
// helper
function objToString(o) {
    var s = '{\n';
    for (var p in o)
        s += '    "' + p + '": "' + o[p] + '"\n';
    return s + '}';
}
//----------------------------------------------------------------------------------------
// helper
function elementToString(n, useRefs) {
    var attr = "", nest = "", a = n.attributes;
    for (var i=0; a && i < a.length; i++)
        attr += ' ' + a[i].nodeName + '="' + a[i].nodeValue + '"';

    if (n.hasChildNodes == false)
        return "<" + n.nodeName + "\/>";

    for (var i=0; i < n.childNodes.length; i++) {
        var c = n.childNodes.item(i);
        if (c.nodeType == 1)       nest += elementToString(c);
        else if (c.nodeType == 2)  attr += " " + c.nodeName + "=\"" + c.nodeValue + "\" ";
        else if (c.nodeType == 3)  nest += c.nodeValue;
    }
    var s = "<" + n.nodeName + attr + ">" + nest + "<\/" + n.nodeName + ">";
    return useRefs ? s.replace(/</g,'&lt;').replace(/>/g,'&gt;') : s;
};


//----------------------------------------------------------------------------------------
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires; // || 0; // 2592000; // options.expires;
	options.domain = '.veloextreme.ru';
	options.path = '/';

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
  	options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
     }
  }

  document.cookie = updatedCookie;
}

//----------------------------------------------------------------------------------------
function deleteCookie(name) {
  setCookie(name, "", { expires: -1 })
}

//----------------------------------------------------------------------------------------



