"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface PostFormProps {
  onPostCreated: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("backend");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  }, [file]);

  const isImageFile = (file: File): boolean => file.type.startsWith("image/");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const uploadedFile = event.target.files?.[0] || null;
    if (uploadedFile && !isImageFile(uploadedFile)) {
      setMessage("Only image files are allowed.");
      setFile(null);
      return;
    }
    setFile(uploadedFile);
    setMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setMessage("");

    if (!title || !content || !category || !file) {
      setMessage("All fields are required. Please complete the form.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("file", file);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Post created successfully!");
        onPostCreated();
        setTitle("");
        setContent("");
        setCategory("backend");
        setFile(null);
      } else {
        setMessage(data.message || "Error creating post.");
      }
    } catch (error) {
      setMessage("Error creating post.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1rem" }}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ marginRight: "1rem" }}>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ borderColor: title ? "" : "red", color: "black" }}
            required
          />
        </div>
        <div>
          <label style={{ marginRight: "1rem" }}>Conteúdo:</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{ borderColor: content ? "" : "red", color: "black", backgroundColor: "white" }}
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                [{ 'align': [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'video'],
                ['clean']
              ]
            }}
          />
        </div>
        <div>
          <label style={{ marginRight: "1rem" }}>Categoria:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ borderColor: category ? "" : "red", color: "black" }}
            required
          >
            <option value="backend">BackEnd</option>
            <option value="frontend">FrontEnd</option>
            <option value="devOps">DevOps</option>
          </select>
        </div>
        <div>
          <label style={{ marginRight: "1rem" }}>Mídia:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ borderColor: file ? "" : "red", color: "black" }}
            required
          />
        </div>
        <button type="submit" style={{ backgroundColor: "green", color: "white" }}>
          Criar Post
        </button>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>
      <div style={{ flex: 1, border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
        <h2>Preview do Post</h2>
        <h3 style={{ color: "black" }}>{title}</h3>
        <section style={{ color: "black" }} dangerouslySetInnerHTML={{ __html: content }}></section>
        {imagePreviewUrl && (
          <img
            src={imagePreviewUrl}
            alt="Imagem do Post"
            style={{ maxWidth: "100%", height: "auto", marginTop: "1rem" }}
          />
        )}
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .container {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
};

export default PostForm;
