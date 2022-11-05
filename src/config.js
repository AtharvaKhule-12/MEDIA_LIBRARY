import React, { createContext, useContext, useState } from "react";

const Context = createContext();

const ContextProvider = (props) => {
    const [click, setClick] = useState(false);
    const [data, setData] = useState([]);
    return (
        <Context.Provider value={{ click, setClick, data, setData }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider

export const Contextstate = () => {
    return useContext(Context);
}