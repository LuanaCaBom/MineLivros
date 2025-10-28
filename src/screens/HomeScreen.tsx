import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import React, { useState, useEffect} from "react";
import{ View, Text, TextInput, Button, FlatList, Pressable, Modal, Alert, ImageBackground, ScrollView } from 'react-native';
import { auth, db } from "../../firebaseconfig";
import { signOut } from 'firebase/auth';
import { styles } from "../components/Style";
import { Image } from 'expo-image';
import { useFonts } from 'expo-font';
import firebase from "firebase/compat/app";

export default function App( {usuario} ){

    const [fontsLoaded] = useFonts({
        'Fonte-Mine': require('../../assets/PressStart2P-Regular.ttf')
    });
    
    const fundo = require('../../assets/fundo.png');
    const pedra = require('../../assets/pedra.png');
    const madeira = require('../../assets/madeira.png');
    const lapis = require('../../assets/lapis.png');
    const lixeira = require('../../assets/lixeira.png');
    const adicionar = require('../../assets/adicionar livro.png');
    const atualizar = require('../../assets/atualizar.png');
    const voltar = require('../../assets/voltar.png');
    const sair = require('../../assets/sair.png');
    const livro = require('../../assets/livro.gif');
    
    const [lista, setLista] = useState<any[]>([]);
    const [tarefa, setTarefa] = useState("");
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {

        const user = auth.currentUser;
        if(!user){
            return;
        }

        const q = query(
            collection(db, "mensagens"),
            where("uid", "==", user.uid)
        );

        const consulta = onSnapshot(q, (snapshot) => {
            const listaAux: any[] = [];
            snapshot.forEach((doc) => {
                listaAux.push({id: doc.id, ...doc.data() })
            })
            setLista(listaAux);
            console.log("Lista" + lista.length);
        })
        return() => consulta();
    }, []);

    const adicionarTarefa = async () => {
        if(tarefa.trim() === ""){
            return;
        }
        try{
            await addDoc(collection(db, "mensagens"), {
                texto: tarefa,
                data: new Date().toISOString(),
                uid: usuario.uid, //associa o usuário
            });
            console.log("Documento inserido!");
            setTarefa("");
        }catch(error){
            console.log("Erro: " + error);
        }
    }

    const adicionarLivro = async () => {
        if(titulo.trim() === "" && autor.trim() === ""){
            return;
        }
        try{
            await addDoc(collection(db, "mensagens"), {
                titulo: titulo,
                autor: autor,
                uid: usuario.uid, //associa o usuário
            });
            console.log("Livro inserido!");
            setTitulo("");
            setAutor("");
        }catch(error){
            console.log("Erro: " + error);
        }
    }

    const atualizarTarefa = async (id: string) => {
        try{
            const docReferencia = doc(db, "mensagens", id);
            await updateDoc(docReferencia, {texto: "TAREFA ATUALIZADA!!!"})
        }catch(error){
            console.log("ERRO UPDATE", error);
        }
    }

    const atualizarLivro = async (id: string, titulo: string, autor: string) => {
        try{
            const docReferencia = doc(db, "mensagens", id);
            await updateDoc(docReferencia, {titulo: titulo, autor: autor})
            setModalVisible(!modalVisible)
        }catch(error){
            console.log("Erro ao Atualizar: ", error);
        }
    }
    
