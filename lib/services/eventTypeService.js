import { supabase } from "../supabase/supabase";

export const SaveEventType = async (eventData, userId) => {
    try {
        const { data, error } = await supabase.from("events_types").insert(
            {
                user_id: userId,
                availability_id: eventData.availabilityId,
                title: eventData.name,
                description: eventData.description,
                duration: eventData.duration,
                location_type: eventData.location,

            }
        ).select()

        if (error) {
            console.log("Event Type Saving UnSucessfull", error);
            return null
        }
        if (data) {
            console.log("Event Type Saving ducrsfully Done");
            return data
        }
    } catch (error) {
        console.log("Event Type Saving UnSucessfull", error);
        return error
    }
}




export const GetEventType = async (userId) => {
    try {
        const { data, error } = await supabase.from("events_types").select(
            `*,
            availability_schedules(
                *,
                availability_days(
                    *
                )
            )
            `
        ).eq("user_id", userId)
        if (error) {
            console.log("Event Type Getting UnSucessfull", error);
            return null
        }
        if (data) {
            console.log("Event Type Getting ducrsfully Done");
            return data
        }
    } catch (error) {
        console.log("Event Type Getting UnSucessfull", error);
        return error

    }
}