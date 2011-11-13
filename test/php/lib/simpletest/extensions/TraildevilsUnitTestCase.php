<?php
require_once(dirname(__FILE__) . '/../unit_tester.php');
require_once('TraildevilsHTMLReporter.php');
require_once('JUnitXMLReporter.php');
require_once(dirname(__FILE__) . '/../../../../../php/GeoLocation.class.php');
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
	
	protected function getTestTrailJson()
	{
		$location = $this->getTestGeoLocation();
		
		$trailJson = "[{\n";
		$trailJson .= "\"Country\":\"Switzerland\",\n";
		$trailJson .= "\"CountryId\":176,\n";
		$trailJson .= "\"CreatedDate\":\"\/Date(1077573600000+0100)\/\",\n";
		$trailJson .= "\"Desc\":\"Test-Description\",\n";
		$trailJson .= "\"Favorits\":0,\n";
		$trailJson .= "\"GmapX\":\"".$location->getLatitude()."\",\n";
		$trailJson .= "\"GmapY\":\"".$location->getLongitude()."\",\n";
		$trailJson .= "\"ImageUrl120\":\"http:\/\/www.traildevils.ch\/media\/img\/trails\/trailimg_120_34.jpg\",\n";
		$trailJson .= "\"ImageUrl800\":\"http:\/\/www.traildevils.ch\/media\/img\/trails\/trailimg_800_34.jpg\",\n";
		$trailJson .= "\"Info\":null,\n";
		$trailJson .= "\"IsCommercial\":\"false\",\n";
		$trailJson .= "\"IsOpen\":null,\n";
		$trailJson .= "\"Journey\":\"Kurze Reiseanweisungen\",\n";
		$trailJson .= "\"Name\":\"Testtrail\",\n";
		$trailJson .= "\"NextCity\":\"Zürich\",\n";
		$trailJson .= "\"State\":\"ok\",\n";
		$trailJson .= "\"Id\":11,\n";
		$trailJson .= "\"Url\":null\n";
		$trailJson .= "},\n";
		$trailJson .= "{\n";
		$trailJson .= "\"Country\":\"Switzerland\",\n";
		$trailJson .= "\"CountryId\":176,\n";
		$trailJson .= "\"CreatedDate\":\"\/Date(1077573600000+0100)\/\",\n";
		$trailJson .= "\"Desc\":\"Test-Description2\",\n";
		$trailJson .= "\"Favorits\":0,\n";
		$trailJson .= "\"GmapX\":\"47.218271\",\n";
		$trailJson .= "\"GmapY\":\"8.657247\",\n";
		$trailJson .= "\"ImageUrl120\":\"http:\/\/www.traildevils.ch\/media\/img\/trails\/trailimg_120_34.jpg\",\n";
		$trailJson .= "\"ImageUrl800\":\"http:\/\/www.traildevils.ch\/media\/img\/trails\/trailimg_800_34.jpg\",\n";
		$trailJson .= "\"Info\":null,\n";
		$trailJson .= "\"IsCommercial\":\"false\",\n";
		$trailJson .= "\"IsOpen\":null,\n";
		$trailJson .= "\"Journey\":\"Kurze Reiseanweisungen für Trail 2\",\n";
		$trailJson .= "\"Name\":\"Testtrail2\",\n";
		$trailJson .= "\"NextCity\":\"Zürich\",\n";
		$trailJson .= "\"State\":\"ok\",\n";
		$trailJson .= "\"Id\":12,\n";
		$trailJson .= "\"Url\":null\n";
		$trailJson .= "}]";
		return $trailJson;
	}
	
	protected function getTestGeoLocation()
	{
		/*return Location near HSR Rapperswil */
		return new GeoLocation(47.223357, 8.816614);
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
