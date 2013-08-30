(function( $ ) {
	$.fn.voice = function() {
		/**
		 * create needed elements
		 */
		$('body').append('<div class="tx_voice_button"><span class="tx_voice_icon"></span>Feedback / Support</div>');
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

			$.ajax({
				type: "POST",
				url: updateURLParameter(jQuery('.tx_voice form').attr('action'), 'type', '1364118054'),
				data: $(this).serialize(),
				success: function() {
					window.alert('got your message');
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

		function formShow() {

			html2canvas( [ document.body ], {
				onrendered: function(canvas) {
					var browser = JSON.stringify({
						jQueryBrowser: {
							onLine:        1 && navigator.onLine,
							cookieEnabled: navigator.cookieEnabled,
							platform:      navigator.platform,
							userAgent:     navigator.userAgent,
							language:      navigator.language,
							appVersion:    navigator.appVersion
						},
						jQuerySupport: jQuery.support
					});
					jQuery('.tx_voice').show();
					if(jQuery().fadeIn) {
						jQuery('.tx_voice_mask').fadeIn();
					} else {
						jQuery('.tx_voice_mask').show();
					}
					jQuery('#voicePreviewImage').attr('src', canvas.toDataURL());
					jQuery('#tx_voice_imageData').attr('value', canvas.toDataURL());
					jQuery('#tx_voice_collectedData').attr('value', browser);
				}
			});
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