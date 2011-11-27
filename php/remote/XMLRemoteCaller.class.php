<?php
require_once 'RemoteCaller.class.php';

class XMLRemoteCaller extends RemoteCaller {
	protected function beforeCall()
	{
		curl_setopt($this->curlHandler, CURLOPT_HTTPHEADER, array('Accept: application/xml'));
	}
}

?>
