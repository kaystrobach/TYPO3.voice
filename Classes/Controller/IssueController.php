<?php

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2013 Kay Strobach <typo3@kay-strobach.de>
 *  
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

/**
 *
 *
 * @package voice
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 */
class Tx_Voice_Controller_IssueController extends Tx_Extbase_MVC_Controller_ActionController {

	/**
	 * issueRepository
	 * @inject
	 * @var Tx_Voice_Domain_Repository_IssueRepository
	 */
	protected $issueRepository;

	/**
	 * indexAction
	 *
	 * @return void
	 */
	public function indexAction() {
		$issue = new Tx_Voice_Domain_Model_Issue();
		$this->view->assign('issue',    $issue);
		$this->view->assign('settings', $this->settings);
	}

	/**
	 * Injects the reflection service
	 *
	 * @param Tx_Voice_Domain_Repository_IssueRepository $issueRepository
	 * @return void
	 */
	public function injectIssueRepository(Tx_Voice_Domain_Repository_IssueRepository $issueRepository) {
		$this->issueRepository = $issueRepository;
	}

	/**
	 * action create
	 *
	 * @param Tx_Voice_Domain_Model_Issue $issue
	 * @return void
	 */
	public function createAction(Tx_Voice_Domain_Model_Issue $issue) {

		$extbaseFrameworkConfiguration = $this->configurationManager->getConfiguration(Tx_Extbase_Configuration_ConfigurationManagerInterface::CONFIGURATION_TYPE_FRAMEWORK);
		$templateRootPath = t3lib_div::getFileAbsFileName($extbaseFrameworkConfiguration['view']['templateRootPath']);

		/**
		 * @var $emailView Tx_Fluid_View_StandaloneView
		 */
		$emailView = $this->objectManager->get('Tx_Fluid_View_StandaloneView');
		$emailView->setTemplatePathAndFilename($templateRootPath . 'Email/Index.html');
		$emailView->assignMultiple(
			array(
				'issue' => $issue,
			)
		);


		// html rendering
		$emailView->setFormat('html');
		$htmlEmailBody = $emailView->render();

		// render plain text as well
		$emailView->setFormat('txt');
		$textEmailBody = $emailView->render();

		/**
		 * @var $mail \t3lib_mail_message
		 */
		try {
			$mail = $this->objectManager->create('t3lib_mail_message');
			$mail->setFrom(
					array(
							$issue->getEmail() => $issue->getName()
					))
					->setTo(
							array(
									$this->settings['recipient']['email'] => $this->settings['recipient']['name']
							)
					)
					->setSubject($this->settings['recipient']['subject'] . $issue->getSubject())
					->setBody($textEmailBody, 'text/plain')
					->addPart($htmlEmailBody, 'text/html')
					->attach(new Swift_Attachment(print_r(json_decode($issue->getCollectedData()), TRUE), 'trace.txt', 'text/plain'));
			if($this->settings['information']['screenshot']) {
				$mail->attach(new Swift_Attachment($issue->getScreenshotAsFile(), 'screen.png', 'image/png'));
			}

			$mail->send();
		} catch(Exception $e) {
			$this->throwStatus(404, 'Not Found', $e->getMessage());
		}


		/**
		 * @todo needs to be checked to avoid an exception
		 */
		$this->issueRepository->add($issue);

		$this->view->assign('issue', $issue);
	}

}
