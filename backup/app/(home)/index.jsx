import { ScrollView, StatusBar, Text, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import HomeMovieSection from '../../components/HomeMovieSection';

export default function HomePage() {
    const [user, setUser] = useState('')
    const router = useRouter();
  
    useEffect(() => {
        AsyncStorage.getItem("user").then((data) => {
            if (data)
                setUser(data)
            else
                router.replace('/login')
      })  
    },[])
    
    function handleLogout() {
        AsyncStorage.removeItem('user').then(()=>router.replace('/login'))
    }
    
    return (
        <>
            <StatusBar barStyle='dark-content'  translucent={true} />
          

            <ScrollView style={{
                marginTop:20,
            }}>
                <Text style={{
                    fontSize: 50,
                    textAlign:'center'
                }}>Moive Mania</Text>
                <Text style={{
                    padding: 10,
                    backgroundColor: "purple",
                        color: "white",
                    textAlign:"center"
                }}>{user}</Text>
                <TouchableOpacity onPress={handleLogout}>
                <Text style={{
                    padding: 10,
                    backgroundColor: "blue",
                        color: "white",
                    textAlign:"center"
                }}>Log Out</Text>
                </TouchableOpacity>
                <HomeMovieSection title="Trending" topic="iron man"/>
                <HomeMovieSection title="Recents" topic="Avengers"/>
                <HomeMovieSection title="Hits" topic="Impossible"/>
                <HomeMovieSection title="Hollywood" topic="terminator"/>
                <HomeMovieSection title="Bollywood" topic="Jurassic"/>
            </ScrollView>
            
        </>
    )
}