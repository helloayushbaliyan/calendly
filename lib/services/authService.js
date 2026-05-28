import { supabase } from "../supabase/supabase";

export const CreateNewUser = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signUp({ email, password })

        if (error) {
            console.log("Error: Error while creating new user", error);
        } else {
            console.log("User created successfully")
        }
        return data;

    } catch (error) {
        console.log("Error: Error while creating new user", error);
    }
}


export const SignInUser = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            console.log("Error: Error while signing in user", error);
        } else {
            console.log("User signed in successfully")
        }
        return data
    } catch (error) {
        console.log("Error: Error while signin in user", error);
    }
}

export const signOutUser = async () => {
    try {

        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log("Error: Error while signing out user", error);
        } else {
            console.log("User signed out successfully")
        }
    } catch (error) {
        console.log("Error: Error while signing out user", error);
    }
}

export const getCurrentSession = async () => {
    try {
        const { data, error } = await supabase.auth.getSession()
        if (!data?.session) {
            console.log("User not logged in", error);
        } else {
            console.log("User logged in successfully")
        }
        return data?.session;

    } catch (error) {
        console.log("Error: Error while getting current session", error);
    }
}