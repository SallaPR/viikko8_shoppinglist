import { SafeAreaView, StyleSheet, Text } from "react-native";
import {
  firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  serverTimestamp,
  onSnapshot,
  query,
  SHOPPINGLIST,
} from "./firebase/Config";
import { useCallback, useEffect, useState } from "react";
import Form from "./components/Form";
import ShoppingList from "./components/ShoppingList";

export default function App() {
  const [items, setItems] = useState("");
  const [newItem, setNewItem] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const q = query(collection(firestore, SHOPPINGLIST), orderBy("created", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempItems = [];
      querySnapshot.forEach((doc) => {
        tempItems.push({ ...doc.data(), id: doc.id });
      });
      setItems(tempItems);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const save = async () => {
    if (newItem.trim() === "") return;
    try {
      const docRef = await addDoc(collection(firestore, SHOPPINGLIST), {
        text: newItem,
        created: serverTimestamp(),
      });
      console.log("New item added! " + docRef);
      setNewItem("");
    } catch (error) {
      console.error("Error adding item: ", error);
      alert("Failed to add item.");
    }
  };

  const remove = async (id) => {
    try {
      await deleteDoc(doc(firestore, SHOPPINGLIST, id));
      console.log("Item deleted: " + id);
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const itemBought = useCallback(async (id) => {
    const itemRef = doc(firestore, SHOPPINGLIST, id);
    const currentItem = items.find((item) => item.id === id);
    
    if (currentItem) {
      const updatedItem = { ...currentItem, bought: !currentItem.bought };
      await updateDoc(itemRef, { bought: updatedItem.bought });
      setItems(prevItems =>
        prevItems.map(item => 
          item.id === id ? updatedItem : item
        )
      );
    }
  }, [items]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shopping list</Text>

      {/* Form for new items */}
      <Form save={save} newItem={newItem} setNewItem={setNewItem} />

      {/* Shoppinglist */}
      <ShoppingList
        items={items}
        remove={remove}
        itemBought={itemBought}
        setSelectedId={setSelectedId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    margin: 20,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
});
