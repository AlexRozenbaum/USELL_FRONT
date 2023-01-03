import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import categoryStore from '../../../store/categoryStore/categoryStore';
import { toJS } from 'mobx';
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
   const  category_url
   = randomId();
   categoryStore.createCategory ({category_url:category_url
    ,img_url :'futureCategory', name: 'futureCategory',info:'futureCategory'})
    setRows((oldRows) => [...oldRows, {category_url
      ,img_url :'futureCategory', name: 'futureCategory',info:'futureCategory',isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [category_url
      ]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Category
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function FullFeaturedCrudGrid() {
  React.useEffect(() => {
    categoryStore.fetchCategories(); 
  }, []);
  const initialRows = toJS(categoryStore.categories);
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (category_url) => () => {
    setRowModesModel({ ...rowModesModel, [category_url]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (category_url) => () => {
    const row=rows.filter((row) => row.category_url == category_url)
    setRowModesModel({ ...rowModesModel, [category_url]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (category_url) => () => {
    categoryStore.deleteCategory(category_url)
    setRows(rows.filter((row) => row.category_url !== category_url));
  };

  const handleCancelClick = (category_url) => () => {
    setRowModesModel({
      ...rowModesModel,
      [category_url]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.category_url === category_url);
    if (editedRow.isNew) {
      categoryStore.deleteCategory(category_url)
      setRows(rows.filter((row) => row.category_url !== category_url));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    categoryStore.updateCategory(updatedRow)   
    setRows(rows.map((row) => (row.category_url=== newRow.category_url? updatedRow : row)));
    return updatedRow;
  };
  const columns = [{
     field: 'category_url', headerName: 'category_url',width: 300},
    { field: 'img_url', headerName: 'Image',width: 200, editable: true },
    { field: 'name', headerName: 'Name',width: 200, editable: true },
    { field: 'info', headerName: 'Info',width: 200 ,editable: true},
    { field: '_id', headerName: 'MongoDB_id',width: 250, },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({id}) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGridPro
      getRowId={(row) => row.category_url}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
