import { stackServerApp } from "@/stack";
import { getPlantById } from "../../../../actions/plant.actions";
import PlantCard from "./PlantCard";
import { SignIn } from "@stackframe/stack";

// For generateMetadata, use this type
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);

  return {
    title: plant?.name || "Plant Page",
  };
}

// For the page component, use the correct Next.js types
interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

const Page = async ({ params }: PageProps) => {
  const user = await stackServerApp.getUser();
  if (!user) {
    return <SignIn />;
  }

  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);

  if (!plant) {
    return <div className="mt-7 max-w-7xl mx-auto px-4">Plant not found.</div>;
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <PlantCard plant={plant} />
      </div>
    </div>
  );
};

export default Page;
