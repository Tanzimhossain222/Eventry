import { eventModel } from "@/backend/models/event-models";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-utils";

async function getAllEvents() {
    const allEvents = await eventModel.find().lean();
    return replaceMongoIdInArray(allEvents);
    return allEvents;
}

async function getEventById(eventId) {
    const event = await eventModel.findById(eventId).lean();
    return replaceMongoIdInObject(event);
}

export {
    getAllEvents,
    getEventById
};
