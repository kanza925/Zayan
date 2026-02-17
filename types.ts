
export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photo?: string;
  class?: string;
  department?: string;
  children?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  content: string;
  image: string;
  date: string;
  status: 'Published' | 'Draft';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
}

export interface AdmissionInquiry {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  classInterested: string;
  message?: string;
  status: 'New' | 'Reviewed' | 'Contacted' | 'Admitted';
}

export interface FeeItem {
  id: string;
  class: string;
  tuition: number;
  activities: number;
  transport: number;
  total: number;
}
