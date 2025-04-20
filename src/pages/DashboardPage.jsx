import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function DashboardPage() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [test, setMsg] = useState('');

  const [loading, setLoading] = useState(true);

  const [dataByDevice, setDataByDevice] = useState([]);
  const [dataByYear, setDataByYear] = useState([]);
  const [dataByErrorType, setDataByErrorType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await sleep(1000);
      axios.get('http://localhost:5002/api/hello').then((res) => setMsg(res.data.message));
      axios
        .get('http://localhost:5002/api/errors/by-device')
        .then((res) => setDataByDevice(res.data));
      axios.get('http://localhost:5002/api/errors/by-year').then((res) => setDataByYear(res.data));
      axios
        .get('http://localhost:5002/api/errors/by-type')
        .then((res) => setDataByErrorType(res.data));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <header>🚀 대시보드 페이지입니다.</header>
      <div>
        <h1>{test}</h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack direction="column" style={{ alignItems: 'center' }}>
            <Stack direction="row">
              <FixedDatePicker label="From" defaultValue="2024-05-01" />
              <FixedDatePicker label="To" defaultValue="2025-04-20" />
            </Stack>
            <Button sx={{ my: 2, width: 80, height: 40 }} variant="contained">
              조회
            </Button>
          </Stack>
        </div>

        <div>
          <h4>기기별 오류 현황</h4>
          <BarChartByDevice loading={loading} data={dataByDevice} />
        </div>
        <div style={{ display: 'flex', height: '400px' }}>
          <div style={{ flex: 1 }}>
            <h4>연도별 오류 발생 현황</h4>
            <LineChartByYear loading={loading} data={dataByYear} />
          </div>
          <div style={{ flex: 1 }}>
            <h4>오류 타입별 현황</h4>
            <PieChartByErrorType loading={loading} data={dataByErrorType} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BarChartByDevice({ loading, data }) {
  return (
    <BarChart
      loading={loading}
      height={300}
      series={data}
      xAxis={[
        {
          data: ['Forklift Type', 'Pallet Truck Type', 'High-mast Type', 'Conveyor Type', 'AMR'],
          scaleType: 'band',
        },
      ]}
    />
  );
}

BarChartByDevice.propTypes = {
  loading: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export function LineChartByYear({ loading, data }) {
  return (
    <LineChart
      loading={loading}
      xAxis={[
        {
          valueFormatter: (value) => value.toString(),
          data: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        },
      ]}
      series={data}
      height={300}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}

LineChartByYear.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

export function PieChartByErrorType({ loading, data }) {
  return (
    <PieChart
      loading={loading}
      series={[
        {
          data: data,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter: (item) => `${item.value}%`,
        },
      ]}
      height={300}
      width={300}
    />
  );
}

PieChartByErrorType.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

export function FixedDatePicker({ label, defaultValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        readOnly
        label={label}
        format="YYYY/MM/DD"
        defaultValue={dayjs(defaultValue)}
        slotProps={{
          textField: {
            sx: { width: 160, mx: 1 },
            fullWidth: false,
          },
        }}
      />
    </LocalizationProvider>
  );
}

FixedDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};
