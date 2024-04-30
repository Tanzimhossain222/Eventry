import { eventModel } from "@/backend/models/event-models";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-utils";
import { dbConnect } from "../services/mongo";
import { userModel } from "../models/user-models";

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

async function createUser(user){
    return await userModel.create(user);
}

async function findUserCredentials(credentials){
    const user = await userModel.findOne(credentials).lean();
    return user;
}

export {
    getAllEvents,
    getEventById,
    createUser,
    findUserCredentials
};
