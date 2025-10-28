import React, { useEffect } from "react";
import Navigator from "./src/navigation/Navigator";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseconfig";


export default function App(){

    useEffect(() => {
        const user = onAuthStateChanged(auth, (usuario) => {
            console.log("AUTENTICADO" + usuario);
        });
        return () => user; 
    }, []);

    return <Navigator />
}