import axios from 'axios';


const controle = {
    executado: undefined,
    resultado: undefined,
    erro: undefined,
}


const XConfig = {
    /*
    getReactServerEnvVar: varName => {
   

        const promise = new Promise( (resolve, reject) => { 
               
                if (process.env.NODE_ENV == 'development') {
                    resolve (process.env[varName]);
                }
                else if (process.env.NODE_ENV == 'production') {
              
                    console.log ("executado=====>" + controle.executado);
        
                    if (controle.executado) {
                        if (controle.resultado) {
                            resolve (controle.resultado[varName] || process.env[varName]);
                        }
                        else if (controle.erro) {
                            reject (controle.erro);
                        }
                        else {
                            reject (undefined);
                        }
                    }
                    else {
                        console.log("FETCH");
                        
                        axios.get('/reactenvvars', {})
                            .then(r => {
                                controle.resultado = r.data;
                                controle.erro = undefined;
                                controle.executado = true;
                                resolve (controle.resultado[varName] || process.env[varName]);
                            })
                            .catch(e => {
                                controle.erro = e;
                                controle.resultado = undefined;
                                controle.executado = true;
                                reject (controle.erro);
                            });
                      

                    }
                }
            }
            
            
        );
        return promise;
    },

    */
    getReactEnvVar: async varName => {

          
                if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
                    return process.env[varName];
                }
                else if (process.env.NODE_ENV === 'production') {
              
                    console.log ("controle.executado=" + controle.executado);
        
                    if (controle.executado) {
                        if (controle.resultado) {
                            return (controle.resultado[varName] || process.env[varName]);
                        }
                        else if (controle.erro) {
                            return Promise.reject (controle.erro);
                        }
                        else {
                            return Promise.reject ("controle com estados invalidos"); 
                        }
                    }
                    else {
                        console.log("getting reactenvvars...");
                        try {
                            let r = await  axios.get( './reactenvvars', {});
                            controle.resultado = r.data;
                            controle.erro = undefined;
                            controle.executado = true;
                            return controle.resultado[varName] || process.env[varName];
                        }
                        catch (e) {
                            controle.erro = e;
                            controle.resultado = undefined;
                            controle.executado = true;
                            return Promise.reject  (controle.erro);

                        }
                    }
                }
                else {
                    return Promise.reject ("process.env.NODE_ENV com estado " + process.env.NODE_ENV);
                }
            }
            
    }


//Object.freeze(XConfig);
export default XConfig;
