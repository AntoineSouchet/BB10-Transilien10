import bb.cascades 1.4
import "libs/main.js" as Main

Page {
    property alias idDepartIti : idDepart.text
    property alias idArriveIti : idArrive.text
    function getRoute(idFrom,idTo,dateIti)
    {
        var RequeteDate;
        var xhr = new XMLHttpRequest();
        var url = "https://api.navitia.io/v1/journeys?from=" + idDepartIti.toString() + "&to=" + idArriveIti.toString();
        console.log(url);
        var Itineraire = new Array();
        var DateArrive = "";
        var RequeteDate =  "";
        xhr.open("GET",url,true);
        xhr.setRequestHeader("Authorization", "Basic " + Main.Base64.encode(Main.keyString + ":" + null)); 
        xhr.onreadystatechange = function() {
            var status;
            var data;
            var type = "";
            var temps = "";
            affichage.html = "";
            if (xhr.readyState == 4) { // `DONE`
                status = xhr.status;
                
                if (status == 200) {
                    data = JSON.parse(xhr.responseText);
                    var i = 0;
                    RequeteDate = data.journeys[0].requested_date_
                    DateArrive = data.journeys[0].arrival_date_time;
                    while (i < Main.getLength(data.journeys[0].sections))
                    {
                        temps = Math.round(data.journeys[0].duration / 60);
                        Itineraire[i] = "<body style=\"height: 100%;style='text-align: justify;line-height: 200%;text-justify: inter-word;font-size:2em;\">";
                        if (data.journeys[0].sections[i].type == "crow_fly")
                        {
                            i = i + 1;
                        }
                        else
                        {
                            if (data.journeys[0].sections[i].type == "waiting")
                            {
                                Itineraire[i] = Itineraire[i] + "<span style='font-size:2em;'><br /><center>Attendre environ : <b>" + Math.round(data.journeys[0].sections[i].duration / 60) + "</b> minutes</center></span>";
                            }
                            else
                            {
                                if (data.journeys[0].sections[i].type == "public_transport")
                                {
                                    Itineraire[i] =  Itineraire[i]
                                    + "<table><tr><td><b><span style='font-size:2em;'>Partir de </b></td><td><span style='font-size:2em;'>" + data.journeys[0].sections[i].from.name 
                                    + "</tr></td><tr><td><b><span style='font-size:2em;'>Vers </b></td><td><span style='font-size:2em;'>" 
                                    + data.journeys[0].sections[i].to.name + "</td></tr>";
                                    Itineraire[i] = Itineraire[i] 
                                    + "<tr><td><span style='font-size:2em;'><b>Prendre </b></td><td><span style='font-size:2em;'><font color='" + data.journeys[0].sections[i].display_informations.color + "'><b>" 
                                    + data.journeys[0].sections[i].display_informations.network 
                                    + " " 
                                    + data.journeys[0].sections[i].display_informations.code 
                                    + "</td></tr><tr><td><span style='font-size:2em;'></b></font><b>En direction de </td><td><span style='font-size:2em;'></b>" 
                                    + data.journeys[0].sections[i].display_informations.direction 
                                    + "</td></tr></table></span><br />";
                                }
                                if (data.journeys[0].sections[i].type == "street_network")
                                {
                                    Itineraire[i] =  Itineraire[i] 
                                    + "<table><tr><td><span style='font-size:2em;'><b>Marcher de<b></td><td><span style='font-size:2em;'>" 
                                    + data.journeys[0].sections[i].from.name + "</td></tr>"
                                    + "<tr><td><span style='font-size:2em;'><b>Vers</b></td><td><span style='font-size:2em;'>" 
                                    + data.journeys[0].sections[i].to.name + "</td></tr>"
                                    + "<tr><td><span style='font-size:2em;'><b>Pendant</b></td><span style='font-size:2em;'><td>" 
                                    + Math.round(data.journeys[0].sections[i].duration / 60) 
                                    + " minutes.</td></tr></table>" ;
                              }
                            }

                            i = i + 1;
                        }
                        if(typeof Itineraire[i] != 'undefined')
                        {
                            Itineraire[i] = Itineraire[i] + "<br /><br />";
                            console.log(i);
                        }
                    
                        myIndicator.visible = false;
                    }
                
                
                }
            
            } else {
                
            }
            var x = 0;
            affichage.html = "<center><span style='font-size:2em;'><center><b><img src=\"local:///assets/images/logos/86x86.png\" style='vertical-align:middle;'/>Temps du trajet :</b> " + temps + " minutes</center></span></center>";
            while (x < Itineraire.length)
            {
            affichage.html = affichage.html + Itineraire[x];
                x = x + 1;
            }
            affichage.html = "<head><style>table { border-collapse: collapse;width:100%; } td { width:30%; border: 1px solid black;text-align:center; vertical-align:middle;padding: 5px;}</style></head>" + affichage.html;
            affichage.html = affichage.html + "</body>";
        }
        xhr.send();
    }
    
    titleBar: TitleBar {
        title : "Votre itineraire"
    }
    
    Container {
        
        
        Label {
            visible: false
            id:idDepart
        }
        Label {
            visible: false
            id:idArrive
        }
        ActivityIndicator {
            id: myIndicator
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
            minHeight: 200
            minWidth: 200
            visible: false
            accessibility.name: "myIndicator"
        }
        ScrollView {
            scrollViewProperties {
                scrollMode: ScrollMode.Vertical
            }
    WebView {
        id: affichage
        
    }
}
    }
    

    onIdArriveItiChanged: {
        myIndicator.start();
        myIndicator.visible = true;
        getRoute(idDepartIti,idArriveIti);
    }

}
