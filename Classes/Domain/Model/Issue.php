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
class Tx_Voice_Domain_Model_Issue extends Tx_Extbase_DomainObject_AbstractEntity {

	/**
	 * Subject
	 *
	 * @var string
	 */
	protected $subject;

	/**
	 * Description
	 *
	 * @var string
	 */
	protected $description;

	/**
	 * Name
	 *
	 * @var string
	 */
	protected $name;

	/**
	 * eMail
	 *
	 * @var string
	 */
	protected $email;

	/**
	 * screenshot
	 *
	 * @var string
	 */
	protected $screenshot;

	/**
	 * collectedData
	 *
	 * @var string
	 */
	protected $collectedData;

	/**
	 * Returns the subject
	 *
	 * @return string subject
	 */
	public function getSubject() {
		return $this->subject;
	}

	/**
	 * Sets the subject
	 *
	 * @param string $subject
	 * @return string subject
	 */
	public function setSubject($subject) {
		$this->subject = $subject;
	}

	/**
	 * Returns the description
	 *
	 * @return string description
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * Sets the description
	 *
	 * @param string $description
	 * @return string description
	 */
	public function setDescription($description) {
		$this->description = $description;
	}

	/**
	 * Returns the name
	 *
	 * @return string $name
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * Sets the name
	 *
	 * @param string $name
	 * @return void
	 */
	public function setName($name) {
		$this->name = $name;
	}

	/**
	 * Returns the email
	 *
	 * @return string $email
	 */
	public function getEmail() {
		return $this->email;
	}

	/**
	 * Sets the email
	 *
	 * @param string $email
	 * @return void
	 */
	public function setEmail($email) {
		$this->email = $email;
	}

	/**
	 * Returns the screenshot
	 *
	 * @return string $screenshot
	 */
	public function getScreenshot() {
		return $this->screenshot;
	}

	/**
	 * Sets the screenshot
	 *
	 * @param string $screenshot
	 * @return void
	 */
	public function setScreenshot($screenshot) {
		$this->screenshot = $screenshot;
	}

	/**
	 * Returns the collectedData
	 *
	 * @return string $collectedData
	 */
	public function getCollectedData() {
		return $this->collectedData;
	}

	/**
	 * Sets the collectedData
	 *
	 * @param string $collectedData
	 * @return void
	 */
	public function setCollectedData($collectedData) {
		$this->collectedData = $collectedData;
	}

	public function getCollectDataObject() {
		return json_decode($this->collectedData);
	}
	/**
	 * @return string
	 */
	function getScreenshotAsFile() {
		return base64_decode(substr($this->getScreenshot(),21));
	}
}