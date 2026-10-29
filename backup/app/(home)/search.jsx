import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";


function SearchCard({ item }) {
    const router = useRouter();

    return (
        <View style={{
            flex: 1,
            height: 300,
            backgroundColor: "lightgrey",
            padding: 10,
            borderRadius: 10,
            // borderWidth:1
        }}>
            <View style={{
                gap: 5
            }}>
                <TouchableOpacity onPress={()=>router.push(`/movies/${item.imdbID}`)}>
                    <Image src={item.Poster}
                        style={{
                            width: "100%",
                            height: 240,
                            borderRadius: 5,
                        }}
                    />
                </TouchableOpacity>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly"
                }}>
                    <View style={{
                        width: "80%",
                        // borderWidth:1
                    }}>
                        <Text numberOfLines={1}>{item.Title}</Text>
                        <Text numberOfLines={1}>{item.Type}</Text>
                    </View>

                </View>
            </View>
            <View>

            </View>
        </View>
    )
}

export default function SearchPage() {
    const apikey = "24c81185"
    const url = "http://www.omdbapi.com/?apikey=24c81185"
    const [input, setInput] = useState("")
    const [searchData, setSearchData] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)

    function handleinput(text) {
        setInput(text)
    }
    function handleSearch() {
        if (!input.trim()) {
            return;
        }
        setLoading(true)

        fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${input}&page=${page}`)
            .then(response => response.json())
            .then(data => {

                if (data.Response) {
                    setSearchData(data.Search)
                    setTotalPage(Math.ceil(data.totalResults / 10))
                    setPage(prev => prev + 1)
                    console.log(totalPage, page)
                }
                setLoading(false)
            })

    }

    function handleEndReached() {
        console.log(totalPage, page)
        if (loading)
            return 
        if (searchData.length === 0 || input === '')
            return
        if (page < totalPage) {
            console.log("here")
            fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${input}&page=${page}`)
                .then(response => response.json())
                .then(data => {
                    if (data.Response) {
                        setSearchData(prev => [...prev, ...data.Search])
                        setPage(prev => prev + 1)
                        console.log(data)
                    } else {
                        console.log("Not able to fectch data from page :",page)
                    }
                })
        }
    }


    return (
        <>
            <StatusBar hidden={false} barStyle={"dark-content"} />
            <FlatList
                data={searchData}
                renderItem={({ item }) => <SearchCard item={item} />}
                keyExtractor={(item) => item.imdbID}

                ListHeaderComponent={
                    <View>
                        <Text style={{
                            fontSize: 20,
                            marginTop: 20,
                        }}>Search</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            marginHorizontal: 10,
                        }}>
                            <TextInput style={{
                                backgroundColor: "white",
                                borderRadius: 100,
                                height: 40,
                                flex: 1,
                                paddingHorizontal: 10,
                                borderColor: "grey",
                                borderWidth: 1,

                            }}

                                placeholder="Search for movies..."
                                value={input}
                                onChangeText={handleinput}
                            />
                            <TouchableOpacity style={{

                            }}
                                onPress={handleSearch}
                            >
                                <MaterialCommunityIcons name="magnify" size={35} />
                            </TouchableOpacity>
                        </View>
                        {loading ? <ActivityIndicator size={30} /> : null}
                    </View>
                }

                numColumns={2}
                contentContainerStyle={{
                    gap: 10,
                    alignContent: "center"

                }}
                columnWrapperStyle={{
                    gap: 10
                }}
                onEndReached={handleEndReached}
                ListFooterComponent={
                    page<totalPage && <ActivityIndicator size={30}/>
                }
                
            />
        </>
    )
}