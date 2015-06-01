var keyString = "beda440f-b845-4b65-a683-fecb617a214f";

/* 	Example function to get TWO ID and launch itineraire 
	XHR send to get ID 100% OK */
function load()
{
	getRoute(null,null);
	// var idFrom = getid("Massy");
	// var idTo = getid("Antony");
	// alert(idFrom[0]);
	// alert(idTo[0]);
	//var itineraire = getRoute(null,null);
	//alert(itineraire[1]);
	//alert(getPerubation());
}


function testAllFunction()
{
	var idFrom = getid("Massy");
	var idTo = getid("Antony");
	alert(idFrom[0]);
	alert(idTo[0]);
	var itineraire = getRoute(null,null);
	alert(itineraire[1]);
	alert(getPerubation());
}

/* Get if of station */
function getid(destination)
{
	var ArrayReturn = new Array();
	var xhr = new XMLHttpRequest();
	var url = "https://api.navitia.io/v1/coverage/fr-idf/places?q=" + destination;
	xhr.open("GET",url,false);
	xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(keyString + ":" + null)); 
	xhr.onreadystatechange = function() {
           var status;
           var data;

           if (xhr.readyState == 4) {
               status = xhr.status;
 
               if (status == 200) {
                   data = JSON.parse(xhr.responseText);
					var i = 0;
					var j = 0;
					while (i < getLength(data.places))
					{
						if (data.places[i].embedded_type == "stop_area")
							{ ArrayReturn[j] = data.places[i].id + ";" + data.places[i].name; j = j + 1;}
						i = i + 1;
					}
               } else {
					alert("error");
               }
           }
		   
       };

        xhr.send();
		return ArrayReturn;
}

