import { redirect } from "next/navigation";

export default function Page() {
  // Redirect to sign-in instead of allowing signup
  redirect("/sign-in");
}
