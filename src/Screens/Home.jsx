import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from "@react-navigation/native";
import SingleTask from '../Components/SingleTask';
import { getData, storeData } from '../Api/requests';
const WindowsWidth = Dimensions.get('window').width;

const graphData = (completed, pending) => {
    return {
        labels: [],
        datasets: [
            {
                data: [completed, pending],
                colors: [
                    (opacity = 1) => "#1B21B5",
                    (opacity = 1) => "#FDBA5D"
                ]
            }
        ]
    }
};


const Home = (props) => {
    const [userData, setUserData] = useState({});
    const isFocused = useIsFocused();


    const getCompletedTask = (tasks) => {
        let completedTask = 0;
        tasks?.forEach(task => {
            if (task.completed) {
                completedTask++
            }
        })
        return completedTask || 0;

    }
    let mainWrapBgColor = "";
    if (userData?.tasks?.length == 0) {
        mainWrapBgColor = "#868BFE"
    } else if (getCompletedTask(userData?.tasks) == userData?.tasks?.length) {
        mainWrapBgColor = "#07B594"
    }
    else if (getCompletedTask(userData?.tasks) == 0) {
        mainWrapBgColor = "#D85639"

    } else {
        mainWrapBgColor = "#FDBA5D"
    }


    const deleteTask = async (id) => {
        const filteredTasks = userData?.tasks?.filter(task => id != task.id);
        setUserData({ ...userData, tasks: [...filteredTasks] });
        await storeData("userData", { ...userData, tasks: [...filteredTasks] })
    }
    const completeTask = async (id) => {

        const filteredTasks = userData?.tasks?.map(task => {
            if (id != task.id) {
                return task
            } else {
                return { ...task, completed: true }
            }
        });
        setUserData({ ...userData, tasks: [...filteredTasks] });
        await storeData("userData", { ...userData, tasks: [...filteredTasks] })
    }


    useEffect(() => {

        getData("userData").then((res) => {
            if (res) {
                setUserData(res);


            } else {
                props.navigation.navigate("Welcome")
            }
        })
            .catch((e) => console.warn(e))
    }, [isFocused])

    return (
        <LinearGradient style={{ flex: 1 }} colors={["#FFF", mainWrapBgColor]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 30 }}>
                    <Image source={require("../../assets/dummyuser.png")} style={{ height: 70, width: 70 }} />
                    <Text style={{ fontSize: 35, fontWeight: "bold", color: "white", marginLeft: 15 }}>✌️ {userData?.name?.split(" ")[0]}</Text>
                </View>
            </View>
            <View style={mainWrap}>
                <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => props.navigation.navigate("CreateTask")}>
                    <Text style={createBtnUi}>CREATE</Text>
                </TouchableOpacity>

                {userData?.tasks?.length ? <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <View style={graphWrap}>
                        <Text style={graphTitle}>Consistancy</Text>
                        <BarChart

                            data={graphData(getCompletedTask(userData?.tasks), userData?.tasks?.length - getCompletedTask(userData?.tasks))}
                            width={WindowsWidth - 100}
                            height={220}
                            fromZero={true}
                            showBarTops={true}
                            withCustomBarColorFromData={true}
                            flatColor={true}
                            chartConfig={{
                                backgroundGradientFrom: "white",
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientTo: "white",
                                backgroundGradientToOpacity: 0,
                                color: (opacity = 1) => `#0E9CFF`,
                                strokeWidth: 1, // optional, default 3
                                barPercentage: 2,
                                useShadowColorFromDataset: false,

                            }}

                        />
                        <View style={statusTypeWrap}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <View style={blueDot}></View>
                                <Text style={taskTypeText}>Completed</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <View style={yellowDot}></View>
                                <Text style={taskTypeText}>Pending</Text>
                            </View>
                        </View>

                    </View>
                    <View>
                        <FlatList
                            data={userData?.tasks?.reverse()}

                            renderItem={({ item }) => <SingleTask {...item} deleteTask={deleteTask} completeTask={completeTask} />}
                            keyExtractor={item => item.id}
                        />
                    </View>

                </ScrollView> : <View style={{ alignItems: "center" }}>
                    <Image source={require("../../assets/bidi-person.png")} style={{ marginTop: 10, marginBottom: 10 }} />
                    <Text style={{ color: "#D9D9D9", fontSize: 25, fontWeight: "bold", width: "75%", textAlign: "center" }}>Create a task to get started</Text>
                </View>}


            </View>


        </LinearGradient >

    )
}

const styles = StyleSheet.create({
    mainWrap: { flex: 4, backgroundColor: "#FAFAFA", borderTopLeftRadius: 60, borderTopRightRadius: 60, paddingTop: 30, paddingHorizontal: 30 },
    createBtnUi: { backgroundColor: "#FD3939C9", color: "white", fontWeight: "bold", fontSize: 22, textAlign: "center", paddingVertical: 10, borderRadius: 100 },
    graphWrap: { backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 20, marginBottom: 30, borderRadius: 25 },
    graphTitle: { fontSize: 25, color: "#1B21B5", fontWeight: "bold", paddingLeft: 20, marginBottom: 20 },
    statusTypeWrap: { flexDirection: "row", justifyContent: "center", columnGap: 15 },
    blueDot: { width: 20, height: 20, backgroundColor: "#1B21B5", borderRadius: 30, marginRight: 10 },
    yellowDot: { width: 20, height: 20, backgroundColor: "#FDBA5D", borderRadius: 30, marginRight: 10 },
    taskTypeText: { fontSize: 18, color: "#C4C4C4", fontWeight: "bold" }

})
const { mainWrap, createBtnUi, graphWrap, graphTitle, statusTypeWrap, blueDot, yellowDot, taskTypeText } = styles;
export default Home



