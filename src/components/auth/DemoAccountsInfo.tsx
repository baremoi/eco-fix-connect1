
export default function DemoAccountsInfo() {
  return (
    <div className="bg-amber-100 p-2 rounded text-amber-800 text-center text-sm mt-2">
      <p>This is a mock authentication system.</p>
      <p>Use these demo accounts (password: "password"):</p>
      <ul className="mt-1 list-disc list-inside">
        <li>user@example.com (User role)</li>
        <li>provider@example.com (Tradesperson role)</li>
        <li>admin@example.com (Admin role)</li>
      </ul>
    </div>
  );
}
