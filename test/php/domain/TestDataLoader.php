<?php
require_once(dirname(__FILE__) . '/../../TraildevilsUnitTestCase.php');
require_once(dirname(__FILE__) . '/../../../php/domain/DataLoader.class.php');

class TestDataLoader extends TraildevilsUnitTestCase 
{	
	function testServerParameter() {
		$this->assertTrue(ini_get("allow_url_fopen"));
	}
}
?>
