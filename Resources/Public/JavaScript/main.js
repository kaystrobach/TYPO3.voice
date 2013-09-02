(function( $ ) {
	$.fn.voice = function() {
		/**
		 * create needed elements
		 */
		$('body').append('<div class="tx_voice_button"><span class="tx_voice_icon"></span><span class="tx_voice_button_text">Feedback</span></div>');
		$('body').append('<div class="tx_voice_mask"></div>');

		$('.tx_voice_mask').append($('.tx_voice'));

		/**
		 * hide everything unneeded
		 */
		$('.tx_voice').hide();
		$('.tx_voice_mask').hide();

		/**
		 * add needed events
		 */
		$('.tx_voice_button').click(formShow);

		$('#tx_voice_cancel').click(formHide);

		$('.tx_voice form').submit(formSubmit);

		function formSubmit(e) {
			console.log($(this).serializeArray());

			$('.userfeedbackformsending').show();
			$('.userfeedbackform').hide();

			$.ajax({
				type: "POST",
				url: updateURLParameter(jQuery('.tx_voice form').attr('action'), 'type', '1364118054'),
				data: $(this).serialize(),
				success: function() {
					jQuery('.userfeedbackformsending').hide();
					jQuery('.userfeedbackformdone').show();
					jQuery('.tx_voice').delay(1000).hide(10);
					jQuery('.tx_voice_mask').delay(1000).hide(10);
				},
				error: function() {
					jQuery('#userfeedbackformerrors').html('There was an error validating your email address');
					jQuery('.userfeedbackformsending').hide();
					jQuery('.userfeedbackform').show();
				}
			});

			e.preventDefault();
			return false;
		}

		function formHide(e) {
			if(jQuery().fadeOut) {
				jQuery('.tx_voice_mask').fadeOut();
			} else {
				jQuery('.tx_voice_mask').hide();
			}
			jQuery('.tx_voice').hide();
			e.preventDefault();
			return false;
		}

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
		function formShow() {
			if((!testBrowserSupportOfCanvas()) || (jQuery('#tx_voice_imageData').length === 0)) {
				showFormHelper();
			} else {
				html2canvas( [ document.body ], {
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