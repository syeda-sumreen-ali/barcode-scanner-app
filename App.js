import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('')


const askForCameraPermission = ()=>{
  (async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  })();
}

  useEffect(() => {
   askForCameraPermission()
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log(type, data)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style ={{margin :10}}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={()=>askForCameraPermission()}/>
              </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{height:400, width:400}}
      />
      </View>
      <Text style={styles.mainText}>{text}</Text>
      {scanned && <Button title={'Tap to Scan Again'}  onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  barcodebox:{
    alignItems:'center',
    justifyContent:'center',
    height:300,
    width:300,
    overflow:'hidden',
    borderRadius:30,
    backgroundColor:'tomato'
  },
  mainText:{
    fontSize:16,
    margin:20
  }
})