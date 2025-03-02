import { useEffect, useState } from "react";
import { View,Text,StyleSheet } from "react-native";
import database,{firebase} from '@react-native-firebase/database';
import { jsxs } from "react/jsx-runtime";

const dbRef  = firebase
  .app()
  .database('https://smartpot-kashyap-default-rtdb.asia-southeast1.firebasedatabase.app/')

  type FirebaseDataType = {
    predictions: {
        [key: string]: string;
    };
    sensors: {
      atm_temperature: number;
      humidity: number;
      light_intensity: number;
      moisture: number;
      soil_temperature: number;
      water_level: string;
    };
  };
  

export default function Home(){

    const [firebaseData, setFirebaseData] = useState<FirebaseDataType>();

    useEffect(() => {
      const onValueChange = database()
        .ref('/')
        .on('value', snapshot => {
        //   console.log('User data: ', snapshot.val());
        setFirebaseData(snapshot.val())
        });
    
      return () => database().ref('/').off('value', onValueChange);
    }, [])
    

    return(
    
        <View>
            <Text style={styles.HeadingStyles}>Welcome</Text>
            <Text style={styles.Sub1}>Sensor Values</Text>
            <View style={styles.SensorDataWrapper}>
              
                <Text style={styles.font}>Atmospheric Pressure: {JSON.stringify(firebaseData?.sensors.atm_temperature)}</Text>
                <Text style={styles.font}>Humidity: {JSON.stringify(firebaseData?.sensors.humidity)}</Text>
                <Text style={styles.font}>Light Intensity: {JSON.stringify(firebaseData?.sensors.light_intensity)}</Text>
                <Text style={styles.font}>Moisture: {JSON.stringify(firebaseData?.sensors.moisture)}</Text>
                <Text style={styles.font}>Soil Temperature: {JSON.stringify(firebaseData?.sensors.soil_temperature)}</Text>
                <Text style={styles.font}>Water Level: {JSON.stringify(firebaseData?.sensors.water_level)}</Text>
              
            </View>
            <Text style={styles.Sub1}>Disease Prediction</Text>
            <View style={styles.PredictionDataWrapper}>
              {/* <Text>{JSON.stringify(firebaseData?.predictions)}</Text> */}
              <Text style={styles.font}>{(JSON.stringify(firebaseData?.predictions, null, 2) || "").slice(3, -1)}</Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    BgWrapper:{
        flex:1,
        backgroundColor:"white"
    },
    HeadingStyles:{
        fontSize:50,
        color:"green",
        textAlign:"center",
        marginTop:"20%"
    },
    SensorDataWrapper:{   
        backgroundColor:"orange",
        padding:"3%",
        paddingLeft:"10%",
        marginLeft:"10%",
        marginRight:"10%",
        borderRadius:10,
    },
    PredictionDataWrapper:{
        backgroundColor:"orange",
        padding:"3%",
        paddingLeft:"10%",
        marginLeft:"10%",
        marginRight:"10%",
        borderRadius:10,
    },
    Sub1:{
      fontSize:25,
      marginLeft:"3%"
    },
    font:{
      fontSize:17,
    }
})