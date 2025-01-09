import React from 'react';
import { DashboardFormat } from '../../../../../../../../components';
import BeforeStartQuiz from '../../../../../../../../components/Students/Quiz/BeforeStartQuiz';
import ProtectedRoute from '../../../../../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const quizResult = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<BeforeStartQuiz />} />
    </div>
  );
};

export default ProtectedRoute(quizResult, ['student']);
