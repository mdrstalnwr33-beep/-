import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const subjects = [
  { title: 'الكيمياء', icon: '🧪', note: 'المادة والتفاعلات' },
  { title: 'الفيزياء', icon: '⚡', note: 'القوانين والطاقة' },
  { title: 'الأحياء', icon: '🧬', note: 'الحياة والكائنات' },
];

const services = [
  ['📚', 'الكتب والمذكرات'],
  ['📖', 'الدروس اليومية'],
  ['📝', 'الاختبارات الشهرية'],
  ['📋', 'الواجبات'],
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>مرحبًا بك</Text>
            <Text style={styles.title}>منارة العلوم 🔬</Text>
          </View>
          <Pressable style={styles.avatar} onPress={() => router.replace('/login')}><Text>👤</Text></Pressable>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>تعلم العلوم بطريقة أسهل</Text>
          <Text style={styles.bannerText}>محتوى منظم، اختبارات، واجبات ومتابعة الدرجات في مكان واحد.</Text>
        </View>

        <Text style={styles.section}>المواد العلمية</Text>
        {subjects.map((subject) => (
          <Pressable key={subject.title} style={styles.subjectCard}>
            <View style={styles.iconBox}><Text style={styles.icon}>{subject.icon}</Text></View>
            <View style={styles.subjectText}><Text style={styles.subjectTitle}>{subject.title}</Text><Text style={styles.note}>{subject.note}</Text></View>
            <Text style={styles.arrow}>‹</Text>
          </Pressable>
        ))}

        <Text style={styles.section}>خدمات المنصة</Text>
        <View style={styles.grid}>
          {services.map(([icon, label]) => (
            <Pressable key={label} style={styles.service}><Text style={styles.serviceIcon}>{icon}</Text><Text style={styles.serviceText}>{label}</Text></Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f7fb' },
  content: { padding: 20, paddingBottom: 36 },
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  eyebrow: { color: '#667085', fontSize: 14, textAlign: 'right' },
  title: { color: '#14213d', fontSize: 26, fontWeight: '900', textAlign: 'right', marginTop: 3 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 2 },
  banner: { backgroundColor: '#356ae6', borderRadius: 22, padding: 22, marginBottom: 24 },
  bannerTitle: { color: '#fff', fontSize: 22, fontWeight: '900', textAlign: 'right' },
  bannerText: { color: '#e8efff', fontSize: 14, lineHeight: 22, textAlign: 'right', marginTop: 8 },
  section: { fontSize: 19, fontWeight: '900', color: '#14213d', textAlign: 'right', marginBottom: 12, marginTop: 2 },
  subjectCard: { backgroundColor: '#fff', borderRadius: 18, padding: 15, flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 10, elevation: 2 },
  iconBox: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#eef4ff', alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 27 },
  subjectText: { flex: 1, marginHorizontal: 14 },
  subjectTitle: { fontSize: 17, fontWeight: '800', color: '#101828', textAlign: 'right' },
  note: { color: '#667085', marginTop: 3, textAlign: 'right' },
  arrow: { fontSize: 27, color: '#98a2b3' },
  grid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10 },
  service: { width: '48%', backgroundColor: '#fff', borderRadius: 18, padding: 17, minHeight: 105, justifyContent: 'center', elevation: 2 },
  serviceIcon: { fontSize: 27, textAlign: 'right' },
  serviceText: { color: '#344054', fontWeight: '800', textAlign: 'right', marginTop: 8 }
});
