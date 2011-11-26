<?php
require_once(dirname(__FILE__) . '/../../TraildevilsUnitTestCase.php');
require_once(dirname(__FILE__) . '/../../../php/util/DistanceComparator.class.php');

class TestDistanceComparator extends TraildevilsUnitTestCase {
	function testCompareEqual() 
	{
		$first['distance'] = 0;
		$second['distance'] = 0;
		$this->assertEqual(DistanceComparator::compare($first, $second), 0);
	}
	
    function testCompareLess() 
	{
		$first['distance'] = 1;
		$second['distance'] = 2;
		$this->assertTrue(DistanceComparator::compare($first, $second) < 0);
	}
	
	function testCompareMore() 
	{
		$first['distance'] = 2;
		$second['distance'] = 1;
		$this->assertTrue(DistanceComparator::compare($first, $second) > 0);
	}
	
	function testCompareLessNegative() 
	{
		$first['distance'] = -12;
		$second['distance'] = 12;
		$this->assertTrue(DistanceComparator::compare($first, $second) < 0);
	}
	
	function testCompareMoreNegative() 
	{
		$first['distance'] = -1;
		$second['distance'] = -2;
		$this->assertTrue(DistanceComparator::compare($first, $second) > 0);
	}
}

?>
