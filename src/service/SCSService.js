import Consts from './Constantes';
import HttpUtil from './HttpUtil';

const perfisFake = require('../components/scs/perfisFake.json');

const getPerfis = () => {
    return HttpUtil.performGet(Consts.URL_PERFIS);
}

const getPerfisFake = () => {
    return perfisFake;
}

const getFuncionalidades = () => {
    return HttpUtil.performGet(Consts.URL_FUNCIONALIDADES);
}

const isAutorizado = (func) => {
    let path = Consts.URL_FUNCIONALIDADES.replace('{func}', func);
    return HttpUtil.performGet(path);
}

export default  {
    getPerfis,
    getPerfisFake,
    getFuncionalidades,
    isAutorizado
}
