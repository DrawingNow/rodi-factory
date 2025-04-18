import axios from 'axios';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [test, setMsg] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5002/api/hello').then((res) => setMsg(res.data.message), []);
  });

  return (
    <div>
      🚀 대시보드 페이지입니다.
      <div>
        <h1>{test}</h1>
      </div>
    </div>
  );
}
