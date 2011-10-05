<?php
if (count(get_included_files()) == 1)
{
	require_once('../../lib/simpletest/autorun.php');
}
require_once('../DataLoader.class.php');

class TestDataLoader extends UnitTestCase {
    function testReturnData() {
        $loader = new DataLoader();
        $input = "Hallo Testwelt";
        $this->assertEqual($loader->returnData($input),$input);
    }
}
?>
