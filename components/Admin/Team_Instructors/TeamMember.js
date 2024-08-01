import React from 'react';

import { useStateContext } from '../../../src/context/ContextProvider';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';
import AddProfile from './AddProfile';

const TeamMember = () => {
  const { teamMember } = useStateContext();
  return (
    <div>
      <HeadingDashboard title="Team Member Information" />
      <div className="max-w-3xl mx-auto my-20">
        <AddProfile
          db_name="team_members"
          profile={teamMember}
          showRole={true}
        />
      </div>
    </div>
  );
};

export default TeamMember;
