'use server'

import EmailTemplate from "@/components/payments/EmailTemplate";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const { createUser, findUserCredentials, updateInterest, updateGoing, getEventById } = require("@/backend/db/queries");
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

async function addInterestedEvent(eventId, authId) {
    try {
        await updateInterest(eventId, authId);
    } catch (err) {
        throw err;
    }

    revalidatePath('/');
}

async function addGoingEvent(eventId, user) {
    try {
        await updateGoing(eventId, user?.id);
        await sendEmail(eventId, user);

    } catch (err) {
        throw err;
    }
    revalidatePath('/');

    redirect('/');
}

async function sendEmail(eventId, user){
    
    try {
        const event = await getEventById(eventId);
        const resend = new Resend(process.env.RESEND_EMAIL_SECRET);
        const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
    
        const sent = await resend.emails.send({
            from: 'eventry@resend.dev',
            to: user?.email,
            subject: "Successfully Registered for the event!",
           react: EmailTemplate({message})
    
        });
        
    } catch (error) {
        throw error;
    }

}



export { addGoingEvent, addInterestedEvent, performLogin, registerUser };

