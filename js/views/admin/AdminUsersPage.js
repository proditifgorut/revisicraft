export default function AdminUsersPage({ authManager }) {
  const users = authManager.getAllUsers();
  return `
    <h1 class="text-2xl font-bold mb-6">Manajemen Pengguna</h1>
    <div class="card">
      <div class="card-body">
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Peran</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td>${u.name}</td>
                  <td>${u.email}</td>
                  <td><span class="badge badge-secondary">${u.role}</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" disabled>Edit</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
