import React, { useState } from "react";
import { View, Text, TextInput, Button, ImageBackground, Pressable, ScrollView } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import { styles } from "../components/Style";
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
        <ImageBackground source={fundo} resizeMode="cover" style={{ flex: 1 }}>

            <ScrollView>

                <View style={{ flex: 1, padding: 20, paddingBottom: 500 }}>

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
                        source={mesa}
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
                        Cadastro
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

                    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                        <Pressable onPress={cadastro} >
                            <Image source={cadastrar} style={{width: 130, height: 40}}/>
                        </Pressable>

                        <Pressable onPress={() => navigation.goBack()} >
                            <Image source={voltar} style={{width: 130, height: 40}}/>
                        </Pressable>
                    </View>

                </View>

            </ScrollView>

        </ImageBackground>

   );
}
