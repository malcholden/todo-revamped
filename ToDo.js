import { StatusBar } from 'expo-status-bar';
import { Button, TextInput, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { Image } from 'expo-image';
import happyDog from './assets/happy-dog.gif';
import { ReactNode, useState } from "react";
import TaskItem from './TaskItem';
import { Audio } from "expo-av";
import addedSound from './assets/yes.mp3';
import errorSound from './assets/no.mp3';

export default function ToDo(){

    // use state array of tasks
  const [tasks, setTask] = useState([
    {id: 1, text: "Practice coding", completed: false},
  ]);

  // use state for the input text
  const [taskText, setTText] = useState('');

  // creates new task with given tasktext from input. then sets that task into new copied array of tasks, 
  // appeneded to the end. Then clears out input text field.

  function addTask(){
    if(taskText == "" | taskText == null){
      alert("please enter a task");
      playSound(errorSound);
    }else{
      const newTask = {id: Date.now(), text: taskText, completed: false};
      setTask([...tasks, newTask]);
      setTText("")
      playSound(addedSound);
   
    }
    
    
  }


  // deletes task
  function deleteTask(id){
    // set tasks to be only the tasks that are not matching that id
    setTask(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    // goes through the tasks (map). IF the id of the task that is currently read is equal to the id being inputted,
    // create new task that flips the "tasks completed" switch. ELSE--> leave task alone and set task to normal.
    setTask(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

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


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{alignItems: 'center', padding: 20}}>
        <Text style={styles.title}>MY TASKS FOR TODAY</Text>
        <View>
          <Image source={happyDog} style={styles.image}/>
        </View>
        <Text style={styles.h2}>Enter your task</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          
          <TextInput
            id="taskInput"
            style={styles.input}
            onChangeText={setTText}
            value={taskText}
            placeholder="Today, I would like to..."
            // onSubmitEditing={()=> console.log("new task: " + newTask)}
            placeholderTextColor='#7a7a7a'
          />
          <View style={styles.submitBtn}>
            <Button title="add" onPress={addTask}/>
          </View>
          
        </View>
    {/* <View> */}
    {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
    {/* </View>
         */}
        
      </ScrollView>
    </SafeAreaView>


    
  );
}