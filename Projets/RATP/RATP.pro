APP_NAME = RATP

CONFIG += qt warn_on cascades10

QT += network

LIBS += -lbb -lQtLocationSubset -lbbcascadesmaps -lGLESv1_CM
LIBS += -lbbsystem
LIBS += -lbb
LIBS += -lbbdata
LIBS += -lbbplatform
LIBS += -lbbplatformbbm 
LIBS += -lQtLocationSubset

include(config.pri)
