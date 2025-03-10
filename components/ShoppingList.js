import React from "react";
import { FlatList } from "react-native";
import Row from "./Row";

export default function ShoppingList({ items, remove, itemBought, setSelectedId }) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Row
          item={item}
          remove={remove}
          itemBought={itemBought}
          setSelectedId={setSelectedId}
        />
      )}
    />
  );
}