/**
* Object HeaderData 
**/
function HeaderData() {
    /**
    * Identifiant Automate
    **/
    var idAuto;
    
    /**
    * Identifiant de l’établissement automate
    **/
    var idEtAu;
    
    /**
    * Identifiant de l'enseigne automate
    **/
    var idEnAu;
    
    /**
    * Code entité comptable de l’automate
    **/
    var codEnt;
    
    /**
    * Identifiant client
    **/
    var idClt;
    
    /**
    * Type de connexion
    **/
    var typCnx;
    
    /**
    * Identifiant Connexion
    **/
    var idConx;
    
    /**
    * Référence Unique d’Opération
    **/
    var refUOp;
    
    /**
    * Numéro opération automate
    **/
    var numOpAu;
    
    /**
    * ID NCR
    **/
    var idNCR;  
    
    /**
    * Numéro de session d’authentification
    **/
    var nSAuth;
    
    /**
    * Code Version du service
    **/
    var codVSv;
    
    /**
    * Code version de la plate-forme Connections
    **/
    var codVPf;
    
    /**
    * Code Environnement
    **/
    var codEnv;
    
    /**
    * Code Service
    **/
    var cdServ;
    
    /**
    * Fonction demandée
    **/
    var fonctn;
    
    /**
    * Date et heure GMT opération sur le GAB
    **/
    var dhGmtL;
    
    /**
    * Date et heure locales opération sur le GAB
    **/
    var dhLocL;
    
    /**
    * Getter idAuto
    **/
    this.getIdAuto = function(){
        return idAuto;
    };
    /**
    * Setter idAuto
    **/  
    this.setIdAuto = function(anIdAuto){
        idAuto = anIdAuto;
    };
    /**
    * Getter idEtAu
    **/
    this.getIdEtAu = function(){
        return idEtAu;
    };
    /**
    * Setter idEtAu
    **/  
    this.setIdEtAu = function(anIdEtAu){
        idEtAu = anIdEtAu;
    };
    /**
    * Getter idEnAu
    **/
    this.getIdEnAu = function(){
        return idEnAu;
    };
    /**
    * Setter idEnAu
    **/  
    this.setIdEnAu = function(anIdEnAu){
        idEnAu = anIdEnAu;
    };
    /**
    * Getter codEnt
    **/
    this.getCodEnt = function(){
        return codEnt;
    };
    /**
    * Setter codEnt
    **/  
    this.setCodEnt = function(aCodEnt){
        codEnt = aCodEnt;
    };    
    /**
    * Getter idClt
    **/
    this.getIdClt = function(){
        return idClt;
    };
    /**
    * Setter idClt
    **/  
    this.setIdClt = function(anIdClt){
        idClt = anIdClt;
    };
    /**
    * Getter typCnx
    **/
    this.getTypCnx = function(){
        return typCnx;
    };
    /**
    * Setter typCnx
    **/  
    this.setTypCnx = function(aTypCnx){
        typCnx = aTypCnx;
    };
    
    /**
    * Getter idConx
    **/
    this.getIdConx = function(){
        return idConx;
    };
    /**
    * Setter idConx
    **/  
    this.setIdConx = function(anIdConx){
        idConx = anIdConx;
    }; 
    
    /**
    * Getter refUOp
    **/
    this.getRefUOp = function(){
        return refUOp;
    };
    /**
    * Setter refUOp
    **/  
    this.setRefUOp = function(aRefUOp){
        refUOp = aRefUOp;
    }; 
    /**
    * Getter numOpAu
    **/
    this.getNumOpAu = function(){
        return numOpAu;
    };
    /**
    * Setter numOpAu
    **/  
    this.setnumOpAu = function(aNumOpAu){
        numOpAu = aNumOpAu;
    }; 
    /**
    * Getter idNCR
    **/
    this.getIdNCR = function(){
        return idNCR;
    };
    /**
    * Setter idNCR
    **/  
    this.setIdNCR = function(anIdNCR){
        idNCR = anIdNCR;
    };     
    /**
    * Getter nSAuth
    **/
    this.getNSAuth = function(){
        return nSAuth;
    };
    /**
    * Setter nSAuth
    **/  
    this.setNSAuth = function(aNSAuth){
        nSAuth = aNSAuth;
    };
    
    /**
    * Getter codVSv
    **/
    this.getCodVSv = function(){
        return codVSv;
    };
    /**
    * Setter codVSv
    **/  
    this.setCodVSv = function(aCodVSv){
        codVSv = aCodVSv;
    };
    
    /**
    * Getter codVPf
    **/
    this.getCodVPf = function(){
        return codVPf;
    };
    /**
    * Setter codVPf
    **/  
    this.setCodVPf = function(aCodVPf){
        codVPf = aCodVPf;
    };
    
    /**
    * Getter codEnv
    **/
    this.getCodEnv = function(){
        return codEnv;
    };
    /**
    * Setter codEnv
    **/  
    this.setCodEnv = function(aCodEnv){
        codEnv = aCodEnv;
    };
    
    /**
    * Getter cdServ
    **/
    this.getCdServ= function(){
        return cdServ;
    };
    /**
    * Setter cdServ
    **/  
    this.setCdServ = function(aCdServ){
        cdServ = aCdServ;
    };   
    
   /**
    * Getter fonctn
    **/
    this.getFonctn= function(){
        return fonctn;
    };
    /**
    * Setter fonctn
    **/  
    this.setFonctn = function(aFonctn){
        fonctn = aFonctn;
    };     
    
    /**
    * Getter dhGmtL
    **/
    this.getDhGmtL= function(){
        return dhGmtL;
    };
    /**
    * Setter dhGMTL
    **/  
    this.setDhGmtL = function(aDhGmtL){
        dhGmtL = aDhGmtL;
    }; 
    
    /**
    * Getter dhLocL
    **/
    this.getDhLocL= function(){
        return dhLocL;
    };
    /**
    * Setter dhLocL
    **/  
    this.setDhLocL = function(aDhLocL){
        dhLocL = aDhLocL;
    };
    
    this.toString = function(){
            return Object.getIDClt;
    }
    
    
    
    
 
       
    
}
