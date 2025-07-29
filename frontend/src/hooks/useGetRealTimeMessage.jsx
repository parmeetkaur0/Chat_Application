import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { setNotification } from "../redux/notificationSlice";  
import { useEffect } from "react";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { messages } = useSelector(store => store.message);
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            if (newMessage.senderId === selectedUser?._id) {
                dispatch(setMessages([...messages, newMessage]));
            } else {
                dispatch(setNotification(newMessage));
            }
        });

        return () => socket?.off("newMessage");
    }, [messages, selectedUser, dispatch, socket]);
};

export default useGetRealTimeMessage;
