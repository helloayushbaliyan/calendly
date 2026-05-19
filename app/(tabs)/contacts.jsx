import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const ContactsScreen = () => {
  const contacts = [
    {
      id: 1,
      name: "Ayush Baliyan",
      email: "baliyan2809@gmail.com",
    },
  ];

  // Group contacts by first letter
  const groupedContacts = contacts.reduce((acc, contact) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Premium Header */}
      <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8 mb-6 shadow-md shadow-indigo-500/20">
        <View className="flex-row items-center justify-between">
          <Text className="text-[28px] font-bold text-white">Contacts</Text>
          <TouchableOpacity className="w-10 h-10 bg-white/10 rounded-full items-center justify-center">
            <Feather name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6">
          {Object.keys(groupedContacts)
            .sort()
            .map((letter) => (
              <View key={letter} className="mb-6">
                {/* Letter Header */}
                <View className="flex-row items-center mb-4">
                  <View className="w-8 h-8 rounded-full bg-indigo-50 items-center justify-center">
                    <Text className="text-[14px] font-bold text-[#4F46E5]">
                      {letter}
                    </Text>
                  </View>
                  <View className="h-[1px] bg-gray-200 flex-1 ml-3" />
                </View>

                {/* Contact Cards */}
                <View className="gap-y-3">
                  {groupedContacts[letter].map((contact) => (
                    <TouchableOpacity
                      key={contact.id}
                      activeOpacity={0.7}
                      className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-50 flex-row items-center"
                    >
                      {/* Avatar */}
                      <View className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center">
                        <Text className="text-[16px] font-bold text-gray-500">
                          {getInitials(contact.name)}
                        </Text>
                      </View>
                      
                      {/* Details */}
                      <View className="flex-1 ml-4">
                        <Text className="text-[17px] font-bold text-gray-900 mb-0.5">
                          {contact.name}
                        </Text>
                        <Text className="text-[14px] text-gray-500 font-medium">
                          {contact.email}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactsScreen;
