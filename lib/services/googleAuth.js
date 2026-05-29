import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../supabase/supabase";

WebBrowser.maybeCompleteAuthSession();

// Helper to parse query parameters or hash fragments from the redirect URL
const extractParamsFromUrl = (url) => {
  const params = {};
  const delimiter = url.includes("#") ? "#" : "?";
  const parts = url.split(delimiter);

  if (parts.length > 1) {
    const queryString = parts[1];
    const pairs = queryString.split("&");
    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      if (key && value) {
        params[key] = decodeURIComponent(value);
      }
    }
  }
  return params;
};

export const signInWithGoogle = async () => {
  try {
    // Generate the correct redirect URI for deep linking
    const redirectTo = Linking.createURL("/");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) throw error;
    if (!data?.url) throw new Error("No URL returned from Supabase OAuth");

    // Open the OAuth login screen in the browser
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

    if (result.type === "success" && result.url) {
      // Parse session tokens from deep link URL
      const params = extractParamsFromUrl(result.url);
      const accessToken = params.access_token;
      const refreshToken = params.refresh_token;

      if (!accessToken || !refreshToken) {
        throw new Error("Auth tokens not found in the redirect URL");
      }

      // Establish the Supabase session
      const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (sessionError) throw sessionError;

      return { data: sessionData, error: null };
    } else {
      return { data: null, error: new Error("Google login flow was cancelled or closed") };
    }
  } catch (error) {
    console.log("Google Auth Error:", error);
    return { data: null, error };
  }
};