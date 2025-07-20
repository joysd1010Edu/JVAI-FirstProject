"use client";
import { useState, useEffect, use } from "react";
import { ResourceCard } from "./ResourceCard";
import { useAxios } from "@/providers/AxiosProvider";

// Sample workbook data
const sampleWorkbooks = [
  {
    "id": 1,
    "title": "Mental health",
    "banner": "http://10.10.12.53:8000/media/workbooks/banners/Screenshot_2025-07-19_052733.png",
    "pdf_file": "/media/workbooks/pdfs/mental_health_pdf_1.pdf",
    "category": {
      "id": 1,
      "name": "Dream"
    },
    "created_at": "2025-07-18T23:25:49Z",
    "is_locked": false
  }
];

 const ResourceNav = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [workbookData, setWorkbookData] = useState([]);
  const [filteredWorkbooks, setFilteredWorkbooks] = useState([]);
  const [filterCategories, setCategories] = useState(["All", "Favorites"]);
  const axios = useAxios();

  useEffect(() => {

    const fetchWorkbooks = async () => {
      try {
        const response = await axios.get('/api/workbook/workbooks/');
        setWorkbookData(response.data);
        setFilteredWorkbooks(response.data);
        
        const categories = ["All", "Favorites"];
        response.data.forEach((item) => {
          if (item.category?.name) {
            const categoryName = item.category.name.charAt(0).toUpperCase() + item.category.name.slice(1).toLowerCase();
            if (!categories.includes(categoryName)) {
              categories.push(categoryName);
            }
          }
        });
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching workbooks:', error);
        // Fallback to sample data if API fails
        setWorkbookData(sampleWorkbooks);
        setFilteredWorkbooks(sampleWorkbooks);
      }
    };

    fetchWorkbooks();
  }, []);

  const handleFilterChange = (category) => {
    setActiveFilter(category);

    if (category === "All") {
      setFilteredWorkbooks(workbookData);
    } else if (category === "Favorites") {
      // For demo purposes, show empty favorites
      setFilteredWorkbooks([]);
    } else {
      const filtered = workbookData.filter(
        (workbook) =>
          workbook.category?.name?.toLowerCase() === category.toLowerCase() ||
          workbook.title.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredWorkbooks(filtered);
    }
  };

  return (
    <div className="py-5">
      {/* Navigation Bar */}
      <div className="bg-[#0e1c33] flex gap-3 text-white rounded-lg mb-8">
        {filterCategories.map((category) => (
          <div
            key={category}
            className={`rounded-md px-5 py-4 cursor-pointer transition-all duration-300 ${
              activeFilter === category
                ? "bg-primary"
                : "bg-transparent hover:bg-primary/20"
            }`}
            onClick={() => handleFilterChange(category)}
          >
            <h1 className="font-medium">{category}</h1>
          </div>
        ))}
      </div>

      {/* Workbook Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {filteredWorkbooks.map((workbook) => (
          <ResourceCard
            key={workbook.id}
            workbook={workbook}
            isFavorite={false} 
          />
        ))}
      </div>

      {filteredWorkbooks.length === 0 && (
        <div className="text-center text-white/70 py-12">
          <p className="text-lg">
            No workbooks found for "{activeFilter}" category
          </p>
        </div>
      )}
    </div>
  );
};

export default ResourceNav;
