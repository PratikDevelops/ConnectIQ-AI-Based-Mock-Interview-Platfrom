import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';

import DashboardOverview from './Components/DashboardOverview';
import ResumeAnalyzer from './Components/ResumeAnalyzer';
import CareerRoadmapGenerator from './Components/CareerRoadmapGenerator';
import CoverLetterGenerator from './Components/CoverLetterGenerator';
import CompanyOverview from './Components/CompanyOverview';
import ExpertBooking from './Components/ExpertBooking';
import InterviewQAGenerator from './Components/InterviewQAGenerator';
import InterviewPage from './Pages/InterviewPage';
import InterviewQuestionsPage from './Pages/InterviewQuestionsPage';
import SignupPage from './Authentication/SignupPage';
import NotFoundPage from './Pages/NotFoundPage';
import StudyMaterial from './Components/StudyMaterial';
import StudyMaterialDownload from './Components/StudyMaterial';
import FeedbackPage from './Pages/FeedbackPage';
import LearnMorePage from './Pages/LearnMorePage';
import InterviewChatbot from './Components/InterviewChatbot';


const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardOverview />} />
          <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="career-roadmap" element={<CareerRoadmapGenerator />} />
          <Route path="cover-letter" element={<CoverLetterGenerator />} />
          <Route path="company-overview" element={<CompanyOverview />} />
          <Route path="expert-booking" element={<ExpertBooking />} />
          <Route path="interview-qa" element={<InterviewQAGenerator />} />
          <Route path='interview' element={<InterviewPage/>}/>
          <Route path="study-material" element={<StudyMaterialDownload/>}/>
        </Route>
        <Route path="/interview-questions" element={<InterviewQuestionsPage/>} />
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/learn-more' element={<LearnMorePage/>}/>
        <Route path='/feedback' element={<FeedbackPage/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
