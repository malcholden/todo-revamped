import {  View, Text, Button, Pressable} from "react-native";


export default function TaskItem({task, deleteTask, toggleCompleted}){
    return(
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5,
        marginBottom: 5,
        padding: 10, flex: 2, backgroundColor: '#fcf4a4', }}>
            <Pressable onPress={() => toggleCompleted(task.id)}>
        <Text style={{ fontSize: 18 }}>
          {task.completed ? '✅' : '⬜'}
        </Text>
      </Pressable>
            <Text style={{textDecorationLine: task.completed ? 'line-through' : 'none'}}>   {task.text}     </Text>
            <Button title="X" onPress={() => deleteTask(task.id)}/>
        </View>



    );



}