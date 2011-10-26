<?php
$url = $_GET['url'];
if($url == "") {
	$url = "http://152.96.80.18:8080/api/trails";
}
$ch = curl_init($url);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt ($ch, CURLOPT_TIMEOUT, 5);
$remote_answer = curl_exec($ch);
if(curl_errno($ch) != 0) {
	echo "cURL Errornumber: ".curl_errno($ch)."<br>";
	echo "cURL Error: ".curl_error($ch)."<br>";
}
echo $remote_answer;
?>