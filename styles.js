import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#E9E9E9',
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
      height: 50,
      marginBottom: 20,
      marginTop: 20,
      borderWidth: 1,
      padding: 10,
      borderColor: 'white', 
      color:'#000000',
      fontSize: 16,
      borderRadius:12,
      flex: 1,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
        
    },
    submitBtn:{
      borderRadius: 12,
      marginBottom: 20,
      padding:5,
      flex: 0.25,
      backgroundColor: '#0D74FB',
      shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    
    taskTxt:{
      color: '#000000',

    },
    alertBlur: {
      position: 'absolute', 
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999, 
    },
    alertContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
    


    
})