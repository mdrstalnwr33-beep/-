import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { grades } from '../src/data';
import { getSession, setSession } from '../src/storage';

function gradeFromCode(code: string) {
  const c = code.trim().toLowerCase();
  if (c.startsWith('1') || c.startsWith('a') || c.includes('اول')) return grades[0];
  if (c.startsWith('2') || c.startsWith('b') || c.includes('ثاني')) return grades[1];
  if (c.startsWith('3') || c.startsWith('c') || c.includes('ثالث')) return grades[2];
  return undefined;
}

export default function LoginScreen() {
  const p = useLocalSearchParams<{ role?: string }>();
  const [role, setRole] = useState<'student' | 'teacher'>(p.role === 'teacher' ? 'teacher' : 'student');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const enter = async () => {
    if (!name.trim() || !code.trim()) return Alert.alert('بيانات ناقصة', 'اكتب الاسم ورمز الدخول.');
    const grade = role === 'teacher' ? grades[0] : gradeFromCode(code);
    if (role === 'student' && !grade) return Alert.alert('رمز غير معروف', 'رمز الطالب يحدد الصف تلقائيًا. استخدم رمزًا يبدأ بـ 1 أو 2 أو 3.');
    const session = { role, name: name.trim(), code: code.trim(), grade: grade || grades[0], active: true } as const;
    const old = await getSession();
    if (old && old.code === session.code && old.active === false) return Alert.alert('الحساب موقوف', 'لا يمكن الدخول بهذا الحساب.');
    await setSession(session);
    router.replace({ pathname: '/home', params: { role, name: session.name, grade: session.grade, code: session.code } });
  };
  return <SafeAreaView style={styles.safe}><View style={styles.container}>
    <View style={styles.brand}><View style={styles.logo}><Text style={styles.logoText}>ع</Text></View><Text style={styles.title}>تسجيل الدخول</Text><Text style={styles.subtitle}>تطبيق القاضي للعلوم</Text></View>
    <View style={styles.card}><Text style={styles.label}>نوع الحساب</Text><View style={styles.roles}><Pressable style={[styles.role,role==='student'&&styles.active]} onPress={()=>setRole('student')}><Text style={styles.roleText}>👨‍🎓 الطالب</Text></Pressable><Pressable style={[styles.role,role==='teacher'&&styles.active]} onPress={()=>setRole('teacher')}><Text style={styles.roleText}>👨‍🏫 المعلم</Text></Pressable></View>
    <Text style={styles.label}>الاسم</Text><TextInput value={name} onChangeText={setName} placeholder={role==='student'?'اسم الطالب':'اسم المعلم'} placeholderTextColor="#98a2b3" style={styles.input} textAlign="right" />
    <Text style={styles.label}>{role==='student'?'كود التسجيل':'كود المعلم'}</Text><TextInput value={code} onChangeText={setCode} placeholder={role==='student'?'الكود يحدد الصف تلقائيًا':'أدخل كود المعلم'} placeholderTextColor="#98a2b3" style={styles.input} textAlign="right" secureTextEntry={role==='teacher'} />
    {role==='student'&&<Text style={styles.hint}>يتم توجيهك تلقائيًا إلى الصف المرتبط بالكود، ولا يظهر لك أي صف آخر.</Text>}
    <Pressable style={styles.button} onPress={enter}><Text style={styles.buttonText}>دخول إلى المنصة</Text></Pressable></View>
    <Pressable onPress={()=>router.back()}><Text style={styles.back}>رجوع</Text></Pressable>
  </View></SafeAreaView>;
}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#f4f7fb'},container:{flex:1,justifyContent:'center',padding:20},brand:{alignItems:'center',marginBottom:22},logo:{width:66,height:66,borderRadius:20,backgroundColor:'#17324d',alignItems:'center',justifyContent:'center'},logoText:{color:'#fff',fontSize:38,fontWeight:'900'},title:{fontSize:27,fontWeight:'900',color:'#17324d',marginTop:12},subtitle:{color:'#667085',marginTop:4},card:{backgroundColor:'#fff',borderRadius:23,padding:20,borderWidth:1,borderColor:'#dce4ea'},label:{fontSize:14,fontWeight:'800',color:'#344054',textAlign:'right',marginBottom:7,marginTop:5},roles:{flexDirection:'row-reverse',gap:9,marginBottom:8},role:{flex:1,borderWidth:1,borderColor:'#d0d5dd',borderRadius:13,paddingVertical:13,alignItems:'center'},active:{backgroundColor:'#eef4f8',borderColor:'#2f6f9f'},roleText:{fontWeight:'800',color:'#344054'},input:{borderWidth:1,borderColor:'#d0d5dd',borderRadius:13,padding:13,fontSize:16,color:'#101828'},hint:{fontSize:12,color:'#667085',textAlign:'right',lineHeight:19,marginTop:8},button:{backgroundColor:'#17324d',borderRadius:14,paddingVertical:15,alignItems:'center',marginTop:16},buttonText:{color:'#fff',fontSize:17,fontWeight:'900'},back:{textAlign:'center',color:'#356ae6',fontWeight:'800',marginTop:16}});
