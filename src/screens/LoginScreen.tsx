import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { auth } from '../../firebaseconfig'
import { Image } from 'expo-image';
import { useFonts } from 'expo-font';

export default function LoginScreen( {navigation} ) {

    const [fontsLoaded] = useFonts({
        'Fonte-Mine': require('../../assets/PressStart2P-Regular.ttf')
    });

    const fundo = require('../../assets/fundo.png');
    const entrar = require('../../assets/entrar.png');
    const morcego = require('../../assets/light bat.gif');

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const Login = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, senha)
        }catch(error){
            setErro("Erro no login: " + error);
        }
    }

  return (

    <ImageBackground source={fundo} resizeMode="cover" style={{ flex: 1 }}>

        <ScrollView>

            <View style={{ flex: 1, padding: 20, paddingBottom: 450}}>
                
                    <Text 
                        style={{
                            fontSize: 31,
                            marginTop: 60,
                            textAlign: 'center',
                            fontFamily: 'Fonte-Mine',
                            color: 'white',
                        }}
                    >
                        Meus Livros
                    </Text>

                    <Image
                        style={{
                            width: 150, 
                            height: 150, 
                            marginLeft: 100, 
                            marginBottom: 20
                        }}
                        source={morcego}
                        contentFit="cover"
                    />

                    <Text 
                        style={{
                            fontSize: 30,
                            marginBottom: 30,
                            textAlign: 'center',
                            fontFamily: 'Fonte-Mine',
                            color: 'white',
                        }}
                    >
                        Login
                    </Text>

                    <TextInput
                        placeholder='Email...'
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        style={{
                            backgroundColor: 'white',
                            opacity: 0.6,
                            borderWidth: 1,
                            borderRadius: 2,
                            borderColor: 'white',
                            marginBottom: 10,
                            fontFamily: 'Fonte-Mine',
                        }}
                    />

                    <TextInput
                        placeholder='Senha...'
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                        style={{
                            backgroundColor: 'white',
                            opacity: 0.6,
                            borderWidth: 1,
                            borderRadius: 2,
                            borderColor: 'white',
                            marginBottom: 10,
                            fontFamily: 'Fonte-Mine',
                        }}
                    />

                    {erro ? 
                        <Text style={{color: 'red', fontFamily: 'Fonte-Mine', fontSize: 10}}>
                            {erro}
                        </Text>
                    : null}
                    
                    <Pressable onPress={Login} >
                        <Image source={entrar} style={{width: 130, height: 40}}/>
                    </Pressable>

                    <Pressable 
                        onPress={() => navigation.navigate("Cadastro")} 
                        style={{alignItems: 'center', marginTop: 25}}
                    >
                        <Text 
                            style={{
                                fontFamily: 'Fonte-Mine', 
                                color: 'white', 
                                opacity: 0.6, 
                                textDecorationLine: 'underline'
                            }}
                        >
                            Cadastrar Usuário
                        </Text>
                    </Pressable>
            
            </View>
        
        </ScrollView>
        
    </ImageBackground>

  );
}