<?php defined('_JEXEC') or die;
/**
 * @copyright   Copyright (C) 2013 mktgexperts.com. All rights reserved.
 * @license     GNU General Public License version 2 or later; see http://www.gnu.org/licenses/gpl-2.0.html
 */

defined('JPATH_BASE') or die;

/**
 * Plugin class for logout redirect handling.
 *
 * @package     Joomla.Plugin
 * @subpackage  System.logout
 * @since       1-6
 */
class plgSystemInfiniteScrollDown extends JPlugin {

	public function __construct(& $subject, $config){
		parent::__construct($subject, $config);
		$this->loadLanguage();
	}

	function onBeforeRender() {
		//$execution_side = $this->params->get('execution_side', 'site');
		$app = & JFactory::getApplication();
		// Executes only on site side
		if ($app->getName() == "site")
		{
			$doc =& JFactory::getDocument();
			// Include script
			$doc->addScript("media/plg_system_infinitescrolldown/js/infinitescrolldown.js");
			// Pass parameters as global variables
			$doc->addScriptDeclaration(
				"var pageStopFrequency = " . $this->params->get('page_stop_frequency') . "; // Indicates the number of pages to load automatically, leave it 0
				var offsetTrigger = " . $this->params->get('offset_trigger') . "; // This value represents a percentage of the screen height
				var flagDebug = " . $this->params->get('debug_mode') . " // Enable/disable the debug mode to output information to console
				var content_elements_selector =	'" . $this->params->get('content_elements_selector') . "'
				var next_page_link_selector = '" . $this->params->get('next_page_link_selector') . "'
				var pagination_selector = '" . $this->params->get('pagination_selector') ."'"
			);
		}
	}
}
