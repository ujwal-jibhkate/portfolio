import React from 'react';
import PublicationCard from '../components/PublicationCard';

// This is the data for your publications. You can easily update it here.
// This is the data for your publications. You can easily update it here.
const publicationsData = [
    {
      category: "Publication",
      title: "Low Complexity OCV Model for SOC Estimation",
      description: "Published in the peer-reviewed journal Electrochimica Acta, this paper introduces a novel OCV model for accurate State of Charge estimation in Li-ion batteries.",
      link: "https://doi.org/10.1016/j.electacta.2022.140944"
    },
    {
      category: "Publication",
      title: "Integrated Test Set for SOC-SOH Estimation of Li-Ion Battery",
      description: "Co-authored for the Springer ICAER 2022 conference, this work presents an integrated test set for simultaneous State of Charge and State of Health estimation.",
      link: "https://link.springer.com/chapter/10.1007/978-981-99-2283-3_6"
    },
    {
      category: "Article",
      title: "From Clicks to Connections: Building a Smarter Recommender with Embeddings",
      description: "A Medium article detailing the end-to-end process of creating a multi-modal recommendation system to solve the cold-start problem using deep learning.",
      link: "https://medium.com/@ujwaljibhkate/from-clicks-to-connections-building-a-smarter-recommender-with-embeddings-cb0f8ca61aaf"
    }
  ];


  const PublicationsPage = () => {
    return (
      // The background is now a professional yellow/amber
      <div className="bg-amber-100 min-h-screen text-black flex flex-col justify-center">
        
        <div className="py-20">
          <div className="text-center mb-16 px-4">
            <h1 className="text-5xl md:text-7xl font-bold">Publications & Articles</h1>
            <p className="text-lg text-gray-700 mt-4">A collection of my research and written work.</p>
          </div>
  
          {/* Horizontal Scrolling Container */}
          <div className="flex overflow-x-auto space-x-8 pb-8 px-8 md:px-20 
                          scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-amber-200">
            {publicationsData.map((item, index) => (
              <div key={index} className="flex-shrink-0">
                <PublicationCard 
                  category={item.category}
                  title={item.title}
                  description={item.description}
                  link={item.link}
                />
              </div>
            ))}
            <div className="flex-shrink-0 w-1 md:w-12"></div>
          </div>
        </div>
      </div>
    );
  };

export default PublicationsPage;