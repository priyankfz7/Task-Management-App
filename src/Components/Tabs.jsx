import React from 'react'

import CreateNewTask from '../Screens/CreateNewTask'


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../Screens/Welcome';
import SignUp from '../Screens/SignUp';
import Otp from '../Screens/Otp';
import Home from '../Screens/Home';
import EnterName from '../Screens/EnterName';

const Stack = createNativeStackNavigator();

const Tabs = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator >
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
                <Stack.Screen name="EnterName" component={EnterName} options={{ headerShown: false }} />
                <Stack.Screen name="CreateTask" component={CreateNewTask} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Tabs