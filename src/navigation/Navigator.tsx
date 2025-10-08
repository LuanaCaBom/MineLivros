import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
//Telas
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseconfig';

const Stack = createNativeStackNavigator();

export default function Navigator() {
    
    const [usuario, setUsuario] = useState(null);
    const [carrega, setCarrega] = useState(true);

    useEffect(() => {
        const teste = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
            setCarrega(false);
        });
        return () => teste();
    }, []);

    if(carrega){
        return null; //splash
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                { usuario ? (
                    <Stack.Screen name="Home">
                        {(props) =>
                            <HomeScreen {...props} usuario = {usuario}/>
                        }
                    </Stack.Screen>
                ) : ( 
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Cadastro" component={CadastroScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
  );
}