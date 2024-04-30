import { eventModel } from "@/backend/models/event-models";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-utils";
import { userModel } from "../models/user-models";
import { dbConnect } from "../services/mongo";
import mongoose from "mongoose";


async function getAllEvents() {
    await dbConnect();
    const allEvents = await eventModel.find().lean();
    return replaceMongoIdInArray(allEvents);
    return allEvents;
}

async function getEventById(eventId) {
    await dbConnect();
    const event = await eventModel.findById(eventId).lean();
    return replaceMongoIdInObject(event);
}

async function createUser(user) {
    return await userModel.create(user);
}

async function findUserCredentials(credentials) {
    const user = await userModel.findOne(credentials).lean();

    if (user) {
        return replaceMongoIdInObject(user);
    }

    return null;
}

async function updateInterest(eventId, authId){
     const event = await eventModel.findById(eventId);

     if (event) {
        const foundUser = event.interested_ids.find(id => id.toString() === authId);

        if (foundUser) {
            event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
        } else {
            event.interested_ids.push(new mongoose.Types.ObjectId(authId));
        }

        await event.save();
     }
}

export {
    createUser,
    findUserCredentials, getAllEvents,
    getEventById,
    updateInterest
};

