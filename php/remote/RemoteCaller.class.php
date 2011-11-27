<?php
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
			echo "cURL Errornumber: ".curl_errno($this->curlHandler)."<br />";
			echo "cURL Error: ".curl_error($this->curlHandler)."<br />";
		}
		return $remote_answer;
	}
	
	abstract protected function beforeCall();
}

?>
