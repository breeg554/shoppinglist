import React from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ExitBtn from "./ExitBtn.js";

function ArchiveLists(props) {
  const unarchiveList = (item) => {
    const list = item;
    list.archived = false;
    props.updateList(list);
  };
  const removeList = (item) => {
    props.removeList(item);
  };
  const renderItem = (item) => {
    return item.archived ? (
      <View style={styles.archiveList}>
        <Text>{item.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => unarchiveList(item)}
          >
            <Text style={{ color: colors.yellow }}>Przywróć</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeList(item)}>
            <Text style={{ color: "#af2d2d" }}>Usuń</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.listContainer}>
      <ExitBtn action={props.closeModal} />
      <FlatList
        style={styles.lists}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        data={props.lists}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => renderItem(item)}
      />
    </KeyboardAvoidingView>
  );
}

export default ArchiveLists;
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  lists: {
    alignSelf: "stretch",
    flex: 1,
    marginHorizontal: 20,
    marginTop: 150,
    maxHeight: 500,
  },
  archiveList: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0, 0, 0.1)",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
