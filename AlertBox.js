import {  View, Text, Button, Modal} from "react-native";
import React from "react";
import { styles } from './styles';


export default function AlertBox({visible, message, onClose}){
    return(

        <Modal 
        visible={visible}
        transparent
        animationType='fade'
        >
        <View style={styles.alertBlur}>
            <View style={styles.alertContent}>
                <Text>{message}</Text>
                <Button title="OK" onPress={onClose}></Button>
            </View>
        </View>

        </Modal>

    );
        
    
}