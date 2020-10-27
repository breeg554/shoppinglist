import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import colors from "../../Colors.js";
import List from "../components/List.js";
import { AntDesign } from "@expo/vector-icons";
import AddList from "../components/AddList.js";
import Fire from "../../fire.js";
import ArchiveList from "../components/ArchiveLists.js";
import { EvilIcons } from "@expo/vector-icons";
class LandingPage extends React.Component {
  state = {
    addListVisible: false,
    archiveListsVisible: false,
    lists: [],
    user: {},
    loading: true,
  };
  componentWillUnmount() {
    firebase.detatch();
  }
  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("Uuu, coś poszło nie tak");
      }
      firebase.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });
      this.setState({ user: user });
    });
  }
  addList = (list) => {
    firebase.addList({
      name: list.name,
      color: list.color,
      archived: list.archived,
      todos: [],
    });
  };
  updateList = (list) => {
    firebase.updateList(list);
  };
  removeList = (list) => {
    firebase.removeList(list);
  };
  handleSetListVisible = () => {
    this.setState({ addListVisible: !this.state.addListVisible });
  };
  handleSetArchiveListVisible = () => {
    this.setState({ archiveListsVisible: !this.state.archiveListsVisible });
  };

  renderItem = (item) => {
    return !item.archived ? (
      <List updateList={this.updateList} data={item} />
    ) : null;
  };

  render() {
    const notArchiveLists = this.state.lists.filter((list) => !list.archived);
    const isFirstListCreated =
      notArchiveLists.length > 0 ? (
        <FlatList
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          data={this.state.lists}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => this.renderItem(item)}
        />
      ) : (
        <TouchableOpacity
          style={styles.addFirstList}
          onPress={() => this.handleSetListVisible()}
        >
          <Text>Utwórz pierwsza liste!</Text>
        </TouchableOpacity>
      );
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addListVisible}
          onRequestClose={() => this.handleSetListVisible()}
          presentationStyle="fullScreen"
          statusBarTranslucent={true}
        >
          <AddList
            addList={this.addList}
            updateList={this.updateList}
            closeModal={this.handleSetListVisible}
          />
        </Modal>
        <Modal
          animationType="slide"
          visible={this.state.archiveListsVisible}
          onRequestClose={() => this.handleSetArchiveListVisible()}
          presentationStyle="fullScreen"
          statusBarTranslucent={true}
        >
          <ArchiveList
            removeList={this.removeList}
            updateList={this.updateList}
            closeModal={this.handleSetArchiveListVisible}
            lists={this.state.lists}
          />
        </Modal>
        <View
          style={[styles.header, { marginTop: Constants.statusBarHeight + 30 }]}
        >
          <View
            style={{
              alignSelf: "stretch",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 40, marginLeft: 10 }}>
              Shopping <Text style={{ color: colors.lightBlue }}>List</Text>
            </Text>
            <TouchableOpacity
              onPress={() => this.handleSetArchiveListVisible()}
            >
              <EvilIcons
                name="archive"
                style={{ marginRight: 10 }}
                size={30}
                color={colors.blue}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bar} />
        </View>
        <View style={styles.listContainer}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color={colors.blue} />
          ) : (
            isFirstListCreated
          )}
        </View>

        <TouchableOpacity
          style={styles.addList}
          onPress={() => this.handleSetListVisible()}
        >
          <AntDesign name="plus" size={30} color={colors.blue} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default LandingPage;

const styles = StyleSheet.create({
  addFirstList: {
    width: "100%",
    height: 70,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    borderColor: colors.lightBlue,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
  bar: {
    height: 1,
    backgroundColor: colors.brightestBlue,
    alignSelf: "stretch",
    marginTop: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: 40,
    marginBottom: 90,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  addList: {
    width: 50,
    height: 50,
    backgroundColor: colors.yellow,
    borderRadius: 25,
    position: "absolute",
    bottom: 32,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
