import bb.cascades 1.4
import bb.system 1.0
import "libs/main.js" as Main


NavigationPane { 
    
    function getNear() {

        console.log("getNear");
        var position = _applicationUI.startGPS();
        var arrayPos = position.split(";");
        var lat = arrayPos[0];
        var longi = arrayPos[1];
        if (lat == "" && longi == "")
        {
            errorToast.body = "Impossible de géolocaliser votre BlackBerry.";
            return false;
        }
        var xhr = new XMLHttpRequest();
        var url = "https://api.navitia.io/v1/coverage/fr-idf/coords/" + longi +";" + lat + "/places_nearby";
        xhr.open("GET",url,true);
        xhr.setRequestHeader("Authorization", "Basic " + Main.Base64.encode(Main.keyString + ":" + null)); 
        xhr.onreadystatechange = function() {
            var status;
            var data;
            console.log(xhr.readyState);
            if (xhr.readyState == 4) {
                status = xhr.status;
                if (status == 200) {
                    myIndicator.visible = true;
                    data = JSON.parse(xhr.responseText);
                    var i = 0;
                    while (i < Main.getLength(data.places_nearby))
                    {
                        if (data.places_nearby[i].embedded_type == "stop_point")
                        {
                            var nearLat = data.places_nearby[0].stop_point.coord.lat;
                            var nearLong = data.places_nearby[0].stop_point.coord.lon;   
                            var addresse = data.places_nearby[0].stop_point.name;
                            _applicationUI.MoreNear(nearLat, nearLong, addresse);
                            myIndicator.visible = false;
                            return false;
                            i = i + 1;
                        }
                        else 
                        {
                            i = i + 1;
                        }
                    }
                    if (i == Main.getLength(data.places_nearby))
                    {
                        errorToast.body = "Aucune station proche de votre emplacement.";
                        myIndicator.visible = false;
                        return false;
                    }

                } else {
                    errorToast.body = "Impossible de récupérer les informations nécéssaires.";
                    myIndicator.visible = false;
                    return false;
                }
            }
        };
        xhr.send();
    }
    
    id: nav
    Menu.definition: MenuDefinition {        
        actions: [
            ActionItem {
                title: "Noter"
                imageSource: "asset:///images/icons/ic_add_bookmarks.png"
                onTriggered: {
                    _applicationUI.BBWorld();
                }
            },
            ActionItem {
                title: "A propos"
                imageSource: "asset:///images/icons/ic_contact.png"
                onTriggered: {
                    var page = proposPage.createObject();
                    nav.push(page);
                }
            }
        ] 
    } 
Page {

    titleBar: 
    TitleBar {
        title : "RATP BlackBerry 10"        
    }
    Container {
        id:root
        Label {
            text:"Bienvenue dans l'application Transilien 10 pour BlackBerry."
            minHeight: 15
            multiline: true
            verticalAlignment: VerticalAlignment.Center
            horizontalAlignment: HorizontalAlignment.Center
        }
        ImageView {
            imageSource: "asset:///images/logo.jpg"
            verticalAlignment: VerticalAlignment.Center
            horizontalAlignment: HorizontalAlignment.Center
            topMargin: 50
            scalingMethod: ScalingMethod.Fill

        }
        Label {
            text:"Powered by : "
            verticalAlignment: VerticalAlignment.Center
            horizontalAlignment: HorizontalAlignment.Center
        }
        ImageView {
            imageSource: "asset:///images/logo_navitia-io.png"
            verticalAlignment: VerticalAlignment.Center
            horizontalAlignment: HorizontalAlignment.Center
            scalingMethod: ScalingMethod.None
            loadEffect: ImageViewLoadEffect.FadeZoom
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

        
    }
    onCreationCompleted: {
        _applicationUI.startGPS();
        myIndicator.start();
        myIndicator.visible = false;
    }
    actions: [                         
        
        ActionItem {
            title: "Trafic"
            ActionBar.placement: ActionBarPlacement.Signature
            imageSource: "asset:///images/icons/ic_move.png"
            onTriggered: {
                var page = traficPage.createObject();
                nav.push(page);
            }
        },
        ActionItem {
            title: "Station proche"
            ActionBar.placement: ActionBarPlacement.Signature
            imageSource: "asset:///images/icons/ic_map.png"
            onTriggered: {
                getNear();
            }
        },
        ActionItem {
            title: "Itinéraires"
            ActionBar.placement: ActionBarPlacement.Signature
            imageSource: "asset:///images/icons/ic_forward.png"
            onTriggered: {
                var page = itinerairePage.createObject();
                nav.push(page);
            }
        },
        ActionItem {
            title: "BBM Status"
            imageSource: "asset:///images/icons/ic_edit_profile.png"
            onTriggered: {
                _applicationUI.updatePersonalMessage("Utilise l'application Transilien 10.")
            }
        },
        ActionItem {
            title: "Notre facebook"
            imageSource: "asset:///images/icons/Facebook_Logo_Button_128_96x96.png"
            onTriggered: {
                _applicationUI.facebookOpen();
            }
        },
        InvokeActionItem {
            
            query {
                mimeType: "text/plain"
                invokeActionId: "bb.action.SHARE"
            }
            onTriggered: {
                data = "J'utilise l'application Transilien 10 pour BlackBerry !";
            }
        }
        
    ]
} attachedObjects: [
    ComponentDefinition {
        id: traficPage
        source: "trafic.qml"
    },
    ComponentDefinition {
        id: itinerairePage
        source: "itineraire.qml"
    },
    SystemToast {
        id: errorToast
        body: ""
    },
    ComponentDefinition {
        id : proposPage
        source: "aPropos.qml"
    }]

}