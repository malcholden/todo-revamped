import {  View, Text, Button, Pressable} from "react-native";
import { Audio } from "expo-av";
import React, { useState } from "react";
import doneSound from './assets/check.mp3'
import delSound from './assets/no.mp3'
import addedSound from './assets/success.mp3';

// This is the individual task item that is created when a new task is submitted. 
export default function TaskItem({task, deleteTask, toggleCompleted, totalCompletedTasks, setTotalCompletedTasks}){

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
        setTotalCompletedTasks(task.completed ? (prev=> prev-1) : (prev=>prev+1));
        setItemColor(task.completed ? '#fcf4a4':'#f9bab9');
        
    }
    // when task has been deletd: handles sound, function, etc.
    function nvm(){
        deleteTask(task.id);
        playSound(delSound);
    }
    return(
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5,
        marginBottom: 5, borderRadius:12,shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        maxWidth:300,
        flexWrap: 'wrap',
        padding: 10, flex: 2, backgroundColor: task.completed ? '#f9bab9':'white' }}>
          <View style={{flex: 1, flexDirection: 'column', alignContent: "flex-start"}}>
            <Pressable onPress={() => done() }>
              <Text style={{ fontSize: 18 }}>
                {task.completed ? '✅' : '⬜'}
              </Text>
            </Pressable>
          </View>
          <View style={{flex: 6, flexDirection: 'column'}}>
            <Text style={{textDecorationLine: task.completed ? 'line-through' : 'none'}}>   {task.text}     </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'column', alignContent:'flex-end'}}>
          <Button title="X" onPress={() =>nvm()}/>
          </View>
          
        </View>



    );



}

