import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'react-native-paper';
import EditorScreen from './screens/EditorScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={({navigation}) => ({
          headerRight: () => (
            <IconButton icon='plus' onPress={() => navigation.navigate('Editor')} />
          )
        })} />
        <Stack.Screen name="Editor" component={EditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
