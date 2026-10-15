import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { grades } from '../src/data';
import { getSession, setSession } from '../src/storage';

function gradeFromCode(code: string) {
  if (code.startsWith('1')) return grades[0];
  if (code.startsWith('2')) return grades[1];
  if (code.startsWith('3')) return grades[2];
  return undefined;
}

function normalizeCode(value: string) {
  return value.replace(/\D/g, '').slice(0, 6);
}

export default function LoginScreen() {
  const p = useLocalSearchParams<{ role?: string }>();
  const [role, setRole] = useState<'student' | 'teacher'>(p.role === 'teacher' ? 'teacher' : 'student');
  const [code, setCode] = useState('');

  const enter = async () => {
    if (!/^\d{6}$/.test(code)) {
      return Alert.alert('كود غير صحيح', 'يجب أن يتكون كود الدخول من ستة أرقام فقط.');
    }

    const grade = role === 'student' ? gradeFromCode(code) : grades[0];
    if (role === 'student' && !grade) {
      return Alert.alert('كود غير صحيح', 'كود الطالب غير مرتبط بصف مسجل.');
    }

    const old = await getSession();
    if (old && old.code === code && old.active === false) {
      return Alert.alert('الحساب موقوف', 'لا يمكن الدخول بهذا الحساب.');
    }

    const name = role === 'teacher' ? 'المعلم' : 'الطالب';
    const session = { role, name, code, grade: grade || grades[0], active: true } as const;
    await setSession(session);
    router.replace({ pathname: '/home', params: { role, name, grade: session.grade, code } });
  };

  return <SafeAreaView style={styles.safe}><View style={styles.container}>
    <View style={styles.header}>
      <Pressable onPress={() => router.back()}><Text style={styles.arrow}>→</Text></Pressable>
      <Text style={styles.title}>{role === 'student' ? 'دخول الطالب' : 'دخول المعلم'}</Text>
    </View>
    <View style={styles.avatar}><Text style={styles.avatarText}>●</Text></View>
    <View style={styles.card}>
      <Text style={styles.label}>{role === 'student' ? 'كود الطالب' : 'كود المعلم'}</Text>
      <TextInput
        value={code}
        onChangeText={(v) => setCode(normalizeCode(v))}
        placeholder="أدخل الكود المكوّن من 6 أرقام"
        placeholderTextColor="#6b7280"
        style={styles.input}
        textAlign="right"
        keyboardType="number-pad"
        inputMode="numeric"
        maxLength={6}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={enter}><Text style={styles.buttonText}>دخول</Text></Pressable>
    </View>
  </View></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#fbf8ff'},
  container:{flex:1,paddingHorizontal:37,paddingTop:40},
  header:{flexDirection:'row-reverse',alignItems:'center',justifyContent:'space-between'},
  arrow:{fontSize:39,color:'#202020',fontWeight:'300'},
  title:{fontSize:38,fontWeight:'800',color:'#171717'},
  avatar:{alignItems:'center',marginTop:125,marginBottom:60},
  avatarText:{fontSize:72,color:'#202020'},
  card:{width:'100%'},
  label:{fontSize:26,fontWeight:'700',color:'#303038',textAlign:'right',marginBottom:12},
  input:{height:122,borderWidth:2,borderColor:'#85828a',borderRadius:7,paddingHorizontal:24,fontSize:23,color:'#222',backgroundColor:'#fbf8ff'},
  button:{height:103,borderRadius:55,backgroundColor:'#5966a0',alignItems:'center',justifyContent:'center',marginTop:56},
  buttonText:{fontSize:28,color:'#fff',fontWeight:'600'},
});