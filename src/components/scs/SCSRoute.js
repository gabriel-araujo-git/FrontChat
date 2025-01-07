import { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { SCSContexto } from './SCSContexto';

const SCSRoute = ({component: Component, perfil, ...rest}) => {
    const scs = useContext(SCSContexto);

    return (
        <Route  
            {...rest}
            render={props=> scs.temPerfil(perfil)? 
                (<Component {...props}/>) : 
                (<Navigate to={{pathname:'/access', state:{from: props.location}}}/>)}
        />
    )
}

export {SCSRoute};