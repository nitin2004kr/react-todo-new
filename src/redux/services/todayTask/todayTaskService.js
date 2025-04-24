import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase-config";

// updating the task
export const updateTodoService = async (todo) => {
  const updateTask = doc(db, "todayTasktodos", todo.id);
  await updateDoc(updateTask, todo);
  return todo;
};

// deleting the task based on id form firebase database
export const deleteTodoService = async (id) => {
  const deletetask = await deleteDoc(doc(db, "todayTasktodos", id));
  return deletetask;
};

// retriving the data from firebase firestore database
export const getTodoService = async () => {
  var todayTaskList = [];
  const querySnapshot = await getDocs(collection(db, "todayTasktodos"));
  querySnapshot.forEach((doc) => {
    todayTaskList.push({ ...doc.data(), id: doc.id });
  });
  return todayTaskList;
};

// importing the data into firebase firestore database
export const addTodoService = async (todo) => {
  const docRef = await addDoc(collection(db, "todayTasktodos"), todo);
  return { id: docRef.id, ...todo };
};
