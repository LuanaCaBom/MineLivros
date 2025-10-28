import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
//Telas
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function Navigator() {
    
    const [fontsLoaded] = useFonts({
            'Fonte-Mine': require('../../assets/PressStart2P-Regular.ttf')
        });

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
                    <Stack.Screen name="Home" options={{headerTitleStyle:{fontFamily: 'Fonte-Mine'}}}  >
                        {(props) =>
                            <HomeScreen {...props} usuario = {usuario}/>
                        }
                    </Stack.Screen>
                ) : ( 
                    <>
                        <Stack.Screen 
                            name="Login" 
                            options={{headerTitleStyle:{fontFamily: 'Fonte-Mine'}}}  
                            component={LoginScreen} 
                        />

                        <Stack.Screen 
                            name="Cadastro"
                            options={{headerTitleStyle:{fontFamily: 'Fonte-Mine'}}}   
                            component={CadastroScreen} 
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
  );
}