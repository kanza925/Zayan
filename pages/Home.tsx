
import React from 'react';
// Fix: Bypassing type errors for react-router-dom and framer-motion
import * as FramerMotion from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
const { motion } = FramerMotion as any;
const { Link } = ReactRouterDOM as any;

import { ArrowRight, Award, Users, BookOpen, TrendingUp, Sparkles, BrainCircuit } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=1920" 
            alt="School Campus" 
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-4 py-2 rounded-full text-blue-100 text-sm font-bold mb-6 border border-blue-400/30">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                ADMISSIONS OPEN FOR 2026-27
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                Shaping the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Visionaries</span> of Tomorrow
              </h1>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-xl">
                A legacy of excellence in education. We provide a nurturing environment that fosters creativity, critical thinking, and character development.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/admissions" className="bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-yellow-600/30 transition-all flex items-center gap-2 group">
                  Enroll Your Child <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all">
                  Discover More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 p-8 hidden lg:block">
           <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl w-64 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-2xl bg-yellow-500 flex items-center justify-center">
                    <Award className="text-white" />
                 </div>
                 <div>
                    <p className="text-white font-bold">98% Success</p>
                    <p className="text-blue-200 text-xs uppercase tracking-wider">State Board Results</p>
                 </div>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="h-full bg-yellow-500"
                 />
              </div>
           </div>
        </div>
      </section>

      {/* Stats Quick Grid */}
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem icon={Users} label="Active Students" value="2500+" />
            <StatItem icon={Award} label="Awards Won" value="500+" />
            <StatItem icon={BookOpen} label="Teachers" value="150+" />
            <StatItem icon={TrendingUp} label="Placements" value="100%" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The Excellence Difference</h2>
            <div className="w-24 h-1 bg-blue-900 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<BrainCircuit className="w-8 h-8 text-blue-600" />}
              title="AI-Enhanced Learning"
              desc="Our unique integration of AI tutors helps students master complex subjects at their own pace."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-indigo-600" />}
              title="World-Class Faculty"
              desc="Expert educators with decades of experience in shaping young minds for competitive environments."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-green-600" />}
              title="Holistic Development"
              desc="Beyond academics, we focus on sports, arts, and emotional intelligence for well-rounded growth."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-900 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
         </div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to join our community?</h2>
            <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">
               Secure your child's future today. Our admission experts are ready to guide you through every step of the journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/admissions" className="bg-yellow-600 hover:bg-yellow-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl transition-all">
                Start Application
              </Link>
              <Link to="/contact" className="bg-white text-blue-900 px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-100 transition-all">
                Contact Admissions
              </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

const StatItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex flex-col items-center md:items-start text-center md:text-left">
    <div className="bg-blue-100 p-3 rounded-2xl mb-4">
      <Icon className="w-6 h-6 text-blue-900" />
    </div>
    <p className="text-3xl font-extrabold text-slate-900 mb-1">{value}</p>
    <p className="text-slate-500 font-medium text-sm tracking-wide uppercase">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group"
  >
    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </motion.div>
);

export default HomePage;
