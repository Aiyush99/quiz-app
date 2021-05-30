import React,{useState,useEffect} from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { shadow } from 'react-native-paper'
const Questions = ({route}) => {

    const [options,setOptions] = useState()
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [score,setScore] = useState(0)
    const [selected,setSelected] = useState()


    const {p1,p2,p3,p4} = route.params

    useEffect(() => {
      console.log(p1)
      setOptions(
          p1 && 
          handleShuffle([
              p3,
              p4,
            ])
      );
    }, [p1])

    console.log(options)

    const handleSelect = (i)=>{
    if(selected===i && selected===p3){
        return "select"
    }
    else if(selected===i && selected!==p3){
        return "wrong"
    }
    else if(i===p3){
        return "select"
    }
}

  const handleShuffle = (optionss)=>{
   return optionss.sort(()=>Math.random()-0.5)
  }
    return (
        <View>
            <View style={{justifyContent:"center",alignItems:"center"}}>
            <Text style={{marginTop:75,color:"black",fontSize:25,fontWeight:"bold"}}>Welcome, {p2}</Text>
            </View>
            
            {p1?(
                <>
  <View style={{width:"100%",display:"flex",justifyContent:"space-between",margin:10}}>
  <Text>{p1.category}</Text>
  <Text>{score}</Text>
  </View>

   <View style={{justifyContent:"center",alignItems:"center"}}>
   <Text style={{fontSize:25,fontWeight:"bold"}}>Question {currentQuestion+1}</Text>
   <Text>{p1.question}</Text>
  </View>

  <View style={styles.options}>
      {
          options &&
          options.map((i,index)=>(
              <View style={styles.options} key={index.toString()}>
              <TouchableOpacity style={styles.btn}onPress={()=>handleCheck(i)}>
                  <Text>{i}</Text>
              </TouchableOpacity>
              </View>
          ))
      }
  </View>
  </>
            ):(
                <ActivityIndicator color="black"size="large"style={{flex:1,justifyContent:"center",alignItems:"center"}}/>
            )}
          

           <FlatList vertical showsVerticalScrollIndicator={false}
           data={p1}
           keyExtractor={(item,index)=>index.toString()}
           renderItem={(que)=>{
               return ( <View style={{marginTop:20}}>
                   <Text>{que.item.question}</Text>
               </View>

               )
           }}
           />
        </View>
    )
}

export default Questions

const styles = StyleSheet.create({
    options:{
        width:"100%",
        display:"flex",
        flexWrap:"wrap",
        flex:1,
        alignItems:"center",
        justifyContent:"space-around",
        margin:10
    },
    btn:{
      width:"46%",
      height:50,
      padding:15, 
      margin:10,
    }
})
