import PropTypes from 'prop-types';
import api from '../../../api';
import ProjectsList from '../../../components/ProjectsList';
import ProjectsLayout from '../../../layouts/ProjectsLayout/ProjectsLayout';
import logger from '../../../utils/logger';

const CompanyProjectsList = ({ company, data }) => {
  return (
    <ProjectsLayout company={company}>
      <ProjectsList data={data} />
    </ProjectsLayout>
  );
};

CompanyProjectsList.defaultProps = {
  company: null,
};

CompanyProjectsList.propTypes = {
  company: PropTypes.object,
};

export const getServerSideProps = async (ctx) => {
  let props = {};

  const { companyId } = ctx.params;
  try {
    const company = await api.companies.fetchProjects(companyId);

    const ProjectsListData = await api.vehicles.listCompanyVehicles(companyId);

    props = {
      ...props,
      company,
      data: {
        ...ProjectsListData,
        vehicles: ProjectsListData.data || [],
      },
    };
  } catch (err) {
    logger.error('err', err);
  }

  return {
    props,
  };
};

export default CompanyProjectsList;
