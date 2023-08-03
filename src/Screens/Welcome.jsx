import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import { LinearGradient } from "react-native-linear-gradient"

const Welcome = (props) => {
    return (
        <LinearGradient colors={["#FFF", "#EAF0FF", "#868BFE"]} style={{ flex: 1 }}>
            <View style={container} >
                <View style={logo}>
                    <Text style={[logoText, { fontWeight: 600 }]}>Taskoo</Text>
                </View>
                <Image source={require("../../assets/welcome-img.png")} style={mainImg} />
                <Text style={title}>Manage every Task</Text>
                <Text style={[description, { fontWeight: 600 }]}>Balance work, life and everything in between with Taskoo</Text>

                <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")} style={nextScreenBtn} activeOpacity={0.8}>
                    <View style={{ flex: 1, position: "relative" }} >
                        <Image source={require("../../assets/Ellipse.png")} style={{ width: "100%", height: "100%" }} />
                        <Image source={require("../../assets/Arrow.png")} style={arrowBtn} />
                    </View>
                </TouchableOpacity>
            </View>



        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: 70, borderBottomRightRadius: 70, backgroundColor: "white", position: "relative"
    },
    logo: {
        margin: 20, backgroundColor: "#EAF0FF", width: 150, padding: 7, borderRadius: 100
    },
    logoText: {
        textAlign: "center", color: "black", fontSize: 20
    },
    mainImg: {
        width: "90%", alignSelf: "center", height: "50%", marginBottom: 10
    },
    title: {
        color: "#18306D",
        textAlign: "center",
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        color: "#1B21B5",
        textAlign: "center",
        width: "60%",
        alignSelf: "center",
        fontSize: 18,


    },
    nextScreenBtn: { width: 80, height: 80, borderRadius: 50, position: "absolute", bottom: 0, left: "50%", transform: [{ translateY: 50 }, { translateX: -40 }], borderColor: "white", borderWidth: 10 }
    , arrowBtn: { width: "60%", height: "60%", position: "absolute", top: "50%", left: "50%", transform: [{ translateY: -18 }, { translateX: -18 }] }
})

const { container, logo, logoText, mainImg, title, description, nextScreenBtn, arrowBtn } = styles;

export default Welcome