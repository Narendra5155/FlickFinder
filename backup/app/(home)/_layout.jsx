import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
       
            <Tabs >
                <Tabs.Screen name="index" options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ focused, color, size }) => {

                        return (<MaterialCommunityIcons name={focused ? "home" : "home-outline"} size={size} color={color} />)
                    }
                }} />
                <Tabs.Screen name="search" options={{
                    headerShown: false,
                    title: "Search",
                    tabBarIcon: ({ focused, color, size }) => {

                        return (<MaterialCommunityIcons name={focused ? "movie-search" : "movie-search-outline"} size={size} color={color} />)
                    }
                }}
                />
                <Tabs.Screen name="favourite" options={{
                    headerShown: false,
                    title: "Favourite",
                    tabBarIcon: ({ focused, color, size }) => {

                        return (<MaterialCommunityIcons name={focused ? "heart" : "heart-outline"} size={size} color={color} />)
                    }
                }} />
            </Tabs>
        
    )
}