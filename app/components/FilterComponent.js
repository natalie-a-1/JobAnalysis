'use client';
import { GoTrash } from "react-icons/go";
import { useState } from 'react';

// Mapping for experience levels and employment types
const experienceLevelMapping = {
    'Entry': 'EN',
    'Mid': 'MI',
    'Senior': 'SE',
    'Lead': 'LE'
};

const employmentTypeMapping = {
    'Full-time': 'FT',
    'Part-time': 'PT',
    'Contract': 'CT',
    'Temporary': 'TP',
    'Other': 'OT'
};

export default function FilterComponent({ onFilterChange }) {
    const [filters, setFilters] = useState({
        workYear: "",
        experienceLevel: "",
        employmentType: "",
        salaryInUsd: "",
        companySize: ""
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        const updatedFilters = {
            ...filters,
            [name]: value
        };
        setFilters(updatedFilters);

        // Send the updated filters to the parent component
        onFilterChange({
            ...updatedFilters,
            // Map the user-friendly options to their CSV codes
            experienceLevel: experienceLevelMapping[updatedFilters.experienceLevel] || updatedFilters.experienceLevel,
            employmentType: employmentTypeMapping[updatedFilters.employmentType] || updatedFilters.employmentType,
        });
    };

    const resetFilters = () => {
        const defaultFilters = {
            workYear: "",
            experienceLevel: "",
            employmentType: "",
            salaryInUsd: "",
            companySize: ""
        };
        setFilters(defaultFilters);
        onFilterChange(defaultFilters); // Reset the filters in the parent component as well
    };

    return (
        <aside className="bg-white p-4 rounded-lg shadow-md w-full max-w-md h-5/6">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold text-gray-800">Filter Jobs</h4>
                <GoTrash className="text-gray-600 cursor-pointer hover:text-gray-800" onClick={resetFilters} />
            </div>
            <div className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Work Year</label>
                    <select
                        name="workYear"
                        value={filters.workYear}
                        onChange={handleFilterChange}
                        className="form-select mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500"
                    >
                        <option value="">Select Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Experience Level</label>
                    <select
                        name="experienceLevel"
                        value={filters.experienceLevel}
                        onChange={handleFilterChange}
                        className="form-select mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500"
                    >
                        <option value="">Select Level</option>
                        <option value="Entry">Entry</option>
                        <option value="Mid">Mid</option>
                        <option value="Senior">Senior</option>
                        <option value="Lead">Lead</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Employment Type</label>
                    <select
                        name="employmentType"
                        value={filters.employmentType}
                        onChange={handleFilterChange}
                        className="form-select mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500"
                    >
                        <option value="">Select Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Salary in USD</label>
                    <select
                        name="salaryInUsd"
                        value={filters.salaryInUsd}
                        onChange={handleFilterChange}
                        className="form-select mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500"
                    >
                        <option value="">Select Salary Range</option>
                        <option value="50000">50,000+</option>
                        <option value="80000">80,000+</option>
                        <option value="100000">100,000+</option>
                        <option value="120000">120,000+</option>
                        <option value="150000">150,000+</option>
                        <option value="180000">180,000+</option>
                        <option value="200000">200,000+</option>
                        <option value="250000">250,000+</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Company Size</label>
                    <select
                        name="companySize"
                        value={filters.companySize}
                        onChange={handleFilterChange}
                        className="form-select mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500"
                    >
                        <option value="">Select Size</option>
                        <option value="Small">Small (1-50 employees)</option>
                        <option value="Medium">Medium (51-200 employees)</option>
                        <option value="Large">Large (201+ employees)</option>
                    </select>
                </div>
            </div>
        </aside>
    );
}
