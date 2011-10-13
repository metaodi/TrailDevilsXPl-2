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
		$trail = array(	"title" => "Test-Trail",
						"location" =>"Testland",
						"distance" => 2000,
						"imagepath" => "http://traildevils.ch/media/img/trails/trailimg_120_1233.jpg",
						"description" =>  "Trail-Beschreibung",
						"status" =>  "offen");
		return "{ \"trails\": [".json_encode($trail)."]}";
	}
}

?>
