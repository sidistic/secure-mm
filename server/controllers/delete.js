import ChatRoomModel from '../models/ChatRoom.js';
import ChatMessageModel from '../models/ChatMessage.js';


export default {
    deleteRoomById: async (req, res) => {
        try {
            const { roomId } = req.params;
            const room = await ChatRoomModel.findByIdAndDelete({
                _id: roomId
            })
            const messages = await ChatMessageModel.deleteMany({
                chatRoomId: roomId
            })

            return res.status(200).json({
                success: true,
                message: "Operation performed successfully",
                deletedRoomsCount: room.deletedCount,
                deletedMessagesCount: messages.deletedCount,

            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
    deleteMessageById: async (req, res) => {
        try {
            const {messageId} = req.params;
            const message = await ChatMessageModel.findByIdAndDelete({
                messageId
            })
            return res.status(200).json({
                success: true,
                deletedMessagesCount: message.deletedCount,
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    },
}