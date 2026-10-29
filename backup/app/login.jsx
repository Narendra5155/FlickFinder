import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginPage() {
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError] = useState('')
    const router = useRouter()
    const data = [
        {
            username: "Narendra",
            password:"password123@",
            
        },
        {
            username: "Hindwar",
            password:"1234567789",
        }
    ]
    function handlePress() {
        if (!userId.trim()) {
            setError("Enter Username")
            return;
        }
        
        if (!password.trim()) {
            setError("Enter Password")
            return;
        }


        const user = data.find(item => {
            if (item.username === userId && item.password === password)
                return true
        })


        if (user) {
            AsyncStorage.setItem('user',user.username).then(()=>router.replace('/'))   
        }
        else {
            setError('Invalid Credentials')
        }

    }
    
    return (
        <View style={styles.container}>
            <View style={{
                marginVertical:50
            }}>
                <Text style={{
                    fontSize: 40,
                    textAlign: "center",
                    fontWeight:"bold"
                }}>MOVIE MANIA</Text>
            </View>
            <TextInput style={styles.input} value={userId} onChangeText={setUserId} placeholder="Enter your Username"/>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Enter you Password" />
            {
                error && <Text style={{color:"red",textAlign:"center"}}>{error}</Text>
            }
            <TouchableOpacity
                style={styles.buttonConatiner}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    
    input: {
        backgroundColor: "lightgrey",
        borderRadius: 10,
        margin: 10,
        paddingHorizontal:10
    },
    container: {
        marginVertical:"auto",
    },
    buttonConatiner: {
        borderWidth: 1,
        flexDirection:"row",
        backgroundColor:"black",
        justifyContent: "center",
        margin: 10,
        borderRadius: 100,
        height:40,
    },
    buttonText: {
        color: "white",
        textAlignVertical: "center",
        fontSize:20,
    
    }
})