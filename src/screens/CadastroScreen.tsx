import React, { useState } from "react";
import { View, Text, TextInput, Button, ImageBackground, Pressable, ScrollView, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import { Image } from 'expo-image';
import { useFonts } from 'expo-font';

export default function CadastroScreen({ navigation }) {

    const [fontsLoaded] = useFonts({
        'Fonte-Mine': require('../../assets/PressStart2P-Regular.ttf')
    });

    const fundo = require('../../assets/fundo.png');
    const cadastrar = require('../../assets/cadastrar.png');
    const voltar = require('../../assets/voltar.png');
    const mesa = require('../../assets/mesa_encantada.gif');

   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");
   const [erro, setErro] = useState("");

    const cadastro = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, senha)
            navigation.navigate("Login");
        }catch(error){
            setErro("Erro ao cadastrar: " + error)
        }
    }

   return (
        <ImageBackground source={fundo} resizeMode="cover" style={styles.fundo}>

            <ScrollView>

                <View style={styles.view1}>

                    <Text style={styles.titulo1}>Meus Livros</Text>

                    <Image style={styles.mesa} source={mesa} contentFit="cover"/>

                    <Text style={styles.titulo2}>Cadastro</Text>

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

                    <View style={styles.view2}>

                        <Pressable onPress={cadastro}>
                            <Image source={cadastrar} style={styles.botao}/>
                        </Pressable>

                        <Pressable onPress={() => navigation.goBack()}>
                            <Image source={voltar} style={styles.botao}/>
                        </Pressable>

                    </View>

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

    mesa: {
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

    view2: {
        flexDirection: "row", 
        justifyContent: 'space-between',
    },

    botao: {
        width: 130, 
        height: 40,
    },
});
