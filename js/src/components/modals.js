"use strict";

var modals = (function ($) {

	var modal = {
		backdrop: '<div class="modal-backdrop"></div>',
		self: '',
		open: 'modal-open',
		selector: '',
		open: false,
		pageMain: $('body'),
		backdropSelector: '.modal-backdrop',
		close: '.modal-close'
	}

	function hideModals() {
		$(modal.backdropSelector).remove();
		modal.self.removeClass('modal-open');
		modal.pageMain.removeClass('modal-open');
		modal.open = false;
	}

	function showModal() {
		modal.self.addClass('modal-open');
		modal.self.append(modal.backdrop);
		modal.pageMain.addClass('modal-open');
		modal.open = true;
	}

	var init = function() {

		$(document).on('click', modal.close, function(event) {
			event.preventDefault();
			hideModals();
		});

		$(document).on('click', modal.backdropSelector, function(event) {
			event.preventDefault();
			hideModals();
		});

		$(document).on('click', '[data-modal-toggle]', function(event) {
			if (modal.open) {
				hideModals();
			}
			event.preventDefault();
			modal.selector = $( this ).data( 'modal-toggle' );
			modal.self = $( '.modal[data-modal="' + modal.selector + '"]' );

			showModal();
		});
	
	};

	return {
		init: init
	};

})(jQuery);
