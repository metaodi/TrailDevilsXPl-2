<?php
require_once(dirname(__FILE__) . '/../unit_tester.php');
require_once('TraildevilsHTMLReporter.php');
require_once('JUnitXMLReporter.php');
/**
 * Description of ReportableUnitTestCase
 *
 * @author odi
 */
abstract class TraildevilsUnitTestCase extends UnitTestCase {
	function report() 
	{
		$test = new TestSuite($this->getLabel());
		$test->add($this);
		if (TextReporter::inCli()) 
		{
			exit ($test->run(new JUnitXMLReporter()) ? 0 : 1);
		} 
		$test->run(new TraildevilsHTMLReporter());
	}
	
	function assertEqualsIgnoreWhitespace($first, $second, $message = '%s')
	{
		//ignore whitespace
		$first = $this->removeWhitespace($first);
		$second = $this->removeWhitespace($second);
		
		$this->assertEqual($first, $second, $message);
	}
	
	private function removeWhitespace($text)
	{
		return preg_replace("/\s/", "", $text);
	}
	
	function setUp() {
		ob_start();
    }

    function tearDown() {
        ob_end_flush();
    }
	
	function getOutput()
	{
		return ob_get_contents();
	}
}

?>
