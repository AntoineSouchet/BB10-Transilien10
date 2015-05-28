import bb.cascades 1.4
import "libs/main.js" as Main


NavigationPane { 
    
    function getNear() {
        console.log("getNear");
        var position = _applicationUI.startGPS();
        var arrayPos = position.split(";");
        var lat = arrayPos[0];
        var longi = arrayPos[1];
        var xhr = new XMLHttpRequest();
        var url = "https://api.navitia.io/v1/coverage/fr-idf/coords/" + longi +";" + lat + "/places_nearby";
        console.log(url);
        xhr.open("GET",url,true);
        xhr.setRequestHeader("Authorization", "Basic " + Main.Base64.encode(Main.keyString + ":" + null)); 
        xhr.onreadystatechange = function() {
            var status;
            var data;
            console.log(xhr.readyState);
            if (xhr.readyState == 4) {
                status = xhr.status;
                console.log(status);
                if (status == 200) {
                    console.log(status);
                    data = JSON.parse(xhr.responseText);
                    var nearLat = data.places_nearby[0].stop_point.coord.lat;
                    var nearLong = data.places_nearby[0].stop_point.coord.lat;
                    var addresse = data.places_nearby[0].stop_point.name;
                    _applicationUI.MoreNear(nearLat, nearLong, addresse);
                } else {
                
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
        
    }
    onCreationCompleted: {
        _applicationUI.startGPS();
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
    ComponentDefinition {
        id : proposPage
        source: "aPropos.qml"
    }]

}