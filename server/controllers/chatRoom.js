import makeValidation from "@withvoid/make-validation"

// models
import UserModel from '../models/User.js'
import ChatRoomModel, { CHAT_ROOM_TYPES } from '../models/ChatRoom.js'


export default {
    initiate: async (req, res) => {
        try {
            const validation = makeValidation(types => ({
                payload: req.body,
                checks: {
                    userIds: { 
                        type: types.array, 
                        options: { unique: true, empty: false, stringOnly: true } 
                    },
                    type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES } },
                }
            }));
            if (!validation.success) return res.status(400).json({ ...validation });
        
            const { userIds, type } = req.body;
            const { userId: chatInitiator } = req;
            const allUserIds = [...userIds, chatInitiator];
            const chatRoom = await ChatRoomModel.initiateChat(allUserIds, type, chatInitiator);
            return res.status(200).json({ success: true, chatRoom });
        } catch (error) {
            return res.status(500).json({ success: false, error: error })
        }
    },
    postMessage: async (req, res) => {
        try {
            const { roomId } = req.params;
            const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
            if (!room) {
                return res.status(400).json({
                    success: false,
                    message: 'No room exists for this id',
                })
            }

            const users = await UserModel.getUserByIds(room.userIds);
            const options = {
                page: parseInt(req.query.page) || 0,
                limit: parseInt(req.query.limit) || 10,
            };

            const conversation = await ChatMessageModel.getConversationByRoomId(roomId, options);
            return res.status(200).json({
                success: true,
                conversation,
                users,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error,
            })
        }
    },
    getRecentConversation: async (req, res) => { },
    getConversationByRoomId: async (req, res) => { },
    markConversationReadByRoomId: async (req, res) => { },
}