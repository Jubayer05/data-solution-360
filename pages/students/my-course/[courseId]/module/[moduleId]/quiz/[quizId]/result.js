import React from 'react';
import { DashboardFormat } from '../../../../../../../../components';
import PastQuizResult from '../../../../../../../../components/Students/Quiz/PastQuizResult';
import ProtectedRoute from '../../../../../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const quizResult = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<PastQuizResult />} />
    </div>
  );
};

export default ProtectedRoute(quizResult, ['student']);
