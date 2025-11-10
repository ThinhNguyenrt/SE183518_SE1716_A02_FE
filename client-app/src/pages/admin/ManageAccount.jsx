// src/pages/admin/ManageAccounts.jsx
import React, { useEffect, useState } from "react";
import { getAccounts } from "../../api/api"; // import API
import "./ManageAccount.css";

export default function ManageAccount() {
  const [accounts, setAccounts] = useState([]); // đảm bảo mặc định là mảng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAccounts(); // gọi API

      // Debug: in ra console để bạn biết backend trả về gì
      console.log("getUsers() returned:", data);

      // Trường hợp phổ biến:
      // - data là mảng trực tiếp -> dùng luôn
      // - data là object chứa mảng trong data.items / data.result / data.accounts...
      // - data là object 1 item -> chuyển thành mảng 1 phần tử
      let accountsArray = [];

      if (Array.isArray(data)) {
        accountsArray = data;
      } else if (data == null) {
        accountsArray = [];
      } else if (Array.isArray(data.data)) {
        accountsArray = data.data;
      } else if (Array.isArray(data.items)) {
        accountsArray = data.items;
      } else if (Array.isArray(data.result)) {
        accountsArray = data.result;
      } else if (Array.isArray(data.accounts)) {
        accountsArray = data.accounts;
      } else {
        // fallback: nếu là object, lấy values (thường không mong muốn, nhưng an toàn)
        // hoặc nếu là single object, đặt nó vào mảng 1 phần tử
        if (typeof data === "object") {
          const values = Object.values(data);
          // nếu values chứa mảng lớn nhất -> dùng nó
          const biggestArray = values.find((v) => Array.isArray(v));
          if (biggestArray) accountsArray = biggestArray;
          else accountsArray = [data];
        } else {
          accountsArray = [];
        }
      }

      setAccounts(accountsArray);
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
      setError(err?.message || "Unknown error");
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  if (loading) return <h2>Loading accounts...</h2>;
  if (error) return <div>
    <h2>Error loading accounts</h2>
    <p style={{ color: "red" }}>{error}</p>
    <button onClick={fetchAccounts} className="btn">Retry</button>
  </div>;

  return (
    <div className="manage-acc-container">
      <h1>Manage Accounts</h1>

      <div className="top-actions">
        <button className="btn add">+ Add Account</button>
      </div>

      <table className="acc-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Can Delete</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {accounts.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                No accounts found
              </td>
            </tr>
          ) : (
            accounts.map((acc, idx) => {
              // Nếu API trả tên trường khác, thử các key phổ biến
              const id = acc.accountId ?? acc.id ?? acc.userId ?? idx;
              const name = acc.accountName ?? acc.name ?? acc.userName ?? "-";
              const email = acc.accountEmail ?? acc.email ?? "-";
              const role = acc.roleName ?? (acc.accountRole != null ? String(acc.accountRole) : "-");
              const created = acc.createdNewsArticlesCount ?? acc.createdCount ?? 0;
              const updated = acc.updatedNewsArticlesCount ?? acc.updatedCount ?? 0;
              const canDelete = acc.canDelete ?? true;

              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                  <td>{created}</td>
                  <td>{updated}</td>
                  <td>{canDelete ? "Yes" : "No"}</td>
                  <td>
                    <button className="btn update">Update</button>
                    <button className="btn delete" disabled={!canDelete}>Delete</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
