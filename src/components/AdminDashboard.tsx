import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface UserData {
  id: number;
  v4l_x: string;
  p4ss_y: string;
  tm_z: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin");
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("d4t4_str")
        .select("*")
        .order("tm_z", { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/admin");
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const { error } = await supabase.from("d4t4_str").delete().eq("id", id);

      if (error) {
        console.error("Error deleting user:", error);
      } else {
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear all data?")) {
      try {
        const { error } = await supabase.from("d4t4_str").delete().gte("id", 0);

        if (error) {
          console.error("Error clearing data:", error);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error clearing data:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="bg-secondary border border-input rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background p-4 rounded-lg border border-input">
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <div className="bg-background p-4 rounded-lg border border-input">
                <p className="text-sm text-muted-foreground">Last Entry</p>
                <p className="text-sm font-semibold">
                  {users.length > 0
                    ? new Date(users[0].tm_z).toLocaleDateString()
                    : "No data"}
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg border border-input">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-sm font-semibold text-green-600">Active</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary border border-input rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Data</h2>
              {users.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg font-semibold text-xs hover:bg-red-200 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No data available</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-input">
                      <th className="text-left px-4 py-3 font-semibold text-sm">Field 1</th>
                      <th className="text-left px-4 py-3 font-semibold text-sm">Field 2</th>
                      <th className="text-left px-4 py-3 font-semibold text-sm">Timestamp</th>
                      <th className="text-right px-4 py-3 font-semibold text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-input hover:bg-background transition-colors"
                      >
                        <td className="px-4 py-3 text-sm">{user.v4l_x}</td>
                        <td className="px-4 py-3 text-sm">{user.p4ss_y}</td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(user.tm_z).toLocaleString()}
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
