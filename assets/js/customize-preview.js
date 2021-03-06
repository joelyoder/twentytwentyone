/* global twentytwentyoneGetHexLum, jQuery */
( function() {
	// Add listener for the "background_color" control.
	wp.customize( 'background_color', function( value ) {
		value.bind( function( to ) {
			var lum = twentytwentyoneGetHexLum( to ),
				isDark = 127 > lum,
				textColor = ! isDark ? 'var(--global--color-dark-gray)' : 'var(--global--color-light-gray)',
				tableColor = ! isDark ? 'var(--global--color-light-gray)' : 'var(--global--color-dark-gray)',
				stylesheetID = 'twentytwentyone-customizer-inline-styles',
				stylesheet,
				styles;

			// Modify the body class depending on whether this is a dark background or not.
			if ( isDark ) {
				document.body.classList.add( 'is-dark-theme' );
				document.documentElement.classList.add( 'is-dark-theme' );
			} else {
				document.body.classList.remove( 'is-dark-theme' );
				document.documentElement.classList.remove( 'is-dark-theme' );
			}

			// Toggle the white background class.
			if ( '#ffffff' === to.toLowerCase() ) {
				document.body.classList.add( 'has-background-white' );
			} else {
				document.body.classList.remove( 'has-background-white' );
			}

			stylesheet = jQuery( '#' + stylesheetID );
			styles = '';
			// If the stylesheet doesn't exist, create it and append it to <head>.
			if ( ! stylesheet.length ) {
				jQuery( '#twenty-twenty-one-style-inline-css' ).after( '<style id="' + stylesheetID + '"></style>' );
				stylesheet = jQuery( '#' + stylesheetID );
			}

			// Generate the styles.
			styles += '--global--color-primary:' + textColor + ';';
			styles += '--global--color-secondary:' + textColor + ';';
			styles += '--global--color-background:' + to + ';';

			styles += '--button--color-background:' + textColor + ';';
			styles += '--button--color-text:' + to + ';';
			styles += '--button--color-text-hover:' + textColor + ';';

			styles += '--table--stripes-border-color:' + tableColor + ';';
			styles += '--table--stripes-background-color:' + tableColor + ';';

			// Add the styles.
			stylesheet.html( ':root{' + styles + '}' );
		} );
	} );
}() );
