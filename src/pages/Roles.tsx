import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import IfPermitted from "../components/IfPermitted";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export default function Roles() {
  const queryClient = useQueryClient();

  // Fetch roles
  const { data: roles, isLoading } = useQuery<Role[], Error>({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await api.get("/roles");
      return res.data as Role[];
    },
  });

  // Mutation: attach/detach permission
  const togglePermission = useMutation<
    void,
    Error,
    { roleId: string; permission: string }
  >({
    mutationFn: async ({ roleId, permission }) => {
      await api.post(`/roles/${roleId}/toggle-permission`, { permission });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  });

  if (isLoading) return <div>Loading roles...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Roles</h1>

      <IfPermitted permission="role.create">
        <button className="bg-green-600 text-white px-3 py-2 rounded mb-4">
          Create Role
        </button>
      </IfPermitted>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Permissions Count</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((role: Role) => (
              <tr key={role.id} className="hover:bg-gray-100">
                <td className="border p-2">{role.name}</td>
                <td className="border p-2">{role.description}</td>
                <td className="border p-2">{role.permissions.length}</td>
                <td className="border p-2 space-x-2">
                  <IfPermitted permission="role.update">
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                      onClick={() =>
                        togglePermission.mutate({
                          roleId: role.id,
                          permission: "example_permission",
                        })
                      }>
                      Edit Permissions
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
