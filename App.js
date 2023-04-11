// This is App.js file, replace the code below into your project to run. Thanks!

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useState, useRef } from 'react';
import formatTime from 'minutes-seconds-milliseconds'



export default function App() {
  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      <SafeAreaView style={{flex: 1, marginTop: 20, alignItems: 'center'}}>
        <Watch/>
      </SafeAreaView>
    </View>
  );
}


function Watch(){
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  let timerID = useRef();

  const handleStart = () => {
    setRunning(true);
    timerID.current = setInterval(()=>{
      setTime(prev => prev + 100);
    }, 100);
  }


  const handleStop = () => {
    setRunning(false);
    clearInterval(timerID.current);
  }

  const addLap = () => {
    if(!running){
      setTime(0);
      setLaps(prev => [...prev, time]);
    }
  }

  const renderList = (laps) =>{
    return laps.map((lap, index) => (
      <Lap lapTime={lap} id={index + 1} key={index}/>
    ))
  }


  return(
    <View style={{width: '100%'}}>
      {/* time running */}
      <Text style={styles.time}>  {formatTime(time)}</Text>

      {/* Button control*/}
      <View style={styles.WrapControl}>
        <Pressable style={styles.Button} onPress={addLap}>
          <Text style={styles.ButtonText}>Lap</Text>
        </Pressable>

        {
          running ? (
            <Pressable style={[styles.Button, styles.StopStyle]} onPress={handleStop}>
              <Text style={styles.ButtonText}>Stop</Text>
            </Pressable>
          ): (
            <Pressable style={[styles.Button, styles.StartStyle]} onPress={handleStart}>
              <Text style={styles.ButtonText}>Start</Text>
            </Pressable>
          )
        }
        
      </View>

      {/* List Lap */}
      <ScrollView style={{marginTop: 20, height: 300}}>
        {renderList(laps)}
      </ScrollView>
    </View>
  )
}


const Lap = ({lapTime, id}) => {
  return (
    <View style={styles.WrapLap}>
      <Text style={styles.LapText}>Lap#{id}</Text>
      <Text style={styles.LapText}>{formatTime(lapTime)}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  statusbar: {
    color: 'white'
  },
  
  app:{
    flex: 1,  
    backgroundColor: '#1E1E1E',
  },

  time: {
    color: 'white',
    fontSize: 50,
    marginTop: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  WrapControl: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 150
  },

  Button: {
    display: 'flex',
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 100
  },

  ButtonText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#fff'
  },

  StartStyle: {
    borderColor: 'green'
  },

  StopStyle:{
    borderColor: 'red'
  },

  WrapLap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },

  LapText: {
    color: '#000',
    fontSize: 24
  },
});
