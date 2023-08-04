import Article from "./components/Article";


export default function Home() {
  return (
    <main>
      <h1 className="text-center mt-4">PDB</h1>
      <div className="flex flex-col items-center py-2">
        <Article />
      </div>
    </main>
  )
}
