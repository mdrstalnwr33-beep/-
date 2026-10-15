import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, Text, TextInput, View } from 'react-native';
import { homework } from '../src/data';
import { readJson, storageKeys, writeJson } from '../src/storage';
import { Card, Page, Section, C } from '../src/ui';

export default function HomeworkScreen(){
 const p=useLocalSearchParams<{role?:string;grade?:string;subject?:string;name?:string}>();
 const teacher=p.role==='teacher';
 const list=homework.filter(h=>(!p.subject||h.subject===p.subject)&&(!p.grade||h.grade===p.grade));
 const current=list[0];
 const key=current?storageKeys.homeworkSubmission((p.name||'طالب').trim(),current.id):'';
 const [answers,setAnswers]=useState<Record<string,string>>({}); const [photo,setPhoto]=useState<string>(); const [sent,setSent]=useState(false);
 useEffect(()=>{if(!current||teacher)return; readJson<{answers:Record<string,string>;photo?:string;sent:boolean}|null>(key,null).then(saved=>{if(saved){setAnswers(saved.answers||{});setPhoto(saved.photo);setSent(!!saved.sent);}})},[key,teacher,current?.id]);
 const attach=async()=>{const perm=await ImagePicker.requestMediaLibraryPermissionsAsync(); if(!perm.granted) return Alert.alert('صلاحية مطلوبة','اسمح بالوصول إلى الصور لاختيار صورة الدفتر.'); const r=await ImagePicker.launchImageLibraryAsync({mediaTypes:['images'],quality:.8}); if(!r.canceled) setPhoto(r.assets[0].uri);};
 const send=async()=>{if(!current)return; if(current.questions.some(q=>!answers[q]?.trim())) return Alert.alert('الواجب غير مكتمل','أجب عن جميع الأسئلة قبل الإرسال.'); await writeJson(key,{answers,photo,sent:true}); setSent(true); Alert.alert('تم الإرسال','تم حفظ الواجب. لا يمكن إعادة الإرسال من هذا الجهاز.');};
 if(sent&&!teacher) return <Page title="تم إرسال الواجب" onBack={()=>router.back()}><Card><Text style={{fontSize:19,fontWeight:'900',color:C.green,textAlign:'center'}}>✓ تم إرسال الواجب للمعلم</Text><Text style={{textAlign:'right',color:C.muted,lineHeight:25,marginTop:12}}>تم حفظ الإجابات وصورة الدفتر محليًا. ستظهر الدرجة والتعليق بعد تفعيل المزامنة السحابية.</Text></Card></Page>;
 return <Page title={teacher?'مراجعة الواجبات':'الواجبات المدرسية'} subtitle={teacher?'التسليمات والدرجات':'حل الواجب وإرساله'} onBack={()=>router.back()}><Section title={teacher?'الواجبات المنشورة':'الواجب المطلوب'}>{list.map(h=><Card key={h.id}><Text style={{fontSize:18,fontWeight:'900',color:C.navy,textAlign:'right'}}>{h.title}</Text><Text style={{color:C.muted,textAlign:'right',marginTop:5}}>{h.subject} • {h.grade} • التسليم: {h.due}</Text><Text style={{color:C.text,textAlign:'right',marginTop:9,lineHeight:23}}>{h.note}</Text>{!teacher&&h.questions.map((q,i)=><View key={q} style={{marginTop:12}}><Text style={{fontWeight:'800',color:C.text,textAlign:'right'}}>{i+1}. {q}</Text><TextInput multiline value={answers[q]||''} onChangeText={v=>setAnswers(a=>({...a,[q]:v}))} placeholder="اكتب إجابتك..." placeholderTextColor="#98a2b3" textAlign="right" style={{borderWidth:1,borderColor:C.border,borderRadius:11,padding:10,minHeight:70,marginTop:6,textAlignVertical:'top'}}/></View>)}{!teacher&&<><Pressable onPress={attach} style={{padding:13,borderWidth:1,borderColor:C.border,borderRadius:12,marginTop:12,backgroundColor:'#f8fafc'}}><Text style={{textAlign:'center',fontWeight:'800',color:C.navy}}>📷 إرفاق صورة الدفتر</Text></Pressable>{photo&&<Image source={{uri:photo}} style={{width:'100%',height:180,borderRadius:12,marginTop:10}}/>}<Pressable onPress={send} style={{backgroundColor:C.navy,borderRadius:13,padding:15,marginTop:12}}><Text style={{color:'#fff',textAlign:'center',fontWeight:'900'}}>إرسال الواجب للمعلم</Text></Pressable></>}</Card>)}</Section>{teacher&&<Card><Text style={{fontWeight:'800',color:C.navy,textAlign:'right'}}>لا توجد تسليمات سحابية بعد.</Text><Text style={{color:C.muted,textAlign:'right',marginTop:5}}>المرحلة التالية ستربط هذه الصفحة بـ Firebase ليقرأ المعلم التسليمات الفعلية ويصححها.</Text></Card>}</Page>;
}
