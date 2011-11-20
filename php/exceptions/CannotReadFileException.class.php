<?php

/**
 * Description of CannotReadFileException
 *
 * @author odi
 */
class CannotReadFileException extends Exception {
	function __construct($fileName) {
       parent::__construct("Can't read file ".$fileName);
   }
}

?>
