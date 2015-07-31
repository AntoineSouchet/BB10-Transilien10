import bb.cascades 1.4

Page {
    Container {
              ScrollView {
        id: scrollView
        scrollViewProperties {
            scrollMode: ScrollMode.Both
            pinchToZoomEnabled: true
            maxContentScale: 5
            minContentScale: 1 
        }
        
        layoutProperties: StackLayoutProperties { spaceQuota: 1.0 }
        
        Container {
            background: Color.LightGray
            WebView {
                id: webView
                url: "local:///assets/map.html"
                onMinContentScaleChanged: {
                    scrollView.scrollViewProperties.minContentScale = minContentScale;
                }
                
                onMaxContentScaleChanged: {
                    scrollView.scrollViewProperties.maxContentScale = maxContentScale;
                }
                
            } // end WebView
        } // end container
    } // end ScrollView

}
}
