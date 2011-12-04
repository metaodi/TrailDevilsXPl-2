<?php
require_once('RemoteCaller.class.php');

class JSONRemoteCaller extends RemoteCaller {
	protected function beforeCall()
	{
		curl_setopt($this->curlHandler, CURLOPT_HTTPHEADER, array('Accept: application/json'));
	}
	
	public function getDefaultResponse() 
	{
		return "{}";
	}
}

?>
