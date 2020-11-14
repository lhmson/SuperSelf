import React from "react";
import { View, StyleSheet, Button, FlatList, Image, Icon, Scroll, Modal, ImageBackground,TouchableOpacity } from "react-native";
import Colors from "../utils/Colors";
import Text from "../components/Text";
import AlarmTime from "../utils/AlarmTime_TempData";
import { ScrollView } from "react-native-gesture-handler";

const uri_background = "https://i.pinimg.com/564x/e5/0f/aa/e50faa9333ca7505d268b9051203da74.jpg"
const uri_clock = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Alarm_Clock_Vector.svg/1200px-Alarm_Clock_Vector.svg.png"

const ModalCreateChallenge = (props) => {
    return(
        <Modal style={{flex:1}} animationType="slide" visible={props.visible}>
          <View style={{flex:1}}>
           <ImageBackground source={{uri:uri_background}} 
           style={{width: '100%', height: '100%',position: 'absolute', resizeMode:'stretch'}}>
           </ImageBackground>
           <View style={{flexDirection:"row"}}>
               <BackButton></BackButton>
                <TitleChallenge hideModal = {() => props.hideModal()}></TitleChallenge>
                <NumberPages></NumberPages>
           </View>
            <ScrollView>
          <Text style={styles.h1}>THỜI GIAN</Text>
        
          <View style = {{width: 350, alignSelf:"center", marginTop:10, flexDirection:"column", alignItems:"flex-start"}}>
          {/* <Text style={{...styles.h2,marginLeft:-40}}>Hãy chọn các mốc thời gian trong ngày</Text> */}
          <Text style={{...styles.h3, marginTop:20}}>
              Theo nghiên cứu khoa học nước nên được uống thường xuyên cách nhau 2 giờ đồng hồ, 2 cột mốc thời gian phải uống 
              đó là 7:00 AM và 17:00 PM là tốt nhất
         </Text>
          </View>
            {/* Line header */}
          {/* <Image style={{resizeMode:"stretch", height:80, width:150, alignSelf:"center"}} 
           source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Alarm_Clock_Vector.svg/1280px-Alarm_Clock_Vector.svg.png"}}></Image> */}
         <HeaderClock>
         </HeaderClock>
         <ListAlarm>
             
         </ListAlarm>

         <TouchableOpacity style={{...styles.TitleButton, width:200, marginTop:30, backgroundColor:Colors.darkOrange}}>
            <Text style={{...styles.h3, color:Colors.white}}>Xong</Text>
          </TouchableOpacity>
        
         </ScrollView>
          </View>
        </Modal>
    );
}

const TitleChallenge = (props) => {
  return(
        <TouchableOpacity style={styles.TitleButton} onPress={()=>{props.hideModal()}}>
          <Text style={styles.h3}>WATER CHALLENGE</Text>
        </TouchableOpacity>
  );
}

const BackButton = (props) => {
    return(
    <TouchableOpacity style={{...styles.TitleButton, marginLeft: 5, alignSelf:"flex-start", width:50, color:props.color}}>
        <Image style={{width:50, height:50, alignSelf:"flex-start"}} source = {{uri: "https://www.searchpng.com/wp-content/uploads/2019/02/Back-Arrow-Icon-PNG-715x715.png"}}></Image>
    </TouchableOpacity>
    )
}

const NumberPages = (props) => {
    return(
          <TouchableOpacity style={{...styles.TitleButton, width:50, alignSelf:'flex-end', marginLeft:30}}>
            <Text style={styles.h3}>1/5</Text>
          </TouchableOpacity>
    );
  }

const HeaderClock = (props) => {
  return(
        <View style={{flexDirection:"column", alignItems:"flex-start", marginLeft:40, marginTop:15}}>
            <View style={{flexDirection:"row"}}>
                <Image style={{height:20, width:20, resizeMode:"contain", marginLeft:-20}} source={{uri : "https://www.shareicon.net/data/128x128/2016/05/31/773530_flag_512x512.png"}}></Image>
                <Text style={{marginLeft:5, color: Colors.black, fontSize:18,fontWeight: "bold"}}>Hẹn giờ</Text>
            </View>
        </View>
  );
};

const ListAlarm = (props) => {
    return(
    <FlatList style={{alignContent:"flex-start"}} 
        data={AlarmTime} renderItem={({item}) => <CardTime Time={item.Time}></CardTime>}>
    </FlatList>
    )
}

const CardTime = (props) => {
    return(
        <TouchableOpacity style={{...styles.TitleButton, width:350, flexDirection:"row"}} onPress={()=>{}}>
             <Image style={{width:80,height:50,resizeMode:"stretch"}} source={{uri: uri_clock}}></Image>
             <Text style={styles.h3}>{props.Time}</Text>
        </TouchableOpacity>
    )
}

export default ModalCreateChallenge;

const styles = StyleSheet.create({
  Image: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor : Colors.darkOrange,
  },
  TitleButton :{
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor : Colors.paleWhite,
    borderRadius: 40,
    height: 50,
    width: 220,
    alignSelf: 'center',
    marginLeft: 30,
    marginRight: 10,
  },
  h3 :{
    color: Colors.black,
    fontSize: 16,
  },
  h1 :{
    color: Colors.darkRed,
    fontSize: 25,
    alignSelf: "center",
    textAlign: "center",
  },
  h2: {
    color: Colors.darkBlue,
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    alignContent: "center",
  }
});