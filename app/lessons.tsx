import { router, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { lessons } from '../src/data';
import { Card, Page, Section, Action, styles, C } from '../src/ui';

export default function LessonsScreen() {
  const p = useLocalSearchParams<{ subject?: string; grade?: string; role?: string }>();
  const list = lessons.filter(x => (!p.subject || x.subject === p.subject) && (!p.grade || x.grade === p.grade));
  return <Page title="الدروس اليومية" subtitle="شرح ومراجعة العلوم" onBack={() => router.back()}>
    <Section title={p.subject ? `دروس ${p.subject}` : 'الدروس المتاحة'}>
      {list.map(l => <Card key={l.id}><Text style={{fontSize:17,fontWeight:'900',color:C.navy,textAlign:'right'}}>{l.title}</Text><Text style={{color:C.muted,textAlign:'right',marginTop:5}}>{l.grade} • {l.date}</Text><Text style={{color:C.text,textAlign:'right',lineHeight:22,marginTop:10}}>{l.body}</Text><Action label="قراءة الدرس" icon="📖" onPress={() => router.push({pathname:'/lesson',params:{id:l.id,subject:l.subject,grade:l.grade}})} /></Card>)}
      {!list.length && <Card><Text style={{textAlign:'center',color:C.muted}}>لا توجد دروس لهذا الصف والمادة بعد.</Text></Card>}
    </Section>
  </Page>;
}
