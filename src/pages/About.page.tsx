import { json, useLoaderData } from 'react-router-dom';

export async function loader() {
  return json({ isLoggedIn: true, user: { email: 'abc@xyz.com' } });
}

export function Component() {
  const data = useLoaderData();
  return <p className="flex text-white py-20">{JSON.stringify(data, null, 2)}</p>;
}
