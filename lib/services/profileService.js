import { supabase } from "../supabase/supabase";

export const createProfile = async (userId, userName, UserEmail) => {
    try {
        const { data, error } = await supabase.from("profiles").insert(
            {
                user_id: userId,
                user_name: userName,
                user_email: UserEmail
            }
        )

        if (error) {
            console.log("Error: Error while creating profile", error);
        } else {
            console.log("Profile created successfully", data);
        }
        return data;

    } catch (error) {
        console.log("Error: Error while creating profile", error);
    }

}