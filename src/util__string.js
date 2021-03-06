/**
 * util__string
 * @fileoverview Sets up prototype String Utility functions on JavaScripts String object.
 * @version 2.3
 * @author <a href="http://yaypaul.com">YayPaul (Paul West)</a>
 * @copyright 2017 Paul West.
 * @license MIT
 */

/**
 * Strip HTML
 * @desc Strips all HTML tags from a string.
 * @return HTML cleaned string.
 * @since 0.3
 */
String.prototype.stripHTML = function(){
	
	'use strict';

	return this.replace( /(<([^>]+)>)/ig, '' );
	
};

/**
 * Encode UTF8
 * @desc Encodes a string in UTF8 format.
 * @return Encoded string.
 * @since 0.1
 */
String.prototype.encodeUTF8 = function(){
	
	'use strict';

	var utf8 = '';
	var plain = '';
	var c = '';
	
	//Strip new lines
	plain = this.replace( /\r\n/g, '\n' );
	
	//Loop characters
	for( var i = 0, string; string = plain[ i ]; i++ ){
	
		c = this.charCodeAt( i );
	
		//Encode based on character
		if( c < 128 ){
			utf8 += String.fromCharCode( c );
		}
		else if( ( c > 127 ) && ( c < 2048 ) ){
			utf8 += String.fromCharCode( ( c >> 6 ) | 192 );
			utf8 += String.fromCharCode( ( c & 63 ) | 128 );
		}
		else{
			utf8 += String.fromCharCode( ( c >> 12 ) | 224 );
			utf8 += String.fromCharCode( ( ( c >> 6 ) & 63 ) | 128 );
			utf8 += String.fromCharCode( ( c & 63 ) | 128 );
		}
	
	}
	
	return utf8;
	
};

/**
 * Decode UTF8
 * @desc Decodes a UTF8 string.
 * @return Decoded string.
 * @since 0.1
 */
String.prototype.decodeUTF8 = function(){
	
	'use strict';

	var plain = '';
	var string = '';
	var i = 0;
	var c = 0;
	var c1 = 0;
	var c2 = 0;
	
	while( string = this[ i ] ){
	
		c = this.charCodeAt( i );
		
		if( c < 128 ){
			plain += String.fromCharCode( c );
			i++;
		}
		else if( ( c > 191 ) && ( c < 224 ) ){
			c2 = this.charCodeAt( i + 1 );
			plain += String.fromCharCode( ( ( c & 31 ) << 6 ) | ( c2 & 63 ) );
			i += 2;
		}
		else{
			c2 = this.charCodeAt( i + 1 );
			c3 = this.charCodeAt( i + 2 );
			plain += String.fromCharCode( ( ( c & 15 ) << 12 ) | ( ( c2 & 63 ) << 6 ) | ( c3 & 63 ) );
			i += 3;
		}
	
	}
	
	return plain;
	
};


/**
 * Encode Base64
 * @desc Encodes a string in Base64 format.
 * @return Encoded string
 * @since 0.1
 */
String.prototype.encodeBase64 = function(){
	
	'use strict';

	var base64 = '';
	var utf8 = '';
	var c1;
	var c2;
	var c3;
	var e1;
	var e2;
	var e3;
	var e4;
	var i = 0;
	var string = '';
	var KEY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	//Ensure input is UFT8
	utf8 = this.encodeUTF8();
	
	while( string = utf8[ i ] ){
		
		c1 = this.charCodeAt( i++ );
		c2 = this.charCodeAt( i++ );
		c3 = this.charCodeAt( i++ );
		
		e1 = c1 >> 2;
		e2 = ( ( c1 & 3 ) << 4 ) | ( c2 >> 4 );
		e3 = ( ( c2 & 15 ) << 2 ) | ( c3 >> 6 );
		e4 = c3 & 63;
		
		if( isNaN( c2 ) ){
		    e3 = e4 = 64;
		}
		else if( isNaN( c3 ) ){
		    e4 = 64;
		}
		
		base64 = base64 +
		KEY.charAt( e1 ) + KEY.charAt( e2 ) +
		KEY.charAt( e3 ) + KEY.charAt( e4 );
	
	}
	
	return base64;
	
};

