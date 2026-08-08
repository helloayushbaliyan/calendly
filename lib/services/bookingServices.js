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
            console.log("availableSlots in function getAvailableSlots");
            return data
        }
    } catch (error) {
        console.log("error in function getAvailableSlots", error);
        return null
    }

}

export const CreateBooking = async (bookingData) => {
    try {
        const { data, error } = await supabase.functions.invoke("createBooking",
            {
                body: bookingData
            }
        )

        if (error) {
            console.log("error in function createBooking", error);
            return null
        }

        if (data) {
            console.log("booking in function createBooking");
            return data
        }
    } catch (error) {
        console.log("error in function createBooking", error);
        return null
    }
}


export const GetBookings = async (hostId) => {
    try {
        const { data, error } = await supabase.from("bookings").select('*').eq("host_id", hostId)
        if (error) {
            console.log("error in function getBooking", error);
            return null
        }
        if (data) {
            console.log("booking in function getBooking");
            return data
        }
    } catch (error) {
        console.log("error in function getBooking", error);
        return null
    }
}