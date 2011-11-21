<?php
require_once(dirname(__FILE__) . '/../lib/simpletest/extensions/TraildevilsUnitTestCase.php');
require_once(dirname(__FILE__) . '/../../../php/domain/TrailImagesLoader.class.php');

/**
 * Description of TestTrailsLoader
 *
 * @author odi
 */
class TestTrailImagesLoader extends TraildevilsUnitTestCase 
{
	protected $loader;

	function setUp() {
		$this->loader = new TrailImagesLoader();
		$this->jsonKeys = array("id","description","image","thumb","width","height");
	}

	function tearDown() {
		$this->loader = null;
	}
	
	function testGetTrailImages()
	{
		$url = "file://".dirname(__FILE__)."/../trailImages.json";
		$localJson = $this->loader->convertTrailImagesJson($this->getTestTrailImagesJson());
		$this->checkJson($localJson,"images");
		
		$result = $this->loader->getTrailImages(null, $url);
		$this->assertEqualsIgnoreWhitespace($result,$localJson);
	}
}

?>
