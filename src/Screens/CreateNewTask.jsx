import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, TouchableWithoutFeedback, Dimensions, } from 'react-native'
import React, { useState } from 'react';
import { ScrollView } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

import LinearGradient from 'react-native-linear-gradient';
import { getData, storeData } from '../Api/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WindowsHeight = Dimensions.get('window').height


const CreateNewTask = (props) => {
    const richText = React.useRef();
    const [title, setTitle] = useState("");
    const [source, setSource] = useState("");

    const createTask = async () => {
        try {
            if (!title) {
                Alert.alert("Data Missing", "Title is mandatory for creating a task.")
            } else {
                const currData = await getData("userData");
                console.log(currData)

                const updatedData = {
                    ...currData, tasks: [...currData.tasks, {
                        id: Date.now(),
                        date: new Date().toLocaleString(),
                        title,
                        source,
                        completed: false

                    }]
                };
                await storeData("userData", updatedData);
                const p = await getData("userData");

                setSource("");
                setTitle("");
                richText.current.setContentHTML("")


            }

        } catch (e) {
            console.log(e);
        }

    }

    const logout = async () => {

        Alert.alert('Log Out ', 'Are you sure u want to logout.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Logout', onPress: async () => {
                    await AsyncStorage.removeItem("userData");
                    props.navigation.navigate("Welcome")
                }
            },
        ]);





    }

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <LinearGradient colors={["#FFF", "#EAF0FF", "#868BFE"]} style={{ minHeight: WindowsHeight }} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}>
                <View style={{ justifyContent: "center", paddingVertical: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 40, marginTop: 15 }}>
                        <Image source={require("../../assets/dummyuser.png")} style={{ height: 70, width: 70 }} />
                        <Text style={{ fontSize: 35, fontWeight: "bold", color: "white", marginLeft: 15, }}>New Task</Text>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: "#FAFAFA", borderTopLeftRadius: 60, borderTopRightRadius: 60, padding: 30 }}>
                    <TextInput style={{
                        backgroundColor: "#fff", borderRadius: 100, paddingHorizontal: 20, marginBottom: 15, shadowColor: "gray",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 1.62,
                        elevation: 4,
                        fontSize: 22,

                        paddingLeft: 20,
                    }} placeholder='Title' onChangeText={text => setTitle(text)} autoCapitalize='words' value={title} />
                    <View style={styles.richTextContainer}>

                        <RichEditor
                            ref={richText}
                            onChange={(text) => setSource(text)}

                            placeholder="Write your task Description :)"
                            androidHardwareAccelerationDisabled={true}
                            style={styles.richTextEditorStyle}
                            initialHeight={200}



                        />
                        <RichToolbar
                            editor={richText}
                            selectedIconTint="#868BFE"
                            iconTint="#526066"
                            iconSize={28}
                            actions={[

                                actions.setBold,
                                actions.setItalic,
                                actions.insertBulletsList,
                                actions.setUnderline,
                            ]}
                            style={styles.richTextToolbarStyle}
                        />

                    </View>
                    <TouchableOpacity style={{ marginVertical: 20 }} onPress={createTask}>
                        <Text style={{ backgroundColor: "#FD3939C9", width: "70%", alignSelf: "center", color: "white", fontWeight: "bold", fontSize: 22, textAlign: "center", paddingVertical: 10, borderRadius: 100 }}>Create</Text>
                    </TouchableOpacity>

                    <TouchableWithoutFeedback>
                        <Text style={{ textAlign: 'center', fontSize: 17, color: "blue", marginBottom: 10 }} onPress={logout}>Log out</Text>
                    </TouchableWithoutFeedback>

                    <Text style={{ textAlign: "center", fontSize: 16, justifyContent: "flex-end" }}>Made By Priyank Gupta with 🥰</Text>







                </View>


            </LinearGradient >
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    richTextContainer: {
        display: "flex",
        flexDirection: "column-reverse",
        width: "100%",
        marginBottom: 10,
        marginTop: 40,
        alignItems: "center",
        position: "relative",

    },

    richTextEditorStyle: {


        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,

        width: "100%",
        paddingTop: 40,
        padding: 20,
        borderRadius: 30,
        backgroundColor: "#fff"
    },

    richTextToolbarStyle: {
        backgroundColor: "#fff",
        shadowColor: "gray",
        shadowOffset: {
            width: "100%",
            height: 2,
        },

        height: 60,
        elevation: 5,
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        borderRadius: 40,

        width: "70%",
        position: "absolute",
        top: -30
    },



});

export default CreateNewTask


