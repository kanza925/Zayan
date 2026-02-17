
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Heart, Award, Users, BookOpen } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-blue-900 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-400 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-6"
          >
            About Excellence Academy
          </motion.h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto leading-relaxed">
            A tradition of nurturing greatness and fostering innovation in every student since 1998.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
            <div className="bg-blue-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-900/20">
              <Eye className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Vision</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              To be a global leader in holistic education, empowering students to become innovative thinkers, compassionate leaders, and responsible global citizens who thrive in the 21st century.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-100 rounded-full opacity-50 blur-3xl"></div>
            <div className="bg-yellow-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-yellow-600/20">
              <Target className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We strive to provide a rigorous academic environment blended with diverse extracurricular opportunities that ignite curiosity, foster resilience, and encourage lifelong learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-500 max-w-xl mx-auto">The guiding principles that define our culture and community.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ValueCard icon={<Heart className="text-red-500" />} title="Integrity" desc="Upholding honesty and ethics." />
            <ValueCard icon={<Award className="text-blue-500" />} title="Excellence" desc="Striving for the highest quality." />
            <ValueCard icon={<BookOpen className="text-indigo-500" />} title="Innovation" desc="Embracing new ideas." />
            <ValueCard icon={<Users className="text-green-500" />} title="Community" desc="Growing together as one." />
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="w-full md:w-1/3">
                  <div className="relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500" 
                      alt="Principal" 
                      className="w-full h-[400px] object-cover rounded-[3rem] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-white p-6 rounded-3xl shadow-xl">
                       <p className="font-bold text-xl leading-tight">Dr. Sarah Johnson</p>
                       <p className="text-sm opacity-80 uppercase tracking-widest font-medium">Principal</p>
                    </div>
                  </div>
               </div>
               <div className="w-full md:w-2/3">
                  <h2 className="text-4xl font-bold text-slate-900 mb-8">From the Principal's Desk</h2>
                  <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                     <p>
                        "At Excellence Academy, we don't just teach subjects; we inspire dreams. Our commitment is to provide an environment where every child feels seen, heard, and challenged to reach their highest potential."
                     </p>
                     <p>
                        "As we navigate an increasingly digital world, we are proud to integrate modern technologies with time-tested values. Our faculty is dedicated to nurturing the next generation of leaders who will solve global challenges with wisdom and empathy."
                     </p>
                     <p className="font-bold text-blue-900 italic">
                        "Welcome to our journey of transformation."
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-white p-8 rounded-3xl text-center border border-slate-200 hover:shadow-xl transition-all">
    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
      {icon}
    </div>
    <h3 className="font-bold text-slate-900 text-xl mb-2">{title}</h3>
    <p className="text-slate-500 text-sm">{desc}</p>
  </div>
);

export default AboutPage;
