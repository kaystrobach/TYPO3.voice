(function( $ ) {
	$.fn.voice = function() {
		var voiceUrl = '';
		var formPageUid = $('meta[name=voiceFormPageUid]').attr("content");
		if (typeof formPageUid != 'undefined') {
			voiceUrl = "index.php?id=" + formPageUid + "&type=1364118054";
		} else {
			voiceUrl = "?type=1364118054";
		}

		$('body').append('<a href="' + voiceUrl + '" class="tx_voice_button"><span class="tx_voice_icon"></span><span class="tx_voice_button_text">Feedback</span></a>');

		$(".tx_voice_button").fancybox({
			ajax : {
				type: "POST",
				data: 'mydata=test'
			},
			onComplete: function() {
				aggregateBrowserData();
				$(".tx_voice form").submit(
					function(event) {
						event.preventDefault();

						var onEmptyError = 'Please fill out all fields.';
						var onEmailError = 'There was an error validating your email address';
						var hasError = false;

						$(this).find('input[type=text], textarea').each(function() {
							if(!hasError && !$(this).val().replace(/^\s+|\s+$/gm,'')) {
								$('#userfeedbackformerrors').html(onEmptyError);
								$(this).focus();
								hasError = true;
								return;
							}
						});
						if(hasError) {
							return false;
						}

						$('.userfeedbackformsending').show();
						$('.userfeedbackform').hide();

						$.ajax({
							type: "POST",
							url: updateURLParameter($(this).attr('action'), 'type', '1364118055'),
							data: $(this).serialize(),
							success: function() {
								jQuery('.userfeedbackformsending').hide();
								jQuery('.userfeedbackformdone').show();
								jQuery.fancybox.close();
							},
							error: function(response) {
								jQuery('#userfeedbackformerrors').html(onEmailError + '<br />' + response.responseText);
								jQuery('.userfeedbackformsending').hide();
								jQuery('.userfeedbackform').show();
							}
						});

						return false;
					}
				);
			}
		});


		/**
		 * return true if browser supports canvas
		 * @returns {boolean}
		 */
		function testBrowserSupportOfCanvas(){
			var elem = document.createElement('canvas');
			return !!(elem.getContext && elem.getContext('2d'));
		}

		/**
		 * show the form and take a screenshot
		 */
		function aggregateBrowserData() {
			if((!testBrowserSupportOfCanvas()) || (jQuery('#tx_voice_imageData').length === 0)) {
				showFormHelper();
			} else {
				html2canvas( [ document.body ], {
					ignoreElements: "IFRAME|OBJECT|PARAM|#fancybox-overlay|#fancybox-wrap",
					onrendered: function(canvas) {
						showFormHelper();
						jQuery('#voicePreviewImage').attr('src', canvas.toDataURL());
						jQuery('#tx_voice_imageData').attr('value', canvas.toDataURL());
					}
				});
			}

		}

		/**
		 * just show the form, prepare values, but do not do a screenshot
		 */
		function showFormHelper() {
			var browser = JSON.stringify({
				jQueryBrowser: {
					url:           document.location.href,
					onLine:        1 && navigator.onLine,
					cookieEnabled: navigator.cookieEnabled,
					platform:      navigator.platform,
					userAgent:     navigator.userAgent,
					language:      navigator.language,
					appVersion:    navigator.appVersion
				},
				jQuerySupport: jQuery.support
			});
			jQuery('#tx_voice_collectedData').attr('value', browser);
			jQuery('#userfeedbackformerrors').html('');
			jQuery('.userfeedbackform').show();
			jQuery('.userfeedbackformdone').hide();
			jQuery('.userfeedbackformsending').hide();
			jQuery('.tx_voice').show();
			if(jQuery().fadeIn) {
				jQuery('.tx_voice_mask').fadeIn();
			} else {
				jQuery('.tx_voice_mask').show();
			}
			jQuery('#tx_voice_subject').focus();
		}

		// taken from http://stackoverflow.com/questions/1090948/change-url-parameters-with-jquery/10997390#10997390
		function updateURLParameter(url, param, paramVal) {
			var TheAnchor = null;
			var newAdditionalURL = "";
			var tempArray = url.split("?");
			var baseURL = tempArray[0];
			var additionalURL = tempArray[1];
			var temp = "";

			if (additionalURL)
			{
				var tmpAnchor = additionalURL.split("#");
				var TheParams = tmpAnchor[0];
				TheAnchor = tmpAnchor[1];
				if(TheAnchor)
					additionalURL = TheParams;

				tempArray = additionalURL.split("&");

				for (i=0; i<tempArray.length; i++)
				{
					if(tempArray[i].split('=')[0] != param)
					{
						newAdditionalURL += temp + tempArray[i];
						temp = "&";
					}
				}
			}
			else
			{
				var tmpAnchor = baseURL.split("#");
				var TheParams = tmpAnchor[0];
				TheAnchor  = tmpAnchor[1];

				if(TheParams)
					baseURL = TheParams;
			}

			if(TheAnchor)
				paramVal += "#" + TheAnchor;

			var rows_txt = temp + "" + param + "=" + paramVal;
			return baseURL + "?" + newAdditionalURL + rows_txt;
		}
	};
})( jQuery );


jQuery(document).ready(function() {
	jQuery('body').voice();
});