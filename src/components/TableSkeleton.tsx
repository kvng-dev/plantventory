import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const TableSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 py-4">
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="w-full h-4" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-full h-4" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-full h-4" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-full h-4" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-full h-4" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="w-full h-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="w-full h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-4" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-full h-4" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableSkeleton;
