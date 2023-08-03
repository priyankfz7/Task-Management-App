import { View, Text, TextInput, Touchable, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { Dimensions } from 'react-native'
import { LinearGradient } from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WindowsWidth = Dimensions.get('window').width
const WindowsHeight = Dimensions.get('window').height

const EnterName = (props) => {
    const { phone } = props.route.params;
    const [name, setName] = useState("");

    const SignUp = async () => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify({ name, phone, tasks: [] }));
            props.navigation.navigate("Home")

        } catch (e) {
            console.log(e);
        }

    }

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

            <LinearGradient colors={["#FFF", "#EAF0FF", "#868BFE"]} style={{ flex: 1, minHeight: WindowsHeight }} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Text style={whiteLgText}>Sign Up</Text>
                </View>
                <View style={{
                    flex: 4,

                }}>
                    <View style={triangle}></View>
                    <View style={formWrapper}>
                        <View style={{ width: "65%" }}>
                            <Text style={label}>What is your name?</Text>
                            <TextInput style={textInputStyle} onChangeText={text => setName(text)} maxLength={35} autoCapitalize='words' />
                            <TouchableOpacity onPress={SignUp} disabled={name.length < 4}>
                                <Text style={[SubmitBtnText, { backgroundColor: name.length <= 2 ? "#DEDEDE" : "#868BFE" }]}>Let’s Go</Text>
                            </TouchableOpacity>

                        </View>
                        <Text style={tcText}>By signing up you agree to the <Text style={{ color: "#A3A6FF", fontWeight: "bold" }}>Terms and Conditions</Text> of Taskoo</Text>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    whiteLgText: { fontSize: 40, color: "white", marginLeft: 25, fontWeight: "bold" },
    triangle: {
        borderLeftColor: "transparent",
        borderLeftWidth: WindowsWidth,
        borderBottomWidth: 80,
        borderBottomColor: "#FAFAFA",
    },
    formWrapper: { flex: 1, backgroundColor: "#FAFAFA", paddingTop: 50, alignItems: "center" },
    textInputStyle: { borderColor: "#fff", borderWidth: 5, fontSize: 25, backgroundColor: "#EAF0FF", borderRadius: 100, paddingHorizontal: 20, marginBottom: 15 },

    tcText: { width: "60%", color: "#CDCFF6", fontSize: 17, fontWeight: "bold", textAlign: "center", marginTop: 20 },
    label: { fontSize: 28, fontWeight: "bold", color: "black", marginBottom: 12 },
    SubmitBtnText: { borderRadius: 200, paddingVertical: 10, textAlign: "center", color: "#fff", fontSize: 20, fontWeight: 'bold' }
})

const { whiteLgText, triangle, formWrapper, textInputStyle, SubmitBtn, tcText, label, SubmitBtnText } = styles;



export default EnterName;