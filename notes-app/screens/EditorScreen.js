import { useLayoutEffect, useRef, useState } from 'react';
import { RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Button, Colors, Snackbar, Subheading, TextInput } from 'react-native-paper';
import axios from 'axios';

export default function EditorScreen ({ route, navigation }) {
  const editor = useRef();
  const [title, setTitle] = useState(route.params && route.params.note ? route.params.note.attributes.title : '');
  const [content, setContent] = useState(route.params && route.params.note ? route.params.note.attributes.content : '');
  const [error, setError] = useState('')

  function saveNote () {
    editor.current.blurContentEditor(); //lose focus for editor and close keyboard
    Keyboard.dismiss();
    const trimmedTitle = title.trim(),
      trimmedContent = content.trim();
    if (!trimmedTitle.length || !trimmedContent.length) {
      setError('Please fill both title and content');
      return;
    }
    axios({
      method: route.params && route.params.note ? 'PUT' : 'POST',
      url: 'http://<IP>:1337/api/notes' + (route.params && route.params.note ? '/' + route.params.note.id : ''),
      data: {
        data: {
          title,
          content,
          date: Date.now()
        }
      }
    }).then(() => {
      //redirect back to home screen
      navigation.goBack();
    })
    .catch((e) => {
      console.error(e);
      setError('An error occurred, please try again later')
    })
  }

  function deleteNote () {
    axios.delete('http://<IP>:1337/api/notes/' + route.params.note.id)
      .then(() => {
        //redirect back to home screen
      navigation.goBack();
      })
      .catch((e) => {
        console.error(e);
        setError('An error occurred, please try again later.');
      })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: content.length === 0 ? 'New Note' : 'Edit Note',
      headerRight: route.params && route.params.note ? () => (
        <Button color={Colors.redA100} onPress={deleteNote}>Delete</Button>
      ) : () => (<></>)
    });
  }, []);

  return (
    <View style={{margin: 10, flex: 1, justifyContent: 'space-between'}}>
      <TextInput label="Title" value={title} onChangeText={setTitle} mode="outlined" />
      <Subheading>Content</Subheading>
      <RichToolbar
        editor={editor}
      />
      <ScrollView keyboardDismissMode='onDrag'>
        <KeyboardAvoidingView behavior={"position"}	style={{ flex: 1 }} keyboardVerticalOffset={250}>
          <RichEditor 
            style={{ flex: 1}}
            ref={editor} 
            onChange={setContent} 
            initialContentHTML={content} 
            placeholder='Start typing...'
            useContainer />
          <Button onPress={saveNote} mode="contained" style={{marginTop: 20}}>
            Save
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
      <Snackbar visible={error.length > 0} onDismiss={() => setError('')}>{error}</Snackbar>
    </View>
  )
}