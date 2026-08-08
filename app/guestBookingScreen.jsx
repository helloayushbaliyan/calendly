import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAvailableSlots } from "../lib/services/bookingServices";

const GuestBookingScreen = () => {
    const router = useRouter();
    const { event } = useLocalSearchParams()

    // The event string needs to be converted back into a Javascript object
    const parsedEvent = event ? JSON.parse(event) : null;

    const [availableSlots, setAvailableSlots] = useState([])

    const [bookingData, setbookingData] = useState({
        event_type_id: parsedEvent?.id,
        selected_date: "",
        selected_slot: "",
        guest_name: "",
        guest_email: "",
        notes: "",
    })

    const getAvailableSlots = async (dateString, eventId) => {
        setbookingData(prev => ({ ...prev, selected_date: dateString }))
        const result = await GetAvailableSlots(eventId, dateString);
        if (result) {
            console.log("result", result);
            setAvailableSlots(result.slots)
        }
    }

    const handleBooking = () => {
        console.log("bookingData", bookingData);
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top']}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    {/* Header Info */}
                    <View className="px-6 pt-4 pb-6 border-b border-gray-100">
                        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center mb-6">
                            <Feather name="arrow-left" size={20} color="#4F46E5" />
                            <Text className="text-[#4F46E5] font-bold text-[15px] ml-2">Back</Text>
                        </TouchableOpacity>

                        <Text className="text-[26px] font-bold text-gray-900 mb-3">
                            {parsedEvent?.title || "Meeting Title"}
                        </Text>

                        <View className="flex-row items-center">
                            <View className="flex-row items-center mr-5">
                                <View className="w-8 h-8 rounded-full bg-indigo-50 items-center justify-center mr-2">
                                    <Feather name="clock" size={14} color="#4F46E5" />
                                </View>
                                <Text className="text-[14px] font-semibold text-gray-600">{parsedEvent?.duration || "45"} Minutes</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="w-8 h-8 rounded-full bg-indigo-50 items-center justify-center mr-2">
                                    <Feather name="video" size={14} color="#4F46E5" />
                                </View>
                                <Text className="text-[14px] font-semibold text-gray-600">{parsedEvent?.location_type || "Video Meeting"}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Date Selector */}
                    <View className="px-6 py-8 border-b border-gray-100">
                        <View className="flex-row items-center mb-5">
                            <Feather name="calendar" size={18} color="#0F172A" />
                            <Text className="text-[18px] font-bold text-gray-900 ml-2">Select Date</Text>
                        </View>

                        <View className="rounded-[24px] overflow-hidden border border-slate-200 bg-white shadow-sm pb-2">
                            <Calendar
                                onDayPress={day => {
                                    getAvailableSlots(day.dateString, parsedEvent.id);
                                }}
                                markedDates={{
                                    [bookingData.selected_date]: { selected: true, disableTouchEvent: true, selectedColor: '#4F46E5', selectedTextColor: 'white' }
                                }}
                                theme={{
                                    backgroundColor: '#ffffff',
                                    calendarBackground: '#ffffff',
                                    textSectionTitleColor: '#64748b',
                                    selectedDayBackgroundColor: '#4F46E5',
                                    selectedDayTextColor: '#ffffff',
                                    todayTextColor: '#4F46E5',
                                    dayTextColor: '#334155',
                                    textDisabledColor: '#cbd5e1',
                                    dotColor: '#4F46E5',
                                    selectedDotColor: '#ffffff',
                                    arrowColor: '#4F46E5',
                                    monthTextColor: '#0f172a',
                                    textDayFontWeight: '500',
                                    textMonthFontWeight: 'bold',
                                    textDayHeaderFontWeight: '600',
                                    textDayFontSize: 15,
                                    textMonthFontSize: 17,
                                    textDayHeaderFontSize: 13
                                }}
                                minDate={new Date().toDateString()}
                            />
                        </View>
                    </View>

                    {/* Available Slots */}


                    {
                        availableSlots?.length > 0 ? (

                            <View className="px-6 py-8 border-b border-gray-100">
                                <View className="flex-row items-center mb-5">
                                    <Feather name="clock" size={18} color="#0F172A" />
                                    <Text className="text-[18px] font-bold text-gray-900 ml-2">Available Slots</Text>
                                </View>
                                <View className="flex-row flex-wrap gap-3">
                                    {availableSlots.map((time, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            activeOpacity={0.7}
                                            onPress={() => setbookingData({ ...bookingData, selected_slot: time })}
                                            className={`py-3.5 px-5 rounded-[14px] border-[1.5px] ${bookingData.selected_slot === time ? 'bg-[#4F46E5] border-[#4F46E5]' : 'bg-white border-slate-200'}`}
                                        >
                                            <Text className={`font-bold text-[15px] ${bookingData.selected_slot === time ? 'text-white' : 'text-slate-700'}`}>{time}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                        ) : (
                            <View className="flex-row items-center justify-center py-12">
                                <Feather name="calendar" size={40} color="#CBD5E1" />
                                <Text className="text-[16px] text-slate-500 ml-3">Select a date to see available slots</Text>
                            </View>
                        )
                    }


                    {/* Guest Information */}
                    <View className="px-6 py-8">
                        <View className="flex-row items-center mb-6">
                            <Feather name="user" size={18} color="#0F172A" />
                            <Text className="text-[18px] font-bold text-gray-900 ml-2">Guest Information</Text>
                        </View>

                        <View className="mb-5">
                            <Text className="text-[13px] font-bold text-slate-500 mb-2 ml-1 uppercase tracking-wider">Full Name *</Text>
                            <TextInput
                                value={bookingData.guest_name}
                                onChangeText={(value) => setbookingData({ ...bookingData, guest_name: value })}
                                placeholder="e.g. John Doe"
                                placeholderTextColor="#94A3B8"
                                className="bg-slate-50 border border-slate-200 rounded-[16px] px-5 py-4 text-[16px] text-gray-900 font-medium focus:border-[#4F46E5] focus:bg-white"
                            />
                        </View>

                        <View className="mb-5">
                            <Text className="text-[13px] font-bold text-slate-500 mb-2 ml-1 uppercase tracking-wider">Email *</Text>
                            <TextInput
                                value={bookingData.guest_email}
                                onChangeText={(value) => setbookingData({ ...bookingData, guest_email: value })}
                                placeholder="e.g. john@example.com"
                                placeholderTextColor="#94A3B8"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                className="bg-slate-50 border border-slate-200 rounded-[16px] px-5 py-4 text-[16px] text-gray-900 font-medium focus:border-[#4F46E5] focus:bg-white"
                            />
                        </View>

                        <View className="mb-2">
                            <Text className="text-[13px] font-bold text-slate-500 mb-2 ml-1 uppercase tracking-wider">Notes (Optional)</Text>
                            <TextInput
                                value={bookingData.notes}
                                onChangeText={(value) => setbookingData({ ...bookingData, notes: value })}
                                placeholder="I want to discuss..."
                                placeholderTextColor="#94A3B8"
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical="top"
                                className="bg-slate-50 border border-slate-200 rounded-[16px] px-5 py-4 text-[16px] text-gray-900 font-medium h-32 focus:border-[#4F46E5] focus:bg-white"
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Book Meeting Button */}
            <View className="p-6 border-t border-gray-100 bg-white">
                <TouchableOpacity activeOpacity={0.8} onPress={handleBooking} className="bg-[#4F46E5] w-full py-4 rounded-[16px] items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Text className="text-white font-bold text-[17px]">Book Meeting</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default GuestBookingScreen