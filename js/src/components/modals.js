"use strict";

var modals = (function ($) {

	var modal = {
		backdrop: '<div class="modal-backdrop"></div>',
		open: false,
		pageMain: $('body'),
		backdropSelector: '.modal-backdrop'
	}

	function showModal() {
		modal.self.addClass('modal-open');
		modal.self.append(modal.backdrop);
		modal.self.find('.modal-backdrop').attr('data-modal-toggle', modal.selector);
		modal.pageMain.addClass('modal-open');
		modal.open = true;
	}

	function hideModal() {
		$(modal.backdropSelector).remove();
		modal.self.removeClass('modal-open');
		modal.pageMain.removeClass('modal-open');
		modal.open = false;
	}

	function init() {

		$(document).on('click', '[data-modal-toggle]', function(event) {
			event.preventDefault();

			// Get name of modal that needs to be opened / closed
			modal.selector = $(this).data('modal-toggle');
			modal.self = $('.modal[data-modal="' + modal.selector + '"]');

			// Show / hide the modal
			if(modal.open === false) {
				showModal();
			} else {
				hideModal();
			}

		});
	
	};

	return {
		init: init
	};

})(jQuery);
