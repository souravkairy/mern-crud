import DataTable from "@/components/Table";

const APIURL = "http://localhost:5555";

async function getData() {
  const res = await fetch(`${APIURL}/books`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const getBooks = await getData();

  return (
    <main className="p-24">
      <DataTable data={getBooks} />
    </main>
  );
}
