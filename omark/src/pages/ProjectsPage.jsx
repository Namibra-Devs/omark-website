// pages/ProjectsPage.jsx
import React from 'react';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage = () => {
  const projects = [
    { title: 'Pankrono Gardens', desc: 'Modern residential community with 50 luxury homes', image: '/public/images/project1.jpg', status: 'Completed' },
    { title: 'Atimatim Heights', desc: 'Affordable housing project with flexible payment plans', image: '/public/images/project2.jpg', status: 'Ongoing' },
    { title: 'Kumasi Central Mall', desc: 'Commercial complex with retail and office spaces', image: '/public/images/project3.jpg', status: 'Coming Soon' },
    { title: 'Heritage Villas', desc: 'Premium gated community with smart home features', image: '/public/images/project4.jpg', status: 'Completed' },
  ];

  return (
    <>
      <section className="pt-32 pb-16 bg-gray-900 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Our Projects</h1>
          <div className="gold-accent bg-gold"></div>
          <p className="text-lg mt-6 max-w-2xl mx-auto">Building communities that promote comfort, security, and long-term value</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;