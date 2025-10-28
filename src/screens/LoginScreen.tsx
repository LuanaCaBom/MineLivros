import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
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

    <ImageBackground source={fundo} resizeMode="cover" style={styles.fundo}>

        <ScrollView>

            <View style={styles.view1}>
                
                    <Text style={styles.titulo1}>Meus Livros</Text>

                    <Image style={styles.morcego} source={morcego} contentFit="cover"/>

                    <Text style={styles.titulo2}>Login</Text>

                    <TextInput
                        placeholder='Email...'
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        style={styles.input}
                    />

                    <TextInput
                        placeholder='Senha...'
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                        style={styles.input}
                    />

                    {erro ? <Text style={styles.erro}>{erro}</Text> : null}
                    
                    <Pressable onPress={Login} >
                        <Image source={entrar} style={styles.entrar}/>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate("Cadastro")} style={styles.pressable}>
                        <Text style={styles.cadastrar}>Cadastrar Usuário</Text>
                    </Pressable>
            
            </View>
        
        </ScrollView>
        
    </ImageBackground>

  );
}

const styles = StyleSheet.create({

    fundo: {
        flex: 1,
    },

    view1: {
        flex: 1, 
        padding: 20, 
        paddingBottom: 450,
    },

    titulo1: {
        fontSize: 31,
        textAlign: 'center',
        fontFamily: 'Fonte-Mine',
        color: 'white',
        marginTop: 30,
    },

    morcego: {
        width: 150, 
        height: 150, 
        marginLeft: 100, 
        marginBottom: 20,
    },

    titulo2: {
        fontSize: 30,
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: 'Fonte-Mine',
        color: 'white',
    },

    input: {
        backgroundColor: 'white',
        opacity: 0.6,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'white',
        marginBottom: 10,
        fontFamily: 'Fonte-Mine',
    },

    erro: {
        color: 'red', 
        fontFamily: 'Fonte-Mine', 
        fontSize: 10,
    },

    entrar: {
        width: 130, 
        height: 40,
    },

    pressable: {
        alignItems: 'center', 
        marginTop: 25,
    },

    cadastrar: {
        fontFamily: 'Fonte-Mine', 
        color: 'white', 
        opacity: 0.6, 
        textDecorationLine: 'underline',
    },
});