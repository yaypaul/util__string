# utils__string

Prototype String Utilities  
I created these utilities some time ago for my own projects. Will they have gone through numerous versions, I've tried to keep them small, only including operations I find myself doing time after time.
I finally found the time to make proper repros and read me files so I could upload them. I hope you find them as useful as I do!

### Version
2.2

# Installation
As these are Prototypes and not framework functions, all you need to do is load the file as part of your stack. I recommend after your other library includes.

# Usage

### stripHTML
Strips all HTML tags from a string.
```javascript
( String ).stripHTML();
//<div>testing <strong>the</strong> string</div> => testing the string```

### encodeUTF8
Encodes a string in UTF8 format. (mostly needed for the base64 methods, but also has other uses)
```javascript
( String ).encodeUTF8();```

### decodeUTF8
Decodes a UTF8 string (mostly needed for the base64 methods, but also has other uses).
```javascript
( String ).decodeUTF8();```

### encodeBase64
Encodes a string in Base64 format. (mostly needed for the base64 methods, but also has other uses)
```javascript
( String ).encodeBase64();
//encodeThis => ZW5jb2RlVGhpcw==```

### decodeBase64
Decodes a Base64 string. (mostly needed for the base64 methods, but also has other uses)
```javascript
( String ).decodeBase64();
//ZW5jb2RlVGhpcw== => encodeThis```

### trimProperties
Trims comma separated strings to certain length of properties.
```javascript
( String ).trimProperties( length );
//I, only, want, to, see, two => I, only```

### trimToEllipsis
Trim strings to a certain length and adds an ellipsis if needed. Strings shorter than the length will not be altered.
```javascript
( String ).trimToEllipsis( length );
//I only want to see five characters => I only...```

### parseBoolean
Parse a string as a Boolean value.
```javascript
( String ).parseBoolean();
//'true' => true```

### parseQueryString
Parse a querystring into a JavaScript object.
```javascript
( String ).parseQueryString();
//this=that&cats=floofs => {this:that,cats:floofs}```

# Change Log
2.2 Added trimToEllipsis function.
2.1 Added parseQueryString function.  
2.0 Rebuilt script to be prototypes instead of framework functions.  
1.0 Added parseBoolean function. Cleaned up methods.
0.5 Added trimProperties function.
0.3 Added stripHTML function.  
0.1 Added encodeUTF8, decodeUTF8, encodeBase64 and decodeBase64 functions.  

# License
MIT  
It's Free!