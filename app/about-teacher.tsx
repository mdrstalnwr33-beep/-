import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutTeacherScreen() {
  return (
    <ScrollView style={styles.safe} contentContainerStyle={styles.content}>
      <Text onPress={() => router.back()} style={styles.back}>رجوع ›</Text>
      <View style={styles.hero}>
        <View style={styles.avatar}><Text style={styles.avatarText}>م</Text></View>
        <Text style={styles.title}>عن المعلم محمد القاضي</Text>
        <Text style={styles.name}>الأستاذ محمد سليمان القاضي الوصابي</Text>
        <Text style={styles.school}>مدرسة النور الأساسية الثانوية بالروحاء</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>نبذة عن المعلم</Text>
        <Text style={styles.body}>
          معلم مادة العلوم ومؤسس منصة القاضي للعلوم، ويعمل على تقديم محتوى علمي واضح ومنظم يساعد طلاب المرحلة الثانوية على التعلم والمتابعة والتميز في الكيمياء والفيزياء والأحياء.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>عن المنصة</Text>
        <Text style={styles.body}>
          تطبيق القاضي للعلوم منصة تعليمية تجمع الكتب والملازم، الدروس اليومية، الواجبات المدرسية، الاختبارات الشهرية ونتائج الطلاب في مكان واحد، مع تصميم عربي مبسط وسهل الاستخدام.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>المواد العلمية</Text>
        <Text style={styles.item}>⚗ الكيمياء</Text>
        <Text style={styles.item}>◈ الفيزياء</Text>
        <Text style={styles.item}>✣ الأحياء</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#f5f7fb'},
  content:{padding:18,paddingBottom:40},
  back:{color:'#356ae6',fontWeight:'800',fontSize:15,textAlign:'right',marginBottom:12},
  hero:{backgroundColor:'#17324d',borderRadius:24,padding:24,alignItems:'center',marginBottom:14},
  avatar:{width:82,height:82,borderRadius:41,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginBottom:12},
  avatarText:{fontSize:38,fontWeight:'900',color:'#17324d'},
  title:{fontSize:24,fontWeight:'900',color:'#fff',textAlign:'center'},
  name:{fontSize:16,fontWeight:'800',color:'#e8efff',textAlign:'center',marginTop:8},
  school:{fontSize:12,color:'#cbd8ef',textAlign:'center',marginTop:5},
  card:{backgroundColor:'#fff',borderRadius:19,padding:18,marginBottom:12,borderWidth:1,borderColor:'#eaecf0'},
  heading:{fontSize:18,fontWeight:'900',color:'#14213d',textAlign:'right',marginBottom:8},
  body:{fontSize:14,lineHeight:25,color:'#475467',textAlign:'right'},
  item:{fontSize:15,color:'#344054',textAlign:'right',marginTop:8,fontWeight:'700'},
});
