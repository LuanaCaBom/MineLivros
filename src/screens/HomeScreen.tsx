import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import React, { useState, useEffect} from "react";
import{ View, Text, TextInput, Button, FlatList, Pressable, Modal, Alert, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { auth, db } from "../../firebaseconfig";
import { signOut } from 'firebase/auth';
import { Image } from 'expo-image';
import { useFonts } from 'expo-font';


export default function App( {usuario} ){

    const [fontsLoaded] = useFonts({
        'Fonte-Mine': require('../../assets/PressStart2P-Regular.ttf')
    });
    
    const fundo = require('../../assets/fundo.png');
    const pedra = require('../../assets/pedra.jpg');
    const madeira = require('../../assets/madeira.png');
    const lapis = require('../../assets/lapis.png');
    const lixeira = require('../../assets/lixeira.png');
    const adicionar = require('../../assets/adicionar livro.png');
    const atualizar = require('../../assets/atualizar.png');
    const voltar = require('../../assets/voltar.png');
    const sair = require('../../assets/sair.png');
    const livro = require('../../assets/livro.gif');
    
    const [lista, setLista] = useState<any[]>([]);
    const [idAtualizacao, setIdAtualizacao] = useState("");
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
        })
        return() => consulta();
    }, []);

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
            setTitulo("");
            setAutor("");
        }catch(error){
            console.log("Erro: " + error);
        }
    }

    const atualizarModal = async (id: string, titulo: string, autor: string) => {
        setModalVisible(true)
        setIdAtualizacao(id)
        setTitulo(titulo)
        setAutor(autor)
    }

    const atualizarLivro = async (id: string, titulo: string, autor: string) => {
        try{
            const docReferencia = doc(db, "mensagens", idAtualizacao);
            await updateDoc(docReferencia, {titulo: titulo, autor: autor})
            setModalVisible(!modalVisible)
            setTitulo("")
            setAutor("")
        }catch(error){
            console.log("Erro ao Atualizar: ", error);
        }
    }
    
    //não é obrigatório usar try catch
    const deletarLivro = async (id: string) => {
        await deleteDoc(doc(db, "mensagens", id));
    
    }

    return(

        <ImageBackground source={fundo} resizeMode="cover" style={styles.fundo}>

            <View style={styles.view1}>

                <Text style={styles.titulo1}>Meus Livros</Text>

                <Image style={styles.livro} source={livro} contentFit="cover"/>

                <TextInput 
                    placeholder="Digite o titulo..." 
                    value={titulo} 
                    onChangeText={setTitulo} 
                    style={styles.input}
                />

                <TextInput 
                    placeholder="Digite o autor..." 
                    value={autor} 
                    onChangeText={setAutor} 
                    style={styles.input}
                />
                
                <Pressable onPress={adicionarLivro}>
                    <Image source={adicionar} style={styles.adicionar}/>
                </Pressable>
                
                <Text style={styles.titulo2}>Lista Livros</Text>

                <ImageBackground source={madeira} style={styles.madeira}>

                <FlatList
                    data={lista}
                    keyExtractor={(item) => item.id}
                    renderItem={( {item} ) => (
                        
                            <View style={styles.view2}>

                                <ScrollView>

                                    <View style={styles.view3}>
                                        
                                        <View style={styles.view4}>
                                            <Text style={styles.texto}>Título: {item.titulo}</Text>
                                            <Text style={styles.texto}>Autor: {item.autor}</Text>
                                        </View>

                                        <View style={styles.view5}>
                                            
                                            <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={modalVisible}
                                                onRequestClose={() => {
                                                    Alert.alert('O modal foi fechado.');
                                                    setModalVisible(!modalVisible);
                                                }}
                                            >
                                                    
                                                <View style={styles.view6}>
                                                    <ImageBackground source={pedra} style={styles.pedra}>
                                                    
                                                    <Text style={styles.titulo3}>Editar</Text>

                                                    <TextInput
                                                        placeholder='Título...'
                                                        value={titulo}
                                                        onChangeText={setTitulo}
                                                        autoCapitalize='none'
                                                        style={styles.inputModel}
                                                    />

                                                    <TextInput
                                                        placeholder='Autor...'
                                                        value={autor}
                                                        onChangeText={setAutor}
                                                        autoCapitalize='none'
                                                        style={styles.inputModel}
                                                    />

                                                    <View style={styles.view7}>
                                                        
                                                        <Pressable onPress={() => atualizarLivro(item.id, titulo, autor)}>
                                                            <Image source={atualizar} style={styles.bt}/>
                                                        </Pressable>

                                                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                                                            <Image source={voltar} style={styles.bt}/>
                                                        </Pressable>
                                                        
                                                    </View>
                                                                                
                                                    </ImageBackground>

                                                </View>

                                            </Modal>

                                            <Pressable onPress={() => atualizarModal(item.id, item.titulo, item.autor)}>
                                                <Image source={lapis} style={styles.bt2} />
                                            </Pressable>

                                            <Pressable onPress={() => deletarLivro(item.id)}>
                                                <Image source={lixeira} style={styles.bt2} />
                                            </Pressable>

                                        </View>

                                    </View>

                                </ScrollView>
                                
                            </View>
                        
                    )}

                />

                </ImageBackground>

                <View style={styles.view8}>

                    <Pressable onPress={() => signOut(auth)}>

                        <Image source={sair} style={styles.sair}/>

                    </Pressable>

                </View>
    
            </View>

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
    },

    titulo1: {
        fontSize: 31,
        textAlign: 'center',
        fontFamily: 'Fonte-Mine',
        color: 'white',
        marginTop: 30,
    },

    livro: {
        width: 125, 
        height: 125, 
        marginLeft: 110, 
        marginBottom: 15,
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

    adicionar: {
        width: 220, 
        height: 36, 
        marginBottom: 20,
    },

    titulo2: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Fonte-Mine',
        color: 'white',
    },

    madeira: {
        marginTop: 20, 
        marginBottom: 20, 
        width: 345, 
        height: 150, 
        paddingTop: 20, 
        paddingBottom: 20, 
        alignItems: 'center',
    },

    view2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    view3: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#ffffff50',
        width: 320, 
        borderWidth: 2, 
        borderRadius: 5, 
        padding: 5, 
        marginBottom: 10,
    },

    view4: {
        justifyContent: 'space-between', 
        padding: 3, 
        width: 230,
    },

    texto: {
        fontFamily: 'Fonte-Mine', 
        fontSize: 10,
    },

    view5: {
        flexDirection: 'row',
    },

    view6: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
         backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },

    pedra: {
        margin: 20, 
        width: 350, 
        padding: 35,
        alignItems: 'center', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2, }, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5,
    },

    titulo3: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Fonte-Mine',
        color: 'white',
    },

    inputModel: {
        backgroundColor: 'white',
        opacity: 0.6,
        width: 300,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'white',
        marginBottom: 10,
        fontFamily: 'Fonte-Mine',
    },

    view7: {
        flexDirection: 'row', 
        marginBottom: 20, 
        width: 300, 
        justifyContent: 'space-between',
    },

    bt: {
        width: 120, 
        height: 35,
    },

    bt2: {
        width: 40, 
        height: 40,
    },

    view8: {
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        marginBottom: 30,
    },

    sair: {
        width: 130, 
        height: 36,
    },
});