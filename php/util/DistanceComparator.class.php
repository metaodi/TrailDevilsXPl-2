<?php

require_once('Comparable.php');

/**
 * Description of DistanceComparator
 *
 * @author odi
 */
class DistanceComparator implements Comparable {
	public static function compare($a, $b) {
		if($a['distance'] == $b['distance']) {
			return 0;
		}
		return ($a['distance'] < $b['distance']) ? -1 : 1;
	}
}

?>
