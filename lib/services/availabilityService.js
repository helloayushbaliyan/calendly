import { supabase } from "../supabase/supabase";

export const saveAvailability = async (availability, userId) => {
    try {
        const { data: scheduleData, error } = await supabase.from("availability_schedules").insert({
            user_id: userId,
            name: availability.name,

        }).select().single();

        if (error) {
            console.log(`Error while saving schedule Name in database`, error);
            return null;
        }
        // step to save the daya of availability

        const SaveDays = await CreateDays(
            scheduleData.id,
            availability.days
        )
        if (!SaveDays) return null;

        const SaveTime = await CreateTimeRows(
            SaveDays,
            availability.days)


        return scheduleData

    } catch (error) {
        console.log(`Error while saving schedule in database`, error);

    }

}



const CreateDays = async (scheduleId, days) => {
    try {

        const dayRows = Object.keys(days).map((day) => ({
            schedule_id: scheduleId,
            day: day
        }))

        const { data, error } = await supabase.from("availability_days").insert(dayRows).select()

        if (error) {
            console.log("Error while creating days in database", error)
            return null
        }
        if (data) {
            console.log("Days Data Is SuccessFully Stored ");
            return data
        }


    } catch (error) {
        console.log(`Error while creating days in database`, error);
        return error

    }
}


const CreateTimeRows = async (SaveDays, availabilityDays) => {
    try {
        const timeRows = SaveDays.map((dayrec) => ({
            day_id: dayrec.id,
            start_time: availabilityDays[dayrec.day][0].start,
            end_time: availabilityDays[dayrec.day][0].end,

        }))

        const { data, error } = await supabase.from("availability_time_slots").insert(timeRows).select()
        if (error) {
            console.log("Error while inserting time slots in database")
            return null
        }
        if (data) {
            console.log("Time Slots Data Is SuccessFully Stored", data)
            return data
        }
    } catch (error) {
        console.log("Error while inserting time slots in database", error)
        return error
    }


}



export const GetAvailability = async (userId) => {
    try {
        const { data, error } = await supabase.from("availability_schedules").select(
            `*,
            availability_days(
            *,
            availability_time_slots(
            *)
            )
            `
        ).eq("user_id", userId)


        if (error) {
            console.log("availabilty fetch is not sucesfull", error)
            return null
        }
        if (data) {
            console.log("availability data is successfully fetched")
            return data
        }

    } catch (error) {
        console.log("Error while fetching availability from database", error)
        return error
    }
}