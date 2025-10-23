"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const formSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  phoneCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  location: z.string().optional(),
  linkedIn: z.string().url().optional().or(z.literal("")),
  link: z.string().url().optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface ProfileFormProps {
  initialUser: {
    email: string;
    firstname?: string;
    lastname?: string;
    phoneCode?: string;
    phoneNumber?: string;
    location?: string;
    linkedIn?: string;
    link?: string;
  };
}

export default function ProfileForm({ initialUser }: ProfileFormProps) {
  const [success, setSuccess] = useState(false);

  const {
  register,
  handleSubmit,
  setValue,
  watch,
  formState: { errors, isSubmitting },
} = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: initialUser,
});

  async function onSubmit(data: FormData) {
    setSuccess(false);
    const { error } = await supabase
      .from("User")
      .update(data)
      .eq("email", initialUser.email);

    if (error) {
      console.error(error);
      return;
    }

    setSuccess(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label className="mb-2">Email (read only)</Label>
        <Input
          value={initialUser.email}
          readOnly
          className="bg-gray-100 cursor-not-allowed my-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2" htmlFor="firstname">First Name</Label>
          <Input id="firstname" {...register("firstname")} />
        </div>
        <div>
          <Label className="mb-2" htmlFor="lastname">Last Name</Label>
          <Input id="lastname" {...register("lastname")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>          

        </div>
        <div>
          <Label className="mb-2" htmlFor="phoneNumber">Phone Number</Label>
         <PhoneInput
          country={"kr"}
          value={watch("phoneNumber") ?? ""}
          onChange={(value, country) => {
            if (country && "dialCode" in country) {
              const code = `${country.dialCode}`;
              setValue("phoneCode", code);
              setValue("phoneNumber", value);
            }
          }}
          inputProps={{ name: "phoneNumber", required: false }}
          inputStyle={{
            width: "100%",
            borderRadius: "0.5rem",
          }}
          buttonStyle={{
            borderRadius: "0.5rem 0 0 0.5rem",
            }}
        />
        </div>
      </div>

      <div>
        <Label className="mb-2" htmlFor="location">Location</Label>
        <Input id="location" {...register("location")} />
      </div>

      <div>
        <Label className="mb-2" htmlFor="linkedIn">LinkedIn</Label>
        <Input id="linkedIn" {...register("linkedIn")} />
        {errors.linkedIn && (
          <p className="text-sm text-red-500">{errors.linkedIn.message}</p>
        )}
      </div>

      <div>
        <Label className="mb-2" htmlFor="link">Personal Link</Label>
        <Input id="link" {...register("link")} />
        {errors.link && (
          <p className="text-sm text-red-500">{errors.link.message}</p>
        )}
      </div>

      <div className="pt-4">
        <Button type="submit" className="w-full bg-green-500 text-black" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
        {success && (
          <p className="text-green-600 text-center mt-3">
            Profile updated successfully!
          </p>
        )}
      </div>
    </form>
  );
}