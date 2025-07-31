import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function MovieCard({ item, onPress,isFav }) {
    const router = useRouter();

    
    return (
        <View style={{
            width: 150,
            height:250,
                backgroundColor: "lightgrey",
                padding: 10,
            borderRadius: 10,
                // borderWidth:1
            }}>
                <View style={{
                    gap:5
                }}>
                    <TouchableOpacity onPress={()=>router.push(`/movies/${item.imdbID}`)}>
                        <Image src={item.Poster}
                            style={{
                                width: "100%",
                                height: 180,
                                borderRadius:5,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: "row",
                        justifyContent:"space-evenly"
                    }}>
                        <View style={{
                        width:"80%",
                            // borderWidth:1
                        }}>
                        <Text numberOfLines={1}>{item.Title}</Text>
                            <Text numberOfLines={1}>{item.Type}</Text>
                        </View>
                        <TouchableOpacity style={{
                            // borderWidth :1,
                        width: "20%",
                           justifyContent:"center"
                            
                    }}
                        onPress={onPress}
                    >
                        <MaterialCommunityIcons name={isFav ? "heart" : "heart-outline"} color={isFav?"red":"grey"} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                        
                </View>
            </View>
    )
}