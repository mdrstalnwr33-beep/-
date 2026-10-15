import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { subjects, grades } from '../src/data';

const studentServices = [
  { route: '/books', icon: '📚', title: 'الكتب والملازم', note: 'كتب ومراجع دراسية' },
  { route: '/lessons', icon: '📖', title: 'الدروس اليومية', note: 'شرح ومراجعة يومية' },
  { route: '/homework', icon: '✓', title: 'الواجبات المدرسية', note: 'حل وإرسال للمعلم' },
  { route: '/exams', icon: '📝', title: 'الاختبارات الشهرية', note: 'اختبارات وتقييم مستمر' },
  { route: '/results', icon: '★', title: 'درجات الطالب', note: 'نتائج الاختبارات والواجبات' },
  { route: '/student-dashboard', icon: '🏆', title: 'الطلاب الأوائل', note: 'قائمة المتفوقين' },
];
const teacherServices = [
  { route: '/homework', icon: '📥', title: 'مراجعة الواجبات', note: 'استلام وتصحيح واجبات الطلاب' },
  { route: '/exams', icon: '📝', title: 'إدارة الاختبارات', note: 'الاختبارات ودرجات الطلاب' },
  { route: '/books', icon: '📚', title: 'إدارة الكتب', note: 'الكتب والملازم التعليمية' },
  { route: '/lessons', icon: '📖', title: 'إدارة الدروس', note: 'الدروس اليومية والشروحات' },
  { route: '/results', icon: '📊', title: 'الدرجات', note: 'نتائج ومتابعة الطلاب' },
  { route: '/student-dashboard', icon: '👥', title: 'الطلاب', note: 'قائمة الطلاب والمتفوقين' },
];

