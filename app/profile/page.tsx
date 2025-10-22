import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login"); // redirect if not logged in
  }

  // Fetch user's data from your User table
  const { data: profile } = await supabase
    .from("User")
    .select("*")
    .eq("email", user.email)
    .single();

  return (
    <main className="min-h-screen py-12 px-4 bg-black text-white">
      <div className="max-w-2xl mx-auto p-8 rounded-2xl shadow-md" style={{ backgroundColor: '#171717' }}>
        <h1 className="text-2xl font-semibold text-center mb-8 text-white">My Profile</h1>
        <ProfileForm
          initialUser={{
            email: user.email ?? "",
            firstname: profile?.firstname ?? "",
            lastname: profile?.lastname ?? "",
            phoneCode: profile?.phoneCode ?? "",
            phoneNumber: profile?.phoneNumber ?? "",
            location: profile?.location ?? "",
            linkedIn: profile?.linkedIn ?? "",
            link: profile?.link ?? "",
          }}
        />
      </div>
    </main>
  );
}