"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Search, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combo-box";
import { useState } from "react";
import { getPlants } from "../../actions/plant.actions";
import { useRouter } from "next/navigation";
import TableSkeleton from "./TableSkeleton";
import { CreateDialog } from "./CreateDialog";
import { EditDialog } from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

const plantsObj = [
  {
    id: 1,
    name: "Aloe Vera",
    category: "Succulent",
    price: "$5.99",
    stock: 25,
  },
  { id: 2, name: "Snake Plant", category: "Indoor", price: "$7.49", stock: 18 },
  {
    id: 3,
    name: "Peace Lily",
    category: "Flowering",
    price: "$8.99",
    stock: 12,
  },
  {
    id: 4,
    name: "Spider Plant",
    category: "Hanging",
    price: "$6.25",
    stock: 20,
  },
  {
    id: 5,
    name: "Fiddle Leaf Fig",
    category: "Tree",
    price: "$14.99",
    stock: 5,
  },
  { id: 6, name: "Monstera", category: "Tropical", price: "$13.75", stock: 8 },
  { id: 7, name: "Bamboo Palm", category: "Palm", price: "$9.50", stock: 16 },
  {
    id: 8,
    name: "Jade Plant",
    category: "Succulent",
    price: "$4.95",
    stock: 30,
  },
  {
    id: 9,
    name: "ZZ Plant",
    category: "Low Light",
    price: "$10.00",
    stock: 14,
  },
  { id: 10, name: "Boston Fern", category: "Fern", price: "$6.80", stock: 22 },
];

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
