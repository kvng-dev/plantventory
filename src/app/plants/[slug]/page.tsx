import { stackServerApp } from "@/stack";
import { getPlantById } from "../../../../actions/plant.actions";
import PlantCard from "./PlantCard";
import { SignIn } from "@stackframe/stack";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);
  return {
    title: plant ? plant.name : "Plant Details",
    description: plant ? plant.description : "Plant details page",
  };
}

const page = async ({ params }: { params: { slug: string } }) => {
  const user = await stackServerApp.getUser();
  if (!user) {
    return <SignIn />;
  }
  const [id] = params.slug.split("--");
  const plant = await getPlantById(id);

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <PlantCard plant={plant} />
      </div>
    </div>
  );
};
export default page;
