import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import AuthProvider from "@/utils/context/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
export default function App({ Component, pageProps }) {

    const queryClient = new QueryClient();
  
  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>  
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  </QueryClientProvider>
  )
}
