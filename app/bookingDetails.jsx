import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hourString, minute] = timeString.split(':');
  const hour = parseInt(hourString, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  const paddedHour = formattedHour < 10 ? `0${formattedHour}` : formattedHour;
  return `${paddedHour}:${minute} ${ampm}`;
};

const formatDateHeader = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options).toUpperCase();
};

const BookingDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  let booking = null;
  try {
    if (params.bookingData) {
      booking = JSON.parse(params.bookingData);
    }
  } catch (error) {
    console.error("Error parsing booking data", error);
  }

  if (!booking) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-slate-500 mb-4">Booking data not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="px-6 py-3 bg-[#5B4CF0] rounded-xl shadow-sm">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isConfirmed = booking.status?.toLowerCase() === 'confirmed';
  const event = booking.events_types || {};

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Premium Header */}
      <View className="bg-white px-6 pt-16 pb-4 border-b border-slate-100 flex-row items-center justify-between shadow-sm">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center"
        >
          <Feather name="chevron-left" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-[18px] font-bold text-slate-800">Booking Details</Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Header Summary */}
        <View className="mb-8">
          <View className="flex-row items-center mb-2">
            <View className={`w-3 h-3 rounded-full ${isConfirmed ? 'bg-[#10B981]' : 'bg-[#F59E0B]'} mr-3`} />
            <Text className="text-[24px] font-bold text-slate-800">{event?.title || 'Meeting'}</Text>
          </View>
          <Text className="text-[16px] text-slate-500 mb-1">{booking.guest_name}</Text>
          <Text className="text-[14px] text-slate-400 mb-4">
            {formatDateHeader(booking.booking_date)} · {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
          </Text>
          <View className="self-start px-3 py-1.5 bg-slate-100 rounded-lg">
            <Text className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{booking.status}</Text>
          </View>
        </View>

        {/* Meeting Details Card */}
        <View className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 mb-6">
          <Text className="text-[15px] font-bold text-slate-800 mb-5">Meeting details</Text>
          
          <View className="flex-row items-start mb-5">
            <Feather name="video" size={20} color="#64748B" style={{ marginTop: 2 }} />
            <View className="ml-4 flex-1">
              <Text className="text-[16px] font-semibold text-slate-800 mb-1">
                {event?.location_type || 'Platform'}
              </Text>
              {event?.meeting_link ? (
                <TouchableOpacity activeOpacity={0.7} className="mt-1">
                  <Text className="text-[14px] text-[#5B4CF0] font-medium" numberOfLines={1}>{event.meeting_link}</Text>
                </TouchableOpacity>
              ) : (
                <Text className="text-[14px] text-slate-400 italic mt-0.5">Meeting link unavailable</Text>
              )}
            </View>
          </View>
          
          <View className="flex-row items-center">
            <Feather name="clock" size={20} color="#64748B" />
            <Text className="text-[16px] text-slate-700 ml-4">{event?.duration || 30} Minute Meeting</Text>
          </View>
        </View>

        {/* Invitee Details Card */}
        <View className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 mb-6">
          <Text className="text-[15px] font-bold text-slate-800 mb-5">Invitee details</Text>
          
          <View className="flex-row items-center mb-5">
            <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-4 border border-slate-200">
              <Text className="text-[14px] font-bold text-slate-600">
                {booking.guest_name ? booking.guest_name.substring(0, 2).toUpperCase() : 'GN'}
              </Text>
            </View>
            <Text className="text-[16px] font-semibold text-slate-800">{booking.guest_name}</Text>
          </View>

          <View className="flex-row items-center mb-5">
            <Feather name="check-circle" size={18} color="#64748B" />
            <Text className="text-[15px] text-slate-700 ml-4 capitalize">{booking.status}</Text>
          </View>

          <View className="flex-row items-center mb-5">
            <Feather name="mail" size={18} color="#64748B" />
            <Text className="text-[15px] text-[#5B4CF0] ml-4 font-medium">{booking.guest_email}</Text>
          </View>
          
          {booking.notes && (
            <View className="mt-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <Text className="text-[12px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Notes</Text>
              <Text className="text-[15px] text-slate-700 leading-6">{booking.notes}</Text>
            </View>
          )}
        </View>



      </ScrollView>
    </View>
  );
};

export default BookingDetails;
