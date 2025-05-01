import {  View, Text, Button, Pressable} from "react-native";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import doneSound from './assets/success.mp3'
import delSound from './assets/no.mp3'
import addedSound from './assets/yes.mp3';

export default function TaskItem({task, deleteTask, toggleCompleted}){

    // let wonAudio = new Audio('./assets/won.wav');
    // const [sound, setSound] = useState();

    async function playSound(soundFile) {
        const { sound } = await Audio.Sound.createAsync(soundFile);
        await sound.playAsync();
    
        // Optional: clean up after playback
        sound.setOnPlaybackStatusUpdate(status => {
          if (status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      }

    const [itemColor, setItemColor] = useState('#fcf4a4')

    

    function done(){
        toggleCompleted(task.id);
        playSound(task.completed ? addedSound : doneSound);
        setItemColor(task.completed ? '#fcf4a4':'#f9bab9');
    }
    function nvm(){
        deleteTask(task.id);
        playSound(delSound);
    }
    return(
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5,
        marginBottom: 5,
        padding: 10, flex: 2, backgroundColor: itemColor }}>
        <Pressable onPress={() => done() }>
        <Text style={{ fontSize: 18 }}>
          {task.completed ? '✅' : '⬜'}
        </Text>
      </Pressable>
            <Text style={{textDecorationLine: task.completed ? 'line-through' : 'none'}}>   {task.text}     </Text>
            <Button title="X" onPress={() =>nvm()}/>
        </View>



    );



}

