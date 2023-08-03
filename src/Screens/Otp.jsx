import { View, Text, TextInput, Touchable, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { Dimensions } from 'react-native'
import { LinearGradient } from 'react-native-linear-gradient';
import { VerifyOtpRequest } from '../Api/requests';

const WindowsWidth = Dimensions.get('window').width;
const WindowsHeight = Dimensions.get('window').height





const Otp = (props) => {
    const phone = props.route.params.phoneNo;
    const [otp, setOtp] = useState("");
    const verifyOtp = async () => {
        if (otp == "1567") {
            props.navigation.navigate("EnterName", { phone, otp })
        } else {
            Alert.alert("OTP Verification Failed", "You entered the wrong OTP .")
        }


    }



    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <LinearGradient colors={["#FFF", "#EAF0FF", "#868BFE"]} style={{ flex: 1, minHeight: WindowsHeight }} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Text style={[whiteLgText, { fontWeight: 900 }]}>Sign Up</Text>
                </View>
                <View style={{
                    flex: 4,

                }}>
                    <View style={triangle}></View>
                    <View style={formWrapper}>
                        <View style={{ width: "65%" }}>
                            <Text style={label}>OTP</Text>
                            <TextInput style={textInputStyle} onChangeText={text => setOtp(text)} maxLength={4} inputMode='numeric' />
                            <TouchableOpacity style={SubmitBtn} onPress={verifyOtp} disabled={otp.length != 4}>
                                <Text style={[SubmitBtnText, { backgroundColor: otp.length != 4 ? "#DEDEDE" : "#868BFE" }]}>Verify</Text>
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
    whiteLgText: { fontSize: 40, color: "white", marginLeft: 25 },
    triangle: {
        borderLeftColor: "transparent",
        borderLeftWidth: WindowsWidth,
        borderBottomWidth: 80,
        borderBottomColor: "#FAFAFA",
    },
    formWrapper: { flex: 1, backgroundColor: "#FAFAFA", paddingTop: 50, alignItems: "center" },
    textInputStyle: { borderColor: "#fff", borderWidth: 5, fontSize: 25, backgroundColor: "#EAF0FF", borderRadius: 100, paddingHorizontal: 20, marginBottom: 15 },

    tcText: { width: "60%", color: "#CDCFF6", fontSize: 17, fontWeight: "bold", textAlign: "center", marginTop: 20 },
    label: { fontSize: 20, fontWeight: "bold", color: "black", marginBottom: 12 },
    SubmitBtnText: { borderRadius: 200, paddingVertical: 10, textAlign: "center", color: "#fff", fontSize: 20, fontWeight: 'bold' }
})

const { whiteLgText, triangle, formWrapper, textInputStyle, SubmitBtn, tcText, label, SubmitBtnText } = styles;


export default Otp;