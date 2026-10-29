import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";
import MovieCard from "../../components/MovieCard";
import { useSharedState } from "../../components/SharedContextProvider";


export function FallOverPage({ text }) {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={{
                fontFamily: "SoraRegular",
                fontSize: 20,
                color: "grey"
            }}>{text}</Text>
        </View>

    )
}


export default function FavouritePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favourite, setFavourite] = useSharedState()
    const API_KEY = "24c81185"

    useFocusEffect(useCallback(() => {
        setLoading(true)
        const fetchMovies = async () => {
            try {
                const requests = favourite.map(id =>
                    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
                        .then(res => res.json())
                );

                const results = await Promise.all(requests);
                setMovies(results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [favourite]));

    function handlePress(id) {
        setFavourite(prev => prev.filter(item => item !== id))
    }

     const numColumns=Math.floor((Dimensions.get("screen").width+20)/150)

    return (
        <>
            <StatusBar hidden={false} />



            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard item={item} onPress={() => { handlePress(item.imdbID) }} isFav={true} />}
                key={(item) => item.imdbID}
                ListEmptyComponent={loading ?<ActivityIndicator size={30}/> :<FallOverPage text="There are no Favourites" />}
                numColumns={numColumns}
                contentContainerStyle={{
                    gap: 10
                }}
                columnWrapperStyle={{
                    // gap: 5,
                    justifyContent:"space-around"
                }}
                style={{borderWidth:1}}
                ListHeaderComponent={
                    <View style={{
                        marginTop: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 10
                    }}>
                        <Text style={{
                            fontSize: 50,
                            textAlign: 'center'
                        }}>Favourites</Text>
                        <TouchableOpacity onPress={() => setFavourite([])}>
                            <MaterialCommunityIcons
                                name={favourite.length === 0 ? "heart-outline" : "heart"}
                                color={favourite.length === 0 ? "grey" : "red"}
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                }
                

            />



        </>
    )
}