/**
 * Decode Base64
 * @desc Decodes a Base64 string.
 * @return Decoded string
 * @since 0.1
 */
String.prototype.decodeBase64 = function(){
	
	'use strict';

	var base64 = '';
	var plain = '';
	var c1;
	var c2;
	var c3;
	var e1;
	var e2;
	var e3;
	var e4;
	var i = 0;
	var string = '';
	var KEY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	base64 = this.replace( /[^A-Za-z0-9\+\/\=]/g, '' );
	
	while( string = base64[ i ] ){
	
		e1 = KEY.indexOf( this.charAt( i++ ) );
		e2 = KEY.indexOf( this.charAt( i++ ) );
		e3 = KEY.indexOf( this.charAt( i++ ) );
		e4 = KEY.indexOf( this.charAt( i++ ) );
		
		c1 = ( e1 << 2 ) | ( e2 >> 4 );
		c2 = ( ( e2 & 15 ) << 4 ) | ( e3 >> 2 );
		c3 = ( ( e3 & 3 ) << 6 ) | e4;
		
		plain = plain + String.fromCharCode( c1 );
		
		if( e3 != 64 ){
			plain = plain + String.fromCharCode( c2 );
		}
		if( e4 != 64 ){
			plain = plain + String.fromCharCode( c3 );
		}
	
	}
	
	plain = plain.decodeUTF8();
	
	return plain;
	
};

/**
 * Trim Properties
 * @desc Trims comma separated strings to certain length of properties.
 * @param {number} length How many properties should we trim to.
 * @return Trimmed string
 * @since 0.5
 */
String.prototype.trimProperties = function( length ){
	
	'use strict';

	var string = this;
	var properties = '';
	
	if( typeof string === 'undefined' || string === '' ){
		return '';
	}
	if( typeof length === 'undefined' || length === '' ){
		length = 1;
	}
	
	string = string.split( /,/ );
	
	for( var i = 0, prop; prop = string[ i ]; i++ ){
		
		if( i < length ){
			
			if( i !== 0 ){
				properties += ', ';
			}
			properties += prop;
			
		}
		
	}
	
	return properties;
	
};

/**
 * Trim To Ellipsis
 * @desc Trim strings to a certain length and adds an ellipsis if needed. 
 *       Strings shorter than the length will not be altered.
 * @param {number} length How many characters should we trim to.
 * @return Trimmed string
 * @since 2.2
 */
String.prototype.trimToEllipsis = function( length ){
  
	'use strict';

    var string = this.toString();
    
    if( typeof string === 'undefined' || string === '' ){
        return string;
    }
    if( typeof length === 'undefined' || length === '' ){
        length = 0;
    }
    
    if( string.length <= length || length === 0 ){
        return string;
    }
    else{
        return string.substring( length, 0 ) + '...';
    }
    
};

/**
 * Parse Boolean
 * @desc Parse a string as a Boolean value.
 * @return Boolean flag.
 * @since 1.0
 */
String.prototype.parseBoolean = function(){
	
	'use strict';

	switch( this.toUpperCase() ){
		
		case '1' :
		case 'T' :
		case 'TRUE' :
			return true;
			
		case '0' :
		case 'F' :
		case 'FALSE' :
			return false;
			
		default :
			return;
		
	}
	
};

/**
 * Parse Query String
 * @desc Parse a querystring into a JavaScript object.
 * @param {string} name Optional named param to return.
 * @return Javascript object.
 * @since 2.1
 */
String.prototype.parseQueryString = function( name ){
    
	'use strict';

    var qs = this;
    var obj = {};
    
    qs = qs.replace( /^\?/, '' ).split( /&/ );
    
    for( var i = 0, param; param = qs[ i ]; i++ ){
        
        param = param.split( /=/ );
        obj[ param[ 0 ] ] = param[ 1 ];
        
    }
    
    if( typeof name === 'string' ){
        return obj[ name ];
    }
    
    return obj;
    
};