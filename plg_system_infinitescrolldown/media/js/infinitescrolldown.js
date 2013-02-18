/**
 * @copyright	 Copyright (C) 2013 mktgexperts.com. All rights reserved.
 * @license		 GNU General Public License version 2 or later; see http://www.gnu.org/licenses/gpl-2.0.html
 */
window.addEvent('domready', function(){
	// checks if required elements exist
	if ($$(content_item_selector).length == 0) {
		if (debug_mode) { 
			console.log("Infinite scroll down: Error, Content item element not found");
			console.log("Selector: " + content_item_selector);
			return;
		}
	}
	if ($$(pagination_control_selector).length == 0) {
		if (debug_mode) {
			console.log("Infinite scroll down: Error, Pagination element not found");
			console.log("Selector: " + pagination_control_selector);
			return;
		}
	}
	if ($$(next_page_link_selector).length == 0) {
		if (debug_mode) {
			console.log("Infinite scroll down: Error, Next page link element not found"); 
			console.log("Selector: " + next_page_link_selector);
			return;
		}
	}
	// vars
	var nextPage = $$(next_page_link_selector)[0].get('href');
	var pageCounter = 1;
	// objects
	var objTimer = timer.periodical(500);
	var nextPageContent = null;
	var myRequest = new Request({
		onRequest: function(){
			if (debug_mode) console.log("Infinite scroll down: Request is sent for --> " + this.options.url);
			// TODO: fire event onPageLoad
		},
		onSuccess: function(responseText, responseXML){
			pageCounter++;
			if (debug_mode) {
				console.log("Infinite scroll down: Request completed successfully");
				console.log("Infinite scroll down: pageCounter = " + pageCounter);
			}
			// convert markup into a mootools object
			nextPageContent = new Element('document', {html:responseText});
			// checks if the end of pages is reached 
			if (nextPageContent.getElements(next_page_link_selector).length == 0) {
				if (debug_mode) console.log("Infinite scroll down: End of pages");
				clearInterval(objTimer);
			}else{
				// update next page URL
				nextPage = nextPageContent.getElements(next_page_link_selector)[0].get('href');
				if (pageCounter >= page_stop_frequency) {
					if (debug_mode) console.log("Infinite scroll down: Awaiting user intervention");
					loadMoreButton.setStyle('display', 'block');
				}
			}
			// inject content items
			nextPageContent.getElements(content_item_selector).each(function(el) {
				el.inject($$(content_item_selector).getLast(), 'after');
			});
			// TODO: fire event onPageLoadSuccess
		},
		onFailure: function(xhr){
			if (debug_mode) {
				console.log("Infinite scroll down: Error, Request failed for --> " + this.options.url);
				console.log("Error details: status = " + xhr.status);
			}
			// TODO: fire event onPageLoadFailure
		}
	});
	
	// hide the pagination element
	$$(pagination_control_selector).set('style', 'display: none;');
	// inject load more pages button
	var loadMoreButton = new Element('button', {text:load_more_button_text, id:'loadmorebutton', class:'btn', style:'display: none;'})
	loadMoreButton.inject($$(content_item_selector).getLast(), 'after');
	loadMoreButton.addEvent('click', function () {
		pageCounter = 0;
		this.setStyle('display', 'none');
	});
	
	// timer
	function timer() {
		if (pageCounter >= page_stop_frequency) return;
		if (myRequest.isRunning()) return;
		// determines if the bottoms reached the trigger offset
		contentBottomLocation = $$(content_item_selector).getLast().getPosition().y + $$(content_item_selector).getLast().getSize().y;
		var bottomReachedTriggerOffset = ((contentBottomLocation - (document.getScroll().y + document.getSize().y)) < (document.getSize().y * offset_trigger / 100));
		if (bottomReachedTriggerOffset) {
			// load next page
			myRequest.options.url = nextPage;
			myRequest.send();
		}
	}
});









