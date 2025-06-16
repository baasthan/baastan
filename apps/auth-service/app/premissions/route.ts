import {
  createClient,
  createServiceClient,
} from "@workspace/supabase-provider/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const supabaseSericeClient = await createServiceClient();
    const { data: permissions, error } = await supabaseSericeClient
      .from("user_roles")
      .select(
        `
        role_id,
        role_permissions:role_permissions(
          permission:permissions(
            id,
            resource:resources(resource_name),
            resource_action
          )
        )
      `
      )
      .eq("user_id", user.id);
    
    const data =await supabaseSericeClient.schema("public").from("user_role").select("")

    if (error) {
      console.error("Error fetching permissions:", error);
    } else {
      console.log("Permissions:", permissions);
    }
  }
  return NextResponse.json({ message: "Dummy Response" });
}
