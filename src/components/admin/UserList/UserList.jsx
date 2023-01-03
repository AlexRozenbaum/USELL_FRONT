import * as React from "react";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import { DataGrid, useGridApiContext } from "@mui/x-data-grid";
import { toJS } from "mobx";
import usersStore from "../../../store/UsersStore/UsersStore";
import { useEffect } from "react";
import { observer } from "mobx-react";

function SelectEditInputCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();
  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
    usersStore.updateUser(id,field,event.target.value )
    apiRef.current.stopCellEditMode({ id, field });
  };
if(field=='role')
  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      <option>admin</option>
      <option>user</option>
    </Select>)
    if(field=='active')
    return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      <option>true</option>
      <option>false</option>
    </Select>)
  
}

SelectEditInputCell.propTypes = {
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const renderSelectEditInputCell = (params) => {
  return <SelectEditInputCell {...params} />;
};

 function AutoStopEditComponent() {
    useEffect(() => {
        usersStore.fetchUsers();  
      }, []);
      const rows = toJS(usersStore.users);
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}
const columns = [
  { field: "_id", headerName: "_id", minWidth: 250 },
  { field: "name",  headerName: "Name", width: 150, },
  { field: "nickname", headerName: "Nickname", minWidth: 120 },
  { field: "phone", headerName: "Phone", minWidth: 120 },
  { field: "location", headerName: "Location", minWidth: 120 },
  {  field: "role",  headerName: "Role", renderEditCell: renderSelectEditInputCell,  editable: true,   minwidth: 120},
  {  field: "active",  headerName: "Active",renderEditCell: renderSelectEditInputCell,  editable: true,    minwidth: 200 },
  { field: "date_created", headerName: "Date_created", minWidth:200 },
];
export default observer(AutoStopEditComponent)