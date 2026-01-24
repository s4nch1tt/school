// src/types/index.ts
export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  displayName?: string;
  photoURL?: string;
  createdAt: unknown;
}

export interface Student {
  id: string; // usually same as uid or auto-generated
  admissionNo: string;
  name: string;
  dob: string;
  classId: string; // Reference to Class/Section
  section: string;
  fatherName: string;
  motherName: string;
  address: string;
  phone: string;
  photoUrl?: string;
}

export interface Teacher {
  id: string;
  name: string;
  qualification: string;
  subject: string;
  email: string;
  photoUrl?: string;
  assignedClasses: string[]; // List of class IDs
}

export interface Notice {
  id: string;
  title: string;
  content: string; // HTML or Text
  pdfUrl?: string;
  date: unknown; // Firestore Timestamp
  published: boolean;
  type: 'general' | 'student' | 'teacher';
}

export interface Result {
  id: string;
  studentId: string;
  examName: string; // e.g., "Half Yearly 2024"
  year: string;
  subjects: {
    name: string;
    marks: number;
    total: number;
  }[];
  totalMarks: number;
  percentage: number;
  grade: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  category?: string;
}
