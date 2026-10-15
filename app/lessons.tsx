import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { File, Paths } from 'expo-file-system';
import { lessons } from '../src/data';
import { readJson, storageKeys, writeJson } from '../src/storage';
import { Card, Page, Section, Action, C } from '../src/ui';

export default function LessonsScreen() {
  const p=useLocalSearchParams<{subject?:string;grade?:string;role?:string;name?:string}>();
  const list=lessons.filter(x=>(!p.subject||x.subject===p.subject)&&(!p.grade||x.grade===p.grade));
  const [downloaded,setDownloaded]=useState<Record<string,string>>({});
  useEffect(()=>{readJson<Record<string,string>>(storageKeys.downloads,{}).then(setDownloaded)},[]);
  const download=async(l:any)=>{try{const file=new File(Paths.document,`lesson-${l.id}.txt`);if(!file.exists) file.create();file.write(`${l.title}\n${l.grade}\n${l.date}\n\n${l.body}`);const next={...downloaded,[l.id]:file.uri};await writeJson(storageKeys.downloads,next);setDownloaded(next);Alert.alert('تم التنزيل','تم حفظ الدرس على الهاتف ويمكن قراءته دون اتصال.');}catch(e){Alert.alert('تعذر التنزيل','حدث خطأ أثناء حفظ الدرس محليًا.');}};
  return <Page title="الدروس اليومية" subtitle={p.subject?`${p.subject} • ${p.grade||''}`:'شرح ومراجعة العلوم'} onBack={()=>router.back()}>
    {p.role==='teacher'&&<Action label="إضافة درس جديد" icon="＋" onPress={()=>Alert.alert('إضافة الدروس','سيتم ربط محرر رفع الدروس والملفات بالسحابة في مرحلة الربط السحابي.')} />}
    <Section title={p.subject?`دروس ${p.subject}`:'الدروس المتاحة'}>
      {list.map(l=><Card key={l.id}><Text style={{fontSize:17,fontWeight:'900',color:C.navy,textAlign:'right'}}>{l.title}</Text><Text style={{color:C.muted,textAlign:'right',marginTop:5}}>{l.grade} • {l.date}</Text><Text style={{color:C.text,textAlign:'right',lineHeight:22,marginTop:10}}>{l.body}</Text><View style={{gap:7,marginTop:8}}><Action label="قراءة الدرس" icon="📖" onPress={()=>router.push({pathname:'/lesson',params:{id:l.id,subject:l.subject,grade:l.grade,offline:downloaded[l.id]?'1':'0'}})} /><Action label={downloaded[l.id]?'✓ محفوظ على الهاتف':'تنزيل للقراءة دون اتصال'} icon={downloaded[l.id]?'✓':'⬇️'} secondary={!downloaded[l.id]} onPress={()=>download(l)} /></View></Card>)}
      {!list.length&&<Card><Text style={{textAlign:'center',color:C.muted}}>لا توجد دروس لهذا الصف والمادة بعد.</Text></Card>}
    </Section>
  </Page>;
}
