'use server'

const { createUser, findUserCredentials } = require("@/backend/db/queries");
const { redirect } = require("next/navigation");

async function registerUser(formData) {
    const user = Object.fromEntries(formData);

    const created = await createUser(user);

    redirect('/login');
}


async function performLogin(formData){
    const credentials = {};
    credentials.email = formData.get('email');
    credentials.password = formData.get('password');

    const found = await findUserCredentials(credentials);

    if(found){
        redirect('/');
    } else {
        throw new Error('Invalid credentials');
    }

}




export {
    registerUser,
    performLogin
};
