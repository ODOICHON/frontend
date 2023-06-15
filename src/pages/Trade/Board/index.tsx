import { useParams } from 'react-router-dom';

export default function TradeBoardPage() {
  const { id } = useParams();

  return <div>trade board {id}</div>;
}
