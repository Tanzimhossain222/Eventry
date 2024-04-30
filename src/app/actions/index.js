'use server'

import { revalidatePath } from "next/cache";

const { createUser, findUserCredentials, updateInterest } = require("@/backend/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formData) {
    const user = Object.fromEntries(formData);

    const created = await createUser(user);

    redirect('/login');
}


async function performLogin(formData) {
    try {
        const credentials = {};
        credentials.email = formData.get('email');
        credentials.password = formData.get('password');

        const found = await findUserCredentials(credentials);
        
        return found;

    } catch (err) {
        throw new Error(err);
    }

}

async function addInterestedEvent(eventId, authId){
    try {
        await updateInterest(eventId, authId); 
    } catch (err) {
    throw err;  
    }

    revalidatePath('/');
}



export {
    performLogin, registerUser, addInterestedEvent
};

