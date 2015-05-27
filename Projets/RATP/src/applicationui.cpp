/*
 * Copyright (c) 2011-2015 BlackBerry Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "applicationui.hpp"

#include <bb/cascades/AbstractPane>
#include <bb/cascades/Application>
#include <bb/cascades/Container>
#include <bb/cascades/maps/MapView>
#include <bb/cascades/QmlDocument>
#include <bb/platform/geo/Point.hpp>
#include <bb/cascades/LocaleHandler>
#include <bb/system/InvokeRequest>
#include <bb/system/InvokeManager>
#include <bb/cascades/Page>
#include <bb/cascades/maps/MapData>
#include <bb/platform/geo/Marker>
#include <bb/platform/geo/GeoLocation>
#include <bb/data/JsonDataAccess>
#include <QtLocationSubset/QGeoPositionInfo>
#include <QtNetwork>

#include <QPoint>

    using namespace bb::cascades;
    using namespace bb::cascades::maps;
    using namespace bb::platform::geo;
    using namespace bb::system;
    using namespace bb::data;
    using namespace QtMobilitySubset;

ApplicationUI::ApplicationUI() :
        QObject()
{
    // prepare the localization
    m_pTranslator = new QTranslator(this);
    m_pLocaleHandler = new LocaleHandler(this);

    bool res = QObject::connect(m_pLocaleHandler, SIGNAL(systemLanguageChanged()), this, SLOT(onSystemLanguageChanged()));
    // This is only available in Debug builds
    Q_ASSERT(res);
    // Since the variable is not used in the app, this is added to avoid a
    // compiler warning
    Q_UNUSED(res);

    // initial load
    onSystemLanguageChanged();

    // Create scene document from main.qml asset, the parent is set
    // to ensure the document gets destroyed properly at shut down.
    QmlDocument *qml = QmlDocument::create("asset:///main.qml").parent(this);
    qml->setContextProperty("_applicationUI", this);
    // Create root object for the UI
    AbstractPane *root = qml->createRootObject<AbstractPane>();

    // Set created root object as the application scene
    Application::instance()->setScene(root);
}

void ApplicationUI::onSystemLanguageChanged()
{
    QCoreApplication::instance()->removeTranslator(m_pTranslator);
    // Initiate, load and install the application translation files.
    QString locale_string = QLocale().name();
    QString file_name = QString("RATP_%1").arg(locale_string);
    if (m_pTranslator->load(file_name, "app/native/qm")) {
        QCoreApplication::instance()->installTranslator(m_pTranslator);
    }
}

void ApplicationUI::positionUpdated(QGeoPositionInfo geoPositionInfo) {

        if (geoPositionInfo.isValid()) {
            // We've got the position. No need to continue the listening.
            locationDataSource->stopUpdates();

            // Save the position information into a member variable
            QGeoPositionInfo myPositionInfo = geoPositionInfo;

            // Get the current location as latitude and longitude
            QGeoCoordinate geoCoordinate = geoPositionInfo.coordinate();
            qreal latitude = geoCoordinate.latitude();
            qreal longitude = geoCoordinate.longitude();
            lat = QString::number(latitude);
            longi = QString::number(longitude);

        }

    }

QString ApplicationUI::startGPS() {
        qDebug() << " << starting GPS >>";

            locationDataSource = QGeoPositionInfoSource::createDefaultSource(this);
            // Whenever the location data source signals that the current
            // position is updated, the positionUpdated function is called
            connect(locationDataSource, SIGNAL(positionUpdated(QGeoPositionInfo)),this, SLOT(positionUpdated(QGeoPositionInfo)));
            qDebug() << " lat : " + lat;
            qDebug() << " longi : " + longi;
            // Start listening for position updates
            locationDataSource->startUpdates();

            return lat + ";" + longi;
    }

void ApplicationUI::MoreNear(double latitude,double longitude,QString adresse)
    {
        InvokeManager invokeManager;
        InvokeRequest request;
        request.setAction("bb.action.OPEN");
        request.setMimeType("application/vnd.rim.map.action-v1");
        QVariantMap navendData;
        navendData["latitude"] = latitude;
        navendData["longitude"] = longitude;
        navendData["properties.name"] = "AutoLib'";
        navendData["properties.description"] = adresse;

        QVariantMap data;
        data["view_mode"] = "nav";
        data["nav_end"] = navendData;

        JsonDataAccess jda;
                QByteArray buffer;

                jda.saveToBuffer(data, &buffer);
                request.setData(buffer);
                invokeManager.invoke(request);
    }

void ApplicationUI::Map(double latitude,double longitude,QString adresse)
    {
        InvokeManager invokeManager;
        InvokeRequest request;
        request.setAction("bb.action.OPEN");
        request.setMimeType("application/vnd.rim.map.action-v1");
        QVariantMap centerData;
        centerData["latitude"] = latitude;
        centerData["longitude"] = longitude;

        QVariantMap placemarkData;
        placemarkData["latitude"] = latitude;
        placemarkData["longitude"] = longitude;
        placemarkData["name"] = "Station AutoLib'";
        placemarkData["description"] = adresse;

        QVariantMap data;
        data["view_mode"] = "map";
        data["center"] = centerData;
        data["placemark"] = placemarkData;
        JsonDataAccess jda;
        QByteArray buffer;

        jda.saveToBuffer(data, &buffer);
        request.setData(buffer);
        invokeManager.invoke(request);
    }
