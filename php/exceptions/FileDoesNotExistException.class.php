<?php
/**
 * Description of FileDoesNotExistException
 *
 * @author odi
 */
class FileDoesNotExistException extends Exception {
	function __construct($fileName) {
       parent::__construct($fileName." does not exist!");
   }
}

?>
