// src/lib/db-admin.ts
// Client-side wrappers for admin actions (since we are using client SDK in this setup)
// In a production app, these might call API routes which use firebase-admin
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Notice, Student, Teacher } from '@/types';

export const addNotice = async (notice: Omit<Notice, 'id'>) => {
  return await addDoc(collection(db, 'notices'), notice);
};

export const addStudent = async (student: Omit<Student, 'id'>) => {
  return await addDoc(collection(db, 'students'), student);
};

export const addTeacher = async (teacher: Omit<Teacher, 'id'>) => {
  return await addDoc(collection(db, 'teachers'), teacher);
};
