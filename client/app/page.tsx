import Table from "../components/Table";

async function getData() {
  const response = await fetch("http://localhost:5555/books");
  return await response.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="max-w-7xl mx-auto my-20">
      <Table data={data} />
    </div>
  );
}
