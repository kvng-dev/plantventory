"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combo-box";
import { useState } from "react";
import { getPlants } from "../../actions/plant.actions";
import { useRouter } from "next/navigation";
import TableSkeleton from "./TableSkeleton";
import { CreateDialog } from "./CreateDialog";
import { EditDialog } from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type Plant = Awaited<ReturnType<typeof getPlants>>;
interface InventoryTableProps {
  plants: Plant;
}

export function InventoryTable({ plants }: InventoryTableProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const filterPlants = plants?.userPlants?.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory)
  );

  if (!plants) {
    return <TableSkeleton />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4 w-full">
        <div className="relative max-w-2xl w-full">
          <Input
            className="pl-10 flex-1"
            placeholder="Filter plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        </div>
        <Combobox
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
        />

        <CreateDialog />
      </div>

      <Table className="rounded-md border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price($)</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterPlants?.map((plant) => {
            const slugName = plant.name.toLowerCase().replace(/\s+/g, "-");
            const slug = `${plant.id}--${slugName}`;
            const plantUrl = `/plants/${slug}`;
            return (
              <TableRow onClick={() => router.push(plantUrl)} key={plant.id}>
                <TableCell className="font-medium">{plant.id}</TableCell>
                <TableCell>{plant.name}</TableCell>
                <TableCell>{plant.category}</TableCell>
                <TableCell className="">{plant.price}</TableCell>
                <TableCell className="">{plant.stock}</TableCell>

                <TableCell className="">
                  <div
                    className="flex justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditDialog plant={plant} />
                    <DeleteDialog plant={plant} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
