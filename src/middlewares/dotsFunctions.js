// Import Dots sdk
const Dots = require('dots-node');

// Initialize Dots object
const PRODUCTION = false;
const apiURL = PRODUCTION
    ? 'https://pls.senddots.com/api'
    : 'https://pls.senddotssandbox.com/api';

// Create functions accessible throughout your codebase

module.exports = {

    createUser: async function (

        email,

        countryCode,

        phoneNumber,

        firstName,

        lastName,

    ) {

        try {

            // Create user object

            const verificationId = await dots.User.create(

                email,

                countryCode,

                phoneNumber,

                firstName,

                lastName

            );



            // Issue verification token to the user's phone

            await dots.User.sendVerificationToken(verificationId);



            return verificationId;

        } catch (err) {

            console.log(err);

        }

    },

    verifyUser: async function (verificationId, verificationToken) {

        try {

            // Submit the verification token

            const userId = await dots.User.verifyUser(

                verificationId,

                verificationToken

            );



            return userId;

        } catch (err) {

            console.log(err);

        }

    },

};



const dots = new Dots(process.env.DOTS_CLIENT_ID, process.env.DOTS_API_KEY, apiURL);