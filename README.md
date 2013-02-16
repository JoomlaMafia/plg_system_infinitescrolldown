# plg_system_infinitescrolldown

Joomla plugin to dynamically load paginated content on demand.

# Compatibility

Tested on Joomla 2.5 and 3.0

# Description

This plugin dynamically loads paginated content on demand such as "Category blog" pages. The script uses CSS selectors to determine the layout structures and define what elements are the content pages, the content items and the pagination control, this makes this plugin extremely flexible for almost any kind of template.

This is non-invasive plugin because it does not modifies the markup from the server side, instead all the changes are made dynamically on the client side, basically the pagination control is set to <code>display: none;</code>, the content items of the next page are dynamically appended after the last existing content items.

Search bots will not have any problem indexing the content and browser that can't execute the scripts will get the normal markup of the current template providing the standard navigation experience.

Note: The target audience for this plugin is "Developers", configuration of this plugin needs expertise in the web development area.

# Limitations

* The plugin only works properly on paginated content that have a link based pagination control, this script fetch the <code>href</code> value of the next page link to determine the URL of next page to load.
* More than one paginated content that shares the same structures in the same page could bring unexpected results.
* The plugin does not plays nice yet with content items like leading articles.

# Configurations

* Install the plugin and enable it as any other Joomla plugin.
* On the menu item that refers to the paginate content such as any "Category blog", set the following parameters:
	* Advanced options --> Blog layout options:
		* # Leading Articles = 0
		* # Links = 0
		* Pagination = show
		* for parameters like "# Intro Articles" and "# Columns" use any value you feel comfortable with

Note: The plugin parameters comes pre-configured to work out of the box with the traditional rockettheme/gantry paginated content layout.

# TODO

* Add options to menu items to enable and enable/disable the plugin features, for now the plugin work site wide with no granular selection.
* Chnage names of some variables.
* Ecapsualte the global variables inside an object or namespace.
* Add status related events to let developers fire the execution of custom scripts.
* Add configurable classes that dynamically change on certain statuses.
* Add more granulated CSS selector parameters
* Use a not so ugly and spaming debug mode messages
* Refine the JS code
* Enahnce the configuration section fo this doc
