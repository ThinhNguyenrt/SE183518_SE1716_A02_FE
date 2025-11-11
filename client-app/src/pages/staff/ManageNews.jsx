import React, { useEffect, useState } from "react";
import {
  getNewsArticles,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
} from "../../api/api";
import "./ManageNews.css";

const ManageNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [form, setForm] = useState({
    newsTitle: "",
    headline: "",
    newsContent: "",
    newsSource: "",
    categoryId: "",
    newsStatus: true,
    tagIds: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch news
  const fetchNews = async () => {
    try {
      const data = await getNewsArticles();
      setNewsList(data);
    } catch (error) {
      console.error("❌ Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateNewsArticle(editingId, form);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await createNewsArticle(form);
      }
      setForm({
        newsTitle: "",
        headline: "",
        newsContent: "",
        newsSource: "",
        categoryId: "",
        newsStatus: true,
        tagIds: [],
      });
      fetchNews();
    } catch (error) {
      console.error("❌ Error saving news:", error);
    }
  };

  const handleEdit = (news) => {
    setIsEditing(true);
    setEditingId(news.newsArticleId);
    setForm({
      newsTitle: news.newsTitle,
      headline: news.headline,
      newsContent: news.newsContent,
      newsSource: news.newsSource,
      categoryId: news.categoryId,
      newsStatus: news.newsStatus,
      tagIds: news.tagIds || [],
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá bài viết này?")) {
      await deleteNewsArticle(id);
      fetchNews();
    }
  };

  return (
    <div className="manage-news-container">
      <h2>📰 Manage News Articles</h2>

      <form className="news-form" onSubmit={handleSubmit}>
        <input
          name="newsTitle"
          placeholder="Title"
          value={form.newsTitle}
          onChange={handleChange}
          required
        />
        <input
          name="headline"
          placeholder="Headline"
          value={form.headline}
          onChange={handleChange}
          required
        />
        <textarea
          name="newsContent"
          placeholder="Content"
          value={form.newsContent}
          onChange={handleChange}
          required
        />
        <input
          name="newsSource"
          placeholder="Source"
          value={form.newsSource}
          onChange={handleChange}
        />
        <input
          name="categoryId"
          placeholder="Category ID"
          value={form.categoryId}
          onChange={handleChange}
        />
        <select
          name="newsStatus"
          value={form.newsStatus}
          onChange={(e) =>
            setForm({ ...form, newsStatus: e.target.value === "true" })
          }
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <input
          name="tagIds"
          placeholder="Tag IDs (comma separated)"
          value={form.tagIds.join(",")} // ✅ hiển thị lại thành chuỗi
          onChange={(e) =>
            setForm({
              ...form,
              tagIds: e.target.value
                .split(",")
                .map((id) => id.trim())
                .filter((id) => id !== ""), // loại bỏ ô trống
            })
          }
        />

        <button type="submit">
          {isEditing ? "Update News" : "Create News"}
        </button>
      </form>

      <hr />

      <h3>📋 News List</h3>
      <table className="news-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Headline</th>
            <th>Category</th>
            <th>Status</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsList.length > 0 ? (
            newsList.map((item) => (
              <tr key={item.newsArticleId}>
                <td>{item.newsTitle}</td>
                <td>{item.headline}</td>
                <td>{item.categoryName || item.categoryId}</td>
                <td>{item.newsStatus ? "✅ Active" : "❌ Inactive"}</td>
                <td>{item.newsSource}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>✏️ Edit</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.newsArticleId)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No news articles found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageNews;
