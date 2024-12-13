import React, { useState } from "react";
import {
  Text,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Icon,
  HStack,
  ScrollView,
  Image,
  Pressable,
  Input,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};


export const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#edf2f7",
      100: "#dbe2ea",
      200: "#b9c5d2",
      300: "#94a7bb",
      400: "#728aa3",
      500: "#4a6686",
      600: "#3a506b",
      700: "#2c3e56",
      800: "#1e2c41",
      900: "#121d2e",
    },
    accent: {
      500: "#007bff",
    },
  },
});


const gameList = [
  {
    id: "1",
    title: "Mobile Legends",
    description: "A popular multiplayer online battle arena (MOBA) game.",
    downloads: "500M+",
    rating: 4.5,
    image: "https://i.ytimg.com/vi/prI1IO68kP0/maxresdefault.jpg",
  },
  {
    id: "2",
    title: "eFootball",
    description: "A football simulation video game developed by Konami.",
    downloads: "100M+",
    rating: 4.2,
    image: "https://i.ytimg.com/vi/PBrxqCKGgdY/maxresdefault.jpg",
  },
  {
    id: "3",
    title: "PUBG Mobile",
    description: "A battle royale game where players fight to be the last one standing.",
    downloads: "700M+",
    rating: 4.3,
    image: "https://www.pubgmobile.com/common/images/icon_logo.jpg",
  },
  {
    id: "4",
    title: "Point Blank",
    description: "A fast-paced first-person shooter game.",
    downloads: "50M+",
    rating: 4.0,
    image: "https://clipground.com/images/point-blank-logo-png-3.png",
  },
  {
    id: "5",
    title: "Fishing Planet",
    description: "A realistic online first-person multiplayer fishing simulator.",
    downloads: "10M+",
    rating: 4.1,
    image: "https://th.bing.com/th/id/OIP.Wy3eOdl1XlfN6NChf-IlwwAAAA?w=285&h=380&rs=1&pid=ImgDetMain",
  },
  {
    id: "6",
    title: "Lost Saga",
    description: "A multiplayer online game featuring action-packed combat and character customization.",
    downloads: "20M+",
    rating: 4.3,
    image: "https://arenavoucher.com/assets/img/kategori/305e380c-c76e-41e2-98c2-9504b4b979c1.webp",
  },
  {
    id: "7",
    title: "Left 4 Dead",
    description: "A cooperative first-person shooter game where players fight against hordes of zombies.",
    downloads: "30M+",
    rating: 4.6,
    image: "https://upload.wikimedia.org/wikipedia/en/5/5b/Left4Dead_Windows_cover.jpg",
  },
  {
    id: "8",
    title: "Valorant",
    description: "A team-based tactical shooter game developed by Riot Games.",
    downloads: "50M+",
    rating: 4.7,
    image: "https://logos-download.com/wp-content/uploads/2021/01/Valorant_Logo-700x700.png",
  },
];

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

function HomeScreen({ navigation }) {
  const [games, setGames] = useState(gameList);
  const [searchText, setSearchText] = useState("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Center _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }} flex={1}>
      {}
      <HStack px={4} py={3} bg="accent.500" alignItems="center" justifyContent="space-between" w="100%">
        <Icon as={MaterialIcons} name="menu" size="lg" color="white" />
        <Heading color="white" size="md">Game List</Heading>
        <Icon as={MaterialIcons} name="search" size="lg" color="white" />
      </HStack>

      {}
      <Input
        placeholder="Search games"
        variant="filled"
        width="90%"
        borderRadius="10"
        py="1"
        px="2"
        my="4"
        InputLeftElement={<Icon as={MaterialIcons} name="search" size="sm" ml="2" color="gray.400" />}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />

      {}
      <ScrollView flex={1} w="100%">
        {filteredGames.map((item) => (
          <Box
            key={item.id}
            flexDirection="row"
            bg="primary.800"
            _light={{ bg: "primary.100" }}
            borderRadius="md"
            shadow={2}
            mx={4}
            my={2}
            p={3}
          >
            {}
            <Image
              source={{ uri: item.image }}
              alt={item.title}
              size="xl"
              borderRadius="md"
            />

            {}
            <VStack ml={3} flex={1} justifyContent="space-between">
              <Pressable onPress={() => navigation.navigate('Details', { item })}>
                <Heading size="sm" color="white" _light={{ color: "primary.900" }}>
                  {item.title}
                </Heading>
              </Pressable>
              <Text color="accent.500" fontSize="sm">Rating: {item.rating}</Text>
              <Text color="primary.200" fontSize="xs">Downloads: {item.downloads}</Text>
            </VStack>
          </Box>
        ))}
      </ScrollView>

      {}
      <ToggleDarkMode />
    </Center>
  );
}

function DetailsScreen({ route }) {
  const { item } = route.params;
  return (
    <Center flex={1} _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }}>
      <VStack space={4} alignItems="center">
        <Image source={{ uri: item.image }} alt={item.title} size="2xl" borderRadius="md" />
        <Heading color="primary.800" _light={{ color: "primary.900" }}>{item.title}</Heading>
        <Text>{item.description}</Text>
        <Text>Rating: {item.rating}</Text>
        <Text>Downloads: {item.downloads}</Text>
      </VStack>
    </Center>
  );
}


function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={4} alignItems="center" py={4}>
      <Text color="primary.500">Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
        offTrackColor="primary.600"
        onTrackColor="accent.500"
        onThumbColor="white"
      />
      <Text color="primary.500">Light</Text>
    </HStack>
  );
}
