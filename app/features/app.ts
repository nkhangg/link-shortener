import { supabase } from "@/lib/supabase";

export const genShortUrl = (data: IShortenedUrl) => {
  const url = window.location.href;

  return `${url}short/${data.id}`;
};

export const handleLoginWithGoogle = async () => {
  console.log({ uri: `${window.location.origin}/` });
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/`, // quan trọng
    },
  });

  if (error) {
    console.error("Google login error:", error.message);
  } else {
    console.log("Redirecting to Google login:", data.url);
  }
};
