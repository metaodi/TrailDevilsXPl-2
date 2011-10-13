<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of RemoteCaller
 *
 * @author odi
 */
abstract class RemoteCaller {
	protected $url;
	
	function __construct($url) {
		$this->url = $url;
	}
	
	function getURL()
	{
		return $this->url;
	}
	
    abstract public function callRemoteSite();
}

?>
