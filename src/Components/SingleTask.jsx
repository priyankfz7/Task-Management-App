import { View, Text, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import RenderHTML from 'react-native-render-html'


const WindowsWidth = Dimensions.get('window').width;

const SingleTask = ({ title, date, source, deleteTask, id, completed, completeTask }) => {
    const [lgview, setLgView] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={() => setLgView(!lgview)}>
            <View style={[taskWrap, { backgroundColor: completed ? "#fff" : "#FDBA5D" }]}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={[titleStyle, { color: completed ? "#868BFE" : "#fff" }]}>{title}</Text>
                    <Image source={require("../../assets/notebook.png")} width={40} height={40} />
                </View>
                <View style={{ display: lgview ? "flex" : "none", marginBottom: 8 }}>
                    <RenderHTML
                        contentWidth={WindowsWidth - 100}
                        source={{
                            html: source
                        }}
                        baseStyle={{ color: completed ? "black" : "white" }}
                    />
                </View>
                <Text style={dateStyle}>{date}</Text>
                <View style={{ display: lgview ? "flex" : "none", flexDirection: "row", columnGap: 25, marginTop: 10 }}>
                    <TouchableOpacity style={[btn, { backgroundColor: "#FF5A5A" }]} onPress={() => deleteTask(id)} >
                        <Text style={btnText}>Ignore</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[btn, { backgroundColor: "#99f9ae", display: completed ? "none" : "flex" }]} onPress={() => completeTask(id)}>
                        <Text style={btnText}>Complete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    taskWrap: {
        borderRadius: 20, padding: 20, marginBottom: 15, shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0,
        shadowRadius: 2.62,
        elevation: 4,
    },
    titleStyle: { color: "#868BFE", fontSize: 25, fontWeight: "bold", marginBottom: 5, flexShrink: 1, flexWrap: 'wrap' },
    dateStyle: { paddingLeft: 10, fontSize: 18, fontWeight: "bold", color: "#D9D9D9" },
    btnText: { fontSize: 18, textAlign: "center", fontWeight: "bold", color: "#fff" },
    btn: { flex: 1, paddingVertical: 8, borderRadius: 100 }
})

const { taskWrap, titleStyle, dateStyle, btnText, btn } = styles;
export default SingleTask