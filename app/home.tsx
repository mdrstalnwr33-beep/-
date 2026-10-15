import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const subjects = [
  { title: 'الكيمياء', icon: '⚗️', note: 'المادة والتفاعلات' },
  { title: 'الفيزياء', icon: '⚡', note: 'القوانين والطاقة' },
  { title: 'الأحياء', icon: '🧬', note: 'الحياة والكائنات' },
];

const categories = [
  { route: '/books', icon: '📚', title: 'الكتب والملازم', note: 'الكتب والمراجع الدراسية' },
  { route: '/lessons', icon: '📖', title: 'الدروس اليومية', note: 'شرح ومراجعة الدروس' },
  { route: '/homework', icon: '✓', title: 'الواجبات المدرسية', note: 'حل وإرسال الواجبات' },
  { route: '/exams', icon: '📝', title: 'الاختبارات الشهرية', note: 'اختبارات وتقييم مستمر' },
  { route: '/results', icon: '★', title: 'درجات الطالب', note: 'متابعة النتائج والدرجات' },
  { route: '/student-dashboard', icon: '🏆', title: 'الطلاب الأوائل', note: 'قائمة المتفوقين' },
];

const levels = ['الأول الثانوي', 'الثاني الثانوي', 'الثالث الثانوي'];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable style={styles.avatar} onPress={() => router.push('/profile')}>
            <Text style={styles.avatarText}>👤</Text>
          </Pressable>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>مرحبًا بك في</Text>
            <Text style={styles.title}>منارة العلوم 🔬</Text>
            <Text style={styles.school}>منصة العلوم للطالب والمعلم</Text>
          </View>
        </View>

        <View style={styles.levelCard}>
          <Text style={styles.levelLabel}>المرحلة الدراسية</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.levels}>
            {levels.map((level, index) => (
              <View key={level} style={[styles.levelPill, index === 0 && styles.levelActive]}>
                <Text style={[styles.levelText, index === 0 && styles.levelActiveText]}>{level}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.banner}>
          <View style={styles.bannerIcon}><Text style={styles.bannerEmoji}>🔬</Text></View>
          <View style={styles.bannerCopy}>
            <Text style={styles.bannerTitle}>تعلم العلوم بوضوح وتميّز</Text>
            <Text style={styles.bannerText}>محتوى منظم، اختبارات، واجبات ومتابعة الدرجات في مكان واحد.</Text>
          </View>
        </View>

        <Text style={styles.section}>المواد العلمية</Text>
        {subjects.map((subject) => (
          <Pressable key={subject.title} style={styles.subjectCard} onPress={() => router.push('/subjects')}>
            <Text style={styles.arrow}>‹</Text>
            <View style={styles.subjectText}>
              <Text style={styles.subjectTitle}>{subject.title}</Text>
              <Text style={styles.note}>{subject.note}</Text>
            </View>
            <View style={styles.iconBox}><Text style={styles.icon}>{subject.icon}</Text></View>
          </Pressable>
        ))}

        <View style={styles.sectionRow}>
          <Text style={styles.section}>خدمات المنصة</Text>
          <Text style={styles.sectionHint}>اختر الخدمة</Text>
        </View>
        <View style={styles.grid}>
          {categories.map((item) => (
            <Pressable key={item.route} style={styles.service} onPress={() => router.push(item.route as never)}>
              <View style={styles.serviceTop}>
                <Text style={styles.serviceArrow}>‹</Text>
                <Text style={styles.serviceIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.serviceText}>{item.title}</Text>
              <Text style={styles.serviceNote}>{item.note}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.settings} onPress={() => router.push('/settings')}>
          <Text style={styles.settingsText}>الإعدادات والحساب ⚙️</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f7fb' },
  content: { padding: 18, paddingBottom: 42 },
  header: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 16 },
  headerText: { flex: 1, marginRight: 12 },
  eyebrow: { color: '#667085', fontSize: 13, textAlign: 'right' },
  title: { color: '#14213d', fontSize: 27, fontWeight: '900', textAlign: 'right', marginTop: 2 },
  school: { color: '#7b8496', fontSize: 12, textAlign: 'right', marginTop: 3 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 2, borderWidth: 1, borderColor: '#e5e7eb' },
  avatarText: { fontSize: 23 },
  levelCard: { backgroundColor: '#fff', borderRadius: 18, padding: 14, marginBottom: 12, elevation: 1 },
  levelLabel: { fontSize: 14, fontWeight: '900', color: '#344054', textAlign: 'right', marginBottom: 10 },
  levels: { flexDirection: 'row-reverse', gap: 8 },
  levelPill: { borderWidth: 1, borderColor: '#d0d5dd', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9, backgroundColor: '#fff' },
  levelActive: { borderColor: '#2563eb', backgroundColor: '#eef4ff' },
  levelText: { color: '#475467', fontSize: 13, fontWeight: '700' },
  levelActiveText: { color: '#175cd3' },
  banner: { backgroundColor: '#2563eb', borderRadius: 20, padding: 18, flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 22 },
  bannerIcon: { width: 58, height: 58, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center' },
  bannerEmoji: { fontSize: 30 },
  bannerCopy: { flex: 1, marginRight: 12 },
  bannerTitle: { color: '#fff', fontSize: 19, fontWeight: '900', textAlign: 'right' },
  bannerText: { color: '#e8efff', fontSize: 12, lineHeight: 19, textAlign: 'right', marginTop: 5 },
  section: { fontSize: 19, fontWeight: '900', color: '#14213d', textAlign: 'right', marginBottom: 10 },
  sectionRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  sectionHint: { color: '#98a2b3', fontSize: 12, marginBottom: 10 },
  subjectCard: { backgroundColor: '#fff', borderRadius: 17, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 9, elevation: 1 },
  iconBox: { width: 52, height: 52, borderRadius: 15, backgroundColor: '#eef4ff', alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 26 },
  subjectText: { flex: 1, marginHorizontal: 13 },
  subjectTitle: { fontSize: 17, fontWeight: '900', color: '#101828', textAlign: 'right' },
  note: { color: '#667085', fontSize: 12, marginTop: 3, textAlign: 'right' },
  arrow: { fontSize: 28, color: '#98a2b3', marginLeft: 3 },
  grid: { flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-between' },
  service: { width: '48.5%', backgroundColor: '#fff', borderRadius: 17, padding: 14, minHeight: 120, marginBottom: 10, elevation: 1 },
  serviceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceIcon: { fontSize: 25 },
  serviceArrow: { fontSize: 24, color: '#98a2b3' },
  serviceText: { color: '#1d2939', fontWeight: '900', textAlign: 'right', marginTop: 10, fontSize: 14 },
  serviceNote: { color: '#667085', fontSize: 10, textAlign: 'right', marginTop: 4, lineHeight: 15 },
  settings: { marginTop: 8, padding: 15, borderRadius: 15, backgroundColor: '#fff', borderWidth: 1, borderColor: '#eaecf0' },
  settingsText: { textAlign: 'center', color: '#475467', fontWeight: '800' },
});
