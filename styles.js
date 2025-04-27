import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container:{
      flex: 1,
    //   backgroundColor: '#2701bf',
    },
    title:{
      color: '#000000',
      fontSize: 18,
      fontWeight: 'bold'
    },
    h2:{
        color: '#000000',
        fontSize: 14,
    },
    heading:{
      flex: 1,
      marginBottom: 20,
      alignItems: 'center',
    },
    btn:{
      borderRadius: 5,
      backgroundColor: '#a1e0f6',
      padding: 20,
      alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 18,
        marginBottom: 40,
        marginTop: 20,
      },
    footer:{
      marginTop: 350,
      marginBottom: 50,
      alignItems: 'center',
      flex: 1
    },
    subtitle:{
      color: '#000000',
    },
    input:{
        height: 40,
        marginBottom: 20,
        marginTop: 20,
        borderWidth: 1,
        width: 200,
        padding: 10,
        borderColor: '#000000', 
        color:'#000000',
        fontSize: 16,
        flex: 1
    },
    submitBtn:{
      flexDirection: "row",
      marginRight: 10,
      marginLeft: 10,
      borderRadius: 5,
      backgroundColor: '#5ce288',
      padding:10,
      alignItems:'center'
    },
    indivTask:{
      height: 'auto',
      width: 300,
      backgroundColor: '#fcf4a4',
      borderRadius: 18,
      marginTop: 5,
      marginBottom: 5,
      padding: 20,

    },
    taskTxt:{
      color: '#000000',

    }
    


    
})