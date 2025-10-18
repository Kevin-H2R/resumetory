import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

const ProfilePage = async () => {
  const supabase = await createClient()
 const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }
  return <div className="p-4 sm:p-15 md:p-25 lg:p-35">
    <div>{user.id}</div>
  </div>
}

export default ProfilePage