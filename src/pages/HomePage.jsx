import HeroAnimation from '../components/HeroAnimation';
import AboutPreview from '../components/AboutPreview';
import ProjectsPreview from '../components/ProjectsPreview';
import ScrollIndicator from '../components/ScrollIndicator'; // Import the scroll button

const HomePage = () => {
  return (
    <>
      <HeroAnimation />
      
      {/* The scroll button now lives on the page itself, not inside a component.
        We tell it to target the unique class name of the next section.
      */}
      <ScrollIndicator targetSelector=".about-preview-section" />

      <AboutPreview />
      <ProjectsPreview />
    </>
  );
};

export default HomePage;