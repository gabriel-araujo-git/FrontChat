import UserService from "./UserService";
import Consts from "./Constantes";
import HttpUtil from "./HttpUtil";

export default class SRHService {

    async getFotoPerfil() {  
        let registro = parseInt( UserService.getUsername().substring(1));
        let path = Consts.URL_SRH_FOTO.replace('{registro}', registro);
        return HttpUtil.performGet(path);
    }

    async pesquisaProfissional(nome) {  
        let path = Consts.URL_SRH_NOME.replace('{nome}', nome);
        return HttpUtil.performGet(path);
    }
   
}