/* Get route with API navitia */
function getRoute(idFrom,idTo,dateIti)
{
	var xhr = new XMLHttpRequest();
	var data = '{"tickets":[],"links":[{"href":"https:\/\/api.navitia.io\/v1\/journeys?to=stop_area%3ARTP%3ASA%3A1846&datetime_represents=arrival&from=stop_area%3ARTP%3ASA%3A1809&datetime=20150601T142146","type":"prev","rel":"prev","templated":false},{"href":"https:\/\/api.navitia.io\/v1\/journeys?to=stop_area%3ARTP%3ASA%3A1846&datetime_represents=departure&from=stop_area%3ARTP%3ASA%3A1809&datetime=20150601T134700","type":"next","rel":"next","templated":false},{"href":"https:\/\/api.navitia.io\/v1\/journeys?to=stop_area%3ARTP%3ASA%3A1846&datetime_represents=departure&from=stop_area%3ARTP%3ASA%3A1809&datetime=20150601T000000","type":"first","rel":"first","templated":false},{"href":"https:\/\/api.navitia.io\/v1\/journeys?to=stop_area%3ARTP%3ASA%3A1846&datetime_represents=arrival&from=stop_area%3ARTP%3ASA%3A1809&datetime=20150601T235900","type":"last","rel":"last","templated":false},{"href":"https:\/\/api.navitia.io\/v1\/coverage\/stop_points\/{stop_point.id}","type":"stop_point","rel":"stop_points","templated":true},{"href":"https:\/\/api.navitia.io\/v1\/coverage\/commercial_modes\/{commercial_modes.id}","type":"commercial_modes","rel":"commercial_modes","templated":true},{"href":"https:\/\/api.navitia.io\/v1\/coverage\/stop_areas\/{stop_area.id}","type":"stop_area","rel":"stop_areas","templated":true},{"href":"https:\/\/api.navitia.io\/v1\/coverage\/physical_modes\/{physical_modes.id}","type":"physical_modes","rel":"physical_modes","templated":true},{"href":"https:\/\/api.navitia.io\/v1\/coverage\/addresses\/{address.id}","type":"address","rel":"addresses","templated":true}],"journeys":[{"fare":{"found":false,"total":{"currency":"","value":"0.0"},"links":[]},"status":"","tags":["standard"],"nb_transfers":1,"arrival_date_time":"20150601T142246","calendars":[{"exceptions":[{"type":"remove","datetime":"20150406"},{"type":"remove","datetime":"20150501"},{"type":"remove","datetime":"20150508"},{"type":"remove","datetime":"20150514"},{"type":"remove","datetime":"20150525"}],"active_periods":[{"begin":"20150401","end":"20150707"}],"week_pattern":{"monday":true,"tuesday":true,"friday":true,"wednesday":true,"thursday":true,"sunday":false,"saturday":false}}],"departure_date_time":"20150601T134600","requested_date_time":"20150601T133744","co2_emission":{"unit":"gEC","value":117.7132},"type":"best","duration":2206,"sections":[{"from":{"embedded_type":"stop_area","quality":0,"stop_area":{"commercial_modes":[{"name":"Bus","id":"commercial_mode:bus"},{"name":"RapidTransit","id":"commercial_mode:rapidtransit"}],"name":"Massy-Palaiseau","links":[],"physical_modes":[{"name":"Bus","id":"physical_mode:Bus"},{"name":"Train de banlieue \/ RER","id":"physical_mode:RapidTransit"}],"coord":{"lat":"48.724149","lon":"2.259342"},"label":"Massy-Palaiseau (Massy)","administrative_regions":[{"insee":"91377","name":"Massy","level":8,"coord":{"lat":"48.727798","lon":"2.273669"},"label":"Massy (91300)","id":"admin:29251","zip_code":"91300"}],"timezone":"Europe\/Paris","id":"stop_area:RTP:SA:1809"},"name":"Massy-Palaiseau (Massy)","id":"stop_area:RTP:SA:1809"},"links":[],"arrival_date_time":"20150601T134600","departure_date_time":"20150601T134600","to":{"embedded_type":"stop_point","stop_point":{"comment":"6, Place Pierre S\u00e9mard 91300   Massy","name":"Massy - Palaiseau","links":[],"coord":{"lat":"48.724309","lon":"2.258966"},"label":"Massy - Palaiseau (Massy)","equipments":[],"comments":[{"type":"standard","value":"6, Place Pierre S\u00e9mard 91300   Massy"}],"administrative_regions":[{"insee":"91377","name":"Massy","level":8,"coord":{"lat":"48.727798","lon":"2.273669"},"label":"Massy (91300)","id":"admin:29251","zip_code":"91300"}],"id":"stop_point:TRN:SP:DUA8775879","stop_area":{"name":"Massy-Palaiseau","links":[],"coord":{"lat":"48.724149","lon":"2.259342"},"label":"Massy-Palaiseau (Massy)","administrative_regions":[{"insee":"91377","name":"Massy","level":8,"coord":{"lat":"48.727798","lon":"2.273669"},"label":"Massy (91300)","id":"admin:29251","zip_code":"91300"}],"timezone":"Europe\/Paris","id":"stop_area:RTP:SA:1809"}},"quality":0,"id":"stop_point:TRN:SP:DUA8775879","name":"Massy - Palaiseau (Massy)"},"mode":"walking","duration":0,"type":"crow_fly","id":"section_0_0"},{"from":{"embedded_type":"stop_point","stop_point":{"comment":"6, Place Pierre S\u00e9mard 91300   Massy","name":"Massy - Palaiseau","links":[],"coord":{"lat":"48.724309","lon":"2.258966"},"label":"Massy - Palaiseau (Massy)","equipments":[],"comments":[{"type":"standard","value":"6, Place Pierre S\u00e9mard 91300   Massy"}],"administrative_regions":[{"insee":"91377","name":"Massy","level":8,"coord":{"lat":"48.727798","lon":"2.273669"},"label":"Massy (91300)","id":"admin:29251","zip_code":"91300"}],"id":"stop_point:TRN:SP:DUA8775879","stop_area":{"name":"Massy-Palaiseau","links":[],"coord":{"lat":"48.724149","lon":"2.259342"},"label":"Massy-Palaiseau (Massy)","timezone":"Europe\/Paris","id":"stop_area:RTP:SA:1809"}},"quality":0,"id":"stop_point:TRN:SP:DUA8775879","name":"Massy - Palaiseau (Massy)"},"links":[{"type":"vehicle_journey","id":"vehicle_journey:TRN:DUASN084659F010013870172769"},{"type":"line","id":"line:TRN:DUA810802066"},{"type":"route","id":"route:TRN:DUA810802400_R"},{"type":"commercial_mode","id":"commercial_mode:rapidtransit"},{"type":"physical_mode","id":"physical_mode:RapidTransit"},{"type":"network","id":"network:RER"}],"arrival_date_time":"20150601T141100","additional_informations":["regular"],"co2_emission":{"unit":"gEC","value":107.1856},"display_informations":{"direction":"A\u00e9roport Charles-de-Gaulle 2 RER (Le Mesnil-Amelot)","code":"B","description":"","links":[],"color":"427DBD","physical_mode":"Train de banlieue \/ RER","headsign":"EPAU","commercial_mode":"RapidTransit","equipments":[],"label":"B","network":"RER"},"to":{"embedded_type":"stop_point","stop_point":{"name":"Ch\u00e2telet les Halles","links":[],"coord":{"lat":"48.861822","lon":"2.347013"},"label":"Ch\u00e2telet les Halles (Paris)","equipments":[],"administrative_regions":[{"insee":"75056","name":"Paris","level":8,"coord":{"lat":"48.856506","lon":"2.352133"},"label":"Paris","id":"admin:7444","zip_code":""}],"id":"stop_point:TRN:SP:DUA8775860","stop_area":{"name":"Ch\u00e2telet-Les Halles","links":[],"coord":{"lat":"48.861464","lon":"2.346844"},"label":"Ch\u00e2telet-Les Halles (Paris)","timezone":"Europe\/Paris","id":"stop_area:RTP:SA:1967"}},"quality":0,"id":"stop_point:TRN:SP:DUA8775860","name":"Ch\u00e2telet les Halles (Paris)"},"departure_date_time":"20150601T134600","geojson":{"type":"LineString","properties":[{"length":17288}],"coordinates":[[2.258966,48.724309],[2.300987,48.754947],[2.304227,48.761694],[2.312464,48.780284],[2.338978,48.82109],[2.332852,48.834293],[2.337096,48.840034],[2.339928,48.845743],[2.346035,48.853336],[2.347013,48.861822]]},"duration":1500,"type":"public_transport","id":"section_1_0","stop_date_times":[{"stop_point":{"comment":"6, Place Pierre S\u00e9mard 91300   Massy","name":"Massy - Palaiseau","links":[],"coord":{"lat":"48.724309","lon":"2.258966"},"label":"Massy - Palaiseau (Massy)","equipments":[],"comments":[{"type":"standard","value":"6, Place Pierre S\u00e9mard 91300   Massy"}],"id":"stop_point:TRN:SP:DUA8775879"},"arrival_date_time":"20150601T134600","additional_informations":[],"departure_date_time":"20150601T134600","links":[]},{"stop_point":{"name":"Antony","links":[],"coord":{"lat":"48.754947","lon":"2.300987"},"label":"Antony (Antony)","equipments":[],"id":"stop_point:TRN:SP:DUA8775875"},"arrival_date_time":"20150601T135100","additional_informations":[],"departure_date_time":"20150601T135100","links":[]},{"stop_point":{"name":"La Croix de Berny","links":[],"coord":{"lat":"48.761694","lon":"2.304227"},"label":"La Croix de Berny (Antony)","equipments":[],"id":"stop_point:TRN:SP:DUA8775874"},"arrival_date_time":"20150601T135200","additional_informations":[],"departure_date_time":"20150601T135200","links":[]},{"stop_point":{"name":"Bourg-la-Reine","links":[],"coord":{"lat":"48.780284","lon":"2.312464"},"label":"Bourg-la-Reine (Bourg-la-Reine)","equipments":[],"id":"stop_point:TRN:SP:DUA8775869"},"arrival_date_time":"20150601T135500","additional_informations":[],"departure_date_time":"20150601T135500","links":[]},{"stop_point":{"name":"Cit\u00e9 Universitaire","links":[],"coord":{"lat":"48.82109","lon":"2.338978"},"label":"Cit\u00e9 Universitaire (Paris)","equipments":[],"id":"stop_point:TRN:SP:DUA8775864"},"arrival_date_time":"20150601T140000","additional_informations":[],"departure_date_time":"20150601T140000","links":[]},{"stop_point":{"name":"Denfert Rochereau","links":[],"coord":{"lat":"48.834293","lon":"2.332852"},"label":"Denfert Rochereau (Paris)","equipments":[],"id":"stop_point:TRN:SP:DUA8775863"},"arrival_date_time":"20150601T140300","additional_informations":[],"departure_date_time":"20150601T140300","links":[]},{"stop_point":{"name":"Port Royal","links":[],"coord":{"lat":"48.840034","lon":"2.337096"},"label":"Port Royal (Paris)","equipments":[],"id":"stop_point:TRN:SP:DUA8775862"},"arrival_date_time":"20150601T140500","additional_informations":[],"departure_date_time":"20150601T140500","links":[]},{"stop_point":{"name":"Luxembourg","links":[],"coord":{"lat":"48.845743","lon":"2.339928"},"label":"Luxembourg (Paris)","equipments":[],"id":"stop_point:TRN:SP:DUA8775861"},"arrival_date_time":"20150601T140600","additional_informations":[],"departure_date_time":"20150601T140600","links":[]},{"stop_point":{"name":"Saint-Michel","links":[],"coord":{"lat":"48.853336","lon":"2.346035"},"label":"Saint-Michel (Paris)","equipments":[],"id":"stop_point:TRN:SP:DUA8778543"},"arrival_date_time":"20150601T140900","additional_informations":[],"departure_date_time":"20150601T140900","links":[]},{"stop_point":{"name":"Ch\u00e2telet les Halles","links":[],"coord":{"lat":"48.861822","lon":"2.347013"},"label":"Ch\u00e2telet les Halles (Paris)","equipments":[],"id":"stop_point:TRN:SP:DUA8775860"},"arrival_date_time":"20150601T141100","additional_informations":[],"departure_date_time":"20150601T141100","links":[]}]},{"links":[],"arrival_date_time":"20150601T141700","departure_date_time":"20150601T141100","duration":360,"type":"waiting","id":"section_2_0"},{"from":{"embedded_type":"stop_point","stop_point":{"name":"Ch\u00e2telet les Halles","links":[],"coord":{"lat":"48.861822","lon":"2.347013"},"label":"Ch\u00e2telet les Halles (Paris)","equipments":[],"administrative_regions":[{"insee":"75056","name":"Paris","level":8,"coord":{"lat":"48.856506","lon":"2.352133"},"label":"Paris","id":"admin:7444","zip_code":""}],"id":"stop_point:TRN:SP:DUA8775860","stop_area":{"name":"Ch\u00e2telet-Les Halles","links":[],"coord":{"lat":"48.861464","lon":"2.346844"},"label":"Ch\u00e2telet-Les Halles (Paris)","timezone":"Europe\/Paris","id":"stop_area:RTP:SA:1967"}},"quality":0,"id":"stop_point:TRN:SP:DUA8775860","name":"Ch\u00e2telet les Halles (Paris)"},"links":[{"type":"vehicle_journey","id":"vehicle_journey:TRN:DUASN082316F01001388492528"},{"type":"line","id":"line:TRN:DUA810801043"},{"type":"route","id":"route:TRN:DUA810801041_R"},{"type":"commercial_mode","id":"commercial_mode:rapidtransit"},{"type":"physical_mode","id":"physical_mode:RapidTransit"},{"type":"network","id":"network:RER"}],"arrival_date_time":"20150601T141900","additional_informations":["regular"],"co2_emission":{"unit":"gEC","value":10.5276},"display_informations":{"direction":"Cergy le Haut (Cergy)","code":"A","description":"","links":[],"color":"D1302F","physical_mode":"Train de banlieue \/ RER","headsign":"URUS","commercial_mode":"RapidTransit","equipments":[],"label":"A","network":"RER"},"to":{"embedded_type":"stop_point","stop_point":{"name":"Auber","links":[],"coord":{"lat":"48.872157","lon":"2.329927"},"label":"Auber (Paris)","equipments":[],"administrative_regions":[{"insee":"75056","name":"Paris","level":8,"coord":{"lat":"48.856506","lon":"2.352133"},"label":"Paris","id":"admin:7444","zip_code":""}],"id":"stop_point:TRN:SP:DUA8775859","stop_area":{"name":"Auber","links":[],"coord":{"lat":"48.872608","lon":"2.329707"},"label":"Auber (Paris)","timezone":"Europe\/Paris","id":"stop_area:RTP:SA:2053"}},"quality":0,"id":"stop_point:TRN:SP:DUA8775859","name":"Auber (Paris)"},"departure_date_time":"20150601T141700","geojson":{"type":"LineString","properties":[{"length":1698}],"coordinates":[[2.347013,48.861822],[2.329927,48.872157]]},"duration":120,"type":"public_transport","id":"section_3_0","stop_date_times":[{"stop_point":{"name":"Ch\u00e2telet les Halles","links":[],"coord":{"lat":"48.861822","lon":"2.347013"},"label":"Ch\u00e2telet les Halles (Paris)","equipments":[],"id":"stop_point:TRN:SP:DUA8775860"},"arrival_date_time":"20150601T141600","additional_informations":[],"departure_date_time":"20150601T141700","links":[]},{"stop_point":{"name":"Auber","links":[],"coord":{"lat":"48.872157","lon":"2.329927"},"label":"Auber (Paris)","equipments":[],"id":"stop_point:TRN:SP:DUA8775859"},"arrival_date_time":"20150601T141900","additional_informations":[],"departure_date_time":"20150601T142000","links":[]}]},{"from":{"embedded_type":"stop_point","stop_point":{"name":"Auber","links":[],"coord":{"lat":"48.872157","lon":"2.329927"},"label":"Auber (Paris)","equipments":[],"administrative_regions":[{"insee":"75056","name":"Paris","level":8,"coord":{"lat":"48.856506","lon":"2.352133"},"label":"Paris","id":"admin:7444","zip_code":""},{"insee":"75056","name":"Paris","level":8,"coord":{"lat":"48.856506","lon":"2.352133"},"label":"Paris","id":"admin:7444","zip_code":""}],"id":"stop_point:TRN:SP:DUA8775859","stop_area":{"name":"Auber","links":[],"coord":{"lat":"48.872608","lon":"2.329707"},"label":"Auber (Paris)","administrative_regions":[{"insee":"75056","name":"Paris","level":8,"coord":{"lat":"48.856506","lon":"2.352133"},"label":"Paris","id":"admin:7444","zip_code":""}],"timezone":"Europe\/Paris","id":"stop_area:RTP:SA:2053"}},"quality":0,"id":"stop_point:TRN:SP:DUA8775859","name":"Auber (Paris)"},"links":[],"arrival_date_time":"20150601T142246","departure_date_time":"20150601T141900","to":{"embedded_type":"stop_area","stop_area":{"commercial_modes":[{"name":"Bus","id":"commercial_mode:bus"},{"name":"M\u00e9tro","id":"commercial_mode:metro"}],"name":"Op\u00e9ra","links":[],"physical_modes":[{"name":"M\u00e9tro","id":"physical_mode:Metro"},{"name":"Bus","id":"physical_mode:Bus"}],"coord":{"lat":"48.870721","lon":"2.332255"},"label":"Op\u00e9ra (Paris)","administrative_regions":[{"insee":"75056","name":"Paris","level":8,"coord":{"lat":"48.856506","lon":"2.352133"},"label":"Paris","id":"admin:7444","zip_code":""}],"timezone":"Europe\/Paris","id":"stop_area:RTP:SA:1846"},"address":{"name":"Boulevard des Capucines","house_number":17,"coord":{"lat":"48.87064678126338","lon":"2.3322676829486637"},"label":"17 Boulevard des Capucines (Paris)","administrative_regions":[{"insee":"75056","name":"Paris","level":8,"coord":{"lat":"48.856506","lon":"2.352133"},"label":"Paris","id":"admin:7444","zip_code":""}],"id":"2.332267682948664;48.87064678126338"},"quality":0,"id":"stop_area:RTP:SA:1846","name":"Op\u00e9ra (Paris)"},"geojson":{"type":"LineString","properties":[{"length":253}],"coordinates":[[2.329927,48.872157],[2.3299244988,48.8721525817],[2.330406,48.87188],[2.330584,48.871779],[2.330721,48.8717],[2.331862,48.871098],[2.33207,48.870613],[2.3322676829,48.8706467813],[2.3322676829,48.8706467813]]},"duration":226,"path":[{"duration":163,"length":182,"direction":0,"name":"Rue Auber"},{"duration":50,"length":56,"direction":36,"name":"Place de l Op\u00e9ra"},{"duration":13,"length":14,"direction":0,"name":"Boulevard des Capucines"}],"type":"street_network","id":"section_4_0","mode":"walking"}]}],"disruptions":[],"notes":[],"exceptions":[]}';
	//var url = "https://api.navitia.io/v1/journeys?from=" + idFrom + "&to=" + idTo + "&datetime=" + dateIti;
	//var url = "https://api.navitia.io/v1/journeys?from=stop_area:RTP:SA:1809&to=stop_area:RTP:SA:2045";
	var url = "https://api.navitia.io/v1/journeys?from=stop_area:RTP:SA:1809&to=stop_area:RTP:SA:1846";
	var Itineraire = new Array();
	var DateArrive = "";
	var RequeteDate =  "";
	var url = "mockJson.json";
	xhr.overrideMimeType("application/json");
	xhr.open("GET",url,true);
	xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(keyString + ":" + null)); 
	// xhr.onreadystatechange = function() {
           var status;
           var data;
			var type = "";
			var temps = "";
			document.getElementById("montest").innerHTML = "";
           // if (xhr.readyState == 4) { // `DONE`
               // status = xhr.status;
 
               // if (status == 200) {
                   data = JSON.parse(data);
				   var i = 0;
				   RequeteDate = data.journeys[0].requested_date_
				   DateArrive = data.journeys[0].arrival_date_time;
				   //Itineraire[i] = Itineraire[i] + "<b>Temps du trajet estimé : </b>" + data.journeys[0].duration / 60 + " minutes."
				   while (i < getLength(data.journeys[0].sections))
				   {
				   temps = Math.round(data.journeys[0].duration / 60);
				   Itineraire[i] = "";
				   if (data.journeys[0].sections[i].type == "crow_fly")
				   {
							i = i + 1;
					}
					else
					{
						if (data.journeys[0].sections[i].type == "waiting")
						{
						Itineraire[i] = Itineraire[i] + "<br /><center>Attendre environ : <b>" + data.journeys[0].sections[i].duration / 60 + "</b> minutes</center>";
						}
						else
						{
							if (data.journeys[0].sections[i].type == "public_transport")
							{
								Itineraire[i] =  Itineraire[i]
								+ "<table><tr><td><b>Partir de </b></td><td>" + data.journeys[0].sections[i].from.name 
								+ "</tr></td><tr><td><b>Vers </b></td><td>" 
								+ data.journeys[0].sections[i].to.name + "</td></tr>";
								Itineraire[i] = Itineraire[i] 
								+ "<tr><td><b>Prendre </b></td><td><font color='" + data.journeys[0].sections[i].display_informations.color + "'><b>" 
								+ data.journeys[0].sections[i].display_informations.network 
								+ " " 
								+ data.journeys[0].sections[i].display_informations.code 
								+ "</td></tr><tr><td></b></font><b>En direction de </td><td></b>" 
								+ data.journeys[0].sections[i].display_informations.direction 
								+ "</td></tr></table> <br />";
							}
							if (data.journeys[0].sections[i].type == "street_network")
							{
								Itineraire[i] =  Itineraire[i] 
								+ "<table><tr><td><b>Marché de<b></td><td>" 
								+ data.journeys[0].sections[i].from.name + "</td></tr>"
								+ "<tr><td><b>Vers</b></td><td>" 
								+ data.journeys[0].sections[i].to.name + "</td></tr>"
								+ "<tr><td><b>Pendant</b></td><td>" 
								+ Math.round(data.journeys[0].sections[i].duration / 60) 
								+ " minutes.</td></tr></table>" ;
							}
							}
							
							i = i + 1;
						}
						if(typeof Itineraire[x] != 'undefined')
						{
						Itineraire[i] = Itineraire[i] + "<br /><br />";
						console.log(i);
						}

						
				   }


				   // }
                   
               // } else {
					// alert(xhr.readyState);
               // }
			   var x = 0;
			   console.log(document.getElementById("montest").innerHTML);
			   document.getElementById("montest").innerHTML = "<center><b><img src='86x86.png' style='vertical-align:middle;'/>Temps du trajet :</b> " + temps + " minutes</center>";
			   while (x < Itineraire.length)
			   {
				document.getElementById("montest").innerHTML = document.getElementById("montest").innerHTML + Itineraire[x];
				x = x + 1;
			   }
           // }
		          xhr.send();
	   plugToInterface(DateArrive,Itineraire);
       };


/* Link to QML interface */
function plugToInterface(Date,Itineraire)
{

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