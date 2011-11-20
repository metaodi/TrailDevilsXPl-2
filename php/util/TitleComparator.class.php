<?php

require_once('Comparable.php');

/**
 * Description of TitleComparator
 *
 * @author odi
 */
class TitleComparator implements Comparable{
	public static function compare($a, $b) {
	    return strcmp($a['Name'], $b['Name']);
	}
}

?>
