import AsyncStorage from "@react-native-async-storage/async-storage";

export const SendOtp = async (no) => {
    try {
        let res = await fetch(`http://13.126.244.224/api/verification?phone=%2B91${no.slice(1)}&signature=xyz`);
        let resData = await res.json();
        console.warn(resData)
        return resData;

    } catch (err) {
        console.warn(err)

    }
}

export const VerifyOtpRequest = async (phone, code) => {
console.warn(phone,code)
    try {
        let res = await fetch(`http://13.126.244.224/api/verification`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({ phone,code})

        });
       
        
        return resData;
    } catch (err) {
        console.warn(err)

    }
}

export const getData = async (key) => {
   
  try {
    const jsonValue = await AsyncStorage.getItem(key);
   
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e)
  }
};

export const storeData = async (key,value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
   console.warn(e)
  }
};


// const VerifyNo = async () => {
//         if (no.length >= 13) {
//             try {
//                 let res = await SendOtp(no);
//                 if (res?.data?.status == "Ok") {
//                     props.navigation.navigate("Otp", { phoneNo: no })
//                 } else {
//                     Alert.alert("Some Error", "Invalid Phone No")
//                 }
//             } catch (err) {
//                 console.warn(err)
//             }
//         }
//     }