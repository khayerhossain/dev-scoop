import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Star } from "lucide-react";

const FeaturedBlogsTable = ({ blogs }) => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "#",
        cell: (info) => info.row.index + 1,
      },
      {
        id: "select",
        header: () => <input type="checkbox" className="accent-violet-600" />,
        cell: () => <input type="checkbox" className="accent-violet-600" />,
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => (
          <span className="font-medium text-gray-800 line-clamp-1">
            {info.getValue()}
          </span>
        ),
      },
      {
        id: "tag",
        header: "Tag",
        cell: () => (
          <span className="inline-flex items-center gap-1 bg-violet-100 text-violet-700 px-3 py-1 text-xs font-semibold rounded-full">
            <Star size={14} />
            Featured Dev
          </span>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (info) => (
          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full capitalize">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "wordCount",
        header: "Word Count",
        cell: (info) => (
          <span className="text-gray-700">{info.getValue() ?? "-"}</span>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => (
          <span className="text-gray-600 text-sm">
            {info.getValue() || "N/A"}
          </span>
        ),
      },
      {
        id: "type",
        header: "Type",
        cell: () => (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full border border-gray-300 text-gray-700 bg-gray-50">
            Blog
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: blogs ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6">
      <table className="min-w-full text-sm text-left font-inter border-separate border-spacing-y-2">
        <thead className="bg-gray-100/60 text-gray-700 text-xs uppercase tracking-wide rounded-t-xl">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-5 py-3 font-semibold ${
                    header.column.columnDef.meta?.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white hover:bg-violet-50/70 transition-all duration-200 shadow-sm rounded-xl"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`px-5 py-4 align-middle ${
                    cell.column.columnDef.meta?.align === "right"
                      ? "text-right"
                      : ""
                  }`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedBlogsTable;
