import { Stack } from "expo-router";
import { SharedContextProvider } from "../components/SharedContextProvider";

export default function Layout() {
    return (
        <SharedContextProvider>
            <Stack>
                <Stack.Screen name='(home)' options={{
                    headerShown:false
                }} />
                <Stack.Screen name='movies/[id]' options={{
                    headerShown:false
                }} />
                <Stack.Screen name="login" options={{
                    headerShown:false
                }}/>
            </Stack>
        </SharedContextProvider>
    )
}