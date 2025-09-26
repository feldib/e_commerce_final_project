import { redirect } from "next/navigation";

function AdminPage() {
  redirect("/admin/artworks");
}

export default AdminPage;
