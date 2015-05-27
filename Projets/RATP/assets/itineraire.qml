import bb.cascades 1.4
import "libs/main.js" as Main

Page {
    
    
    function getid(destination,type)
    {
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
                                arrayDatamodelDepart.append({ "name":data.places[i].name,"id":data.places[i].id })
                            }

                            j = j + 1;
                        }
                        i = i + 1;
                    }
                    if (j > 0)
                    {
                        labelDepart.visible = false;
                        textDepart.visible = false;
                        possDepart.visible = true;
                        listDepart.visible = true;
                    }
                } else {
                   
                }
                
            }
        
        };
        
        xhr.send();
        console.log("Get id finised");
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
            text: "Merci de choisir la possibilité de départ"
            visible: false
        }
        ListView {
            preferredHeight: 150
            id: listDepart
            dataModel: ArrayDataModel {
                id: arrayDatamodelDepart
            }
            listItemComponents: [
                ListItemComponent {
                    type: "listItem"
                    content : Container {
                        layout: StackLayout {
                            orientation: LayoutOrientation.TopToBottom
                        }           
                        Label {
                            id:idDepart
                            text: ListItemData.id
                            visible: false
                        }
                        Label {
                            id:nameDepart
                            text: ListItemData.name
                        }
                    }
                }
//                    ListItemComponent {
//                        type: "item"
//                        StandardListItem {
//                            title: ListItemData.id
//                            description: ListItemData.name
//                            status: "OK"
//                        }
//    
//                }
                ]
                onTriggered: {
                    var selectedItem = dataModel.data(indexPath);
                    console.log("Id : " + selectedItem.id);
                    console.log("Name "+ selectedItem.name);
                }
        }
        
        Label {
            text : "Arrivé : "
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
        }
        TextField {
            id: textArrive
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
        }
        Button {
            id: valide
            horizontalAlignment: HorizontalAlignment.Center
            verticalAlignment: VerticalAlignment.Center
            text: "Go "
            onClicked: {
                getid(textDepart.text,"depart");
                getid(textArrive.text,"arrive");
            }
        }
        
    }
}
