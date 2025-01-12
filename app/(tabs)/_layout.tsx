import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import "../../global.css"


export default function TabsLayout() {
  return (
    <Tabs
    /*  screenOptions={{
        tabBarActiveTintColor: "#0077B6",
        headerStyle: { backgroundColor: "#25292e" },
        headerShadowVisible: false,
        tabBarBadgeStyle: { backgroundColor: "#25292e" },
        headerTintColor: "#fff",
      }}  */
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          //headerTitle: "Home Screen",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={30} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Services"
        options={{
          headerTitle: "Service",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "apps" : "apps-outline"} color={color} size={30} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Activity"
        options={{
          headerTitle: "Activity",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "reader" : "reader-outline"} color={color} size={30} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Account"
        options={{
          headerTitle: "Account",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "person" : "person-outline"} color={color} size={30} />
          ),
        }}
      />
    </Tabs>
  );
}
