import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import notesDB from '../services/notesDB';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  const addNote = () => {
    navigation.navigate('Addnotes');
  };

  useEffect(() => {
    notesDB.fetchData(data => {
      setNotes(data);
    }, 'Notes');
    console.log('called');
  }, [route.params]);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => navigateToItem(item)}>
      <View
        style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
        <Text>Category: {item.category}</Text>
        <Text>Client: {item.client}</Text>
        <Text>ID: {item.id}</Text>
        <Text>Notes: {item.notes}</Text>
      </View>
    </TouchableOpacity>
  );

  const navigateToItem = item => {
    navigation.navigate('Addnotes', item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={addNote}>
          <Icon name="add-to-list" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      {notes.length > 0 ? (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={styles.noNotesText}>No notes added</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10,
  },
  noteItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noNotesText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Notes;
