import { useMemo, useEffect, useState } from 'react';
import apis from "../../utils/apis";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

// Material UI Imports
import { Box, Typography } from '@mui/material';

// Define the type for Purchased Items
type PurchasedItem = {
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
};

const PurchasedItemsTable = () => {
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);
  const { user_id } = useSelector((state: RootState) => state.user);

  // Fetch purchased items from the backend
  useEffect(() => {
    const fetchPurchasedItems = async () => {
      try {
        const response = await fetch(`${apis().purchasedItems}/${user_id}`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        if (!response.ok) {
          console.log(result.message);
          return;
        }

        if (result.status) {
          console.log(result.message);
          console.log(result.user);

          // Set the purchased items
          if (result.user?.PurchasedItems) {
            setPurchasedItems(result.user.PurchasedItems);
          }
        }
      } catch (error) {
        console.error('Error fetching purchased items:', error);
      }
    };

    fetchPurchasedItems();
  }, [user_id]);

  // Define columns for the table
  const columns = useMemo<MRT_ColumnDef<PurchasedItem>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Product Name',
        size: 200,
      },
      {
        accessorKey: 'size',
        header: 'Size',
        size: 100,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 100,
        Cell: ({ cell }) => (
          <Typography variant="body2">
            ${cell.getValue<number>().toFixed(2)}
          </Typography>
        ),
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 100,
      },
    ],
    []
  );

  // Configure the table
  const table = useMaterialReactTable({
    columns,
    data: purchasedItems, // Pass the fetched purchased items
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: false, // Disable row actions
    enableRowSelection: false, // Disable row selection
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: 'calc(100vh - 200px)', // Adjust height to go beyond min-h-screen
        overflow: 'auto',
      },
    },
  });

  return (
    <div className="p-12">
    <Box sx={{ padding: '16px', height: '100%' }}>
      <Typography variant="h4" sx={{ marginBottom: '16px', fontWeight: "500" }}>
        Purchased Items
      </Typography>
      <MaterialReactTable table={table} />
    </Box>
    </div>
  );
};

export default PurchasedItemsTable;