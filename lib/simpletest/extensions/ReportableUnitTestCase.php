<?php
require_once(dirname(__FILE__) . '/../unit_tester.php');
require_once('JUnitXMLReporter.php');
/**
 * Description of ReportableUnitTestCase
 *
 * @author odi
 */
class ReportableUnitTestCase extends UnitTestCase {
	function report() 
	{
		$test = new TestSuite($this->getLabel());
		$test->add($this);
		if (TextReporter::inCli()) 
		{
			exit ($test->run(new JUnitXMLReporter()) ? 0 : 1);
		} 
		$test->run(new HtmlReporter());
	}
}

?>
