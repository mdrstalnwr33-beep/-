import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>رجوع ›</Text></Pressable>
        <Text style={styles.title}>الملف الشخصي</Text>
        <View style={styles.card}><Text style={styles.avatar}>👤</Text><Text style={styles.name}>حساب المستخدم</Text><Text style={styles.note}>سيتم ربط بيانات الحساب والمستوى الدراسي بالمصادقة في المرحلة القادمة.</Text></View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#f4f7fb'},container:{padding:20},back:{color:'#356ae6',fontWeight:'800',marginBottom:18,textAlign:'right'},title:{fontSize:27,fontWeight:'900',color:'#14213d',textAlign:'right',marginBottom:20},card:{backgroundColor:'#fff',borderRadius:22,padding:28,alignItems:'center',elevation:2},avatar:{fontSize:50},name:{fontSize:20,fontWeight:'900',color:'#14213d',marginTop:10},note:{color:'#667085',textAlign:'center',lineHeight:24,marginTop:10}});
