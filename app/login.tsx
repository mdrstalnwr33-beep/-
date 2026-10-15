import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { grades } from '../src/data';

export default function LoginScreen() {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [grade, setGrade] = useState(grades[0]);

  const enter = () => {
    if (!name.trim() || !code.trim()) return Alert.alert('بيانات ناقصة', role === 'student' ? 'اكتب اسم الطالب ورمز الدخول.' : 'اكتب اسم المعلم ورمز المعلم.');
    router.replace({ pathname: '/home', params: { role, name: name.trim(), grade } });
  };

  return <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
      <View style={styles.brand}><Text style={styles.logo}>ع</Text><Text style={styles.title}>تطبيق القاضي للعلوم</Text><Text style={styles.subtitle}>الكيمياء • الفيزياء • الأحياء</Text></View>
      <View style={styles.card}>
        <Text style={styles.label}>اختر نوع الحساب</Text>
        <View style={styles.roles}>
          <Pressable style={[styles.role, role === 'student' && styles.active]} onPress={() => setRole('student')}><Text style={styles.roleText}>👨‍🎓 الطالب</Text></Pressable>
          <Pressable style={[styles.role, role === 'teacher' && styles.active]} onPress={() => setRole('teacher')}><Text style={styles.roleText}>👨‍🏫 المعلم</Text></Pressable>
        </View>
        <Text style={styles.label}>الاسم</Text>
        <TextInput value={name} onChangeText={setName} placeholder={role === 'student' ? 'اسم الطالب' : 'اسم المعلم'} placeholderTextColor="#8b95a7" style={styles.input} textAlign="right" />
        <Text style={styles.label}>{role === 'student' ? 'رمز الطالب' : 'رمز المعلم'}</Text>
        <TextInput value={code} onChangeText={setCode} placeholder="أدخل الرمز" placeholderTextColor="#8b95a7" style={styles.input} textAlign="right" secureTextEntry={role === 'teacher'} />
        {role === 'student' && <><Text style={styles.label}>الصف</Text><View style={styles.gradeWrap}>{grades.map(g => <Pressable key={g} onPress={() => setGrade(g)} style={[styles.grade, grade === g && styles.active]}><Text style={styles.gradeText}>{g}</Text></Pressable>)}</View></>}
        <Pressable style={styles.button} onPress={enter}><Text style={styles.buttonText}>دخول إلى المنصة</Text></Pressable>
      </View>
      <Text style={styles.footer}>منصة تعليمية للمرحلة الثانوية</Text>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({ safe:{flex:1,backgroundColor:'#f4f7fb'}, container:{flex:1,justifyContent:'center',padding:20}, brand:{alignItems:'center',marginBottom:22}, logo:{width:68,height:68,borderRadius:34,backgroundColor:'#17324d',color:'#fff',textAlign:'center',textAlignVertical:'center',fontSize:38,fontWeight:'900',overflow:'hidden'}, title:{fontSize:28,fontWeight:'900',color:'#17324d',marginTop:12}, subtitle:{fontSize:14,color:'#667788',marginTop:5}, card:{backgroundColor:'#fff',borderRadius:24,padding:20,borderWidth:1,borderColor:'#dce4ea'}, label:{fontSize:14,fontWeight:'800',color:'#344054',textAlign:'right',marginBottom:8,marginTop:5}, roles:{flexDirection:'row-reverse',gap:10,marginBottom:8}, role:{flex:1,borderWidth:1,borderColor:'#d0d5dd',borderRadius:14,paddingVertical:13,alignItems:'center'},active:{borderColor:'#2f6f9f',backgroundColor:'#eef4f8'},roleText:{fontWeight:'800',color:'#344054'},input:{borderWidth:1,borderColor:'#d0d5dd',borderRadius:13,paddingHorizontal:14,paddingVertical:12,fontSize:16,color:'#101828',marginBottom:5},gradeWrap:{gap:7,marginBottom:15},grade:{borderWidth:1,borderColor:'#dce4ea',borderRadius:10,padding:9,alignItems:'center'},gradeText:{fontWeight:'700',color:'#344054'},button:{backgroundColor:'#17324d',borderRadius:14,paddingVertical:15,alignItems:'center',marginTop:5},buttonText:{color:'#fff',fontSize:17,fontWeight:'900'},footer:{textAlign:'center',color:'#667788',marginTop:18,fontSize:13} });
