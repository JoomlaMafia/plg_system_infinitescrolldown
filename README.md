# plg_system_infinitescrolldown

Joomla plugin to dynamically load paginated content on demand.

# Compatibility

* Tested on Joomla 2.5
* Tested on Joomla 3.0

# Description

This plugin dynamically loads paginated content on demand such as "Category blog" pages but it can be configured to virtually load any kind of paginated content. The script uses CSS selectors to determine the layout structures and define what elements are the content items and the pagination control, this makes this plugin extremely flexible for almost any kind of template.

This is a non-invasive plugin because it does not modifies the markup from the server side, instead all the changes are made dynamically on the client side, the original pagination controlls is hidden with <code>display: none;</code>, the content items of the next page are dynamically appended after the last existing content items in the current page.

Search bots will not have any problem indexing the content and browser that can't execute the scripts will get the normal markup of the current template providing the standard navigation experience.

Note: The target audience for this plugin is "Developers", configuration of this plugin needs expertise in the web development area.

# Configurations

## Plugin parameters:

* Offset trigger (%): This value represent a percentage of the browser window viewport height size, when the viewport height plus the calculated offset reach the bottom of the content, the script will get active and load more content", using a percentage value makes this plugin ideal for responsive websites.
* Content item selector: Input here a valid CSS selector to select the content items, select a repetitive structures that can be appended one after another without destroying the template layout.
* Pagination control selector: Input here a valid CSS selector to select the pagination control, this parameter have the sole purpose of select and hide the pagination control
* Next page link selector: Input here a valid CSS selector to select the link element ('a' tag) of the next page button of the pagination control.
* Page stop frequency: Input here an integer number to determine how many pages the script will load and wait for user intervention to load a the next round of pages, set this value to 0 (zero) to never ask for user intervention.
* More button text: Input here the load more button text. This field admits translation language strings.
* Styles: Input here valid CSS code to insert it into the document head.
* Debug mode: Enable this option to print to browser console the script operation status and messages.

Note: This plugin comes pre-configured to work out of the box with the Joomla 3 template "protostar". In case your custom parameters dont seems to work, enable the debug mode to see the script messages.

## Menu item parameters

For the page menu item make sure the pagination is set to "show", the pagiantion needs to be in the markup. Othe parameters like "# links" can be set to "0" to get them hide.

# Cases of use

* If the script on the initialization (after domready) does not find any match for "Content item selector", "Pagination control selector" or "Next page link selector", the script will stop the operations. On debug mode a message is printed to console.
* If the page counter is equal or greater than the value of the parameter "Page stop frequency", the script will stop the operations and will display the "Load more button" after the last content item, only after user intervention (click) the operations will be resume operations. On debug mode a message is printed to console.
* The script determines it reached the end of pages when the selector "Next page link selector" does not have matches in the last loaded page markup, then the script timer will be cleared and all operations will stop. On debug mode a message is printed to console.
* In case a page contains more than one paginated content with it own pagination structure that also matches the configured selectors, the results are unexpected and undefined.
* The user can set a grained controls of were to implement the infinite scroll down feature using custom page CSS classes at each menu item individually. In some templates the page class is added at the class property of the body tag, but in other templates the page class is added at the class property of the div that contains the component content that usually have the class "component-content". For example: set a page class like "infscrdwn-enabled" and use selectors for the plugin like this "infscrdwn-enabled .blog .pagination" this way if the user have several blog pages but want to use the plugin one some of them, it can exclude the plugin execution using selector in a clever way. 


# TODO

* Add options to menu items to enable and enable/disable the plugin features, for now the plugin work site wide with no granular selection.
* Encapsulate the global variables inside an object or namespace.
* Add status related events to let developers fire the execution of custom scripts.
* Add a a script section at the parameters section to insert event related methods.
* Replace the insertion of the button with a flexible and customizable solution for user interaction.








