import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Movies from "@/pages/movies";
import TvShows from "@/pages/tv-shows";
import MyList from "@/pages/my-list";
import MovieDetails from "@/pages/movie-details";
import Sidebar from "./components/layout/sidebar";
import Topbar from "./components/layout/topbar";

function Router() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-20 lg:ml-64 overflow-y-auto custom-scrolling">
        <Topbar />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/movies" component={Movies} />
          <Route path="/tv-shows" component={TvShows} />
          <Route path="/my-list" component={MyList} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