//não é obrigatório usar try catch
    const deletarTarefa = async (id: string) => {
        await deleteDoc(doc(db, "mensagens", id));
    
    }

    const deletarLivro = async (id: string) => {
        await deleteDoc(doc(db, "mensagens", id));
    
    }

    return(

        <ImageBackground source={fundo} resizeMode="cover" style={{ flex: 1 }}>

            <View style={{flex: 1, padding: 20}}>

                <Text style={{
                    fontSize: 31,
                    textAlign: 'center',
                    fontFamily: 'Fonte-Mine',
                    color: 'white',
                    marginTop: 30,
                }}>
                    Meus Livros
                </Text>

                <Image
                    style={{
                        width: 125, 
                        height: 125, 
                        marginLeft: 110, 
                        marginBottom: 30
                    }}
                    source={livro}
                    contentFit="cover"
                />

                <TextInput 
                    placeholder="Digite o titulo..." 
                    value={titulo} 
                    onChangeText={setTitulo} 
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
                    placeholder="Digite o autor..." 
                    value={autor} 
                    onChangeText={setAutor} 
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
                
                <Pressable onPress={adicionarLivro}>
                    <Image source={adicionar} style={{width: 220, height: 36, marginBottom: 20}}/>
                </Pressable>
                
                
                <Text style={{
                    fontSize: 18,
                    textAlign: 'center',
                    fontFamily: 'Fonte-Mine',
                    color: 'white',
                }}>
                    Lista Livros
                </Text>

                <ImageBackground 
                    source={madeira} 
                    style={{
                        marginTop: 20, 
                        marginBottom: 20, 
                        width: 345, 
                        height: 150, 
                        paddingTop: 20, 
                        paddingBottom: 20, 
                        alignItems: 'center',
                    }}>

                <FlatList
                    data={lista}
                    keyExtractor={(item) => item.id}
                    renderItem={( {item} ) => (
                        
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <ScrollView>

                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff50', width: 320, borderWidth: 2, borderRadius: 5, padding: 5, marginBottom: 10}}>
                                        
                                        <View style={{justifyContent: 'space-between', padding: 3, width: 230}}>
                                            <Text style={{fontFamily: 'Fonte-Mine', fontSize: 10}}>Título: {item.titulo}</Text>
                                            <Text style={{fontFamily: 'Fonte-Mine', fontSize: 10}}>Autor: {item.autor}</Text>
                                        </View>

                                        <View style={{flexDirection: "row"}}>
                                            
                                            <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={modalVisible}
                                                onRequestClose={() => {
                                                    Alert.alert('Modal has been closed.');
                                                    setModalVisible(!modalVisible);
                                                }}
                                            >
                                                    
                                                <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                                                    <ImageBackground source={pedra} style={{margin: 20, width: 350, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,}}>
                                                    
                                                    <Text
                                                        style={{
                                                            fontSize: 20,
                                                            marginBottom: 10,
                                                            textAlign: 'center',
                                                            fontFamily: 'Fonte-Mine',
                                                            color: 'white',
                                                        }}
                                                    >
                                                        Editar
                                                    </Text>

                                                    <TextInput
                                                        placeholder='Título...'
                                                        value={item.titulo}
                                                        onChangeText={setTitulo}
                                                        autoCapitalize='none'
                                                        style={{
                                                            backgroundColor: 'white',
                                                            opacity: 0.6,
                                                            width: 300,
                                                            borderWidth: 1,
                                                            borderRadius: 2,
                                                            borderColor: 'white',
                                                            marginBottom: 10,
                                                            fontFamily: 'Fonte-Mine',
                                                        }}
                                                    />
                                                    <TextInput
                                                        placeholder='Autor...'
                                                        value={item.autor}
                                                        onChangeText={setAutor}
                                                        autoCapitalize='none'
                                                        style={{
                                                            backgroundColor: 'white',
                                                            opacity: 0.6,
                                                            width: 300,
                                                            borderWidth: 1,
                                                            borderRadius: 2,
                                                            borderColor: 'white',
                                                            marginBottom: 10,
                                                            fontFamily: 'Fonte-Mine',
                                                        }}
                                                    />

                                                    <View style={{flexDirection: 'row', marginBottom: 20, width: 300, justifyContent: 'space-between'}}>
                                                        
                                                        <Pressable onPress={() => atualizarLivro(item.id, item.titulo, item.autor)}>
                                                            <Image source={atualizar} style={{width: 120, height: 35}}/>
                                                        </Pressable>

                                                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                                            <Image source={voltar} style={{width: 120, height: 35}}/>
                                                        </Pressable>
                                                        
                                                    </View>
                                                                                
                                                    </ImageBackground>
                                                </View>
                                            </Modal>

                                            <Pressable onPress={() => setModalVisible(true)}>
                                                <Image source={lapis} style={{width: 40, height: 40}} />
                                            </Pressable>

                                            <Pressable onPress={() => deletarLivro(item.id)}>
                                                <Image source={lixeira} style={{width: 40, height: 40}} />
                                            </Pressable>
                                        </View>
                                    </View>
                                </ScrollView>
                                
                            </View>
                        
                    )}
                />
                </ImageBackground>

                <View style={{flexDirection: 'row',justifyContent: 'flex-end', marginBottom: 30}}>

                    <Pressable onPress={() => signOut(auth)}>

                        <Image source={sair} style={{width: 130, height: 36}}/>

                    </Pressable>

                </View>
    
            </View>

        </ImageBackground>
    );
}