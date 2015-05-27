var keyString = "beda440f-b845-4b65-a683-fecb617a214f";

/* Get route with API navitia */
function getRoute(idFrom,idTo,dateIti)
{
	var xhr = new XMLHttpRequest();
	//var url = "https://api.navitia.io/v1/journeys?from=" + idFrom + "&to=" + idTo + "&datetime=" + dateIti;
	var url = "https://api.navitia.io/v1/journeys?from=stop_area:RTP:SA:1809&to=stop_area:RTP:SA:2045";
	var Itineraire = new Array();
	var DateArrive = "";
	xhr.open("GET",url,false);
	xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(keyString + ":" + null)); 
	xhr.onreadystatechange = function() {
           var status;
           var data;

           if (xhr.readyState == 4) { // `DONE`
               status = xhr.status;
 
               if (status == 200) {
                   data = JSON.parse(xhr.responseText);
				   var i = 0;
				   RequeteDate = data.journeys[0].requested_date;
				   DateArrive = data.journeys[0].arrival_date_time;
				   while (i < getLength(data.journeys[0].sections))
				   {
						Itineraire[i] = data.journeys[0].sections[i].from.name + ";" + data.journeys[0].sections[i].to.name + ";" + data.journeys[0].sections[i].type;
						if (data.journeys[0].sections[i].type == "public_transport")
						{
						Itineraire[i] = Itineraire[i] + "; Direction : " + data.journeys[0].sections[i].display_informations.direction + ";" + data.journeys[0].sections[i].display_informations.network + ";" + data.journeys[0].sections[i].display_informations.code + ";" + data.journeys[0].sections[i].display_informations.color;
						}
						i = i + 1;
				   }
                   
               } else {
					alert("error");
               }
           }
		   
       };
       xhr.send();
	   plugToInterface(DateArrive,Itineraire);
}

function getPerubation()
{
	var Error = "";
	var xhr = new XMLHttpRequest();
	var url = "https://api.navitia.io/v1/coverage/fr-idf/networks/network:RER/traffic_reports";
	xhr.open("GET",url,false);
	xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(keyString + ":" + null)); 
	xhr.onreadystatechange = function() {
           var status;
           var data;

           if (xhr.readyState == 4) {
               status = xhr.status;
 
               if (status == 200) {
                   data = JSON.parse(xhr.responseText);
				   if (data.error.message = "no solution found for this disruption")
				   {
				   Error = "Aucun probléme detecté par navitia sur le réseau";
				   }
				   else
				   {
				   Error = data.error.message;
				   }
               } else {
					alert("error");
               }
           }
		   
       };

        xhr.send();
		return Error;
}

/**
 * 
 * Utils function
 * get size array/json
 */
function getLength(obj) {
    var i = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)){
            i++;
        }
    }
    return i;
};

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {

// private property
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;
},

// public method for decoding
decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = Base64._utf8_decode(output);

    return output;

},

// private method for UTF-8 encoding
_utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
},

// private method for UTF-8 decoding
_utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }

    return string;
}

}