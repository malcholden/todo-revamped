import { Button, TextInput, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { Image } from 'expo-image';
import happyDog from './assets/happy-dog.gif';
import { useEffect, useState } from "react";
import TaskItem from './TaskItem';
import { Audio } from "expo-av";
import addedSound from './assets/success.mp3';
import errorSound from './assets/no.mp3';
import wrapSound from './assets/wrapup.mp3';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ToDo(){


  // async stores tasks to storage
  const storeTasks = async(tasks)=>{
    try{
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem('@tasks', jsonValue);
    }catch (e){
      console.error('Error saving tasks:', e);
    }
  }

  

  // loads tasks from storage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@tasks');
        if (jsonValue != null) {
          setTask(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Error loading tasks:', e);
      }
    };
  
    loadTasks();
  }, []);
  





    // use state array of tasks
  const [tasks, setTask] = useState([
    {id: 1, text: "Practice coding", completed: false},
  ]);

  // use state for the input text
  const [taskText, setTText] = useState('');

  // creates new task with given tasktext from input. then sets that task into new copied array of tasks, 
  // appeneded to the end. Then clears out input text field. Only does this if valid entry. otherwise, alert.

  function addTask(){
    if(taskText == "" | taskText == null){
      alert("Entry invalid: please enter a task");
      playSound(errorSound);
    }else{
      const newTask = {id: Date.now(), text: taskText, completed: false};
      const updatedTasks = [...tasks, newTask];
      setTask(updatedTasks);
      storeTasks(updatedTasks);
      setTText("")
      playSound(addedSound);
    }
    
    
  }

  // wraps up day and clears all that are completed.
  function wrapUp(){
    const updatedTasks = tasks.filter(task=> task.completed == false);
    setTask(updatedTasks);
    storeTasks(updatedTasks);
    playSound(wrapSound);
  }

  // deletes task
  function deleteTask(id){
    // set tasks to be only the tasks that are not matching that id
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTask(updatedTasks);
    storeTasks(updatedTasks);
  }

  function toggleCompleted(id) {
    // goes through the tasks (map). IF the id of the task that is currently read is equal to the id being inputted,
    // create new task that flips the "tasks completed" switch. ELSE--> leave task alone and set task to normal.
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task));
    setTask(updatedTasks);
    storeTasks(updatedTasks);
  }

  // plays sound 
  async function playSound(soundFile) {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();

    // clean up after playback
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
            placeholderTextColor='#7a7a7a'
          />
          <View style={styles.submitBtn}>
            <Button title="add" onPress={addTask}/>
          </View>
          
        </View>
        <View style={styles.submitBtn}>
            <Button title="wrap-up" color='#02B11C' onPress={wrapUp}/>
          </View>
    {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
        
      </ScrollView>
    </SafeAreaView>


    
  );
}