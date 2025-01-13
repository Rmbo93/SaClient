import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: "#0077B6",
        headerStyle: { backgroundColor: "#000000" },
        headerShadowVisible: false,
        tabBarBadgeStyle: { backgroundColor: "#000000" },
        headerTintColor: "#fff",
        tabBarLabelStyle:{ color: 'black'},  // Change text color to black
       
      }}  
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          //headerTitle: "Home Screen",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "home-sharp" : "home-outline"} color={"black"} size={30} />
          ),
        }}   
      />
      
      <Tabs.Screen
        name="Services"
        options={{
          headerTitle: "Service",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "apps" : "apps-outline"} color={"black"} size={30} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Activity"
        options={{
          headerTitle: "Activity",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "reader" : "reader-outline"} color={"black"} size={30} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Account"
        options={{
          headerTitle: "Account",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "person" : "person-outline"} color={"black"} size={30} />
          ),
        }}
      />
    </Tabs>
  );
}
