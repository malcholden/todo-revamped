import {  View, Text, Button, Pressable} from "react-native";
import { Audio } from "expo-av";
import React, { useState } from "react";
import doneSound from './assets/success.mp3'
import delSound from './assets/no.mp3'
import addedSound from './assets/yes.mp3';

// This is the individual task item that is created when a new task is submitted. 
export default function TaskItem({task, deleteTask, toggleCompleted}){

    // plays sound
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

    
      // when task has been completed: handles sound, color, function,etc.
    function done(){
        toggleCompleted(task.id);
        playSound(task.completed ? addedSound : doneSound);
        setItemColor(task.completed ? '#fcf4a4':'#f9bab9');
        
    }
    // when task has been deletd: handles sound, function, etc.
    function nvm(){
        deleteTask(task.id);
        playSound(delSound);
    }
    return(
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5,
        marginBottom: 5,
        padding: 10, flex: 2, backgroundColor: task.completed ? '#f9bab9':'#fcf4a4' }}>
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

