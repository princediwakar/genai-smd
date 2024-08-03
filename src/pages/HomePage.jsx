import React from 'react';
import HeroSection from '../components/homepage/HeroSection';
import Features from '../components/homepage/Features';
import CallToAction from '../components/homepage/CallToAction';
import HowItWorks from '../components/homepage/HowItWorks';
import Testimonials from '../components/homepage/Testimonials';
import UseCases from '../components/homepage/UseCases';
import AppFooter from '../components/homepage/AppFooter';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <CallToAction />
      <HowItWorks />
      <Testimonials />
      <UseCases />
      <AppFooter />
    </>
  );
};

export default HomePage;
