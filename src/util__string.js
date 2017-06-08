/**
 * String Utilities (util)
 * @fileoverview Sets up prototype functions on JavaScripts String object.
 * @author <a href="http://yaypaul.com">Paul West</a>
 * @version 2.1
 * @license None (public domain)
 */

/**
 * Strip HTML
 * @desc Add stripHTML method to String prototype.
 * @return HTML cleaned string.
 */
String.prototype.stripHTML = function(){
	
	return this.replace( /(<([^>]+)>)/ig, '' );
	
};

/**
 * Encode UTF8
 * @desc Add encodeUTF8 method to String prototype.
 * @return Encoded string.
 */
String.prototype.encodeUTF8 = function(){
	
	var utf8	= '',
		plain	= '',
	 	c		= '';
	
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
 * @desc Add decodeUTF8 method to String prototype.
 * @return Decoded string.
 */
String.prototype.decodeUTF8 = function(){
	
	var plain	= '',
		string	= '',
		i = 0, c = 0, c1 = 0, c2 = 0;
	
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
 * @desc Add encodeBase64 method to String prototype.
 * @return Encoded string
 */
String.prototype.encodeBase64 = function(){
	
	var base64	= '',
		utf8	= '',
		c1, c2, c3, e1, e2, e3, e4,
		i		= 0,
		string	= '',
		KEY		= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
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
 * @desc Add decodeBase64 method to String prototype.
 * @return Decoded string
 */
String.prototype.decodeBase64 = function(){
	
	var base64	= '',
		plain	= '',
		c1, c2, c3, e1, e2, e3, e4,
		i		= 0,
		string	= '',
		KEY		= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
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
 * @desc Add trimProperties method to String prototype.
 * @param {number} length How many properties should we trim to.
 * @return Trimmed string
 */
String.prototype.trimProperties = function( length ){
	
	var string		= this,
		properties	= '';
	
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
 * @desc Add trimToEllipsis method to String prototype.
 * @param {number} length How many characters should we trim to.
 * @return Trimmed string
 */
String.prototype.trimToEllipsis = function( length ){
  
    var string = this.toString();
    
    if( typeof string === 'undefined' || string === '' ){
        return string;
    }
    if( typeof length === 'undefined' || length === '' ){
        length = 0;
    }
    
    var stringLength = this.length;
    
    if( stringLength <= length || length === 0 ){
        return string;
    }
    else{
        return string.substring( length, 0 ) + '...';
    }
    
};

/**
 * Parse Boolean
 * @desc Parse a string value as a boolean.
 * @return Boolean flag.
 */
String.prototype.parseBoolean = function(){
	
	switch( this.toUpperCase() ){
		
		case 'TRUE' :
			return true;
			
		case 'FALSE' :
			return false;
			
		default :
			return;
		
	}
	
};

/**
 * Parse Query String
 * @desc Parse a query string to an object.
 * @param {string} name Optional named param to return.
 * @return Javascript object.
 */
String.prototype.parseQueryString = function( name ){
    
    var qs  = this,
        obj = {};
    
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