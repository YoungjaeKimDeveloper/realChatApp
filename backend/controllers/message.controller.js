import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socketSetting.js";
import Message from "../models/Message.model.js";
import { User } from "../models/User.model.js";

export const getUsers = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "CANNOT FIND THE USER" });
    }
    const users = await User.find({
      _id: {
        $ne: user._id,
      },
    });
    // Zustand에 응답보내주기
    return res.status(200).json({ success: true, users: users });
  } catch (error) {
    console.error("FAILED TO GET USERS ❌", error.message);
    return res.status(500).json({
      success: false,
      message: `FAILED TO GET USERS: ${error.message} ❌`,
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "CANNOT FIDN THE USER ❌" });
    }
    const { id: partnerId } = req.params;
    if (!partnerId) {
      return res
        .status(400)
        .json({ success: false, message: "CANNOT FINDTHE PARTNER ID ❌" });
    }
    const conversation = await Message.find({
      $or: [
        { senderId: userId, receiverId: partnerId },
        { senderId: partnerId, receiverId: userId },
      ],
    });
    return res.status(200).json({ success: true, conversation: conversation });
  } catch (error) {
    console.log("FAILED IN GetConversation❌ ", error.message);
    return res
      .status(500)
      .json({ message: `INTERNAL SERVER ERROR ${error.message}` });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { id: partner_id } = req.params;

    if (!user_id) {
      return res
        .status(400)
        .json({ success: false, message: "CANNOT FIND THE USER ❌" });
    }
    if (!partner_id) {
      return res
        .status(400)
        .json({ success: false, message: "CANNOT FIND THE PARTNER ❌" });
    }
    const { text, image } = req.body;
    if (!text && !image) {
      return res
        .status(400)
        .json({ success: false, message: "NO MESSAGE && NO IMAGE ❌" });
    }
    let imageUrl = null;
    if (image) {
      try {
        imageUrl = await cloudinary.uploader.upload(image);
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `FAILED TO IMAGE UPLOAD ❌ ${error.message}`,
        });
      }
    }
    const newMessage = await Message.create({
      senderId: user_id,
      receiverId: partner_id,
      text: text,
      image: imageUrl?.secure_url,
    });
    // Add the real time meessage functio before communicate it.
    const receiverSocketId = getReceiverSocketId(partner_id);
    // If user is online
    console.log("❤️ReciverSocketID", receiverSocketId);
    if (receiverSocketId) {
      console.log("Reciver ID IS EXISTED!");
    }
    io.to(receiverSocketId).emit("Newmessage", newMessage);

    return res.status(201).json({ success: true, newMessage: newMessage });
  } catch (error) {
    console.error("endMessage ❌", error.message);
    return res.status(500).json({
      success: false,
      message: `FAILED TO SEND MESSAGE ${error.message}`,
    });
  }
};
