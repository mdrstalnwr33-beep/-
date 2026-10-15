import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { subjects, grades } from '../src/data';

const teacherTools = [
  { key:'students', icon:'👥', title:'إدارة الصف', note:'الأسماء وأكواد التسجيل', route:'/profile' },
  { key:'results', icon:'📊', title:'نتائج الصف', note:'متابعة درجات الطلاب', route:'/results' },
  { key:'honor', icon:'🏆', title:'أسماء الطلاب الأوائل', note:'لوحة الشرف للمستوى', route:'/profile' },
  { key:'about', icon:'👨‍🏫', title:'السيرة الذاتية', note:'بيانات الأستاذ والمنصة', route:'/about-teacher' },
];
const studentTools = [
  { icon:'📚', title:'الكتب والملازم', note:'مراجع الصف', route:'/books' },
  { icon:'📖', title:'الدروس اليومية', note:'تعلم حتى دون اتصال', route:'/lessons' },
  { icon:'📝', title:'الواجبات المدرسية', note:'حل وإرسال للمعلم', route:'/homework' },
  { icon:'🧪', title:'الاختبارات الشهرية', note:'اختبارات وتقييم', route:'/exams' },
  { icon:'📊', title:'درجات الطالب', note:'نتائجك الدراسية', route:'/results' },
];

