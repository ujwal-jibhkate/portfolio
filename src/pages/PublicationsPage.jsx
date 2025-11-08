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
  {
    category: 'Article',
    title: 'How a Genomics Paper Led Me Down a 12-Experiment PEFT Rabbit Hole',
    description:
      'A rigorous comparative analysis of LoRA and IA³ (Infused Adapter) PEFT techniques on multiple model architectures.',
    link: 'https://medium.com/@ujwaljibhkate/how-a-genomics-paper-led-me-down-a-12-experiment-peft-rabbit-hole-f1217258b84d',
  },
];

const PublicationsPage = () => {
  const containerRef = useRef(null);
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

        // Subtle slide-in for horizontally scrolled cards
        gsap.from('.publication-row .publication-card', {
          opacity: 0,
          x: 40,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.publication-row',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });

        // Crossfade transition between first and second screens
        const first = firstSectionRef.current;
        const second = secondSectionRef.current;

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
      <ScrollIndicator sectionsList={[".first-section", ".publication-invitation-section"]} />

      {/* First screen: Single-row horizontal scroll of all items */}
      <section ref={firstSectionRef} className="first-section snap-start min-h-screen flex flex-col justify-center relative">
        <div className="container mx-auto px-8 md:px-12">
          <div className="publications-hero text-center mb-10 md:mb-14">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900">Publications & Articles</h1>
            <p className="text-lg text-neutral-600 mt-4">Scroll left → right to explore.</p>
          </div>

          <div className="relative">
            {/* Edge fade masks */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-stone-50 to-transparent"></div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-stone-50 to-transparent"></div>

            <div className="publication-row overflow-x-auto no-scrollbar">
              <div className="flex flex-nowrap gap-6 pr-6 snap-x snap-mandatory">
                {publicationsData.map((item, index) => (
                  <div key={index} className="snap-start flex-shrink-0">
                    <PublicationCard {...item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={transitionToSecond}
          aria-label="Scroll to invitation"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-stone-100 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all"
        >
          Next
        </button>
      </section>

      {/* Second screen: Invitation */}
      <section ref={secondSectionRef} className="publication-invitation-section snap-start min-h-screen">
        <InvitationSection />
      </section>
    </div>
  );
};

export default PublicationsPage;