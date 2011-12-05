<?php
require_once(dirname(__FILE__) . '/lib/simpletest/test_case.php');
require_once('TraildevilsHTMLReporter.php');

/**
 * Description of AllTests
 *
 * @author odi
 */
class AllTests extends TestSuite {
	protected $reporter;
    function __construct() {
        parent::__construct("Traildevils - All tests");
		$this->reporter = new HTMLReporter();
    }
	
	function run($reporter=null) {
		parent::run(($reporter == null) ? $this->reporter : $reporter);
	}
}

?>
