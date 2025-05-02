import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const DisplayTable = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <colgroup>
          {table.getHeaderGroups()[0].headers.map((header) => {
            const id = header.column.id;
            // give image/actions narrow fixed widths
            if (id === "image" || id === "actions") {
              return <col key={id} style={{ width: "100px" }} />;
            }
            return <col key={id} />;
          })}
        </colgroup>

        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => {
                const id = header.column.id;
                const alignCenter = id === "image" || id === "actions";
                return (
                  <th
                    key={header.id}
                    className={`px-3 sm:px-6 py-2 text-xs font-medium text-gray-600 uppercase tracking-wider ${
                        alignCenter ? "text-center" : "text-left"
                    }`}

                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              {row.getVisibleCells().map((cell) => {
                const id = cell.column.id;
                const alignCenter = id === "image" || id === "actions";
                return (
                  <td
                    key={cell.id}
                    className={`px-3 sm:px-6 py-3 whitespace-nowrap text-sm text-gray-700 ${
                        alignCenter ? "text-center" : ""
                    }`}

                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>

        {data.length === 0 && (
          <tfoot>
            <tr>
              <td
                colSpan={columns.length}
                className="py-4 text-center text-gray-500"
              >
                No records found.
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default DisplayTable;
