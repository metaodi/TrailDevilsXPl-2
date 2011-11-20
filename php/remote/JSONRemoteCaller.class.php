<?php
require_once('RemoteCaller.class.php');
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of JSONRemoteCaller
 *
 * @author odi
 */
class JSONRemoteCaller extends RemoteCaller {
	public function callRemoteSite()
	{
		$curlHandler = curl_init($this->getURL());
		curl_setopt($curlHandler, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curlHandler, CURLOPT_HTTPHEADER, array('Accept: application/json'));
		curl_setopt($curlHandler, CURLOPT_TIMEOUT, 30);
		$remote_answer = curl_exec($curlHandler);
		
		if(curl_errno($curlHandler) != 0) {
			echo "cURL Errornumber: ".curl_errno($curlHandler)."<br />";
			echo "cURL Error: ".curl_error($curlHandler)."<br />";
		}
		
		return $remote_answer;
	}
}

?>
