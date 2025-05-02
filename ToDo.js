import { Button, TextInput, SafeAreaView, ScrollView, Text, View, Alert, Platform } from 'react-native';
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
import AlertBox from './AlertBox';


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

 
 // My task stats counters 
  const [totalNumTasks, setTotalNumTasks] = useState(0);
  const [totalDailyTasks, setTotalDailyTasks] = useState(0);
  const [totalCompletedTasks, setTotalCompletedTasks] = useState(0);
  const [totalLeftOverTasks, setTotalLeftOverTasks] = useState(0);

  // loads counters from storage
  useEffect(()=>{

    const loadCounters = async () => {
      try{
        const totalNum = await AsyncStorage.getItem('@totalNumTasks');
        const totalDaily = await AsyncStorage.getItem('@totalDailyTasks');
        const totalComp = await AsyncStorage.getItem('@totalCompletedTasks');
        const totalLeft = await AsyncStorage.getItem('@totalLeftOverTasks');

        if(totalNum!=null) setTotalNumTasks(parseInt(totalNum));
        if(totalComp!=null) setTotalCompletedTasks(parseInt(totalComp));
        if(totalDaily!=null) setTotalDailyTasks(parseInt(totalDaily));
        if(totalLeft!=null) setTotalLeftOverTasks(parseInt(totalLeft));

      }catch(e){
        console.error('Error loading my counters: ',e)
      }
    }
  })


  // initializes tasks from storage
  useEffect(() => {
    const loadCounters = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@tasks');
        if (jsonValue != null) {
          setTask(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Error loading tasks:', e);
      }
    };
  
    loadCounters();
  }, []);
  
  // store updated counters when changed
  useEffect(() => {
    AsyncStorage.setItem('@totalNumTasks', totalNumTasks.toString());
  }, [totalNumTasks]);
  
  useEffect(() => {
    AsyncStorage.setItem('@totalDailyTasks', totalDailyTasks.toString());
  }, [totalDailyTasks]);

  useEffect(() => {
    AsyncStorage.setItem('@totalCompletedTasks', totalCompletedTasks.toString());
  }, [totalCompletedTasks]);

  useEffect(() => {
    AsyncStorage.setItem('@totalLeftOverTasks', totalLeftOverTasks.toString());
  }, [totalLeftOverTasks]);
  

  // modal visibility
  const [alertVisible, setAlertVisible] = useState(false);



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
      if (Platform.OS === 'web') {
        playSound(errorSound);
        window.alert("Entry invalid: please enter a task");
        
      } else {
        playSound(errorSound);
        Alert.alert("Entry invalid", "Please enter a task.");
        
      }
    }else{
      const newTask = {id: Date.now(), text: taskText, completed: false};
      const updatedTasks = [...tasks, newTask];
      setTask(updatedTasks);
      storeTasks(updatedTasks);
      setTText("")
      playSound(addedSound);
      // setTotalLeftOverTasks(prev=>prev+1);
      setTotalNumTasks(prev=>prev+1);
      setTotalDailyTasks(prev=>prev+1);
    }
    
    
  }





  // wraps up day and clears all that are completed.
  function wrapUp(){
    let x = tasks.length;
    const updatedTasks = tasks.filter(task=> task.completed == false);
    let y = updatedTasks.length;
    setTotalCompletedTasks(x-y);
    setTask(updatedTasks);
    storeTasks(updatedTasks);
    playSound(wrapSound);
    setAlertVisible(true);

  }

  function wrapUpClose(){
    setAlertVisible(false)
    setTotalDailyTasks(0);
    setTotalLeftOverTasks(0);
  }

  // deletes task
  function deleteTask(id){
    // set tasks to be only the tasks that are not matching that id
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTask(updatedTasks);
    storeTasks(updatedTasks);
    setTotalNumTasks(prev=>prev-1);
    
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
            onSubmitEditing={addTask}
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
        <AlertBox
          visible={alertVisible}
          message={"Congratulaitons you started "+totalDailyTasks+" tasks today. You have "+totalCompletedTasks+" left over."}
          onClose={()=>wrapUpClose()}
        />
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