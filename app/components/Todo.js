import React from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ExitBtn from "./ExitBtn.js";
import colors from "../../Colors.js";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { isStringEmpty } from "../../isCorrectExpression.js";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  renderTodos = (data, index) => {
    return (
      <View style={styles.todoWrap}>
        <TouchableOpacity
          style={styles.todo}
          onPress={() => this.toggleTodoCompleted(index)}
        >
          {data.completed ? (
            <AntDesign
              name="check"
              size={24}
              color="#999"
              style={{ width: 32 }}
            />
          ) : (
            <Ionicons
              name={"ios-square-outline"}
              size={24}
              color={colors.white}
              style={{ width: 32 }}
            />
          )}
          <Text
            style={{
              color: data.completed ? "#999" : colors.white,
              fontSize: 26,
              textDecorationLine: data.completed ? "line-through" : "none",
            }}
          >
            {data.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.todo}
          onPress={() => this.removeTodo(index)}
        >
          <Text style={{ color: colors.yellow }}>Usuń</Text>
        </TouchableOpacity>
      </View>
    );
  };
  toggleTodoCompleted = (index) => {
    let list = this.props.data;
    list.todos[index].completed = !list.todos[index].completed;
    this.props.updateList(list);
  };
  removeTodo = (index) => {
    let list = this.props.data;
    list.todos.splice(index, 1);
    this.props.updateList(list);
  };
  addTodo = () => {
    const { name } = this.state;
    const { updateList, data } = this.props;

    if (!isStringEmpty(name)) {
      const newTodo = { name, completed: false };
      const list = data;
      list.todos.push(newTodo);
      updateList(list);
      this.setState({ name: "" });
    }
  };
  render() {
    const { data } = this.props;
    const completed = data.todos.filter((todo) => todo.completed).length;
    const allTasks = data.todos.length;
    return (
      <View style={styles.container}>
        <ExitBtn action={this.props.closeModal} color={data.color} topH={64} />
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 32,
              color: data.color,
              textTransform: "capitalize",
              marginLeft: 32,
            }}
          >
            {data.name}
          </Text>
        </View>
        <View style={[styles.bar, { backgroundColor: data.color }]} />
        <View style={styles.addWrap}>
          <TextInput
            onChangeText={(text) => this.setState({ name: text })}
            value={this.state.name}
            style={{
              backgroundColor: "#fff",
              padding: 8,
              flex: 1,
              borderWidth: 1,
              borderRadius: 10,
              marginRight: 32,
              borderColor: data.color,
            }}
            placeholder="Nazwa produktu"
          />
          <TouchableOpacity
            style={[styles.addTodo, { backgroundColor: data.color }]}
            onPress={this.addTodo}
          >
            <AntDesign name="plus" size={30} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <View style={[styles.content, { backgroundColor: data.color }]}>
          <FlatList
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            data={data.todos}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index }) => this.renderTodos(item, index)}
          />
        </View>
        <View style={styles.stats}>
          <Text style={{ fontSize: 35, color: data.color }}>
            {completed}/{allTasks}
          </Text>
        </View>
      </View>
    );
  }
}

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 64,
    marginBottom: 16,
    paddingHorizontal: 16,
    alignSelf: "stretch",
  },
  bar: {
    height: 1,
    marginHorizontal: 16,
    alignSelf: "stretch",
    marginBottom: 64,
  },
  stats: {
    paddingVertical: 16,
    alignSelf: "stretch",
    alignItems: "flex-end",
    paddingHorizontal: 16,
  },
  addTodo: {
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  addWrap: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  content: {
    flex: 1,
    alignSelf: "stretch",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  todo: {
    alignSelf: "stretch",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  todoWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
