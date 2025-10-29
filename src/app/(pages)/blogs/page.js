"use client";

import BlogsList from "../../components/BlogsList/BlogsList";
import Spinner from "../../components/CustomUI/Spinner/Spinner";
import { useState, useEffect } from "react";

function Blogs() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch data using query parameters for pagination
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/?page=${currentPage}&limit=10`, // Pass page and limit in query
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data, totalPages } = await response.json(); // Get totalPages from the response
      setData(data);
      setTotalPages(totalPages); // Update totalPages from the response
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, [currentPage]); // Re-fetch data when currentPage changes

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage); // Update currentPage and trigger re-fetch
    }
  };

  return (
    <section style={{ minHeight: "500px" }}>
      {loading ? (
        <Spinner />
      ) : (
        <BlogsList
          data={data}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          fetchData={fetchData}
        />
      )}
    </section>
  );
}

export default Blogs;
