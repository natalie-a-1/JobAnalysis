import React from 'react';

const employmentTypeMapping = {
  'FT': 'Full-time',
  'PT': 'Part-time',
  'CT': 'Contract',
  'TP': 'Temporary',
  'OT': 'Other'
};

const experienceLevelMapping = {
  'EN': 'Entry',
  'MI': 'Mid',
  'SE': 'Senior',
  'LE': 'Lead'
};

const companySizeMapping = {
  'S': 'Small (1-50 employees)',
  'M': 'Medium (51-200 employees)',
  'L': 'Large (201+ employees)'
};

const JobCard = ({ job }) => {
  const {
    work_year, experience_level, employment_type, salary_in_usd,
    employee_residence, company_size, job_title
  } = job;

  const getFullEmploymentType = (type) => employmentTypeMapping[type] || type;
  const getFullExperienceLevel = (level) => experienceLevelMapping[level] || level;
  const getFullCompanySize = (size) => companySizeMapping[size] || size;

  const formattedSalary = salary_in_usd ? `$${Number(salary_in_usd).toLocaleString()}` : 'Not provided';

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300">
      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{job_title}</h3>
      <p className="text-gray-700 dark:text-gray-300"><strong>Year:</strong> {work_year}</p>
      <p className="text-gray-700 dark:text-gray-300"><strong>Experience:</strong> {getFullExperienceLevel(experience_level)}</p>
      <p className="text-gray-700 dark:text-gray-300"><strong>Type:</strong> {getFullEmploymentType(employment_type)}</p>
      <p className="text-gray-700 dark:text-gray-300"><strong>Salary (USD):</strong> {formattedSalary}</p>
      <p className="text-gray-700 dark:text-gray-300"><strong>Location:</strong> {employee_residence}</p>
      <p className="text-gray-700 dark:text-gray-300"><strong>Company Size:</strong> {getFullCompanySize(company_size)}</p>
    </div>
  );
};

export default JobCard;
