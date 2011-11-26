<?php
require_once(dirname(__FILE__) . '/../../TraildevilsUnitTestCase.php');
require_once(dirname(__FILE__) . '/../../../php/util/TitleComparator.class.php');

class TestTitleComparator extends TraildevilsUnitTestCase {
	function testCompareEqual() 
	{
		$first['Name'] = "Müller";
		$second['Name'] = "Müller";
		$this->assertEqual(TitleComparator::compare($first, $second), 0);
		$this->assertEqual(TitleComparator::compare($first, $second),TitleComparator::compare($second, $first));
	}
	
	function testCompareLess() 
	{
		$first['Name'] = "Meier";
		$second['Name'] = "Müller";
		$this->assertTrue(TitleComparator::compare($first, $second) < 0);
		$this->assertTrue(TitleComparator::compare($second, $first) > 0);
	}
	
	function testCompareMore() 
	{
		$first['Name'] = "Odi";
		$second['Name'] = "Jürg";
		$this->assertTrue(TitleComparator::compare($first, $second) > 0);
		$this->assertTrue(TitleComparator::compare($second, $first) < 0);
	}
	
	function testCompareCaseSensitiveSame() 
	{
		$first['Name'] = "AAA";
		$second['Name'] = "aaa";
		$this->assertEqual(TitleComparator::compare($first, $second), 0);
		$this->assertEqual(TitleComparator::compare($first, $second),TitleComparator::compare($second, $first));
	}
	
	function testCompareCaseSensitiveDifferent() 
	{
		$first['Name'] = "AAA";
		$second['Name'] = "bbb";
		$this->assertTrue(TitleComparator::compare($first, $second) < 0);
		$this->assertTrue(TitleComparator::compare($second, $first) > 0);
	}
}

?>
