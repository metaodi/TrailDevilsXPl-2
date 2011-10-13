<?php
require_once 'RemoteCaller.class.php';
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
		$curlHandler = curl_init ($this->getURL());
		curl_setopt ($curlHandler, CURLOPT_RETURNTRANSFER, true);
		$remote_answer = curl_exec ($curlHandler);
		
		return $remote_answer;
	}
}

?>
