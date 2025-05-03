import { stackServerApp } from "@/stack";
import { getPlantById } from "../../../../actions/plant.actions";
import PlantCard from "./PlantCard";
import { SignIn } from "@stackframe/stack";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const [id] = slug.split("--");
  const plant = await getPlantById(id);

  return {
    title: plant?.name || "Plant Page",
  };
}

const page = async ({ params }: PageProps) => {
  const user = await stackServerApp.getUser();
  if (!user) {
    return <SignIn />;
  }
  const { slug } = await params;
  const [id] = slug.split("--");
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
