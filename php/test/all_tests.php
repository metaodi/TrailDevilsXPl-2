<?php
//add files and inlcude them
$dir_handle = opendir(dirname(__FILE__));
while (false !== ($file = readdir($dir_handle))) 
{
	if (!is_dir($file) && $file != basename(__FILE__)) 
	{
		include($file);
	}
}

?>
