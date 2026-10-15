import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.logo}>🔬</Text>
        <Text style={styles.title}>منارة العلوم</Text>
        <Text style={styles.subtitle}>منصة العلوم للطالب والمعلم</Text>

        <View style={styles.card}>
          <Text style={styles.label}>نوع الحساب</Text>
          <View style={styles.roles}>
            <Pressable style={[styles.role, role === 'student' && styles.active]} onPress={() => setRole('student')}>
              <Text style={styles.roleText}>👨‍🎓 طالب</Text>
            </Pressable>
            <Pressable style={[styles.role, role === 'teacher' && styles.active]} onPress={() => setRole('teacher')}>
              <Text style={styles.roleText}>👨‍🏫 معلم</Text>
            </Pressable>
          </View>

          <Text style={styles.label}>الاسم</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="اكتب اسمك"
            placeholderTextColor="#8b95a7"
            style={styles.input}
            textAlign="right"
          />

          <Pressable style={styles.button} onPress={() => router.replace('/home')}>
            <Text style={styles.buttonText}>دخول إلى المنصة</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>الكيمياء • الفيزياء • الأحياء</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f7fb' },
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  logo: { fontSize: 54, textAlign: 'center', marginBottom: 8 },
  title: { fontSize: 34, fontWeight: '800', textAlign: 'center', color: '#14213d' },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#667085', marginTop: 8, marginBottom: 28 },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 22, elevation: 3 },
  label: { fontSize: 15, fontWeight: '700', color: '#344054', marginBottom: 10, marginTop: 6 },
  roles: { flexDirection: 'row-reverse', gap: 10, marginBottom: 14 },
  role: { flex: 1, borderWidth: 1, borderColor: '#d0d5dd', borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
  active: { borderColor: '#356ae6', backgroundColor: '#eef4ff' },
  roleText: { fontWeight: '700', color: '#344054' },
  input: { borderWidth: 1, borderColor: '#d0d5dd', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 13, fontSize: 16, color: '#101828', marginBottom: 18 },
  button: { backgroundColor: '#356ae6', borderRadius: 15, paddingVertical: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '800' },
  footer: { textAlign: 'center', color: '#667085', marginTop: 24, fontSize: 14 }
});
