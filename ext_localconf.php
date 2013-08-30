<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

Tx_Extbase_Utility_Extension::configurePlugin(
	$_EXTKEY,
	'Voice',
	array(
		'Issue' => 'index, create',
		
	),
	// non-cacheable actions
	array(
		'Issue' => 'create',
		
	)
);

?>