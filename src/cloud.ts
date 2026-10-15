import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { LocalStudent } from './storage';

const cleanCode = (code:string) => /^\d{6}$/.test(code) ? code : null;

export async function getCloudTeacherCode(): Promise<string|null> {
  const snap = await getDoc(doc(db, 'settings', 'teacher'));
  const code = snap.data()?.code;
  return typeof code === 'string' && cleanCode(code) ? code : null;
}

export async function setCloudTeacherCode(code:string) {
  if (!cleanCode(code)) throw new Error('Teacher code must contain exactly six digits');
  await setDoc(doc(db, 'settings', 'teacher'), { code, updatedAt: Date.now() }, { merge:true });
}

export async function getCloudStudent(code:string): Promise<LocalStudent|null> {
  if (!cleanCode(code)) return null;
  const snap = await getDoc(doc(db, 'students', code));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: String(data.id || code),
    name: String(data.name || 'الطالب'),
    code,
    grade: String(data.grade || ''),
    active: data.active !== false,
  };
}

export async function saveCloudStudent(student:LocalStudent) {
  if (!cleanCode(student.code)) throw new Error('Student code must contain exactly six digits');
  await setDoc(doc(db, 'students', student.code), { ...student, updatedAt: Date.now() }, { merge:true });
}

export async function deleteCloudStudent(code:string) {
  if (!cleanCode(code)) return;
  await deleteDoc(doc(db, 'students', code));
}
