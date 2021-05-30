import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from "react-native-paper"
import {Picker} from "@react-native-picker/picker"

export default function QuizSettings({navigation}) {

  const [selectedValue, setSelectedValue] = useState("General Knowledge")

  const [difficult,setDifficult] = useState("")
  const [name,setName] = useState("")
  const [questions,setQuestions] = useState([])
  


  const getQuestions = async()=>{
    if(!name){
      alert("Name Field must be filled")
    }
    else {
     const data = await fetch(`https://opentdb.com/api.php?amount=20${selectedValue && `&category=${selectedValue}`}${difficult && `&difficulty=${difficult}`}&type=multiple`)
     const result = await data.json()

     setQuestions({
       results:result.results[0]
     })
     
      navigation.navigate("questions",{p1:questions.results,p2:name,p3:questions.results.correct_answer,p4:questions.results.incorrect_answers})
    }

  }
  return (
   <View style={styles.container}>
     <Text style={{fontSize:25,marginBottom:30}}>Quiz Settings</Text>
     <TextInput style={styles.input} value={name} onChangeText={(text)=>setName(text)} label="Enter Your Name"/>
     <Picker style={styles.picker}
     selectedValue={selectedValue}
     onValueChange={(itemValue)=>setSelectedValue(itemValue)}
     >
       <Picker.Item label="General Knowledge"value="9"/>
       <Picker.Item label="Books"value="10"/>
       <Picker.Item label="Films"value="11"/>
       <Picker.Item label="Music"value="12"/>
       <Picker.Item label="Musicals and Theaters"value="13"/>
       <Picker.Item label="Television"value="14"/>
       <Picker.Item label="Video Games"value="15"/>
       <Picker.Item label="Board Games"value="16"/>
       <Picker.Item label="Science and Nature"value="17"/>
       <Picker.Item label="Computer"value="18"/>
       <Picker.Item label="Mathematics"value="19"/>
       <Picker.Item label="Mythology"value="20"/>
       <Picker.Item label="Sports"value="21"/>
       <Picker.Item label="Geography"value="22"/>
       <Picker.Item label="History"value="23"/>
       <Picker.Item label="Politics"value="24"/>
       <Picker.Item label="Celebrities"value="26"/>
       <Picker.Item label="Animals"value="27"/>
       <Picker.Item label="Vehicles"value="28"/>
       <Picker.Item label="Comics"value="29"/>
       <Picker.Item label="Gadgets"value="30"/>
       <Picker.Item label="Japanese Anime"value="31"/>
       <Picker.Item label="Cartoon and Animations"value="32"/>

     </Picker>


     <Picker style={styles.picker}
     selectedValue={difficult}
     onValueChange={(itemValue)=>setDifficult(itemValue)}
     >
       <Picker.Item key="Easy" label="Easy"value="easy"/>
       <Picker.Item key="Medium" label="Medium"value="medium"/>
       <Picker.Item key="Hard" label="Hard"value="hard"/>
       

     </Picker>

     <TouchableOpacity style={styles.btn} onPress={getQuestions}>
       <Text style={{color:"white"}}>Start Quiz</Text>
     </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems: "center"
  },
  picker:{
    marginTop:30,
    width:300,
    height:45,
    borderColor:"blue",
   
  },
  input:{
    width:300,
    
  },
  btn:{
    width:"50%",
    marginTop:30,
    padding:8,
    borderRadius:15,
    backgroundColor:"#7f5df0",
    justifyContent:"center",
    alignItems:"center"
  }
});
