"use client";
import React, { useEffect, useState } from "react";
import FilterComponent from "@/app/components/FilterComponent";
import JobCard from "@/app/components/JobCard";
import JobAnalysis from "@/app/components/JobAnalysis";
import { employmentTypeMapping, experienceLevelMapping, companySizeMapping } from "@/utils/mappings";

const itemsPerPage = 21;

export default function Home() {
  const [jobEntries, setJobEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/salaries");
        if (!response.ok) {
          throw new Error("Failed to fetch job data");
        }
        const data = await response.json();
        setJobEntries(data);
        setFilteredEntries(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch job data.");
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = jobEntries;

    if (filters.workYear) {
      filtered = filtered.filter((job) => job.work_year.toString() === filters.workYear);
    }
    if (filters.experienceLevel) {
      filtered = filtered.filter((job) => job.experience_level === filters.experienceLevel);
    }
    if (filters.employmentType) {
      filtered = filtered.filter((job) => job.employment_type === filters.employmentType);
    }
    if (filters.salaryInUsd) {
      filtered = filtered.filter((job) => parseInt(job.salary_in_usd, 10) >= parseInt(filters.salaryInUsd, 10));
    }
    if (filters.companySize) {
      filtered = filtered.filter((job) => job.company_size === filters.companySize);
    }

    setFilteredEntries(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobEntries = filteredEntries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);

  if (isLoading) {
    return <div>Loading job data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!filteredEntries.length && !showAnalysis) {
    return <div>No job data available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3 flex justify-center">
          <div className="flex items-center space-x-4">
            <button
              className={`text-blue-500 hover:text-blue-700 ${!showAnalysis ? "font-bold" : ""}`}
              onClick={() => setShowAnalysis(false)}
            >
              Job Data
            </button>
            <button
              className={`text-blue-500 hover:text-blue-700 ${showAnalysis ? "font-bold" : ""}`}
              onClick={() => setShowAnalysis(true)}
            >
              Job Analysis
            </button>
          </div>
        </nav>
      </header>
      <div className="flex">
        {showAnalysis ? (
          <JobAnalysis />
        ) : (
          <div className="w-3/4 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentJobEntries.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
            <div className="w-full col-span-full flex flex-col items-center justify-center space-y-4">
              <button
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:bg-gray-100"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:bg-gray-100"
              >
                Next
              </button>
              <div className="text-gray-700">Page {currentPage} of {totalPages}</div>
            </div>
          </div>
        )}
        {!showAnalysis && (
          <aside className="w-1/4 h-screen sticky top-0 p-4">
            <FilterComponent onFilterChange={handleFilterChange} />
          </aside>
        )}
      </div>
    </div>
  );
}
