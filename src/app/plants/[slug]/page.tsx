// src/app/plants/[slug]/page.tsx

import { stackServerApp } from "@/stack";
import { getPlantById } from "../../../../actions/plant.actions";
import PlantCard from "./PlantCard";
import { SignIn } from "@stackframe/stack";

// For metadata function
export async function generateMetadata({ params }: { params: any }) {
  // For metadata we need to handle it differently
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug || "";
  const id = slug.split("--")[0] || "";

  const plant = await getPlantById(id);

  return {
    title: plant?.name || "Plant Page",
  };
}

// For the main page component
export default async function Page({ params }: { params: any }) {
  try {
    // Get user first
    const user = await stackServerApp.getUser();
    if (!user) {
      return <SignIn />;
    }

    // IMPORTANT: Explicitly await the params object itself
    const resolvedParams = await Promise.resolve(params);

    // Now it's safe to use the properties
    const slug = resolvedParams?.slug || "";
    const id = slug.split("--")[0] || "";

    // Fetch plant data
    const plant = await getPlantById(id);

    // Handle not found case
    if (!plant) {
      return (
        <div className="mt-7 max-w-7xl mx-auto px-4">Plant not found.</div>
      );
    }

    // Render the plant page
    return (
      <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-full">
          <PlantCard plant={plant} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in plant page:", error);
    return (
      <div className="mt-7 max-w-7xl mx-auto px-4">
        An error occurred loading this plant.
      </div>
    );
  }
}
