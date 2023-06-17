import styled from 'styled-components';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import { DataGrid } from '@mui/x-data-grid';

const IconsColor = '#4153f3';

export const IDIcon = styled(FormatAlignLeftIcon)`
    margin-right: 10px;
    color: ${IconsColor};
`

export const PasswordIcon = styled(LockIcon)`
    margin-right: 10px;
    color: ${IconsColor};
`

export const RoomNameIcon = styled(DriveFileRenameOutlineIcon)`
    margin-right: 10px;
    color: ${IconsColor};
`

export const CapacityIcon = styled(PeopleIcon)`
    margin-right: 10px;
    color: ${IconsColor};
`

export const RowEditIcon = styled(EditIcon)`
    margin-right: 2px;
    cursor: pointer;
`

export const RowChangeIcon = styled(LockIcon)`
    margin-right: 2px;
    cursor: pointer;
`

export const RowDeleteIcon = styled(DeleteIcon)`
    margin-right: 2px;
    cursor: pointer;
`

export const Header = styled.div`
    position: relative;
    width: 100%;
    font-size: 24px;
    color: ${IconsColor};
    margin-bottom: 10px;
`

export const StyledDataGrid = styled(DataGrid)`
    background-color: #fff;
`