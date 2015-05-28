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
                    //Itineraire[i] = Itineraire[i] + "<b>Temps du trajet estimé : </b>" + data.journeys[0].duration / 60 + " minutes."
                    while (i < Main.getLength(data.journeys[0].sections))
                    {
                        temps = Math.round(data.journeys[0].duration / 60);
                        Itineraire[i] = "<body style=\"height: 100%;style='text-align: justify;line-height: 200%;text-justify: inter-word;\">";
                        if (data.journeys[0].sections[i].type == "crow_fly")
                        {
                            i = i + 1;
                        }
                        else
                        {
                            if (data.journeys[0].sections[i].type == "waiting")
                            {
                            Itineraire[i] = Itineraire[i] + "<span style='font-size:2em;'><br />Attendre environ : </font>" + Math.round(data.journeys[0].sections[i].duration / 60) + " minutes</span><HR width=100% noshade size=1>";
                            }
                            else
                            {
                                if (data.journeys[0].sections[i].type == "public_transport")
                                {
                                    Itineraire[i] =  Itineraire[i] + "<span style='font-size:2em;'><br /><br /><b>Partir de : </b>" + data.journeys[0].sections[i].from.name 
                                    + "(" + data.journeys[0].sections[i].from.stop_point.comment + ") <br /><b>vers </b>" 
                                    + data.journeys[0].sections[i].to.name + "(" + data.journeys[0].sections[i].to.stop_point.comment + ") .";
                                    Itineraire[i] = Itineraire[i] + "<br /><b>Prendre : </b><span style='color:#" + data.journeys[0].sections[i].display_informations.color + "'><b>" + data.journeys[0].sections[i].display_informations.network + " " + data.journeys[0].sections[i].display_informations.code + "</b></span><b><br />en direction de : </b>" + data.journeys[0].sections[i].display_informations.direction + " </span><br /><HR width=100% noshade size=1>";
                                }
                                if (data.journeys[0].sections[i].type == "street_network")
                                {
                                    Itineraire[i] =  Itineraire[i] + "<br /><br /><span style='font-size:2em;'>Marcher de : " + data.journeys[0].sections[i].from.name + " vers " + data.journeys[0].sections[i].to.name + " pendant " + Math.round(data.journeys[0].sections[i].duration / 60) + " minutes.</span><HR width=100% noshade size=1>" ;
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
            affichage.html = "<center><span style='font-size:2em;'>Estimation du temps de trajet : " + temps + " minutes</span></center><HR width=100% noshade size=1>";
            while (x < Itineraire.length)
            {
            affichage.html = affichage.html + Itineraire[x];
                x = x + 1;
            }
            affichage.html = affichage.html + "</body>";
        }
        xhr.send();
    }
    
    titleBar: TitleBar {
        title : "Votre itineraires"
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
//    Label {
//        id : affichage
//        multiline: true
//        textFormat: TextFormat.Html
//    } 
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
