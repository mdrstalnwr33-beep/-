import { router, useLocalSearchParams } from 'expo-router';
import { Linking, Pressable, Text, View } from 'react-native';
import { books, subjects, grades } from '../src/data';
import { Action, Card, Page, Section, styles, C } from '../src/ui';

export default function BooksScreen() {
  const p = useLocalSearchParams<{ subject?: string; grade?: string }>();
  const subject = p.subject as any; const grade = p.grade as any;
  const list = books.filter(b => (!subject || b.subject === subject) && (!grade || b.grade === grade));
  return <Page title="الكتب والملازم" subtitle="كتب العلوم والمراجع الدراسية" onBack={() => router.back()}>
    <Section title="اختر المادة"><View style={{gap:8}}>{subjects.map(s => <Pressable key={s.name} onPress={() => router.setParams({subject:s.name})} style={{padding:12,borderRadius:12,borderWidth:1,borderColor:subject===s.name?C.blue:C.border,backgroundColor:subject===s.name?'#eef4f8':'#fff'}}><Text style={{textAlign:'right',fontWeight:'800',color:C.navy}}>{s.icon}  {s.name}</Text></Pressable>)}</View></Section>
    <Section title="الكتب المتاحة">{list.length ? list.map(b => <Card key={b.id}><Text style={{fontSize:17,fontWeight:'900',color:C.navy,textAlign:'right'}}>{b.title}</Text><Text style={{color:C.muted,textAlign:'right',marginTop:5}}>{b.description}</Text><Action label="فتح الكتاب" icon="📖" onPress={() => Linking.openURL(b.url)} /></Card>) : <Card><Text style={{textAlign:'center',color:C.muted}}>لا توجد كتب لهذا الاختيار بعد.</Text></Card>}</Section>
    <Text style={{textAlign:'center',color:C.muted,fontSize:12}}>يمكن ربط روابط PDF الحقيقية لاحقًا من لوحة المعلم.</Text>
  </Page>;
}
