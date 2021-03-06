<?php
/**
 * Hooks for Citoid extension
 *
 * @file
 * @ingroup Extensions
 */

use MediaWiki\MediaWikiServices;

class CitoidHooks {

	/**
	 * Adds extra variables to the global config
	 * @param array &$vars
	 * @return true
	 */
	public static function onResourceLoaderGetConfigVars( array &$vars ) {
		$config = MediaWikiServices::getInstance()->getConfigFactory()->makeConfig( 'citoid' );

		$vars['wgCitoidConfig'] = [
			'citoidServiceUrl' => $config->get( 'CitoidServiceUrl' ),
			'fullRestbaseUrl' => $config->get( 'CitoidFullRestbaseURL' )
		];

		return true;
	}

	/**
	 * Register qunit unit tests
	 * @param array &$testModules
	 * @param ResourceLoader &$resourceLoader
	 * @return true
	 */
	public static function onResourceLoaderTestModules(
		array &$testModules,
		ResourceLoader &$resourceLoader
	) {
		if (
			isset( $resourceModules[ 'ext.visualEditor.mediawiki' ] ) ||
			$resourceLoader->isModuleRegistered( 'ext.visualEditor.mediawiki' )
		) {
			$testModules['qunit']['ext.citoid.tests'] = [
				'scripts' => [
					'modules/tests/index.test.js'
				],
				'dependencies' => [
					'ext.citoid.visualEditor',
				],
				'localBasePath' => __DIR__ . '/..',
				'remoteExtPath' => 'Citoid',
			];
		}

		return true;
	}

	/**
	 * @param User $user
	 * @param array &$preferences
	 * @return true
	 */
	public static function onGetPreferences( User $user, array &$preferences ) {
		$preferences['citoid-mode'] = [
			'type' => 'api'
		];
		return true;
	}
}
