<?php
require_once(dirname(__FILE__) . '/../exceptions/RemoteException.class.php');

abstract class RemoteCaller {
	protected $url;
	protected $curlHandler;
	
	public function __construct($url) {
		$this->url = $url;
	}
	
	public function getURL()
	{
		return $this->url;
	}
	
    public function callRemoteSite()
	{
		$this->curlHandler = curl_init($this->getURL());
		$this->beforeCall();
		curl_setopt($this->curlHandler, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($this->curlHandler, CURLOPT_TIMEOUT, 30);
		$remote_answer = curl_exec($this->curlHandler);
		
		if(curl_errno($this->curlHandler) != 0) {
			$msgErrorNo = "cURL Errornumber: ".curl_errno($this->curlHandler);
			$msgError = "cURL Error: ".curl_error($this->curlHandler);
			throw new RemoteException($this->url,$msgErrorNo." ".$msgError);
		}
		return $remote_answer;
	}
	
	abstract protected function beforeCall();
	abstract public function getDefaultResponse();
}

?>
