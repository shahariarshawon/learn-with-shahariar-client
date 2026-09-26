"use client";

import React, { useState } from "react";
import { UserManagementRecord, UserRole } from "@/types/dashboard.types";
import { toast } from "react-toastify";

interface UserTableProps {
  users: UserManagementRecord[];
  onRoleChange?: (userId: string, newRole: UserRole) => void;
  onStatusToggle?: (userId: string, currentStatus: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onRoleChange,
  onStatusToggle,
}) => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden space-y-4">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-slate-100">
        <div>
          <h4 className="text-base font-bold text-slate-900">User Directory & Management</h4>
          <p className="text-xs text-slate-500">Manage user roles, permissions, and account status</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium focus:border-[#7F265B] focus:outline-none w-56"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium focus:border-[#7F265B] focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="instructor">Instructors</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3.5">User</th>
              <th className="px-6 py-3.5">Role</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Joined Date</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-xs text-slate-400">
                  No users found matching your filters.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7F265B] font-bold text-white text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900">{u.name}</h5>
                        <span className="text-xs text-slate-400">{u.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      onChange={(e) => onRoleChange && onRoleChange(u.id, e.target.value as UserRole)}
                      className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        u.status === "active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs font-medium text-slate-500">{u.joinedDate}</td>

                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onStatusToggle && onStatusToggle(u.id, u.status)}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      {u.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
