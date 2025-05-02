import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container:{
      flex: 1,

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
        padding: 10,
        borderColor: '#000000', 
        color:'#000000',
        fontSize: 16,
        flex: 1,
        
    },
    submitBtn:{
      borderRadius: 5,
      padding:10,
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

    },
    alertBlur: {
      position: 'absolute', // React Native uses 'absolute', not 'fixed'
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999, // Ensure it's on top of other content
    },
    alertContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5, // Required for Android shadow
    },
    


    
})