export default function HomeScreen() {
  const p = useLocalSearchParams<{ role?:string; name?:string; grade?:string; code?:string }>();
  const role = p.role === 'teacher' ? 'teacher' : 'student';
  const grade = (p.grade || grades[0]) as string;
  const name = p.name || (role==='teacher' ? 'المعلم' : 'الطالب');
  const go = (route:string, extra:any={}) => router.push({ pathname: route as never, params:{ role,name,grade,code:p.code,...extra } });
  const subject = (s:string) => go('/books',{subject:s});
  if (role === 'teacher' && !p.stage) return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content}>
    <Header name={name} subtitle="لوحة المعلم" onPress={()=>go('/about-teacher')} />
    <View style={styles.banner}><Text style={styles.bannerIcon}>🎓</Text><View style={{flex:1}}><Text style={styles.bannerTitle}>المراحل الدراسية</Text><Text style={styles.bannerText}>اختر المستوى لفتح لوحة مستقلة تحتوي على الكيمياء والفيزياء والأحياء الخاصة به.</Text></View></View>
    <Text style={styles.section}>المستويات</Text>
    {grades.map((g,i)=><Pressable key={g} style={styles.gradeCard} onPress={()=>router.push({pathname:'/home',params:{role,name,grade:g,stage:g}})}><Text style={styles.arrow}>‹</Text><View style={styles.gradeIcon}><Text style={{fontSize:27}}>{['1️⃣','2️⃣','3️⃣'][i]}</Text></View><View style={{flex:1,marginHorizontal:12}}><Text style={styles.gradeTitle}>{g}</Text><Text style={styles.note}>الكيمياء • الفيزياء • الأحياء</Text></View></Pressable>)}
  </ScrollView></SafeAreaView>;
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content}>
    <Header name={name} subtitle={`${grade} • ${role==='teacher'?'إدارة المستوى':'منصة الطالب'}`} onPress={()=>go('/profile')} />
    {role==='teacher' && <><View style={styles.path}><Text style={styles.pathText}>لوحة المستوى: {grade}</Text></View><View style={styles.toolGrid}>{teacherTools.map(t=><Pressable key={t.key} style={styles.tool} onPress={()=>go(t.route,{view:t.key,stage:grade})}><Text style={styles.toolIcon}>{t.icon}</Text><Text style={styles.toolTitle}>{t.title}</Text><Text style={styles.toolNote}>{t.note}</Text></Pressable>)}</View></>}
    <Text style={styles.section}>المواد الدراسية</Text>
    {subjects.map(s=><Pressable key={s.name} style={styles.subjectCard} onPress={()=>subject(s.name)}><Text style={styles.arrow}>‹</Text><View style={{flex:1,marginHorizontal:12}}><Text style={styles.subjectTitle}>{s.name}</Text><Text style={styles.note}>{s.description}</Text></View><View style={styles.iconBox}><Text style={styles.icon}>{s.icon}</Text></View></Pressable>)}
    {role==='student'&&<><Text style={styles.section}>خدمات الطالب</Text><View style={styles.toolGrid}>{studentTools.map(t=><Pressable key={t.title} style={styles.tool} onPress={()=>go(t.route)}><Text style={styles.toolIcon}>{t.icon}</Text><Text style={styles.toolTitle}>{t.title}</Text><Text style={styles.toolNote}>{t.note}</Text></Pressable>)}</View><Pressable style={styles.aboutBtn} onPress={()=>go('/about-teacher')}><Text style={styles.aboutText}>عن الأستاذ محمد القاضي</Text></Pressable></>}
  </ScrollView></SafeAreaView>;
}
function Header({name,subtitle,onPress}:{name:string;subtitle:string;onPress:()=>void}){return <View style={styles.header}><Pressable style={styles.avatar} onPress={onPress}><Text style={styles.avatarText}>👤</Text></Pressable><View style={{flex:1,marginRight:12}}><Text style={styles.eyebrow}>مرحبًا {name}</Text><Text style={styles.title}>تطبيق القاضي للعلوم</Text><Text style={styles.school}>{subtitle}</Text></View></View>}
const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#f5f7fb'},content:{padding:18,paddingBottom:45},header:{flexDirection:'row-reverse',alignItems:'center',marginBottom:18},avatar:{width:52,height:52,borderRadius:26,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#e5e7eb'},avatarText:{fontSize:23},eyebrow:{color:'#667085',fontSize:13,textAlign:'right'},title:{color:'#14213d',fontSize:25,fontWeight:'900',textAlign:'right',marginTop:2},school:{color:'#7b8496',fontSize:12,textAlign:'right',marginTop:3},banner:{backgroundColor:'#17324d',borderRadius:20,padding:18,flexDirection:'row-reverse',alignItems:'center',marginBottom:20},bannerIcon:{fontSize:31,marginLeft:13},bannerTitle:{color:'#fff',fontSize:19,fontWeight:'900',textAlign:'right'},bannerText:{color:'#e8efff',fontSize:12,lineHeight:19,textAlign:'right',marginTop:5},section:{fontSize:19,fontWeight:'900',color:'#14213d',textAlign:'right',marginBottom:10,marginTop:8},gradeCard:{backgroundColor:'#fff',borderRadius:18,padding:14,flexDirection:'row',alignItems:'center',marginBottom:10,borderWidth:1,borderColor:'#eaecf0'},gradeIcon:{width:56,height:56,borderRadius:16,backgroundColor:'#eef4f8',alignItems:'center',justifyContent:'center'},gradeTitle:{fontSize:18,fontWeight:'900',color:'#101828',textAlign:'right'},note:{color:'#667085',fontSize:12,marginTop:4,textAlign:'right'},arrow:{fontSize:28,color:'#98a2b3'},path:{backgroundColor:'#eef4f8',borderRadius:12,padding:12,marginBottom:12},pathText:{fontWeight:'900',color:'#17324d',textAlign:'right'},toolGrid:{flexDirection:'row-reverse',flexWrap:'wrap',justifyContent:'space-between',marginBottom:12},tool:{width:'48.5%',backgroundColor:'#fff',borderRadius:17,padding:14,minHeight:122,marginBottom:10,borderWidth:1,borderColor:'#eaecf0'},toolIcon:{fontSize:27,textAlign:'right'},toolTitle:{fontSize:14,fontWeight:'900',color:'#1d2939',textAlign:'right',marginTop:9},toolNote:{fontSize:10,color:'#667085',textAlign:'right',marginTop:4,lineHeight:15},subjectCard:{backgroundColor:'#fff',borderRadius:17,padding:14,flexDirection:'row',alignItems:'center',marginBottom:9,borderWidth:1,borderColor:'#eaecf0'},iconBox:{width:52,height:52,borderRadius:15,backgroundColor:'#eef4ff',alignItems:'center',justifyContent:'center'},icon:{fontSize:26},subjectTitle:{fontSize:17,fontWeight:'900',color:'#101828',textAlign:'right'},aboutBtn:{padding:15,alignItems:'center'},aboutText:{color:'#356ae6',fontWeight:'900',fontSize:15}});
