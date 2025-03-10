import React from "react";
import { TextInput, TouchableOpacity, StyleSheet, Text, View } from "react-native";

export default function Form({ save, newItem, setNewItem }) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="New item..."
        value={newItem}
        onChangeText={(text) => setNewItem(text)}
      />
      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#ff90d9",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
