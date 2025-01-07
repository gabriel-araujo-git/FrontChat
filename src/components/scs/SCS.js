import { SCSContexto } from "./SCSContexto";
import { useContext } from "react";

const  SCS = (props) => {
    const scs = useContext(SCSContexto);

    if (props.funcionalidade && scs.temFuncionalidade(props.funcionalidade)) {
        return props.children;
    }
    else {
     return false;
    }
}

export {SCS};