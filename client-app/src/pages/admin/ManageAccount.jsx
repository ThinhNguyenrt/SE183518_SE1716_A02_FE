// src/pages/admin/ManageAccount.jsx
import React, { useEffect, useState } from "react";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccountById,
} from "../../api/api";
import "./ManageAccount.css";

export default function ManageAccount() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [editData, setEditData] = useState(null);

  const [deleteId, setDeleteId] = useState("");

  // ✅ Fetch accounts
  const fetchAccounts = async () => {
    setLoading(true);

    try {
      const data = await getAccounts();

      let array = [];

      if (Array.isArray(data)) array = data;
      else if (Array.isArray(data?.data)) array = data.data;
      else array = Object.values(data).find((v) => Array.isArray(v)) || [];

      setAccounts(array);
    } catch (err) {
      console.error("Fetch accounts error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // ✅ CREATE ACCOUNT
  const handleCreate = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const payload = {
      accountName: form.get("name"),
      accountEmail: form.get("email"),
      accountPassword: form.get("password"),
      accountRole: Number(form.get("role")),
    };

    await createAccount(payload);
    setShowAddPopup(false);
    fetchAccounts();
  };

  // ✅ UPDATE ACCOUNT
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const payload = {
      accountName: form.get("name"),
      accountEmail: form.get("email"),
      accountPassword: form.get("password"),
      accountRole: Number(form.get("role")),
    };

    await updateAccount(editData.accountId, payload);
    setShowUpdatePopup(false);
    fetchAccounts();
  };

  // ✅ DELETE ACCOUNT
  const handleDelete = async () => {
    if (!deleteId) {
      alert("Please enter Account ID to delete");
      return;
    }

    await deleteAccountById(deleteId);
    setDeleteId("");
    fetchAccounts();
  };

  // ✅ Loading
  if (loading) return <h2 style={{ padding: "20px" }}>Loading accounts...</h2>;

  return (
    <div className="manage-acc-container">
      <h1>Manage Accounts</h1>

      {/* ✅ Top actions */}
      <div className="top-actions">
        <button className="btn add" onClick={() => setShowAddPopup(true)}>
          + Add Account
        </button>
      </div>

      {/* ✅ Delete box */}
      <div className="delete-box">
        <input
          type="text"
          placeholder="Enter Account ID to delete"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button className="btn delete" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {/* ✅ Accounts table */}
      <table className="acc-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th style={{ width: "140px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No accounts found
              </td>
            </tr>
          ) : (
            accounts.map((acc) => (
              <tr key={acc.accountId}>
                <td>{acc.accountId}</td>
                <td>{acc.accountName}</td>
                <td>{acc.accountEmail}</td>
                <td>{acc.accountRole}</td>
                <td>
                  <button
                    className="btn update"
                    onClick={() => {
                      setEditData(acc);
                      setShowUpdatePopup(true);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ✅ POPUP: CREATE */}
      {showAddPopup && (
        <div className="popup">
          <form className="popup-content" onSubmit={handleCreate}>
            <h2>Create Account</h2>

            <input name="name" placeholder="Account Name" required />
            <input name="email" placeholder="Email" required />
            <input name="password" placeholder="Password" required />
            <input
              name="role"
              placeholder="Role (1=Admin, 2=Staff, 3=User)"
              required
            />

            <div className="popup-actions">
              <button type="submit" className="btn add">
                Create
              </button>
              <button
                type="button"
                className="btn cancel"
                onClick={() => setShowAddPopup(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ✅ POPUP: UPDATE */}
      {showUpdatePopup && (
        <div className="popup">
          <form className="popup-content" onSubmit={handleUpdate}>
            <h2>Update Account</h2>

            <input
              name="name"
              defaultValue={editData.accountName}
              required
            />
            <input
              name="email"
              defaultValue={editData.accountEmail}
              required
            />
            <input
              name="password"
              placeholder="New Password (optional)"
            />
            <input
              name="role"
              defaultValue={editData.accountRole}
              required
            />

            <div className="popup-actions">
              <button type="submit" className="btn update">
                Update
              </button>
              <button
                type="button"
                className="btn cancel"
                onClick={() => setShowUpdatePopup(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
