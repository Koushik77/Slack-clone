import { db } from "./firebase";
import {
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

export const createRoomWithId = async (room) => {
  await setDoc(doc(db, "rooms", room.id), room);
};

export const createRoom = async (room) => {
  await addDoc(collection(db, "rooms"), room);
};

export const getRoom = async (id) => {
  const roomSnapshot = await getDoc(doc(db, "rooms", id));
  if (roomSnapshot.exists()) {
    return roomSnapshot.data();
  } else {
    console.log("Room doesn't exist");
  }
};

export const getRooms = async () => {
  const roomsSnapshot = await getDocs(collection(db, "rooms"));
  const roomsList = roomsSnapshot.docs.map((doc) => doc.data());
  return roomsList;
};

export const addMessageToRoom = async (message, roomId) => {
  await addDoc(collection(doc(db, "rooms", roomId), "messages"), message);
};
