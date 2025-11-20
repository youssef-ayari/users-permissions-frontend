import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

interface Permission {
  id: string;
  action: string;
  description: string;
}

export default function Permissions() {
  // Fetch permissions
  const { data: permissions, isLoading } = useQuery<Permission[], Error>({
    queryKey: ["permissions"],
    queryFn: async () => {
      const res = await api.get("/permissions");
      return res.data as Permission[];
    },
  });

  if (isLoading) return <div>Loading permissions...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Permissions</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Action</th>
              <th className="border p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {permissions?.map((perm: Permission) => (
              <tr key={perm.id} className="hover:bg-gray-100">
                <td className="border p-2">{perm.action}</td>
                <td className="border p-2">{perm.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
