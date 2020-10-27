import React from 'react';
import { Text, View ,StyleSheet, FlatList, TouchableOpacity, Modal} from 'react-native';
import colors from '../../Colors.js'
import { Ionicons } from '@expo/vector-icons'; 

const ExitBtn = ({action,topH=64,color=colors.blue})=>{
    return (
        <TouchableOpacity style={[styles.btn,{top: topH} ]} onPress={action}>
            <Ionicons name="ios-arrow-back" size={30} color={color}/>
        </TouchableOpacity>
    )
}
export default ExitBtn;
const styles = StyleSheet.create({
    btn:{
        position: "absolute",
        left: 8,
        padding: 8,
        zIndex: 99,
    }

})