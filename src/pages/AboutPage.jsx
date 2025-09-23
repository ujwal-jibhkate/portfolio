import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollIndicator from '../components/ScrollIndicator';
import profilePicture from '../assets/profile.jpg'; 

gsap.registerPlugin(ScrollTrigger);

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
      });
      return () => ctx.revert();
    }, 100); // A 100ms delay is usually enough.

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="bg-white text-black">
      <section ref={introSectionRef} className="min-h-screen flex flex-col justify-center py-20 px-12 relative">
        <div className="container mx-auto">
          <h1 className="text-8xl md:text-12xl font-semibold text-center mb-20">Hi, I'm Ujwal</h1>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gray-200 rounded-full flex items-center justify-center"><span className="text-gray-400"><img src={profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" /></span></div>
            </div>
            <div className="text-left">
              <p className="text-xl text-gray-700 leading-relaxed">
              "I like to learn new things." As a self-described epistemophile, this is the simple motto that fuels my work as a software engineer. My focus is on the complete lifecycle of an AI application—from training a deep learning model in PyTorch to containerizing it with Docker and deploying it via a high-performance API. I enjoy taking ideas from concept to reality, whether it's an enterprise-grade GenAI solution at IBM or a full-stack recommender system for a personal project. I am currently deepening my expertise in MLOps and cloud-native AI, driven by a constant curiosity to build more scalable and efficient systems.
              </p>
            </div>
          </div>
        </div>
        <ScrollIndicator targetSelector=".experience-section" />
      </section>

      <section ref={experienceSectionRef} className="experience-section py-24 px-12 bg-black text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-12 border-b-4 border-white pb-2">Education</h2>
              <TimelineItem isDarkMode={true} title="Master of Science in Applied Data Science" subtitle="Indiana University, Bloomington" date="Aug 2024 - May 2026 (Expected)" details={["GPA: 3.77 / 4.0", "Key Coursework: Computer Vision, Applied Machine Learning, Genomics AI"]}/>
              <TimelineItem isDarkMode={true} title="Bachelor of Engineering in Electrical Engineering" subtitle="Ramdeobaba University, Nagpur (Minor: Computer Science)" date="Aug 2018 - May 2022" details={["Published research on OCV modeling in the journal Electrochimica Acta.", "Co-authored research on SOC-SOH estimation for Springer ICAER 2022."]}/>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-12 border-b-4 border-white pb-2">Experience</h2>
              <TimelineItem isDarkMode={true} title="Research Assistant, Genomics AI" subtitle="Indiana University (Prof. Weihua Guan)" date="Sep 2025 - Present" details={["Fine-tuning transformer-based LLMs with PyTorch for genomic classification and error correction.", "Developing real-time data pipelines that interface with Oxford Nanopore sequencing APIs."]}/>
              <TimelineItem isDarkMode={true} title="Software Engineer, GenAI Business Squad" subtitle="IBM" date="May 2022 - Apr 2024" details={["Engineered two production-intent GenAI applications using Azure OpenAI and Watsonx for the UK's largest utility provider.", "Reduced customer response times from 5 minutes to <10 seconds, projecting an 80% efficiency gain.", "Ensured data integrity for a 500K+ record cloud migration using COBOL & DB2 validation scripts."]}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;