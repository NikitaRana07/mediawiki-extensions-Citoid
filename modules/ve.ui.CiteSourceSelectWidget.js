/*!
 * VisualEditor UserInterface CiteSourceSelectWidget class
 * Originally from VisualEditor MediaWiki UserInterface
 *
 * @copyright 2011-2015 VisualEditor Team and others
 * @license The MIT License (MIT); see LICENSE.txt
 */

/**
 * Creates an ve.ui.CiteSourceSelectWidget object.
 *
 * @class
 * @extends OO.ui.SearchWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
ve.ui.CiteSourceSelectWidget = function VeUiCiteSourceSelectWidget( config ) {
	var items;

	config = config || {};

	// Parent constructor
	ve.ui.CiteSourceSelectWidget.super.call( this, config );

	// Go over available tools
	items = ve.ui.mwCitationTools.map( function ( item ) {
		return new OO.ui.DecoratedOptionWidget( {
			icon: item.icon,
			label: item.title,
			// Command name
			data: 'cite-' + item.name
		} );
	} );

	// Basic tools
	this.refBasic = new OO.ui.DecoratedOptionWidget( {
		icon: 'reference',
		label: ve.msg( 'cite-ve-dialogbutton-reference-full-label' ),
		// Command name
		data: 'reference',
		classes: [ 've-ui-citeSourceSelectWidget-basic' ]
	} );
	items.push( this.refBasic );

	this.addItems( items );

	if ( items.length > 1 ) {
		$( '<div>' )
			.addClass( 've-ui-citeSourceSelectWidget-separator' )
			.insertBefore( this.refBasic.$element );
	}

	// Initialization
	this.$element.addClass( 've-ui-citeSourceSelectWidget' );
};

/* Inheritance */

OO.inheritClass( ve.ui.CiteSourceSelectWidget, OO.ui.SelectWidget );
