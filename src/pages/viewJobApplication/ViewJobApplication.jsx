import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import ApiComponent from "../../API/ApiComponent";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error.jsx/ErrorPage";

const ViewJobApplication = () => {
  const {
 
    getJobApplication,
    updateJobApplicationStatus,
   
  } = ApiComponent();

  const { jobId } = useParams();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState(""); // Track selected status

  // Fetch job application details
  const {
    data: applicantsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobApplication", jobId],
    queryFn: () => getJobApplication(jobId),
    enabled: !!jobId, // Ensures the query only runs when `jobId` is available
  });

  // Mutation for updating applicant status
  const mutation = useMutation({
    mutationFn: ({ id, status }) => updateJobApplicationStatus(id, { status }),
    onSuccess: () => {
      // Invalidate the job application query to refetch the updated data
      queryClient.invalidateQueries(["jobApplication", jobId]);
    },
    onError: (error) => {
      console.error("Error updating job application status:", error);
    },
  });

  // Handle loading state
  if (isLoading) {
    return <Loading />;
  }

  // Handle error state
  if (isError) {
    return <ErrorPage errorMessage={error.message} />;
  }

  // Calculate the number of applicants by status
  const selectedCount = applicantsData?.filter(applicant => applicant.status === "Selected").length || 0;
  const hiredCount = applicantsData?.filter(applicant => applicant.status === "Hired").length || 0;
  const underReviewCount = applicantsData?.filter(applicant => applicant.status === "Under Review").length || 0;
  const rejectedCount = applicantsData?.filter(applicant => applicant.status === "Rejected").length || 0;

  // Filter applicants based on selected status
  const filteredApplicants = selectedStatus
    ? applicantsData?.filter(applicant => applicant.status === selectedStatus)
    : applicantsData;

  // Define the fields to display for each applicant
  const fields = [
    { label: "Applicant Name", key: "applicantName" },
    { label: "Expected Salary", key: "expectedSalary" },
    { label: "Skills", key: "skills", render: (skills) => skills?.join(", ") },
  ];

  // Handle dropdown change for status update
  const handleStatusChange = (id, status) => {
    mutation.mutate({ id, status });
  };

  return (
    <div className="w-11/12 max-w-screen-xl min-h-screen mx-auto py-10">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Job Application Details</h2>
        {/* Display the number of applicants by status */}
        <div className="text-lg font-semibold text-gray-700 flex flex-wrap gap-2">
  <button
    className="btn bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-all"
    onClick={() => setSelectedStatus("Hired")}
  >
    {hiredCount} Hired
  </button>
  <button
    className="btn bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-all"
    onClick={() => setSelectedStatus("Selected")}
  >
    {selectedCount} Selected
  </button>
  <button
    className="btn bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-all"
    onClick={() => setSelectedStatus("Under Review")}
  >
    {underReviewCount} Under Review
  </button>
  <button
    className="btn bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-all"
    onClick={() => setSelectedStatus("Rejected")}
  >
    {rejectedCount} Rejected
  </button>
  <button
    className="btn bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-all"
    onClick={() => setSelectedStatus("")} // Reset filter
  >
    All
  </button>
</div>

      </div>

      {/* Displaying filtered applicants data */}
      {filteredApplicants && filteredApplicants.length > 0 ? (
        filteredApplicants.map((applicant, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Application by {applicant.applicantName}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  defaultValue={applicant?.status || "Select Status"}
                  className="p-2 border rounded text-gray-800"
                  value={applicant.status || ""}
                  onChange={(e) => handleStatusChange(applicant._id, e.target.value)}
                >
                  <option value="" disabled>Select Status</option>
                  <option className="text-gray-800" value="Hired">Hired</option>
                  <option className="text-gray-800" value="Under Review">Under Review</option>
                  <option className="text-gray-800" value="Rejected">Rejected</option>
                  <option className="text-gray-800" value="Selected">Selected</option>
                </select>
                <Link
                  className="btn my-4 bg-yellow-900 text-white hover:bg-yellow-800"
                  to={`/applicant-details/${applicant._id}`}
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Applicant Info Table */}
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-4 border-b text-left text-gray-800">Field</th>
                  <th className="px-6 py-4 border-b text-left text-gray-800">Details</th>
                </tr>
              </thead>
              <tbody>
                {/* Display each field */}
                {fields.map((field, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-2 border-b font-semibold text-gray-800">{field.label}</td>
                    <td className="px-6 py-2 border-b text-gray-800">
                      {field.render ? field.render(applicant[field.key]) : applicant[field.key] || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No applicants found for the selected status.</p>
      )}
    </div>
  );
};

export default ViewJobApplication;
