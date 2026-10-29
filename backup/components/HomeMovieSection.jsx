import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Text, View } from "react-native";

import MovieCard from "./MovieCard";
import { useSharedState } from "./SharedContextProvider";

export default function HomeMovieSection({ title, topic }) {
    const [movieData, setMovieData] = useState([])
    const [favourite, setFavourite] = useSharedState();
    function onPress(id) {
        setFavourite(prev => {
            if (prev.includes(id))
                return prev.filter(item => item !== id)
            else
                return [...prev, id]
        })
    }

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=24c81185&s=${topic}`)
            .then(response => response.json())
            .then(data => {
                const result = data?.Search
                if (result)
                    setMovieData(result)
                else
                    console.log(data)
            })
    }, [])

    const screenWidth = Dimensions.get('screen').width

    return (
        <View style={{
        }}>
            <Text style={{
                fontSize: 40,
                padding: 10
            }}>{title}</Text>
            <FlatList
                data={movieData}
                renderItem={({ item }) => <MovieCard item={item} onPress={() => onPress(item.imdbID)} isFav={favourite.includes(item.imdbID)} />}
                keyExtractor={(item) => item.imdbID}
                horizontal={true}
                contentContainerStyle={{
                    gap: 10
                }}
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingLeft: 10
                }}
                ListFooterComponent={<View style={{ width: 10 }} />}
                ListEmptyComponent={
                    <View
                        style={{
                            width: screenWidth,
                            height: 250,
                            justifyContent: "center",
                            alignItems:"center"
                            
                        }}
                    >
                       <ActivityIndicator size={40}/> 
                    </View>
                }

            />
        </View>
    )
}