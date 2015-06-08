import bb.cascades 1.4
import bb.system 1.0
import "libs/main.js" as Main

Page {
    
    function getid(destination,type)
    {
        myIndicator.start();
        myIndicator.visible = true;
        go.enabled = false;
        var ArrayReturn = new Array();
        var xhr = new XMLHttpRequest();
        var url = "https://api.navitia.io/v1/coverage/fr-idf/places?q=" + destination;
        xhr.open("GET",url,true);
        xhr.setRequestHeader("Authorization", "Basic " + Main.Base64.encode(Main.keyString + ":" + null)); 
        xhr.onreadystatechange = function() {
            var status;
            var data;
            
            if (xhr.readyState == 4) {
                status = xhr.status;
                if (status == 200) {
                    data = JSON.parse(xhr.responseText);
                    var i = 0;
                    var j = 0;
                    while (i < Main.getLength(data.places))
                    {
                        if (data.places[i].embedded_type == "stop_area"){ 
                            ArrayReturn[j] = data.places[i].id + ";" + data.places[i].name; 
                            if (type == "depart") {
                                arrayDatamodelDepart.append({ "name":data.places[i].name,"id":data.places[i].id });
                            }
                            if (type == "arrive") {
                                arrayDatamodelArrive.append({ "name":data.places[i].name,"id":data.places[i].id });
                            }
                            
                            j = j + 1;
                        }
                        i = i + 1;
                    }
                    if (j > 0 && type == "depart")
                    {
                        labelDepart.visible = false;
                        textDepart.visible = false;
                        possDepart.visible = true;
                        listDepart.visible = true;
                    }
                    if (j > 0 && type == "arrive")
                    {
                        labelArrive.visible = false;
                        textArrive.visible = false;
                        possArrive.visible = true;
                        listArrive.visible = true;
                    }
                    listDepart.dataModel = arrayDatamodelDepart;
                    listArrive.enabled = false;
                } else {
                
                }
                go.enabled = true;
                myIndicator.visible = false;
            }
        
        };
        
        xhr.send();
        return ArrayReturn;
    }
   
    
    titleBar: TitleBar {
        title : "Itinéraires"
    }
    
    Container {
        
        Label {
            id: labelDepart
            text : "Depart : "
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
        }
        TextField {
            id : textDepart
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
        }
        Label {
            id: possDepart
            text: "Plusieurs choix possible, merci de séléctionner l'emplacement :"
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
            multiline: true
            visible: false
        }
        ListView {
            id: listDepart
            dataModel: ArrayDataModel  {
                id: arrayDatamodelDepart
                objectName: "name"
            }
            listItemComponents: [
                ListItemComponent {
                    type: ""
                   StandardListItem {
                       title: ListItemData.name
                   }                        
                    }
                ]

                onTriggered: {
                    var selectedItem = dataModel.data(indexPath);
                    departFinal.text = selectedItem.name
                    idDepartFinal.text = selectedItem.id
                    departFinal.visible = true
                    labelDepart.visible = true
                    listDepart.visible = false
                    possDepart.visible = false
                    listArrive.enabled = true;
                }
        }
        onCreationCompleted: {
            listDepart.dataModel = arrayDatamodelDepart;
        }
        Label {
            id: departFinal
            visible: false
            enabled: false
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
        }
        Label {
            id : idDepartFinal
            visible: false
        }
        Label {
            id : labelArrive
            text : "Arrivée : "
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
        }
        TextField {
            id: textArrive
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
        }
        Label {
            id: possArrive
            text: "Plusieurs choix possible, merci de séléctionner l'emplacement :"
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
            multiline: true
            visible: false
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
        ListView {
            id: listArrive
            dataModel: ArrayDataModel  {
                id: arrayDatamodelArrive
                objectName: "name"
            }
            listItemComponents: [
                ListItemComponent {
                    type: ""
                    StandardListItem {
                        title: ListItemData.name
                    }                        
                }
            ]
            
            onTriggered: {
                var selectedItem = dataModel.data(indexPath);
                arriveFinal.text = selectedItem.name
                idArriveFinal.text = selectedItem.id
                arriveFinal.visible = true
                labelArrive.visible = true
                listArrive.visible = false
                possArrive.visible = false
                textDepart.text = "DISABLE";
                textArrive.text = "DISABLE";
                arrayDatamodelDepart.clear();
                arrayDatamodelArrive.clear();
            }
        }

        Label {
            id: arriveFinal
            visible: false
            enabled: false
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
        }
        Label {
            id : idArriveFinal
            visible: false
        }

        
    }
    onCreationCompleted: {
        go.enabled = true
    }
    actions: [                         
        

        ActionItem {
            title: "Nouveau"
            ActionBar.placement: ActionBarPlacement.Signature
            imageSource: "asset:///images/icons/ic_edit.png"
            onTriggered: {
               idArriveFinal.visible = false
               arriveFinal.visible = false
               labelArrive.visible = true
               textArrive.visible = true
               
               idDepartFinal.visible = false
               departFinal.visible = false
               labelDepart.visible = true
               textDepart.visible = true 
               textDepart.text = "";
               textArrive.text = "";
               
            }
        },
        ActionItem {
            id: go
            title: "Go"
            ActionBar.placement: ActionBarPlacement.Signature
            imageSource: "asset:///images/icons/ic_forward.png"
            onTriggered: {
                
                horizontalAlignment: HorizontalAlignment.Center
                verticalAlignment: VerticalAlignment.Center
                text: "Go"
                onClicked: {
                    if (textDepart.text == "")
                    {
                        emptyToast.body = "Merci de saisir un lieu de départ.";
                        emptyToast.show();
                        return false;
                    }
                    if (textArrive.text == "")
                    {
                        emptyToast.body = "Merci de saisir un lieu d'arrivé.";
                        emptyToast.show();
                        return false;
                    }
                    if (textDepart.visible == true && textArrive.visible == true)
                    {
                        getid(textDepart.text,"depart");
                        getid(textArrive.text,"arrive");
                        return false;
                    }
                    
                    if (textDepart.visible == false & textArrive.visible == false)
                    {
                        var page = itiFinal.createObject();
                        page.idDepartIti = idDepartFinal.text
                        page.idArriveIti = idArriveFinal.text
                        nav.push(page);
                    }
                }
                
            }
            attachedObjects: [
                SystemToast {
                    id: emptyToast
                    body: ""
                }
            ]
        }]
    attachedObjects: [
        ComponentDefinition {
            id: itiFinal
            source: "finalItineraire.qml"
        }]
}

