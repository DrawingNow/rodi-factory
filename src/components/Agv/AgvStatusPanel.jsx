import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { AgvType, AgvState, ErrorType } from '../../types/agv';

export default function AgvStatusPanel({ agv, isSelected = false, onClick }) {
  return (
    <Card
      variant={isSelected ? 'elevation' : 'outlined'}
      sx={{
        minWidth: 250,
        mb: 2,
        borderColor: isSelected ? 'primary.main' : 'grey.300',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {agv.name}
        </Typography>
        <Typography variant="body2">Type: {agv.type}</Typography>
        <Typography variant="body2">Line: {agv.line}</Typography>
        <Typography variant="body2">State: {agv.state}</Typography>
        <Typography variant="body2">Has Cargo: {agv.hasCargo ? 'Yes' : 'No'}</Typography>
        {agv.hasError && (
          <Typography variant="body2" color="error">
            ⚠ Error: {agv.errorType}
          </Typography>
        )}

        <Box mt={2}>
          <Typography variant="body2" gutterBottom>
            Battery: {agv.battery}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={agv.battery}
            color={agv.battery < 20 ? 'error' : 'primary'}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

AgvStatusPanel.propTypes = {
  agv: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(AgvType)).isRequired,
    line: PropTypes.number.isRequired,
    battery: PropTypes.number.isRequired,
    hasCargo: PropTypes.bool.isRequired,
    state: PropTypes.oneOf(Object.values(AgvState)).isRequired,
    hasError: PropTypes.bool,
    errorType: PropTypes.oneOf(Object.values(ErrorType)),
  }).isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};
