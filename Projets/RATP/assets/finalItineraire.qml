import bb.cascades 1.4



Page {
    property alias idDepartIti : idDepart.text
    property alias idArriveIti : idArrive.text
    Container {
        
        Label {
            visible: true
            id:idDepart
        }
        Label {
            visible: true
            id:idArrive
        }
        
    }
    onCreationCompleted: {
        console.log(idDepartIti)
        console.log(idDepart.text)
    }
}
