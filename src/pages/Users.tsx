import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import IfPermitted from "../components/IfPermitted";

interface User {
  id: string;
  email: string;
  status: "active" | "inactive";
  roles: string[];
  permissions: string[];
}

export default function Users() {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users, isLoading } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data as User[];
    },
  });

  // Activate / Deactivate mutation
  const toggleStatus = useMutation<void, Error, User>({
    mutationFn: async (user: User) => {
      const action = user.status === "active" ? "deactivate" : "activate";
      await api.post(`/users/${user.id}/${action}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <IfPermitted permission="user.create">
        <button className="bg-green-600 text-white px-3 py-2 rounded mb-4">
          Create User
        </button>
      </IfPermitted>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Roles</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border p-2">{user.email}</td>
                <td className="border p-2 capitalize">{user.status}</td>
                <td className="border p-2">{user.roles.join(", ")}</td>
                <td className="border p-2 space-x-2">
                  <IfPermitted permission="user.update">
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                      onClick={() => toggleStatus.mutate(user)}>
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </IfPermitted>

                  <IfPermitted permission="user.update">
                    <button className="bg-purple-600 text-white px-2 py-1 rounded">
                      Assign Role
                    </button>
                  </IfPermitted>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
