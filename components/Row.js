import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Row({ item, remove, itemBought, setSelectedId }) {
  const textDecorationLine = item.bought ? "line-through" : "none";
  const textColor = item.bought ? "#808080" : "#000000";

  return (
    <Pressable
      onPress={() => {
        setSelectedId(item.id);
        itemBought(item.id);
      }}
      style={styles.item}
    >
      <Text style={[styles.itemText, { textDecorationLine, color: textColor }]}>{item.text}</Text>
      <TouchableOpacity onPress={() => remove(item.id)}>
        <Ionicons name="trash" size={24} color="#ff90d9" />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  itemText: {
    fontSize: 18,
  },
});

{
  /* <Pressable
      onPress={() => {
        select(item.id);
        itemBought(item.id);
      }}
    >
      <Text style={[styles.itemText, { textDecorationLine }]}>{item.text}</Text>
    </Pressable> */
}
