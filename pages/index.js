'use client';
import React, { useEffect, useState } from "react";
import FilterComponent from "@/app/components/FilterComponent";
import JobCard from "@/app/components/JobCard";
import JobAnalysis from "@/app/components/JobAnalysis";

const itemsPerPage = 21;

export default function Home() {
  const [jobEntries, setJobEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch('/api/salaries');
      const data = await response.json();
      setJobEntries(data);
      setFilteredEntries(data);
    }
    fetchJobs();
  }, []);

  const handleFilterChange = (filters) => {
    // Add filtering logic here based on filters
    // Example for workYear filter (add others as needed):
    const filtered = jobEntries.filter(job => job.work_year === filters.workYear);
    setFilteredEntries(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobEntries = filteredEntries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);

  if (!filteredEntries.length && !showAnalysis) {
    return <div>No job data available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3 flex justify-center">
          <div className="flex items-center space-x-4">
            <button
              className={`text-blue-500 hover:text-blue-700 ${
                !showAnalysis ? "font-bold" : ""
              }`}
              onClick={() => setShowAnalysis(false)}
            >
              Job Data
            </button>
            <button
              className={`text-blue-500 hover:text-blue-700 ${
                showAnalysis ? "font-bold" : ""
              }`}
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
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:bg-gray-100"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:bg-gray-100"
              >
                Next
              </button>
              <div className="text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
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
