import React from 'react';
import { Text, View,StyleSheet, TouchableOpacity, Modal } from 'react-native';
import colors from '../../Colors';
import Todo from './Todo'


class List extends React.Component {
    state = { 
        isTodoOpen: false
     }
     handleToggleTodoModal = ()=>{
         this.setState({isTodoOpen: !this.state.isTodoOpen})
     }
     archiveList=()=>{
        let list = this.props.data;
        list.archived = true
        this.props.updateList(list)
     }
    render() {
        const {data,updateList} =this.props
        const completed = data.todos.filter(todo=>todo.completed).length;
        const allTasks = data.todos.length;
        return (
            <View>
                <Modal animationType='slide' visible={this.state.isTodoOpen} onRequestClose={()=>this.handleToggleTodoModal()} presentationStyle='fullScreen' statusBarTranslucent={true}>
                    <Todo data={data} updateList={updateList} closeModal={this.handleToggleTodoModal}/>
                </Modal>
                <TouchableOpacity style={[styles.list,{backgroundColor: data.color}]} onPress={this.handleToggleTodoModal}>
                    <View>
                        <Text style={[styles.name,styles.text]}>{data.name}</Text>
                        <Text style={[styles.text,{fontSize: 14,color: colors.white}]}>
                            {completed}/{allTasks}
                        </Text>
                    </View>
                    <TouchableOpacity style={{padding: 8}} onPress={this.archiveList}>
                            <Text style={{color: colors.yellow}}>Archiwizuj</Text>
                    </TouchableOpacity>
                  
                </TouchableOpacity>
            </View>
        );
    }
}

export default List;

const styles = StyleSheet.create({
  list: {
    
      marginBottom:20,
      borderRadius: 15,
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: 'stretch',
  } ,
  text:{
    color: colors.white
  },
  name: {
      fontSize: 25,
  } ,
  date: {
    fontSize: 13,
  },
  
})