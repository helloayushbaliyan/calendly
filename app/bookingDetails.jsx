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
        {/* Status Highlight Card */}
        <View className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 mb-6 items-center relative overflow-hidden">
          <View className={`absolute top-0 w-full h-2 ${isConfirmed ? 'bg-emerald-500' : 'bg-amber-400'}`} />
          
          <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 mt-2 ${isConfirmed ? 'bg-emerald-100' : 'bg-amber-100'}`}>
            <Feather name={isConfirmed ? "check-circle" : "clock"} size={32} color={isConfirmed ? "#059669" : "#D97706"} />
          </View>
          <Text className="text-[24px] font-bold text-slate-800 mb-1">{booking.guest_name}</Text>
          
          <View className={`px-4 py-2 rounded-xl mt-3 ${isConfirmed ? 'bg-emerald-50' : 'bg-amber-50'}`}>
            <Text className={`text-[12px] font-bold uppercase tracking-wider ${isConfirmed ? 'text-emerald-600' : 'text-amber-600'}`}>
              {booking.status || 'PENDING'}
            </Text>
          </View>
        </View>

        {/* Date & Time Info */}
        <View className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 mb-6">
          <Text className="text-[12px] font-bold text-slate-400 tracking-widest mb-5">SCHEDULE</Text>
          
          <View className="flex-row items-center mb-5">
            <View className="w-12 h-12 rounded-full bg-indigo-50 items-center justify-center mr-4">
              <Feather name="calendar" size={20} color="#5B4CF0" />
            </View>
            <View className="flex-1">
              <Text className="text-[13px] text-slate-500 mb-1">Date</Text>
              <Text className="text-[16px] font-bold text-slate-800">{formatDateHeader(booking.booking_date)}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-orange-50 items-center justify-center mr-4">
              <Feather name="clock" size={20} color="#F59E0B" />
            </View>
            <View className="flex-1">
              <Text className="text-[13px] text-slate-500 mb-1">Time</Text>
              <Text className="text-[16px] font-bold text-slate-800">
                {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 mb-6">
          <Text className="text-[12px] font-bold text-slate-400 tracking-widest mb-5">GUEST INFO</Text>
          
          <View className="flex-row items-center mb-5">
            <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center mr-4">
              <Feather name="user" size={18} color="#64748B" />
            </View>
            <View className="flex-1">
              <Text className="text-[13px] text-slate-500 mb-1">Name</Text>
              <Text className="text-[15px] font-semibold text-slate-800">{booking.guest_name}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center mr-4">
              <Feather name="mail" size={18} color="#64748B" />
            </View>
            <View className="flex-1">
              <Text className="text-[13px] text-slate-500 mb-1">Email Address</Text>
              <Text className="text-[15px] font-semibold text-slate-800">{booking.guest_email}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 mb-6">
          <Text className="text-[12px] font-bold text-slate-400 tracking-widest mb-4">NOTES</Text>
          <Text className="text-[15px] text-slate-700 leading-6">
            {booking.notes || "No notes provided for this booking."}
          </Text>
        </View>

        {/* System Details (Advanced) */}
        <View className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
          <Text className="text-[12px] font-bold text-slate-400 tracking-widest mb-5">API & SYSTEM METADATA</Text>
          
          <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
            <Text className="text-[13px] text-slate-500">Booking ID</Text>
            <Text className="text-[13px] font-mono text-slate-800" selectable>{booking.id}</Text>
          </View>
          
          <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
            <Text className="text-[13px] text-slate-500">Host ID</Text>
            <Text className="text-[13px] font-mono text-slate-800" selectable>{booking.host_id}</Text>
          </View>
          
          <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
            <Text className="text-[13px] text-slate-500">Event Type ID</Text>
            <Text className="text-[13px] font-mono text-slate-800" selectable>{booking.event_type_id}</Text>
          </View>
          
          <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
            <Text className="text-[13px] text-slate-500">Created At</Text>
            <Text className="text-[13px] text-slate-800">
              {new Date(booking.created_at).toLocaleString()}
            </Text>
          </View>
          
          <View className="flex-row items-center justify-between py-3">
            <Text className="text-[13px] text-slate-500">Updated At</Text>
            <Text className="text-[13px] text-slate-800">
              {booking.updated_at ? new Date(booking.updated_at).toLocaleString() : '-'}
            </Text>
          </View>
        </View>
        
        {/* Delete / Cancel Action (Stub) */}
        <TouchableOpacity className="mt-8 mb-4 items-center">
          <Text className="text-red-500 font-bold">Cancel This Booking</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default BookingDetails;
