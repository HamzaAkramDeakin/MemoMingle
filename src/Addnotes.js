import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Text, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import notesDB from '../services/notesDB';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddNote = ({navigation}) => {
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('');
  const [noteText, setNoteText] = useState('');
  const [categories, setCategories] = useState([]);
  const [clients, setClients] = useState([]);
  const route = useRoute();

  useEffect(() => {
    setClients(['Developer Org', 'React Org', 'Test Org']);
    setCategories(['Goal Evidence', 'Support Coordination', 'Active Duty']);
  }, []);

  const handleSave = () => {
    let object = {
      client: client,
      category: category,
      notes: noteText,
    };
    if (route.params?.hasOwnProperty('notes')) {
      notesDB.createTable();
      notesDB.updateNote(route.params?.id, client, category, noteText);
      navigation.navigate('Notes', {status: 'update'});
    } else {
      notesDB.createTable();
      notesDB.insertNote(client, category, noteText, 'Notes');
      navigation.navigate('Notes', {status: 'insert'});
    }
  };

  const handleDelete = () => {
    notesDB.deleteNote(route.params?.id);
    navigation.navigate('Notes', {status: 'delete'});
  };

  useEffect(() => {
    if (route.params?.hasOwnProperty('notes')) {
      setClient(route.params?.client);
      setCategory(route.params?.category);
      setNoteText(route.params?.notes);
    }
  }, [route.params]);

  return (
    <SafeAreaView>
      <ScrollView style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 20}}>Client:</Text>
        <Picker
          selectedValue={client}
          onValueChange={(itemValue, itemIndex) => setClient(itemValue)}
          style={{marginBottom: 20}}>
          {clients.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
        <Text style={{fontSize: 20}}>Category:</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
          style={{marginBottom: 20}}>
          {categories.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
        <TextInput
          placeholder="Note"
          value={noteText}
          onChangeText={setNoteText}
          style={{
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#000',
            padding: 10,
            borderRadius: 4,
            height: 100,
            textAlignVertical: 'top',
          }}
          multiline
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Button
            title="Save Note"
            onPress={handleSave}
            color="#4CAF50"
            style={{padding: 10, borderRadius: 5}}
          />
          {route.params?.hasOwnProperty('notes') && (
            <Button
              title="Delete Note"
              onPress={handleDelete}
              color="#F44336"
              style={{padding: 10, borderRadius: 5}}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNote;
