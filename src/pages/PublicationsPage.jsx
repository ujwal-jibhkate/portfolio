import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InvitationSection from '../components/InvitationSection';
import PublicationCard from '../components/PublicationCard';
import ScrollIndicator from '../components/ScrollIndicator';

gsap.registerPlugin(ScrollTrigger);

// Publications / Articles data
const publicationsData = [
  {
    category: 'Publication',
    title: 'Low Complexity OCV Model for SOC Estimation',
    description:
      'Published in Electrochimica Acta; introduces a novel OCV model for accurate State of Charge estimation in Li-ion batteries.',
    link: 'https://doi.org/10.1016/j.electacta.2022.140944',
  },
  {
    category: 'Publication',
    title: 'Integrated Test Set for SOC-SOH Estimation of Li-Ion Battery',
    description:
      'Springer ICAER 2022 chapter presenting an integrated test set for simultaneous State of Charge and State of Health estimation.',
    link: 'https://link.springer.com/chapter/10.1007/978-981-99-2283-3_6',
  },
  {
    category: 'Article',
    title: 'From Clicks to Connections: Building a Smarter Recommender',
    description:
      'Medium article detailing an end-to-end multi-modal recommendation system to tackle cold-start using deep learning.',
    link: 'https://medium.com/@ujwaljibhkate06/from-clicks-to-connections-building-a-smarter-recommender-with-embeddings-cb0f8ca61aaf',
  },
];

const PublicationsPage = () => {
  const containerRef = useRef(null);
  // Add explicit refs for both screens to orchestrate transitions
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Page entrance from TOP
        gsap.from('.publications-hero', {
          y: -60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });

        // Stagger cards on load
        gsap.from('.publication-card', {
          opacity: 0,
          y: 40,
          scale: 0.96,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.15,
        });

        // Crossfade transition between first and second screens
        const first = firstSectionRef.current;
        const second = secondSectionRef.current;

        // Scrubbed fade on scroll across the boundary
        gsap.to(first, {
          opacity: 0.5,
          y: -16,
          filter: 'blur(4px)',
          scrollTrigger: {
            trigger: second,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        });

        gsap.fromTo(
          second,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: second,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Explicit crossfade when entering the second screen
        ScrollTrigger.create({
          trigger: second,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(first, { opacity: 0, y: -24, duration: 0.5, ease: 'power2.out' });
            gsap.fromTo(second, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
          },
          onLeaveBack: () => {
            gsap.to(second, { opacity: 0.6, y: 16, duration: 0.4, ease: 'power2.out' });
            gsap.to(first, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
          },
        });
      }, containerRef);
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Button-triggered transition: crossfade first out, jump to second, fade second in
  const transitionToSecond = () => {
    const first = firstSectionRef.current;
    const second = secondSectionRef.current;
    const tl = gsap.timeline();
    tl
      .to(first, { opacity: 0, y: -24, duration: 0.45, ease: 'power2.out' })
      .add(() => {
        second?.scrollIntoView({ behavior: 'auto', block: 'start' });
      })
      .fromTo(second, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
  };

  return (
    <div ref={containerRef} className="bg-stone-50 text-neutral-900 snap-y snap-mandatory">
      {/* Scroll button on the right and section count */}
      <ScrollIndicator sectionsList={[".first-section", ".publication-invitation-section"]} />

      {/* First screen: Publications list */}
      <section ref={firstSectionRef} className="first-section snap-start min-h-screen flex flex-col justify-center relative">
        <div className="container mx-auto px-8 md:px-12">
          <div className="publications-hero text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900">
              Publications & Articles
            </h1>
            <p className="text-lg text-neutral-600 mt-4">A collection of my research and writing.</p>
          </div>

          {/* Centered, equal-height cards in a responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center items-stretch">
            {publicationsData.map((item, index) => (
              <PublicationCard key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Bottom center scroll-down control */}
        <button
          onClick={transitionToSecond}
          aria-label="Scroll to invitation"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-stone-100 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all"
        >
          Next
        </button>
      </section>

      {/* Second screen: Invitation (reverted to original style) */}
      <section ref={secondSectionRef} className="publication-invitation-section snap-start min-h-screen">
        <InvitationSection />
      </section>
    </div>
  );
};

export default PublicationsPage;