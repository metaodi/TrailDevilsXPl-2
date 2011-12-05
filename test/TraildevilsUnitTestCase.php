<?php
require_once(dirname(__FILE__) . '/lib/simpletest/unit_tester.php');
require_once('TraildevilsHTMLReporter.php');
require_once('JUnitXMLReporter.php');
require_once(dirname(__FILE__) . '/../php/domain/GeoLocation.class.php');
/**
 * Description of ReportableUnitTestCase
 *
 * @author odi
 */
abstract class TraildevilsUnitTestCase extends UnitTestCase {
	protected $jsonKeys;
	
	function __construct($label="Traildevils - Test Case") {
		parent::__construct($label);
	}
	
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
	
	protected function getTestTrailXml()
	{
		$trailXml  = "<ArrayOfTrail xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n";
		$trailXml .= "	<Trail>\n";
		$trailXml .= "		<Id>1</Id>\n";
		$trailXml .= "		<CreatedDate>2010-03-20T12:43:46</CreatedDate>\n";
		$trailXml .= "		<ModifiedDate>2011-03-02T11:35:46</ModifiedDate>\n";
		$trailXml .= "		<DeletedDate xsi:nil=\"true\"/>\n";
		$trailXml .= "		<CreatedUnixTs>1269089026</CreatedUnixTs>\n";
		$trailXml .= "		<ModifiedUnixTs>1299065746</ModifiedUnixTs>\n";
		$trailXml .= "		<DeletedUnixTs xsi:nil=\"true\"/>\n";
		$trailXml .= "		<NextCity>Winterthur</NextCity>\n";
		$trailXml .= "		<GmapX>47.476709367794136</GmapX>\n";
		$trailXml .= "		<GmapY>8.69793176651001</GmapY>\n";
		$trailXml .= "		<Name>Testtrail</Name>\n";
		$trailXml .= "		<Desc>Testbeschreibung</Desc>\n";
		$trailXml .= "		<Journey>Reisebeschreibung</Journey>\n";
		$trailXml .= "		<IsCommercial>supported</IsCommercial>\n";
		$trailXml .= "		<State>ok</State>\n";
		$trailXml .= "		<IsOpen>true</IsOpen>\n";
		$trailXml .= "		<Url/>\n";
		$trailXml .= "		<Favorits>25</Favorits>\n";
		$trailXml .= "		<ImageUrl800>http://www.traildevils.ch/media/img/trails/trailimg_800_4.jpg</ImageUrl800>\n";
		$trailXml .= "		<ImageUrl120>http://www.traildevils.ch/media/img/trails/trailimg_120_4.jpg</ImageUrl120>\n";
		$trailXml .= "		<TraildevilsId>2</TraildevilsId>\n";
		$trailXml .= "		<Country>Switzerland</Country>\n";
		$trailXml .= "		<CountryId>176</CountryId>\n";
		$trailXml .= "		<TrailTypes>\n";
		$trailXml .= "			<TrailType>\n";
		$trailXml .= "				<Id>1</Id>\n";
		$trailXml .= "				<CreatedDate>2011-11-08T15:02:33.153</CreatedDate>\n";
		$trailXml .= "				<ModifiedDate xsi:nil=\"true\"/>\n";
		$trailXml .= "				<DeletedDate xsi:nil=\"true\"/>\n";
		$trailXml .= "				<CreatedUnixTs>1320764553</CreatedUnixTs>\n";
		$trailXml .= "				<ModifiedUnixTs xsi:nil=\"true\"/>\n";
		$trailXml .= "				<DeletedUnixTs xsi:nil=\"true\"/>\n";
		$trailXml .= "				<Name>Dirtjump</Name>\n";
		$trailXml .= "				<Description>Eine Dirtjump-Anlage mit vorwiegend Doubles.</Description>\n";
		$trailXml .= "			</TrailType>\n";
		$trailXml .= "			<TrailType>\n";
		$trailXml .= "				<Id>8</Id>\n";
		$trailXml .= "				<CreatedDate>2011-11-08T15:02:33.157</CreatedDate>\n";
		$trailXml .= "				<ModifiedDate xsi:nil=\"true\"/><DeletedDate xsi:nil=\"true\"/>\n";
		$trailXml .= "				<CreatedUnixTs>1320764553</CreatedUnixTs>\n";
		$trailXml .= "				<ModifiedUnixTs xsi:nil=\"true\"/>\n";
		$trailXml .= "				<DeletedUnixTs xsi:nil=\"true\"/>\n";
		$trailXml .= "				<Name>BMX-Bahn</Name>\n";
		$trailXml .= "				<Description>Eine Renn-Anlage für BMXer.</Description>\n";
		$trailXml .= "			</TrailType>\n";
		$trailXml .= "		</TrailTypes>\n";
		$trailXml .= "		<TrailImages/>\n";
		$trailXml .= "		<TrailFeeds/>\n";
		$trailXml .= "		<TrailCheckins/>\n";
		$trailXml .= "	</Trail>\n";
		$trailXml .= "</ArrayOfTrail>\n";
		return $trailXml;
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
	
	function checkJson($json) {
		$jsonArray = json_decode($json, true);
		$this->checkJsonFormat($jsonArray[0]);
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
