<?php
//include all files to show an overview of all tests. 
//assuming that all files (except this file) in the directory are tests. 
$dir_handle = opendir(dirname(__FILE__));
while (false !== ($file = readdir($dir_handle))) 
{
	if (!is_dir($file) && $file != basename(__FILE__)) 
	{
		include($file);
	}
}

?>
