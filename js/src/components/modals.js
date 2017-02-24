"use strict";

var modals = (function ($) {

	var modal = {
		backdrop: '<div class="modal-backdrop"></div>',
		open: false,
		pageMain: $('body'),
		backdropSelector: '.modal-backdrop'
	};

	function initTabTrap(event) {

		// Get the current element in focus
		var thisFocusElm = document.activeElement;

		// Tab key behaviour
		if(event.keyCode === 9) {

			// Tabbing backwards
			if(event.shiftKey) {
				
				// If at the first item, tab to last
				if(thisFocusElm === modal.firstFocusElm) {
					event.preventDefault();
					modal.lastFocusElm.focus();
				}
			}

			// Tabbing forwards
			else {

				// If at the last item, tab to first
				if(thisFocusElm === modal.lastFocusElm) {
					event.preventDefault();
					modal.firstFocusElm.focus();
				}
			}
		}

		// Escape key behaviour
		else if(event.keyCode == 27) {
			hideModal();
		}
	};

	function setUpTabTrap() {

		// Grab focus of modal trigger
		modal.trigger = document.activeElement;

		// Define all focusable elements
		var allFocusElms = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

		// Find all focusable elements within modal
		modal.FocusElms = modal.self.find(allFocusElms);

		// Get first and last focusable elements in modal
		modal.firstFocusElm = modal.FocusElms[0];
		modal.lastFocusElm = modal.FocusElms[modal.FocusElms.length - 1];

		// On keydown control tabbing
		modal.self.on('keydown', initTabTrap);

	};

	function showModal() {

		// Animate modal in
		$(modal.self, modal.pageMain).addClass('modal-open');

		// Crete modal backdrop
		modal.self.append(modal.backdrop);
		modal.self.find('.modal-backdrop').attr('data-modal-toggle', modal.selector);

		// Set modal open check to open
		modal.open = true;

		// Config to control tabbing inside modal
		setUpTabTrap();

	};

	function hideModal() {

		// Hide modal
		$(modal.self, modal.pageMain).removeClass('modal-open');

		// Remove modal backdrop
		$(modal.backdropSelector).remove();
		
		// Set modal open check to closed
		modal.open = false;

		// Reset focus to original modal trigger
		modal.trigger.focus();
	};

	function init() {

		$(document).on('click', '[data-modal-toggle]', function(event) {
			event.preventDefault();

			// Get name of modal that needs to be opened / closed
			modal.selector = $(this).data('modal-toggle');
			modal.self = $('.modal[data-modal="' + modal.selector + '"]');

			// Show / hide the modal
			modal.open === false ? showModal() : hideModal();

		});
	
	};

	return {
		init: init
	};

})(jQuery);
