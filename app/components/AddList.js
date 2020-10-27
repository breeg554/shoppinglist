import React from 'react';
import { StyleSheet, View,Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import ExitBtn from './ExitBtn'
import {isStringEmpty} from '../../isCorrectExpression.js'
const listColors = ['#07689f','#40a8c4','#212121','#006a71','#a2d5f2','#686d76']
const RenderColors=(changeColor)=>{
    return listColors.map(color=>(
        <TouchableOpacity key={color} style={[styles.colorSelect,{backgroundColor: color}]} onPress={()=>changeColor(color)} />
    ))
}
class AddList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            backgroundColor: listColors[0],
            err: ''
        };
    }
    createTodo =()=>{
        const {addList} = this.props
        const {name,backgroundColor,err} = this.state
        if(!isStringEmpty(name)){
            const list ={name,color: backgroundColor,archived: false}
            addList(list)
            this.setState({name: '',err: ''})
            this.props.closeModal()
        }else{
           this.setState({err: 'Podaj poprawna nazwe listy!'})
        }
     
    }
    handleChangeColor = (backgroundColor)=>{
        this.setState({backgroundColor: backgroundColor})
    }
    render() {
        const {err} = this.state
        return (
            <KeyboardAvoidingView behavior='height' style={styles.container}>
               <ExitBtn action={this.props.closeModal}/>
               <View style={{alignSelf: 'stretch',marginHorizontal: 32}}>
                   {err?<Text>{err}</Text>: null}
                   <TextInput style={styles.input} placeholder='nazwa' onChangeText={(text)=>this.setState({name:text})}/>
                   <View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop:12}}>
                       {RenderColors(this.handleChangeColor)}
                    </View>
                   <TouchableOpacity style={[styles.create,{backgroundColor: this.state.backgroundColor}]} onPress={this.createTodo}>
                       <Text style={{color: colors.white,fontSize: 20}}>Dodaj</Text>
                   </TouchableOpacity>
               </View>
            </KeyboardAvoidingView>
        );
    }
}

export default AddList;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create:{
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: "center"
    },
    colorSelect:{
        width: 30,
        height: 30,
        borderRadius: 4
    }

})