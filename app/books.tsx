import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function BooksScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>رجوع ›</Text></Pressable>
        <Text style={styles.title}>الكتب والمذكرات</Text>
        <View style={styles.empty}>
          <Text style={styles.icon}>📚</Text>
          <Text style={styles.heading}>المحتوى التعليمي</Text>
          <Text style={styles.text}>سيتم ربط الكتب والمذكرات والدروس هنا في المرحلة التالية، مع فتح آمن للملفات بدون شاشة السحابة القديمة.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f7fb' },
  container: { padding: 20 },
  back: { color: '#356ae6', fontWeight: '800', marginBottom: 18, textAlign: 'right' },
  title: { fontSize: 27, fontWeight: '900', color: '#14213d', textAlign: 'right', marginBottom: 20 },
  empty: { backgroundColor: '#fff', borderRadius: 22, padding: 26, alignItems: 'center', elevation: 2 },
  icon: { fontSize: 46 },
  heading: { fontSize: 20, fontWeight: '900', color: '#14213d', marginTop: 10 },
  text: { color: '#667085', textAlign: 'center', lineHeight: 24, marginTop: 10 }
});
