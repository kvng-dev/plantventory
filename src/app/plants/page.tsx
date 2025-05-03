import { InventoryTable } from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import { getPlants } from "../../../actions/plant.actions";

const page = async () => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const plant = await getPlants();
  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventoryTable plants={plant} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          <SignUp />
        </div>
      )}
    </>
  );
};
export default page;
