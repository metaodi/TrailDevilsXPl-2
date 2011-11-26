<?php
require_once(dirname(__FILE__) . '/../unit_tester.php');
require_once('TraildevilsHTMLReporter.php');
require_once('JUnitXMLReporter.php');
require_once(dirname(__FILE__) . '/../../../../../php/domain/GeoLocation.class.php');
/**
 * Description of ReportableUnitTestCase
 *
 * @author odi
 */
abstract class TraildevilsUnitTestCase extends UnitTestCase {
	protected $jsonKeys;
	
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
	
	protected function getTestTrailImagesJson() {
		$trailImageJson  = "[{\n"; 
		$trailImageJson .= "\"CreatedDate\":\"\/Date(1076709600000+0100)\/\",\n";
		$trailImageJson .= "\"CreatedUnixTs\":1076713200,\n";
		$trailImageJson .= "\"DeletedDate\":null,\n";
		$trailImageJson .= "\"DeletedUnixTs\":null,\n";
		$trailImageJson .= "\"Id\":1,\n";
		$trailImageJson .= "\"ModifiedDate\":null,\n";
		$trailImageJson .= "\"ModifiedUnixTs\":null,\n";
		$trailImageJson .= "\"Description\":\"Testfoto!\",\n";
		$trailImageJson .= "\"ImageUrl120\":\"http:\/\/www.traildevils.ch\/media\/img\/trails\/trailimg_120_4.jpg\",\n";
		$trailImageJson .= "\"ImageUrl800\":\"http:\/\/www.traildevils.ch\/media\/img\/trails\/trailimg_800_4.jpg\",\n";
		$trailImageJson .= "\"TrailId\":1\n";
		$trailImageJson .= "},\n"; 
		$trailImageJson .= "{\n";
		$trailImageJson .= "\"CreatedDate\":\"\/Date(1076709600000+0100)\/\",\n";
		$trailImageJson .= "\"CreatedUnixTs\":1076713200,\n";
		$trailImageJson .= "\"DeletedDate\":null,\n";
		$trailImageJson .= "\"DeletedUnixTs\":null,\n";
		$trailImageJson .= "\"Id\":2,\n";
		$trailImageJson .= "\"ModifiedDate\":null,\n";
		$trailImageJson .= "\"ModifiedUnixTs\":null,\n";
		$trailImageJson .= "\"Description\":\"Kein Foto!\",\n";
		$trailImageJson .= "\"ImageUrl120\":\"\",\n";
		$trailImageJson .= "\"ImageUrl800\":\"\",\n";
		$trailImageJson .= "\"TrailId\":2\n";
		$trailImageJson .= "}]\n"; 
		
		return $trailImageJson;
	}
	
	protected function getTestGeoLocation()
	{
		/*return Location near HSR Rapperswil */
		return new GeoLocation(47.223357, 8.816614);
	}
	
	function checkJson($json, $root) {
		$jsonArray = json_decode($json, true);
		$this->checkJsonFormat($jsonArray[$root][0]);
	}
	
	function checkJsonFormat($json) {
		foreach ($this->jsonKeys as $key)
		{
			$this->assertTrue(array_key_exists($key, $json),"Key \"$key\" must exist in converted JSON array.");
		}
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
