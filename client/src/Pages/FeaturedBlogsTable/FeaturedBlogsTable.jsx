import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const FeaturedBlogsTable = ({ blogs }) => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: '_id',
        header: '#',
        cell: (info) => info.row.index + 1,
      },
      {
        id: 'select',
        header: () => <input type="checkbox" />,
        cell: () => <input type="checkbox" />,
      },
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        id: 'tag',
        header: 'Tag',
        cell: () => (
          <small className="inline-flex text-white bg-violet-600 px-3 py-1 rounded-full">
            Featured Dev
          </small>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: (info) => (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full capitalize">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'wordCount',
        header: 'Word Count',
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: (info) => info.getValue() || 'N/A',
      },
      {
        id: 'type',
        header: 'Type',
        cell: () => (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full border border-gray-400 text-gray-700">
            Blog
          </span>
        ),
      },
      // {
      //   id: 'actions',
      //   header: 'Actions',
      //   cell: () => (
      //     <button className="text-gray-400 hover:text-gray-700 text-xl">⋯</button>
      //   ),
      //   meta: { align: 'right' },
      // },
    ],
    []
  );

  const table = useReactTable({
    data: blogs ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border-2 border-violet-600 p-6">
      <table className="min-w-full text-sm text-left font-inter">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-4 py-3 ${
                    header.column.columnDef.meta?.align === 'right'
                      ? 'text-right'
                      : ''
                  }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-gray-700">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-gray-50 transition duration-150"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`px-4 py-4 ${
                    cell.column.columnDef.meta?.align === 'right'
                      ? 'text-right'
                      : ''
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
