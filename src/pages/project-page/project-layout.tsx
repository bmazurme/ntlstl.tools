import { Outlet } from 'react-router-dom';

import BackButton from '../../components/back-button/back-button';

export default function ProjectPage() {
  return (
    <div className="content">
      <BackButton />
      <div className="project_main">
        <Outlet />
      </div>
    </div>
  );
}
