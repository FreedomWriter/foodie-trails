import './globals.css';
import { Typography } from '@/typography';

export default function Home(props) {
  console.log({ props });
  return (
    <div>
      <div>
        <Typography variant='h1'>Welcome to Foodie Trails</Typography>
      </div>
    </div>
  );
}
