class JsonLoader{
    static loadReport(){

    }
    static loadBudget(){
        
    }
    static loadAlert(){

    }
    static DeleteBudget({
        
        //account-id: '',
        //budget-name
    })
    static loadJson(path,filename){
        var json = require(path+filename);
        return json;
    }

}