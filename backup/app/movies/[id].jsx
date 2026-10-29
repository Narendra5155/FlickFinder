import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Movies() {
    const [details, setDetails] = useState({});
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const router= useRouter()


    useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=24c81185&i=${id}&plot=full`)
            .then(response => response.json())
            .then(data => {
                setDetails(data)
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return (
            <View style={{
                height: "100%",
                justifyContent:"center"
            }}>
                <ActivityIndicator size={40} />
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{
                flexDirection: "row",
                // borderWidth: 1,
                width: "100%",
                justifyContent: "flex-start",
                marginTop:10
            }}>
                <TouchableOpacity style={{
                    
                }}
                    onPress={()=>router.back()}
                >
                <MaterialCommunityIcons name="arrow-left" size={30}  />

                </TouchableOpacity>
                <Text style={styles.title} numberOfLines={1}>{details.Title} ({details.Year})</Text>
            </View>
            <Image source={{ uri: details.Poster }} style={styles.poster} />
            <Text style={styles.label}>Genre: <Text style={styles.value}>{details.Genre}</Text></Text>
            <Text style={styles.label}>Rated: <Text style={styles.value}>{details.Rated}</Text></Text>
            <Text style={styles.label}>Released: <Text style={styles.value}>{details.Released}</Text></Text>
            <Text style={styles.label}>Runtime: <Text style={styles.value}>{details.Runtime}</Text></Text>
            <Text style={styles.label}>Director: <Text style={styles.value}>{details.Director}</Text></Text>
            <Text style={styles.label}>Writer: <Text style={styles.value}>{details.Writer}</Text></Text>
            <Text style={styles.label}>Actors: <Text style={styles.value}>{details.Actors}</Text></Text>
            <Text style={styles.label}>Plot:</Text>
            <Text style={styles.plot}>{details.Plot}</Text>
            <Text style={styles.label}>Language: <Text style={styles.value}>{details.Language}</Text></Text>
            <Text style={styles.label}>Country: <Text style={styles.value}>{details.Country}</Text></Text>
            <Text style={styles.label}>Awards: <Text style={styles.value}>{details.Awards}</Text></Text>
            <Text style={styles.label}>Box Office: <Text style={styles.value}>{details.BoxOffice}</Text></Text>
            <Text style={styles.label}>IMDB Rating: <Text style={styles.value}>{details.imdbRating}</Text></Text>
            <Text style={styles.label}>Ratings:</Text>
            {details.Ratings && details.Ratings.map((rating, idx) => (
                <Text key={idx} style={styles.rating}>
                    {rating.Source}: {rating.Value}
                </Text>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
        flex:1
    },
    poster: {
        width: 200,
        height: 300,
        resizeMode: "cover",
        borderRadius: 8,
        marginBottom: 16
    },
    label: {
        fontWeight: "bold",
        marginTop: 8
    },
    value: {
        fontWeight: "normal"
    },
    plot: {
        marginVertical: 8,
        fontStyle: "italic",
        textAlign: "justify"
    },
    rating: {
        marginLeft: 8
    }
});