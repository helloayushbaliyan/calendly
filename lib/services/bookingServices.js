import { supabase } from "../supabase/supabase";

export const GetAvailableSlots = async (eventId, selectedDate) => {
    try {
        const { data, error } = await supabase.functions.invoke(
            "getAvailableSlots",
            {
                body: {
                    event_type_id: eventId,
                    selected_date: selectedDate,
                },
            }

        );

        if (error) {
            console.log("error in function getAvailableSlots", error);
            return null
        }

        if (data) {
            console.log("availableSlots in function getAvailableSlots", data);
            return data
        }
    } catch (error) {
        console.log("error in function getAvailableSlots", error);
        return null
    }
};