import BlockListPage from '../components/Blocks';

export default function BlocksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">
        Ethereum Blockchain Blocks
      </h1>
      <div>
        <BlockListPage />
      </div>
    </div>
  );
}
