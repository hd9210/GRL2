import { useState } from "react";
import "./AdminDashboardPage.css";

const AdminDashboardPage = () => {
  const [files1, setFiles1] = useState([]);
  const [files2, setFiles2] = useState([]);

  const handleUpload = async (files, fileNumber) => {
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);

      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert(`File ${fileNumber} uploaded successfully!`);
        } else {
          alert(`File ${fileNumber} upload failed!`);
        }
      } catch (error) {
        console.error(`Error uploading file ${fileNumber}:`, error);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Welcome, Admin!</h1>

      <div className="grid-container">
        {[{ id: "Rate Chart", files: files1, setFiles: setFiles1 }, { id: "Farmer List", files: files2, setFiles: setFiles2 }].map((item) => (
          <div key={item.id} className="file-upload-box">
            <h3>Upload CSV {item.id}</h3>
            <input type="file" accept=".csv" onChange={(e) => item.setFiles(e.target.files)} />
            <button className="admin-button" onClick={() => handleUpload(item.files, item.id)}>Upload File </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
