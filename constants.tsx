
import React from 'react';
import { UserRole, User, NewsItem, GalleryItem, FeeItem } from './types';

export const COLORS = {
  primary: 'from-blue-900 to-blue-700',
  secondary: 'from-yellow-600 to-yellow-500',
  accent: 'from-indigo-600 to-purple-600',
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800'
};

export const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'System Admin', email: 'admin@excellence.edu', role: UserRole.ADMIN },
  { id: 'u2', name: 'Dr. Sarah Johnson', email: 'teacher@excellence.edu', role: UserRole.TEACHER, department: 'Science', photo: 'https://picsum.photos/200/200?random=1' },
  { id: 'u3', name: 'Rahul Kumar', email: 'student@excellence.edu', role: UserRole.STUDENT, class: 'Class 10-A', photo: 'https://picsum.photos/200/200?random=2' },
  { id: 'u4', name: 'Amit Kumar', email: 'parent@excellence.edu', role: UserRole.PARENT, children: ['u3'] }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Excellence Academy Wins State Sports Championship',
    category: 'Achievements',
    content: 'Our school sports team has brought home the championship trophy for the third year in a row, excelling in athletics and swimming.',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800',
    date: '2026-01-15',
    status: 'Published'
  },
  {
    id: 'n2',
    title: 'Annual Science Fair 2026 Announced',
    category: 'Events',
    content: 'Get your projects ready! The annual science fair will be held on March 15th, featuring innovations from students across all classes.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    date: '2026-02-10',
    status: 'Published'
  }
];

export const MOCK_GALLERY: GalleryItem[] = [
  { id: 'g1', title: 'Graduation Day', category: 'Events', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', date: '2025-05-20' },
  { id: 'g2', title: 'Chemistry Lab', category: 'Classroom', image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800', date: '2025-09-12' },
  { id: 'g3', title: 'Football Match', category: 'Sports', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', date: '2025-11-05' }
];

export const FEE_STRUCTURE: FeeItem[] = [
  { id: 'f1', class: 'Primary (1-5)', tuition: 25000, activities: 5000, transport: 10000, total: 40000 },
  { id: 'f2', class: 'Secondary (6-10)', tuition: 35000, activities: 7000, transport: 10000, total: 52000 },
  { id: 'f3', class: 'Senior Secondary (11-12)', tuition: 45000, activities: 10000, transport: 10000, total: 65000 }
];
