import bb.cascades 1.4
import "libs/main.js" as Main

Page {
    
    titleBar: TitleBar {
        title : "Etat du trafic."
    }
    
    function getPerubation()
    {
        myIndicator.start();
        myIndicator.visible = true;
        imageOk.visible = false;
        var Error = "";
        var xhr = new XMLHttpRequest();
        var url = "https://api.navitia.io/v1/coverage/fr-idf/networks/network:RER/traffic_reports";
        xhr.open("GET",url,true);
        xhr.setRequestHeader("Authorization", "Basic " + Main.Base64.encode(Main.keyString + ":" + null)); 
        xhr.onreadystatechange = function() {
            var status;
            var data;
            
            if (xhr.readyState == 4) {
                status = xhr.status;
                
                if (status == 200) {
                    data = JSON.parse(xhr.responseText);
                    if (data.error.message == "no solution found for this disruption")
                    {
                        Error = "Aucun probléme detecté par navitia sur le réseau.";
                        imageOk.visible = true;
                    }
                    else
                    {
                        Error = "Une erreur sur le réseau a été detecté : " + data.error.message;
                    }
                } else {
                    Error = "Impossible de communiquer avec navitia.io.";
                }
                
                etat.text = Error;
                myIndicator.visible = false;
                
            }
        
        };
        
        xhr.send();
    }
    
    Container {
        
        Label {
            text: "Etat du trafic sur le réseau RATP : "
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
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
        Label {
            id: etat
            multiline: true;
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
        }
        ImageView {
            id: imageOk
            imageSource: "asset:///images/icons/check.png"
            visible: false
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
            scalingMethod: ScalingMethod.AspectFill
        }
        
    }
    onCreationCompleted: {

        getPerubation();
    }
}
