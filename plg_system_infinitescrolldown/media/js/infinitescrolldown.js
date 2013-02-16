/**
 * @copyright	 Copyright (C) 2013 mktgexperts.com. All rights reserved.
 * @license		 GNU General Public License version 2 or later; see http://www.gnu.org/licenses/gpl-2.0.html
 */

window.addEvent('domready', function(){
	if ($$(pagination_selector + "," + content_elements_selector).length == 0) {if (flagDebug) console.log("Required elements not found"); return;}
	// vars
	var nextPage = getNextPageURL($(document.body)); // Fetch first page URL
	var pageCounter = 0;
	// objects
	var objTimer = timer.periodical(500);
	var pageContent = null;
	var infiniteScrollIndicator = new Element('button', {text:'Initializing...', id:'infinite-scroll-indicator', class:'btn', style:'width: 100%; display: block; font-size: 2em; padding: 10px; line-height: 1em;'})
	// flags
	var flagLoading = false; // Indicates a page is being loading
	var flagPending = false; // Indicates a page need to be processed
	var flagFailure = false; // Indicates a failure happened, and the script will be halted 
	var flagEndOfPages = false; // Indicates there is no more pages to load
	var flagOffsetTriggered = false; // Indicates the offset scroll have been reached
	var flagpageStopFrequency = false; // Indicates the number of pages to automatically

	// Hide the pagination
	$$(pagination_selector).set('style', 'display: none;');
	// Inject the Indicator button
	infiniteScrollIndicator.inject($$(content_elements_selector).getLast(), 'after');
	// Set event to Indicator button
	infiniteScrollIndicator.addEvent('click', function(){
		if (flagpageStopFrequency || (pageStopFrequency == 0)){pageCounter = 0; flagpageStopFrequency = false;} // Resets the counter
	});

	// Executes periodically
	function timer() {
		if (flagDebug) console.log("---> nextPage=" + nextPage + " flagPending=" + flagPending + " flagLoading=" + flagLoading + " flagFailure=" + flagFailure + " flagEndOfPages=" + flagEndOfPages +  " flagOffsetTriggered=" + flagOffsetTriggered + " pageCounter=" + pageCounter + " flagpageStopFrequency=" + flagpageStopFrequency);

		indicatorOffset = infiniteScrollIndicator.getPosition().y - (document.getScroll().y+document.getSize().y);
		flagOffsetTriggered = (indicatorOffset < (document.getSize().y*offsetTrigger/100));

		if(flagFailure){clearInterval(objTimer); return};
		
		if (nextPage && !flagPending && !flagLoading && flagOffsetTriggered && !flagpageStopFrequency){
			// gets the page content
			getPage(nextPage);
			infiniteScrollIndicator.set('text', 'Loading pages...')
		}
		if (flagPending && !flagLoading){
			pageCounter++;
			if (pageStopFrequency == 0) {
				flagpageStopFrequency = false;
			}else{
				if ((pageStopFrequency == pageCounter) && !flagpageStopFrequency) {
					flagpageStopFrequency = true;
					infiniteScrollIndicator.set('text', 'Load more pages')
				}
			}
			// find next page URL
			nextPage = getNextPageURL(pageContent);
			// injects the content in the current page
			injectPageContent();
			flagPending = false;
		}
		if (!nextPage && !flagEndOfPages) {
			if (flagDebug) console.log('End of pages')
			flagEndOfPages = true;
			infiniteScrollIndicator.set('text', 'End of pages')
			clearInterval(objTimer);
		}
	}

	// Filters and inject the page content in the current page
	function injectPageContent(){
		var els = pageContent.getElements(content_elements_selector);
		els.each(function(el) {
			el.inject($$(content_elements_selector).getLast(), 'after');
		});
	}

	// Returns an URL if exist a next page, returns false if there is no more pages
	function getNextPageURL(page){
		// finds the href value of the next page button from the pagination
		var el = page.getElements(next_page_link_selector)[0];
		if (el != null) {
			return el.get('href');
		}else{
			return false;
		}
	}

	// Returns a page content from a given URL
	function getPage(url) {
		new Request({
			url: url + "&tmpl=component",
			onRequest: function(){
				if (flagDebug) console.log('loading page...');
				flagLoading = true;
			},
			onSuccess: function(responseText, responseXML){
				pageContent = new Element('div', {html:responseText});
				flagLoading = false;
				flagPending = true;
				if (flagDebug) console.log("page load success!");
			},
			onFailure: function(){
				flagFailure = true;
				if (flagDebug) console.log('Load page failed')
			}
		}).send();
	}
});





















