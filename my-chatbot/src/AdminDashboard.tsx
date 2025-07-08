
import React, {useState} from 'react';

const AdminDashboard : React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    setUploadMessage(null);
    if (file) {
      console.log("File selected:", file.name);
    }
  };

 const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file first.");
      return;
    }
    setUploading(true);
    setUploadMessage(null);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8080/api/upload-knowledge', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setUploadMessage("File uploaded successfully!");
        setSelectedFile(null);
      } else {
        setUploadMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      setUploadMessage("An error occurred during upload.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    // use tailwind css for styling
    <div className="">
      <div className="max-w-2xl mx-auto bg-white p-6 ">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-6">This is the admin dashboard where you can manage the chatbot settings.</p>
        
        {/* List of current knowledge uploaded to the agent */}
        <div className="knowledge-list mb-6">
          <h2 className="text-xl font-semibold mb-2">Current Knowledge Base</h2>
          <ul className="list-disc pl-5">
            <li>Knowledge Item 1</li>
            <li>Knowledge Item 2</li>
            <li>Knowledge Item 3</li>
            {/* Add more items as needed */}
          </ul>
        </div>

        {/* Upload button to upload new knowledge to the agent, upload files can be txt, doc, or pdf, add upload function*/}
        {/* limit upload file types */}
      <div className="upload-section mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload New Knowledge</h2>
        <input        
          type="file"
          accept=".txt,.doc,.pdf"
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              console.log("File selected:", file.name);
              // Add upload logic here
            }
          }}  
        />
        {/* Add a button to handle the upload */} 
         {/* add tips of types of uploading files */}
        <p className="text-sm text-gray-500 mb-4">Supported file types: .txt, .doc, .pdf</p>
         {/* upload button to upload new knowledge to the agent */}
       <div className="flex justify-end">
         {/* add a button to upload knowledge */}
          {/* add submit function to submit to the backend */}

          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Upload Knowledge 
          </button>
        </div>
      </div>
    
       
      </div> 
     
    </div>
  );
}

export default AdminDashboard;