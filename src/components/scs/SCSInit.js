import SCSService from '../../service/SCSService'

const _temPerfil = (perfis, p) => {
    if (perfis) {
     for (let i = 0; i < perfis.length; i++) {
            if (perfis[i].nome == p) {
            return true;
            }
        }
    }
    return false;
}

const _temFuncionalidade = (perfis, f) => {
    if (perfis) {
        for (let i = 0; i < perfis.length; i++) {
            for (let j = 0; j < perfis[i].funcionalidades.length; j++) {
                if (perfis[i].funcionalidades[j].nome == f) {
                    return true;
                }
            }
        }
    } 
    return false;
}

const _getPerfisRaw = (perfis) => {
    return perfis;
}

const _getPerfisAsString = (perfis) => {
    if (perfis) {
        return perfis.map ((p, k) => p.nome).join(",");
    }
    else {
        return "";
    }
}

const _getFuncionalidadesAsString = (perfis) => {
    if (perfis) {
        return perfis.map ((p, k) => {
            return p.funcionalidades.map ( (f, k) => f.nome).join(",")
        }).join(",");
    }
    else {
        return "";
    }
}

const scsMetodos = (perfis) => {
    const temPerfil = (p) => _temPerfil(perfis, p);
    const temFuncionalidade = (f) => _temFuncionalidade(perfis, f);
    const getPerfisRaw = () => _getPerfisRaw(perfis);
    const getPerfisAsString = () => _getPerfisAsString(perfis);
    const getFuncionalidadesAsString = () => _getFuncionalidadesAsString(perfis);

    return {
        temPerfil,
        temFuncionalidade,
        getPerfisRaw,
        getPerfisAsString,
        getFuncionalidadesAsString
    }
}

const initSCS = (renderApp) => {
    return () => {
	    SCSService.getPerfis().then(perfis => {
		    let scs = scsMetodos(perfis);
		    renderApp(scs);
	     }).catch (e => {
            let scs = scsMetodos(null);
            let erroSCS = {'mensagem':'Erro ao obter perfis de acesso', 'detalhe':e.message}
            renderApp(scs, erroSCS);
         })
    }
}

const initSCSFake = (renderApp) => {
    return () => {
	    let perfilsFake = SCSService.getPerfisFake();
 		let scs = scsMetodos(perfilsFake);
		renderApp(scs);
    };
}

export {initSCS, initSCSFake};