export default function HomeScreen() {
  const p = useLocalSearchParams<{ role?: string; name?: string; grade?: string }>();
  const role = p.role === 'teacher' ? 'teacher' : 'student';
  const grade = (p.grade || grades[0]) as string;
  const name = p.name || (role === 'teacher' ? 'المعلم' : 'الطالب');
  const services = role === 'teacher' ? teacherServices : studentServices;
  const go = (route: string) => router.push({ pathname: route as never, params: { role, name, grade } });

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.header}><Pressable style={styles.avatar} onPress={() => go('/profile')}><Text style={styles.avatarText}>{role === 'teacher' ? '👨‍🏫' : '👨‍🎓'}</Text></Pressable><View style={styles.headerText}><Text style={styles.eyebrow}>مرحبًا {name}</Text><Text style={styles.title}>تطبيق القاضي للعلوم</Text><Text style={styles.school}>{role === 'teacher' ? 'لوحة المعلم' : `${grade} • منصة العلوم`}</Text></View></View>
    <View style={styles.banner}><View style={styles.bannerIcon}><Text style={styles.bannerEmoji}>🔬</Text></View><View style={styles.bannerCopy}><Text style={styles.bannerTitle}>{role === 'teacher' ? 'إدارة التعليم بسهولة' : 'تعلم العلوم بوضوح وتميّز'}</Text><Text style={styles.bannerText}>{role === 'teacher' ? 'أنشئ المحتوى والاختبارات وتابع تسليمات الطلاب ودرجاتهم.' : 'الكيمياء والفيزياء والأحياء مع الكتب والدروس والواجبات والاختبارات.'}</Text></View></View>
    <Text style={styles.section}>المواد العلمية</Text>
    {subjects.map(s => <Pressable key={s.name} style={styles.subjectCard} onPress={() => router.push({ pathname: '/subjects', params: { subject: s.name, role, name, grade } })}><Text style={styles.arrow}>‹</Text><View style={styles.subjectText}><Text style={styles.subjectTitle}>{s.name}</Text><Text style={styles.note}>{s.description}</Text></View><View style={styles.iconBox}><Text style={styles.icon}>{s.icon}</Text></View></Pressable>)}
    <View style={styles.sectionRow}><Text style={styles.section}>خدمات المنصة</Text><Text style={styles.sectionHint}>{role === 'teacher' ? 'إدارة ومتابعة' : 'اختر الخدمة'}</Text></View>
    <View style={styles.grid}>{services.map(item => <Pressable key={item.route + item.title} style={styles.service} onPress={() => go(item.route)}><View style={styles.serviceTop}><Text style={styles.serviceArrow}>‹</Text><Text style={styles.serviceIcon}>{item.icon}</Text></View><Text style={styles.serviceText}>{item.title}</Text><Text style={styles.serviceNote}>{item.note}</Text></Pressable>)}</View>
    <Pressable style={styles.settings} onPress={() => go('/settings')}><Text style={styles.settingsText}>الحساب والإعدادات ⚙️</Text></Pressable>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ safe:{flex:1,backgroundColor:'#f5f7fb'},content:{padding:18,paddingBottom:42},header:{flexDirection:'row-reverse',alignItems:'center',marginBottom:18},headerText:{flex:1,marginRight:12},eyebrow:{color:'#667085',fontSize:13,textAlign:'right'},title:{color:'#14213d',fontSize:25,fontWeight:'900',textAlign:'right',marginTop:2},school:{color:'#7b8496',fontSize:12,textAlign:'right',marginTop:3},avatar:{width:52,height:52,borderRadius:26,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#e5e7eb'},avatarText:{fontSize:23},banner:{backgroundColor:'#17324d',borderRadius:20,padding:18,flexDirection:'row-reverse',alignItems:'center',marginBottom:22},bannerIcon:{width:58,height:58,borderRadius:17,backgroundColor:'rgba(255,255,255,0.14)',alignItems:'center',justifyContent:'center'},bannerEmoji:{fontSize:30},bannerCopy:{flex:1,marginRight:12},bannerTitle:{color:'#fff',fontSize:19,fontWeight:'900',textAlign:'right'},bannerText:{color:'#e8efff',fontSize:12,lineHeight:19,textAlign:'right',marginTop:5},section:{fontSize:19,fontWeight:'900',color:'#14213d',textAlign:'right',marginBottom:10},sectionRow:{flexDirection:'row-reverse',justifyContent:'space-between',alignItems:'center',marginTop:5},sectionHint:{color:'#98a2b3',fontSize:12,marginBottom:10},subjectCard:{backgroundColor:'#fff',borderRadius:17,padding:14,flexDirection:'row',alignItems:'center',marginBottom:9,borderWidth:1,borderColor:'#eaecf0'},iconBox:{width:52,height:52,borderRadius:15,backgroundColor:'#eef4ff',alignItems:'center',justifyContent:'center'},icon:{fontSize:26},subjectText:{flex:1,marginHorizontal:13},subjectTitle:{fontSize:17,fontWeight:'900',color:'#101828',textAlign:'right'},note:{color:'#667085',fontSize:12,marginTop:3,textAlign:'right'},arrow:{fontSize:28,color:'#98a2b3',marginLeft:3},grid:{flexDirection:'row-reverse',flexWrap:'wrap',justifyContent:'space-between'},service:{width:'48.5%',backgroundColor:'#fff',borderRadius:17,padding:14,minHeight:120,marginBottom:10,borderWidth:1,borderColor:'#eaecf0'},serviceTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},serviceIcon:{fontSize:25},serviceArrow:{fontSize:24,color:'#98a2b3'},serviceText:{color:'#1d2939',fontWeight:'900',textAlign:'right',marginTop:10,fontSize:14},serviceNote:{color:'#667085',fontSize:10,textAlign:'right',marginTop:4,lineHeight:15},settings:{marginTop:8,padding:15,borderRadius:15,backgroundColor:'#fff',borderWidth:1,borderColor:'#eaecf0'},settingsText:{textAlign:'center',color:'#475467',fontWeight:'800'}});
