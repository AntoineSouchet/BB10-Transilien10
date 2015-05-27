function load2()
{
         var headerData = new HeaderData();
         headerData.setIdAuto('IdAutomate');//From data echange
         headerData.setIdEtAu('IdEtab');//From data echange
         headerData.setIdEnAu('idEnAu');//From data exchange
         
         headerData.setCodEnt(null);//?????
         headerData.setIdClt('idClient');//From data exchange
         headerData.setTypCnx('TyConnexion'); //From data exchange
         headerData.setIdConx('idConnexion');  //From data exchange
         
         headerData.setRefUOp(null);//?????
         headerData.setnumOpAu('NumeroOperationAutomate');//From data exchange
         headerData.setIdNCR(null);//Generation sha-1 from connector
         headerData.setNSAuth(null);//????????
         
         headerData.setCodVSv(null);//Version Connector
         headerData.setCodVPf(null);//Version Connection
         headerData.setCodEnv(null);//Code Env
         
         headerData.setCdServ('VIR');
         headerData.getFonctn('getListOfAccount');
        
         headerData.setDhGmtL(null); //TODO
         headerData.setDhLocL(null); //TODO

		 //var json = headerData.serialize();

		 var test = JSON.stringify(headerData,replacer);
		 alert(test);
}



function replacer(key, value) {
    if (typeof value === 'function' && !isFinite(value)) {
        return String(value);
    }
    return value;
}