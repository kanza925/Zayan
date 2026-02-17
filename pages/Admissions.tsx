
import React, { useState } from 'react';
// Fix: Bypassing type errors for framer-motion by any-casting imports
import * as FramerMotion from 'framer-motion';
const { motion } = FramerMotion as any;

import { CheckCircle, ArrowRight, FileText, Calendar, ShieldCheck, Download } from 'lucide-react';

const AdmissionsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    class: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Submission:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-24 text-white relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-extrabold mb-6">Join Our Excellence Community</h1>
            <p className="text-blue-100 text-xl mb-10 leading-relaxed">
              We are currently accepting inquiries for the 2026-2027 academic year. Take the first step toward a transformative educational journey.
            </p>
            <div className="flex flex-wrap gap-4">
               <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2">
                 <Download className="w-5 h-5" /> Download Prospectus (PDF)
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column: Info */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Admission Process</h2>
            <div className="space-y-12">
              <ProcessStep 
                num="01" 
                title="Online Inquiry" 
                desc="Fill out our digital inquiry form with student details and previous academic records."
              />
              <ProcessStep 
                num="02" 
                title="Campus Tour & Interview" 
                desc="Visit our state-of-the-art facilities and meet with our academic advisors for a personal interaction."
              />
              <ProcessStep 
                num="03" 
                title="Entrance Assessment" 
                desc="An age-appropriate evaluation to understand the student's current learning level and strengths."
              />
              <ProcessStep 
                num="04" 
                title="Enrollment" 
                desc="Receive admission confirmation and complete the necessary documentation and fee formalities."
              />
            </div>

            <div className="mt-20 p-10 bg-white rounded-[3rem] shadow-xl border border-slate-100">
               <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                 <ShieldCheck className="text-blue-600" /> Eligibility Criteria
               </h3>
               <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                    <span>Age: Minimum 6 years for Grade 1 (as of March 31st)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                    <span>Previous Academic Records from recognized schools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                    <span>Mandatory Entrance Evaluation for Grades 6-12</span>
                  </li>
               </ul>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <div className="sticky top-24 bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <FileText className="w-32 h-32" />
               </div>
               
               <h2 className="text-3xl font-bold text-slate-900 mb-8 relative z-10">Inquiry Form</h2>
               
               {isSubmitted ? (
                 <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-50 p-8 rounded-3xl text-center"
                 >
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                       <CheckCircle className="text-white w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-900 mb-2">Inquiry Received!</h3>
                    <p className="text-green-800">Our admission counselor will contact you within 24-48 hours via phone or email.</p>
                 </motion.div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Student's Full Name</label>
                        <input 
                           type="text" 
                           required
                           className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                           placeholder="John Doe"
                           onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Parent/Guardian Name</label>
                        <input 
                           type="text" 
                           required
                           className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                           placeholder="Jane Doe"
                           onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                        />
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <input 
                           type="email" 
                           required
                           className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                           placeholder="parent@example.com"
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                        <input 
                           type="tel" 
                           required
                           className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                           placeholder="+91 12345 67890"
                           onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                     </div>
                   </div>

                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Class Interested In</label>
                      <select 
                         required
                         className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                         onChange={(e) => setFormData({...formData, class: e.target.value})}
                      >
                         <option value="">Select a Grade</option>
                         <option value="Grade 1">Grade 1</option>
                         <option value="Grade 2">Grade 2</option>
                         <option value="Grade 3">Grade 3</option>
                         <option value="Grade 6">Grade 6</option>
                         <option value="Grade 9">Grade 9</option>
                         <option value="Grade 11">Grade 11</option>
                      </select>
                   </div>

                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Additional Message</label>
                      <textarea 
                         rows={4}
                         className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                         placeholder="Tell us about your child's interests..."
                         onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                   </div>

                   <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white p-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/20 transition-all flex items-center justify-center gap-2 group">
                      Submit Inquiry <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                   </button>
                 </form>
               )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProcessStep = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <div className="flex gap-6">
    <div className="text-4xl font-black text-blue-100 group-hover:text-blue-900 transition-colors select-none">{num}</div>
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default AdmissionsPage;
