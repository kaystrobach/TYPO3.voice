<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

Tx_Extbase_Utility_Extension::registerPlugin(
	$_EXTKEY,
	'Voice',
	'voice'
);

t3lib_extMgm::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'Voice');

t3lib_extMgm::addLLrefForTCAdescr('tx_voice_domain_model_issue', 'EXT:voice/Resources/Private/Language/locallang_csh_tx_voice_domain_model_issue.xml');
t3lib_extMgm::allowTableOnStandardPages('tx_voice_domain_model_issue');
$TCA['tx_voice_domain_model_issue'] = array(
	'ctrl' => array(
		'title'	=> 'LLL:EXT:voice/Resources/Private/Language/locallang_db.xml:tx_voice_domain_model_issue',
		'label' => 'subject',
		'tstamp' => 'tstamp',
		'crdate' => 'crdate',
		'cruser_id' => 'cruser_id',
		'dividers2tabs' => TRUE,

		'versioningWS' => 2,
		'versioning_followPages' => TRUE,
		'origUid' => 't3_origuid',
		'languageField' => 'sys_language_uid',
		'transOrigPointerField' => 'l10n_parent',
		'transOrigDiffSourceField' => 'l10n_diffsource',
		'delete' => 'deleted',
		'enablecolumns' => array(
			'disabled' => 'hidden',
			'starttime' => 'starttime',
			'endtime' => 'endtime',
		),
		'searchFields' => 'subject,description,name,email,screenshot,collected_data,',
		'dynamicConfigFile' => t3lib_extMgm::extPath($_EXTKEY) . 'Configuration/TCA/Issue.php',
		'iconfile' => t3lib_extMgm::extRelPath($_EXTKEY) . 'Resources/Public/Icons/tx_voice_domain_model_issue.gif'
	),
);

?>