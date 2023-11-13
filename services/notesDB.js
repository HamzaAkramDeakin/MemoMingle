import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'notes.db',
  location: 'default',
});

//Create Table Notes
const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY AUTOINCREMENT, client TEXT, category TEXT,notes TEXT)',
      [],
      () => {
        console.log('Table created successfully.');
      },
      error => {
        console.error('Error creating table:', error);
      },
    );
  });
};

//Insert Into Notes
const updateNote = (id, client, category, notes) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Notes SET client = ?, category = ?, notes = ? WHERE id = ?',
      [client, category, notes, id],
      () => {
        console.log('Note updated successfully.');
      },
      error => {
        console.error('Error updating note:', error);
      },
    );
  });
};

const insertNote = (client, category, notes) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Notes (client, category, notes) VALUES (?, ?, ?)',
      [client, category, notes],
      () => {
        console.log('Note inserted successfully.');
      },
      error => {
        console.error('Error inserting note:', error);
      },
    );
  });
};

//delete notes from db
const deleteNote = id => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Notes WHERE id = ?',
      [id],
      () => {
        console.log('Note deleted successfully.');
      },
      error => {
        console.error('Error deleting note:', error);
      },
    );
  });
};

//Fetch data
const fetchData = (callback, tableName) => {
  const selectQuery = `SELECT * FROM ${tableName};`;
  db.transaction(tx => {
    tx.executeSql(
      selectQuery,
      [],
      (tx, results) => {
        const rows = results.rows;
        const data = [];
        for (let i = 0; i < rows.length; i++) {
          data.push(rows.item(i));
        }
        callback(data);
      },
      error => {
        console.error('Fetch error', error);
      },
    );
  });
};

export default {
  createTable,
  insertNote,
  updateNote,
  deleteNote,
  fetchData,
};
