import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollIndicator from '../components/ScrollIndicator';

gsap.registerPlugin(ScrollTrigger);
import profilePicture from '../assets/profile.jpg'; 
import InvitationSection from '../components/InvitationSection';

// Reusable component for an Experience or Education item
const TimelineItem = ({ title, subtitle, date, details, isDarkMode = false }) => (
  <div className="mb-8 relative">
    <div className={`border-l-2 pl-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{title}</h3>
      <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>
      <p className={`text-md mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{date}</p>
      <ul className={`list-disc list-inside space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {details.map((detail, index) => <li key={index}>{detail}</li>)}
      </ul>
    </div>
  </div>
);


const AboutPage = () => {
  const introSectionRef = useRef(null);
  const experienceSectionRef = useRef(null);

  useEffect(() => {
    // This timeout ensures the browser has finished rendering before GSAP runs.
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Animate the intro section to fade out as it scrolls up
        gsap.to(introSectionRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: introSectionRef.current,
            start: 'top top',
            end: '60% top', // End the fade out when the section is 60% scrolled past
            scrub: true,
          },
        });

        // Animate the experience section to fade in as it scrolls into view
        gsap.from(experienceSectionRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: experienceSectionRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          },
        });

        // Advanced transitions: crossfade+scale+blur between sections
        const aboutSections = gsap.utils.toArray('.about-section');
        aboutSections.forEach((section) => {
          gsap.set(section, { opacity: 0, y: 40, scale: 0.98, filter: 'blur(8px)' });
          ScrollTrigger.create({
            trigger: section,
            start: 'top 70%',
            end: 'bottom 30%',
            onEnter: () => gsap.to(section, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }),
            onEnterBack: () => gsap.to(section, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' })
          });
        });

        // Parallax background blobs in experience section
        const blobs = experienceSectionRef.current?.querySelectorAll('.bg-blob') || [];
        blobs.forEach((blob, idx) => {
          gsap.to(blob, {
            y: idx % 2 === 0 ? -30 : 30,
            x: idx % 2 === 0 ? -15 : 15,
            scale: 1.05,
            scrollTrigger: {
              trigger: experienceSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      });
      return () => ctx.revert();
    }, 100); // A 100ms delay is usually enough.

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="bg-white text-black snap-y snap-mandatory">
      <ScrollIndicator sectionsList={[".intro-section", ".experience-section", ".invitation-section"]} />
      <section ref={introSectionRef} className="about-section intro-section snap-start min-h-screen flex flex-col justify-center py-20 px-12 relative">
        <div className="container mx-auto">
          <h1 className="text-8xl md:text-12xl font-semibold text-center mb-20">Hi, I'm Ujwal</h1>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gray-200 rounded-full flex items-center justify-center"><span className="text-gray-400"><img src={profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" /></span></div>
            </div>
            <div className="text-left">
              <div className="text-xl text-gray-700 leading-relaxed space-y-6">
                <p>
                  <span className="underline decoration-sky-500 decoration-2 underline-offset-4">"I like to learn new things."</span> As a self-described <em className="italic">epistemophile</em>, this motto has been the driving force behind my journey. My foundation began in <span className="underline decoration-amber-500 underline-offset-4">Electrical Engineering</span>, which sparked my interest in complex systems and led me to <strong className="font-semibold">IBM</strong>. There, I moved from theory to practice, learning to build robust, enterprise-grade <strong className="font-semibold">GenAI</strong> solutions and discovering that a <em className="italic">model</em> is only as valuable as the <strong className="font-semibold">system</strong> that supports it.
                </p>
                <p>
                  To deepen that specialization, I came to <span className="underline decoration-purple-500 underline-offset-4">Indiana University</span> for my <em className="italic">Master's in Data Science</em>. This is where I've focused on building complex, end-to-end projects from scratch, like an <strong className="font-semibold">auditable AI</strong> for medical report generation and a <strong className="font-semibold">multi-modal recommender system</strong>. This hands-on work is my vehicle for mastering the <strong className="font-semibold">full AI lifecycle</strong>, from <em className="italic">PyTorch</em> modeling to <em className="italic">Docker</em> containerization and <strong className="font-semibold">API deployment</strong>, turning concepts into tangible, real-world applications.
                </p>
                <p>
                  This path has now led me to the <span className="underline decoration-sky-500 underline-offset-4">intersection of AI and genomics</span>. As a <strong className="font-semibold">Research Assistant</strong> with <strong className="font-semibold">Professor Weihua Guan</strong>, I'm applying these full-stack skills to a tangible scientific challenge: using <em className="italic">foundation models</em> to analyze <strong className="font-semibold">HIV RNA sequencing</strong>, with a focus on detecting <span className="underline decoration-indigo-500 underline-offset-4">Drug Resistance Mutations</span>. It's the perfect synthesis of my journey—using a deep understanding of AI systems to help solve critical problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={experienceSectionRef} className="about-section experience-section snap-start min-h-screen px-12 bg-black text-white flex items-center relative overflow-hidden">
        <div className="bg-blob absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-br from-sky-500/25 to-purple-600/25 blur-3xl" />
        <div className="bg-blob absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-600/20 to-sky-500/20 blur-3xl" />
        <div className="container mx-auto relative">
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-sky-400 via-white/30 to-purple-500 opacity-40" />
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="group relative">
              <div className="flex items-center mb-6">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-sky-400 mr-3" fill="currentColor"><path d="M12 2L1 7l11 5 11-5-11-5zm0 7l-11 5 11 5 11-5-11-5zm0 7l-11 5 11 5 11-5-11-5z"/></svg>
                <h2 className="text-4xl font-bold">Education</h2>
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(14,165,233,0.25)] group-hover:-translate-y-1">
                {/* Education timeline items */}
                <div className="mb-8 relative">
                  <div className="hidden lg:block absolute top-6 -right-6 w-3 h-3 rounded-full bg-gradient-to-r from-sky-400 to-purple-500 shadow-[0_0_12px_rgba(14,165,233,0.6)] animate-pulse"></div>
                  <div className="border-l-2 pl-8 border-gray-700">
                    <h3 className="text-2xl font-bold text-white">Master of Science in Applied Data Science</h3>
                    <p className="text-lg font-semibold text-gray-400">Indiana University, Bloomington</p>
                    <p className="text-md mb-2 text-gray-500">Aug 2024 - May 2026 (Expected)</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>GPA: 3.77 / 4.0</li>
                      <li>Key Coursework: Computer Vision, Applied Machine Learning, Genomics AI</li>
                    </ul>
                  </div>
                </div>
                <div className="mb-8 relative">
                  <div className="border-l-2 pl-8 border-gray-700">
                    <h3 className="text-2xl font-bold text-white">Bachelor of Engineering in Electrical Engineering</h3>
                    <p className="text-lg font-semibold text-gray-400">Ramdeobaba University, Nagpur (Minor: Computer Science)</p>
                    <p className="text-md mb-2 text-gray-500">Aug 2018 - May 2022</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Published research on OCV modeling in the journal Electrochimica Acta.</li>
                      <li>Co-authored research on SOC-SOH estimation for Springer ICAER 2022.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <span className="hidden lg:block absolute -right-3 top-8 w-3 h-3 bg-sky-400 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.7)]" />
            </div>

            <div className="group relative">
              <div className="flex items-center mb-6">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-purple-400 mr-3" fill="currentColor"><path d="M4 6h16v2H4V6zm0 4h16v8H4v-8zm2 2v4h12v-4H6z"/></svg>
                <h2 className="text-4xl font-bold">Experience</h2>
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] group-hover:-translate-y-1">
                {/* Experience timeline items */}
                <div className="mb-8 relative">
                  <div className="hidden lg:block absolute top-6 -left-6 w-3 h-3 rounded-full bg-gradient-to-l from-purple-500 to-sky-400 shadow-[0_0_12px_rgba(168,85,247,0.6)] animate-pulse"></div>
                  <div className="border-l-2 pl-8 border-gray-700">
                    <h3 className="text-2xl font-bold text-white">Research Assistant, Genomics AI</h3>
                    <p className="text-lg font-semibold text-gray-400">Indiana University (Prof. Weihua Guan)</p>
                    <p className="text-md mb-2 text-gray-500">Sep 2025 - Present</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Fine-tuning transformer-based LLMs with PyTorch for genomic classification and error correction.</li>
                      <li>Developing real-time data pipelines that interface with Oxford Nanopore sequencing APIs.</li>
                    </ul>
                  </div>
                </div>
                <div className="mb-8 relative">
                  <div className="hidden lg:block absolute top-6 -left-6 w-3 h-3 rounded-full bg-gradient-to-l from-purple-500 to-sky-400 shadow-[0_0_12px_rgba(168,85,247,0.6)] animate-pulse"></div>
                  <div className="border-l-2 pl-8 border-gray-700">
                    <h3 className="text-2xl font-bold text-white">Software Engineer, GenAI Business Squad</h3>
                    <p className="text-lg font-semibold text-gray-400">IBM</p>
                    <p className="text-md mb-2 text-gray-500">May 2022 - Apr 2024</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Engineered two production-intent GenAI applications using Azure OpenAI and Watsonx for the UK's largest utility provider.</li>
                      <li>Reduced customer response times from 5 minutes to &lt;10 seconds, projecting an 80% efficiency gain.</li>
                      <li>Ensured data integrity for a 500K+ record cloud migration using COBOL &amp; DB2 validation scripts.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <span className="hidden lg:block absolute -left-3 top-8 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.7)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-section invitation-section snap-start min-h-screen">
        <InvitationSection />
      </section>
    </div>
  );
};

export default AboutPage;