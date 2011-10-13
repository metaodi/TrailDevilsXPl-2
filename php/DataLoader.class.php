<?php
require_once 'JSONRemoteCaller.class.php';
class DataLoader
{
	public function echoData($data)
	{
		echo $data;
	}
	
	public function getTrails()
	{
		$remote = new JSONRemoteCaller("http://152.96.80.18:8080/api/trails");
		return $remote->callRemoteSite();
	}
}
?>