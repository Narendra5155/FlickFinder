import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useRef, useState } from "react";


let SharedStateContext = global.SharedStateContext;
if (!SharedStateContext) {
  SharedStateContext = createContext();
  global.SharedStateContext = SharedStateContext;
}
export function SharedContextProvider({ children }) {
    const [favourite, setFavourite] = useState([]);
    const isMounted = useRef(false)

    useEffect(() => {
        async function restoreFavorite(){
            const data = await AsyncStorage.getItem('favorite')
            const previous = data ? JSON.parse(data) : []
            return previous
        }

        restoreFavorite().then(d => {
            setFavourite(d)
        });
        
        
    },[])
    useEffect(() => {
        if (isMounted.current === false) {
            isMounted.current = true;
            return;
        }
      
            AsyncStorage.setItem('favorite',JSON.stringify(favourite))
            // console.log("Preferended Changed to : ", favourite)
        
    }, [favourite])

    
    

    return (
        <SharedStateContext.Provider value={[favourite,setFavourite ]}>
            {children}
        </SharedStateContext.Provider>
    )

}

export function useSharedState() {
    return useContext(SharedStateContext);
}