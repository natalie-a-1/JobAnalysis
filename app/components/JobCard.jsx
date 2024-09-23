import React from 'react';
import { employmentTypeMapping, experienceLevelMapping, companySizeMapping } from '@/utils/mappings';

const reverseMapping = (mapping, value) => {
    // Find the key that corresponds to the value
    return Object.keys(mapping).find(key => mapping[key] === value) || value;
};

const JobCard = ({ job }) => {
    const {
        work_year, experience_level, employment_type, salary_in_usd,
        employee_residence, company_size, job_title
    } = job;

    const formattedSalary = salary_in_usd ? `$${Number(salary_in_usd).toLocaleString()}` : 'Not provided';

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors duration-300">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{job_title}</h3>
            <p className="text-gray-700 dark:text-gray-300"><strong>Year:</strong> {work_year}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Experience:</strong> {reverseMapping(experienceLevelMapping, experience_level)}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Type:</strong> {reverseMapping(employmentTypeMapping, employment_type)}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Salary (USD):</strong> {formattedSalary}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Location:</strong> {employee_residence}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Company Size:</strong> {reverseMapping(companySizeMapping, company_size)}</p>
        </div>
    );
};

export default JobCard;
