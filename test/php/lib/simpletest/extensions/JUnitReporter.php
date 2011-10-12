<?php
/**
 * A reporter that writes jUnit xml files
 */
class JUnitReporter extends SimpleReporter
{
	private $_dom;
	private $_tests=array();
	private $_test;
	private $_testsuite;

	function __construct()
	{
		parent::__construct();
		$this->_dom = new DOMDocument('1.0', 'utf-8');
		$this->_dom->formatOutput = true;
	}

	function paintGroupStart($test_name,$size)
	{
		if(!isset($this->_testsuite))
		{
			$this->_testsuite = $this->_dom->createElement('testsuite');
			$this->_testsuite->setAttribute('tests', $size);
			$this->_dom->appendChild($this->_testsuite);
		}
	}

	function paintCaseStart($test_name)
	{
		$this->_testsuite->setAttribute('name', $test_name);
		$this->_testsuite->setAttribute('timestamp', date('c'));
		$this->_timer = microtime(true);
	}

	function paintCaseEnd($test_name)
	{
		$this->_testsuite->setAttribute('tests', count($this->_tests));

		$errors = 0;
		$failures = 0;
		$time = 0;

		foreach($this->_tests as $test)
		{
			$errors += count($test['errors']);
			$failures += count($test['failures']);
			$time += $test['duration'];
		}

		$this->_testsuite->setAttribute('time', $time);
		$this->_testsuite->setAttribute('failures', $failures);
		$this->_testsuite->setAttribute('errors', $errors);
	}

	function paintMethodStart($test_name)
	{
		$this->_tests[$test_name] = array(
			'name'=>$test_name,
			'starttime'=>microtime(true),
			'duration'=>0,
			'failures'=>array(),
			'errors'=>array(),
			);

		$this->_test =& $this->_tests[$test_name];
	}

	function paintMethodEnd($test_name)
	{
		$this->_test['duration'] = microtime(true) - $this->_test['starttime'];

		$testcase = $this->_dom->createElement('testcase');
		$testcase->setAttribute('name', $test_name);
		$testcase->setAttribute('time', $this->_test['duration']);
		$this->_testsuite->appendChild($testcase);

		foreach($this->_test['failures'] as $message)
		{
			$failure = $this->_dom->createElement('failure');
			$failure->setAttribute('message', $message);
			$testcase->appendChild($failure);
		}

		foreach($this->_test['errors'] as $message)
		{
			$failure = $this->_dom->createElement('error');
			$failure->setAttribute('message', $message);
			$testcase->appendChild($failure);
		}
	}

	function paintFail($message)
	{
		parent::paintFail($message);
		$this->_test['failures'][] = $message;
	}

	function paintError($message)
	{
		parent::paintError($message);
		$this->_test['errors'][] = $message;
	}

	function paintException($e)
	{
		parent::paintException($e);
		$this->_test['errors'][] = $e->getMessage();
	}

	function getXml()
	{
		return $this->_dom->saveXml();
	}
}
