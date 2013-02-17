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
		if ($app->getName() == "site") {
			$doc =& JFactory::getDocument();
			// Include script
			$doc->addScript("media/plg_system_infinitescrolldown/js/infinitescrolldown.js");
			// Pass parameters as global variables
			$doc->addScriptDeclaration(
				"var offset_trigger = " . $this->_ee($this->params->get('offset_trigger')) . "; " .
				"var content_item_selector =	'" . $this->_ee($this->params->get('content_item_selector')) . "'; " .
				"var pagination_control_selector = '" . $this->_ee($this->params->get('pagination_control_selector')) . "'; " .
				"var next_page_link_selector = '" . $this->_ee($this->params->get('next_page_link_selector')) . "'; " .
				"var page_stop_frequency = " . $this->_ee($this->params->get('page_stop_frequency')) . "; " .
				"var load_more_button_text = '" . JText::_($this->_ee($this->params->get('load_more_button_text'))) . "'; " .
				"var debug_mode = " . $this->_ee($this->params->get('debug_mode')) . "; "
			);

			$doc->addStyleDeclaration($this->params->get('styles'));
		}
	}

	/**
	 * Method to output do HTML entity encoding and escape it.
	 *
	 * @param   string  $output  The output to $this->_ee.
	 *
	 * @return  string  The $this->_eed output.
	 */
	private function _ee($output) {
		// TODO: clean this mess
		//return $output;
		//return htmlentities(html_entity_decode($output, ENT_COMPAT, 'UTF-8'), ENT_COMPAT, 'UTF-8');
		$output = str_replace("'", "\'", $output);
		return htmlspecialchars($output, ENT_COMPAT, 'UTF-8');
	}
}
