import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { books, subjects } from '../src/data';
import { Action, Card, Page, Section, C, styles } from '../src/ui';

const categories = [
  { title:'الكتب والملازم', icon:'📚', route:'/books', key:'books' },
  { title:'الدروس اليومية', icon:'📖', route:'/lessons', key:'lessons' },
  { title:'الواجبات المدرسية', icon:'✍️', route:'/homework', key:'homework' },
  { title:'الاختبارات الشهرية', icon:'📝', route:'/exams', key:'exams' },
  { title:'درجات الطالب', icon:'📊', route:'/results', key:'results' },
  { title:'الطلاب الأوائل في المادة', icon:'🏆', route:'/profile', key:'honor' },
];
export default function BooksScreen() {
  const p=useLocalSearchParams<{subject?:string;grade?:string;role?:string;name?:string}>();
  const subject=p.subject as any; const grade=p.grade as any; const teacher=p.role==='teacher';
  const list=books.filter(b=>(!subject||b.subject===subject)&&(!grade||b.grade===grade));
  const open=(item:any)=>router.push({pathname:item.route as never,params:{subject,grade,role:p.role,name:p.name,view:item.key}});
  return <Page title={subject||'المادة الدراسية'} subtitle={grade?`${grade} • ${subject||'العلوم'}`:'اختر مادة'} onBack={()=>router.back()}>
    {!subject&&<Section title="المواد العلمية"><View style={{gap:8}}>{subjects.map(s=><Pressable key={s.name} onPress={()=>router.setParams({subject:s.name})} style={[styles.card,{borderColor:C.border}]}><Text style={{textAlign:'right',fontWeight:'900',color:C.navy}}>{s.icon}  {s.name}</Text></Pressable>)}</View></Section>}
    {subject&&<Section title={`إدارة ${subject}`}><View style={{gap:9}}>{categories.map(item=><Card key={item.key}><View style={{flexDirection:'row-reverse',alignItems:'center'}}><Text style={{fontSize:27}}>{item.icon}</Text><View style={{flex:1,marginRight:12}}><Text style={{fontSize:16,fontWeight:'900',color:C.navy,textAlign:'right'}}>{item.title}</Text><Text style={{fontSize:11,color:C.muted,textAlign:'right',marginTop:3}}>{teacher?'إدارة ونشر ومتابعة':'عرض محتوى الصف'}</Text></View></View><Action label={teacher?'فتح الإدارة':'فتح القسم'} icon="›" onPress={()=>open(item)} /></Card>)}</View></Section>}
    {subject&&<Section title="الكتب والملازم المنشورة"><>{list.length?list.map(b=><Card key={b.id}><Text style={{fontSize:17,fontWeight:'900',color:C.navy,textAlign:'right'}}>{b.title}</Text><Text style={{color:C.muted,textAlign:'right',marginTop:5}}>{b.description}</Text><Action label="فتح الكتاب" icon="📖" onPress={()=>router.push({pathname:'/book',params:{id:b.id}})}/></Card>):<Card><Text style={{textAlign:'center',color:C.muted}}>لا توجد كتب لهذا الصف والمادة بعد.</Text></Card>}</></Section>}
  </Page>;
}
