import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/api";
import "./ManageCategories.css";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
    parentCategoryId: "",
    isActive: true,
  });

  // ✅ Fetch all categories
  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ✅ Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);
      alert("Category deleted successfully!");
      setCategories((prev) => prev.filter((c) => c.categoryId !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed!");
    }
  };

  // ✅ Open modal for create or update
  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        categoryName: category.categoryName,
        categoryDescription: category.categoryDescription,
        parentCategoryId: category.parentCategoryId || "",
        isActive: category.isActive,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        categoryName: "",
        categoryDescription: "",
        parentCategoryId: "",
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // ✅ Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Handle create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        parentCategoryId: formData.parentCategoryId || null,
      };

      if (editingCategory) {
        await updateCategory(editingCategory.categoryId, dataToSend);
        alert("Category updated successfully!");
      } else {
        await createCategory(dataToSend);
        alert("Category created successfully!");
      }

      closeModal();
      loadCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category");
    }
  };

  if (loading) return <div className="loader">Loading categories...</div>;

  return (
    <div className="category-container">
      <div className="header-row">
        <h2>📂 Manage Categories</h2>
        <button className="btn create-btn" onClick={() => openModal()}>
          ➕ Create Category
        </button>
      </div>

      <p className="subtitle">View, create, update, or delete categories</p>

      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <tr key={cat.categoryId}>
                <td className="truncate">{cat.categoryId}</td>
                <td>{cat.categoryName}</td>
                <td>{cat.categoryDescription}</td>
                <td>
                  <span
                    className={`status-badge ${
                      cat.isActive ? "active" : "inactive"
                    }`}
                  >
                    {cat.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn update-btn"
                    onClick={() => openModal(cat)}
                  >
                    ✏️ Update
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(cat.categoryId)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingCategory ? "✏️ Update Category" : "➕ Create Category"}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Description:
                <textarea
                  name="categoryDescription"
                  value={formData.categoryDescription}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Parent Category ID:
                <input
                  type="text"
                  name="parentCategoryId"
                  value={formData.parentCategoryId}
                  onChange={handleChange}
                  placeholder="(optional)"
                />
              </label>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                Active
              </label>

              <div className="modal-buttons">
                <button type="submit" className="btn save-btn">
                  💾 Save
                </button>
                <button type="button" className="btn cancel-btn" onClick={closeModal}>
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
