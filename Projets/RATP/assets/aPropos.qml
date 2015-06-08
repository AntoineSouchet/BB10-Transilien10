import bb.cascades 1.4

Page {
    titleBar: TitleBar {
        title : "A propos de l'application"
    }
    Container {

        Label {
            leftMargin: 10
            margin.leftOffset: 10
            text: "<b>Auteurs :</b>"
            textFormat: TextFormat.Html 
        }
        Label {
            leftMargin: 10
            margin.leftOffset: 10
            text: "<b>Responsable du dévelopement : </b>Antoine <br /><b>Beta testeur/support : </b>Allan <br /><b>Visuel : </b>Steven"
            multiline: true
            textFormat: TextFormat.Html
        }
        Label {
            leftMargin: 10
            margin.leftOffset: 10
            text: "Avec la participation de la communauté des <b>Addicts BlackBerry </b>( http://www.blackberry-10.fr/ )"
            multiline: true
            textFormat: TextFormat.Html
        }
        Label {
            leftMargin: 10
            margin.leftOffset: 10
            text : "<b>API : </b>"
            textFormat: TextFormat.Html
        }
        Label {
            leftMargin: 10
            margin.leftOffset: 10
            text: "Application native pour OS BlackBerry 10 (10.3).<br />Utilisation de l'API de Navitia. (http://navitia.io/)"
            multiline: true
            textFormat: TextFormat.Html
        }
        ImageView {
            topMargin: 10
            margin.topOffset: 10
            imageSource: "asset:///images/logo_navitia-io.png"

            horizontalAlignment: HorizontalAlignment.Center
            scalingMethod: ScalingMethod.None
            loadEffect: ImageViewLoadEffect.FadeZoom
        }
        
    }
}
