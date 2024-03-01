import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import App from "./App";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // scaleTime: Infinity,
            // cacheTime: 3000
        }
    }
})

ReactDOM.render(
<QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
</QueryClientProvider>
, document.getElementById("root"));
